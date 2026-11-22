/* global process */
// Vercel serverless function: shared "Fuel the Build" battery tap counter.
//   GET  /api/fuel  -> { count }            (read the shared total)
//   POST /api/fuel  -> { count }            (add exactly one tap)
//
// The total lives in cell B1 of a Google Sheet. A Google Apps Script web app
// reads and updates it. This file is the only thing that talks to that script,
// so the script's address and secret never reach the browser.
//
// Environment variables (set in Vercel, and in .env.local for local testing):
//   GOOGLE_SHEET_WEBAPP_URL  the Web App URL that ends in /exec
//   GOOGLE_SHEET_SECRET      the same secret text that is inside the script
//
// Every error reply carries a short "code" so you can see WHAT failed
// (never any secret): not_configured, google_unreachable, google_not_json,
// google_unauthorized, sheet_error, busy, unexpected.

import { createHash } from 'node:crypto';

const TIMEOUT_MS = 8000;

function getConfig() {
  const url = (process.env.GOOGLE_SHEET_WEBAPP_URL || '').trim();
  const secret = (process.env.GOOGLE_SHEET_SECRET || '').trim();
  if (!url || !secret || !url.startsWith('https://script.google.com/')) return null;
  return { url, secret };
}

// A scrambled ID for the visitor, used only for the "one tap per 0.4s" check.
// The real IP address is never sent to Google or stored anywhere.
function getClientId(req, secret) {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const ip = (first ? first.split(',')[0].trim() : req.headers['x-real-ip']) || 'unknown';
  return createHash('sha256').update(ip + secret).digest('hex');
}

function fail(code) {
  const error = new Error(code);
  error.code = code;
  return error;
}

async function callScript(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    let response;
    try {
      // Google answers with a redirect first; fetch follows it automatically.
      response = await fetch(url, { redirect: 'follow', signal: controller.signal, ...options });
    } catch {
      throw fail('google_unreachable');
    }
    try {
      return await response.json();
    } catch {
      // Usually a Google login page: the Web App is not set to "Anyone"
      throw fail('google_not_json');
    }
  } finally {
    clearTimeout(timer);
  }
}

function isCount(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

// Turn an error message from the Apps Script into a short code
function scriptErrorCode(error) {
  if (error === 'unauthorized') return 'google_unauthorized'; // secret does not match
  if (error === 'server_error') return 'sheet_error'; // tab "Counter" or cell B1 problem
  if (error === 'busy') return 'busy';
  return 'unexpected';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const config = getConfig();
  if (!config) {
    return res.status(500).json({ error: 'Counter is not configured.', code: 'not_configured' });
  }

  try {
    if (req.method === 'GET') {
      const data = await callScript(`${config.url}?secret=${encodeURIComponent(config.secret)}`, {
        method: 'GET',
      });

      if (isCount(data?.count) && !data.error) return res.status(200).json({ count: data.count });
      return res
        .status(502)
        .json({ error: 'Counter is temporarily unavailable.', code: scriptErrorCode(data?.error) });
    }

    if (req.method === 'POST') {
      const data = await callScript(config.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: config.secret, client: getClientId(req, config.secret) }),
      });

      // A real tap: the script returns the new total
      if (isCount(data?.count) && !data.error) {
        return res.status(200).json({ count: data.count });
      }

      // Tapped again too quickly: not counted, but the total is still valid
      if (data?.error === 'too_fast' && isCount(data.count)) {
        return res.status(429).json({ error: 'Too many taps.', code: 'too_fast', count: data.count });
      }

      return res
        .status(data?.error === 'busy' ? 503 : 502)
        .json({ error: 'Counter is temporarily unavailable.', code: scriptErrorCode(data?.error) });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch (error) {
    return res
      .status(502)
      .json({ error: 'Counter is temporarily unavailable.', code: error?.code || 'unexpected' });
  }
}