// ─── Vercel Serverless API ─── Stores subscriptions on JSONBin ────

const JSONBIN_URL = 'https://api.jsonbin.io/v3';

module.exports = async function handler(req, res) {
  const binId = process.env.JSONBIN_BIN_ID;
  const masterKey = process.env.JSONBIN_MASTER_KEY;

  if (!binId || !masterKey) {
    return res.status(500).json({ error: 'JSONBIN_BIN_ID or JSONBIN_MASTER_KEY not set' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const binRes = await fetch(`${JSONBIN_URL}/b/${binId}/latest`, {
      headers: { 'X-Master-Key': masterKey }
    });
    let list = [];
    if (binRes.ok) {
      const json = await binRes.json();
      list = (json.record && json.record.data) || [];
    }

    if (req.method === 'GET') {
      return res.status(200).json(list);
    }

    if (req.method === 'POST') {
      const sub = { ...req.body, created_at: new Date().toISOString() };
      list.unshift(sub);
      await fetch(`${JSONBIN_URL}/b/${binId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': masterKey },
        body: JSON.stringify({ data: list })
      });
      return res.status(201).json(sub);
    }

    if (req.method === 'PUT') {
      const { ref, updates } = req.body;
      const idx = list.findIndex(s => s.ref === ref);
      if (idx === -1) return res.status(404).json({ error: 'not found' });
      list[idx] = { ...list[idx], ...updates };
      await fetch(`${JSONBIN_URL}/b/${binId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': masterKey },
        body: JSON.stringify({ data: list })
      });
      return res.status(200).json(list[idx]);
    }

    if (req.method === 'DELETE') {
      const { ref, all } = req.body;
      if (all) list = [];
      else list = list.filter(s => s.ref !== ref);
      await fetch(`${JSONBIN_URL}/b/${binId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': masterKey },
        body: JSON.stringify({ data: list })
      });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
