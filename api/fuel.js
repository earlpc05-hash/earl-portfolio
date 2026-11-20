/* global process */
// Vercel serverless function: shared "Fuel the Build" click counter.
// GET  /api/fuel  -> { count }
// POST /api/fuel  -> adds exactly one click, returns { count }
//
// The count lives in Upstash Redis. INCR is atomic, so two people clicking
// at the same moment can never overwrite each other. The database URL and
// token are read from environment variables on the server only.

const KEY = 'portfolio:fuel-the-build:clicks';

function getConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;
  return { url: url.replace(/\/$/, ''), token };
}

async function redis(config, command) {
  const response = await fetch(config.url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  if (!response.ok) throw new Error(`Redis request failed (${response.status})`);

  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

function getClientId(req) {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return (first ? first.split(',')[0].trim() : req.headers['x-real-ip']) || 'unknown';
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  const config = getConfig();
  if (!config) {
    return res.status(500).json({ error: 'Counter is not configured.' });
  }

  try {
    if (req.method === 'GET') {
      const value = await redis(config, ['GET', KEY]);
      return res.status(200).json({ count: Number(value) || 0 });
    }

    if (req.method === 'POST') {
      // One click per visitor every 0.4s. This stops double-fires and
      // simple scripts from inflating the number. SET ... NX only succeeds
      // if the key does not exist yet.
      const allowed = await redis(config, [
        'SET',
        `${KEY}:cooldown:${getClientId(req)}`,
        '1',
        'NX',
        'PX',
        '400',
      ]);

      if (allowed !== 'OK') {
        const value = await redis(config, ['GET', KEY]);
        return res.status(429).json({ error: 'Too many clicks.', count: Number(value) || 0 });
      }

      const count = await redis(config, ['INCR', KEY]);
      return res.status(200).json({ count: Number(count) });
    }

    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  } catch {
    return res.status(502).json({ error: 'Counter is temporarily unavailable.' });
  }
}