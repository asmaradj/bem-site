const { createPool } = require('@vercel/postgres');

async function getDb() {
  const sql = createPool({ connectionString: process.env.POSTGRES_URL });
  await sql.query(`
    CREATE TABLE IF NOT EXISTS subscriptions (
      ref TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT DEFAULT '',
      phone TEXT DEFAULT '',
      wilaya TEXT DEFAULT '',
      level TEXT DEFAULT '',
      payment TEXT DEFAULT '',
      amount INTEGER DEFAULT 2000,
      currency TEXT DEFAULT 'د.ج',
      date TEXT DEFAULT '',
      status TEXT DEFAULT 'pending',
      activated_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      expires_at TEXT
    );
  `);
  return sql;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(204).end();

  try {
    const sql = await getDb();

    if (req.method === 'GET') {
      const { rows } = await sql.query('SELECT * FROM subscriptions ORDER BY created_at DESC');
      return res.json({ data: rows });
    }

    if (req.method === 'POST') {
      const { ref, name, email, phone, wilaya, level, payment, amount, currency, date } = req.body;
      if (!ref || !name) return res.status(400).json({ error: 'ref and name required' });
      await sql.query(
        `INSERT INTO subscriptions (ref, name, email, phone, wilaya, level, payment, amount, currency, date, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 'pending')`,
        [ref, name, email || '', phone || '', wilaya || '', level || '', payment || '', amount || 2000, currency || 'د.ج', date || '']
      );
      return res.json({ ok: true, ref });
    }

    if (req.method === 'PUT') {
      const { ref, status } = req.body;
      if (!ref) return res.status(400).json({ error: 'ref required' });
      const activated_at = status === 'active' ? new Date().toISOString() : null;
      const expires_at = status === 'active' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null;
      await sql.query(
        'UPDATE subscriptions SET status = $1, activated_at = $2, expires_at = $3 WHERE ref = $4',
        [status || 'pending', activated_at, expires_at, ref]
      );
      return res.json({ ok: true, ref });
    }

    if (req.method === 'DELETE') {
      const { ref } = req.body || req.query;
      if (ref) {
        await sql.query('DELETE FROM subscriptions WHERE ref = $1', [ref]);
      } else {
        await sql.query('DELETE FROM subscriptions');
      }
      return res.json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('API Error:', err);
    return res.status(500).json({ error: err.message });
  }
};
