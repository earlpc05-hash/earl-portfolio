import { createHash } from 'node:crypto';

const TIMEOUT_MS = 8000;

function getConfig() {
  const url = (process.env.GOOGLE_SHEET_WEBAPP_URL || '').trim();
  const secret = (process.env.GOOGLE_SHEET_SECRET || '').trim();
  if (!url || !secret || !url.startsWith('https://script.google.com/')) return null;
  return { url, secret };
}

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

function scriptErrorCode(error) {
  if (error === 'unauthorized') return 'google_unauthorized'; 
  if (error === 'server_error') return 'sheet_error'; 
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


      if (isCount(data?.count) && !data.error) {
        return res.status(200).json({ count: data.count });
      }

    
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