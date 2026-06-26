// ─── Vercel Serverless API ─── Stores subscriptions on JSONBin ────

const JSONBIN_URL = 'https://api.jsonbin.io/v3';

async function getBin(binId, masterKey) {
  const res = await fetch(`${JSONBIN_URL}/b/${binId}/latest`, {
    headers: { 'X-Master-Key': masterKey }
  });
  if (!res.ok) return { data: [] };
  const json = await res.json();
  return json.record || { data: [] };
}

async function updateBin(binId, masterKey, record) {
  const res = await fetch(`${JSONBIN_URL}/b/${binId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': masterKey },
    body: JSON.stringify(record)
  });
  return res.json();
}

export default async function handler(req, res) {
  const binId = process.env.JSONBIN_BIN_ID;
  const masterKey = process.env.JSONBIN_MASTER_KEY;

  if (!binId || !masterKey) {
    return res.status(500).json({ error: 'JSONBIN_BIN_ID or JSONBIN_MASTER_KEY not set' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    let bin = await getBin(binId, masterKey);
    let list = Array.isArray(bin) ? bin : (bin.data || []);

    if (req.method === 'GET') {
      return res.status(200).json(list);
    }

    if (req.method === 'POST') {
      const sub = { ...req.body, created_at: new Date().toISOString() };
      list.unshift(sub);
      await updateBin(binId, masterKey, { data: list });
      return res.status(201).json(sub);
    }

    if (req.method === 'PUT') {
      const { ref, updates } = req.body;
      const idx = list.findIndex(s => s.ref === ref);
      if (idx === -1) return res.status(404).json({ error: 'not found' });
      list[idx] = { ...list[idx], ...updates };
      await updateBin(binId, masterKey, { data: list });
      return res.status(200).json(list[idx]);
    }

    if (req.method === 'DELETE') {
      const { ref, all } = req.body;
      if (all) {
        await updateBin(binId, masterKey, { data: [] });
        return res.status(200).json({ ok: true });
      }
      list = list.filter(s => s.ref !== ref);
      await updateBin(binId, masterKey, { data: list });
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'method not allowed' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
