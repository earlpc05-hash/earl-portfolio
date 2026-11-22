/* global process */
// Vercel serverless function: shared "Fuel the Build" battery tap counter.
//   GET  /api/fuel  -> { count }            (read the shared total)
//   POST /api/fuel  -> { count }            (add exactly one tap)
//
// The total lives in a Google Sheet. A Google Apps Script web app reads and
// updates it. This file is the only thing that talks to that script, so the
// script's address and secret never reach the browser.
//
// Environment variables (set in Vercel, and in .env.local for local testing):
//   GOOGLE_SHEET_WEBAPP_URL  the Web App URL that ends in /exec
//   GOOGLE_SHEET_SECRET      the same secret text that is inside the script

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

async function callScript(url, options) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    // Google answers with a redirect first; fetch follows it automatically.
    const response = await fetch(url, { redirect: 'follow', signal: controller.signal, ...options });
    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

function isCount(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const config = getConfig();
  if (!config) {
    return res.status(500).json({ error: 'Counter is not configured.' });
  }

  try {
    if (req.method === 'GET') {
      const data = await callScript(`${config.url}?secret=${encodeURIComponent(config.secret)}`, {
        method: 'GET',
      });

      if (isCount(data?.count)) return res.status(200).json({ count: data.count });
      return res.status(502).json({ error: 'Counter is temporarily unavailable.' });
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
        return res.status(429).json({ error: 'Too many taps.', count: data.count });
      }

      if (data?.error === 'busy') {
        return res.status(503).json({ error: 'Counter is busy. Try again.' });
      }

      return res.status(502).json({ error: 'Counter is temporarily unavailable.' });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch {
    return res.status(502).json({ error: 'Counter is temporarily unavailable.' });
  }
}