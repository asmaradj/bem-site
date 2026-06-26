const JSONBIN_BIN_ID = '6a3e6a0eda38895dfe02709a';
const JSONBIN_MASTER_KEY = '$2a$10$rC3ecItXnAfIvauWD7iScelNRNvIEYDU1/ZXDTRine2xItBTrsc3W';
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b';

async function jsonbinGet() {
  const res = await fetch(`${JSONBIN_URL}/${JSONBIN_BIN_ID}/latest`, {
    headers: { 'X-Master-Key': JSONBIN_MASTER_KEY }
  });
  if (!res.ok) throw new Error(`JSONBin GET ${res.status}`);
  const json = await res.json();
  return (json.record && json.record.data) || [];
}

async function jsonbinPut(data) {
  const res = await fetch(`${JSONBIN_URL}/${JSONBIN_BIN_ID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_MASTER_KEY },
    body: JSON.stringify({ data })
  });
  if (!res.ok) throw new Error(`JSONBin PUT ${res.status}`);
}

function getLocal() {
  return JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
}

function setLocal(list) {
  localStorage.setItem('bem_all_subs', JSON.stringify(list));
}

function getMySub() {
  return JSON.parse(localStorage.getItem('bem_subscription') || 'null');
}

function setMySub(sub) {
  if (sub) localStorage.setItem('bem_subscription', JSON.stringify(sub));
  else localStorage.removeItem('bem_subscription');
}

window.db = {
  async list() {
    try {
      const remote = await jsonbinGet();
      if (remote.length > 0) {
        const local = getLocal();
        const refs = new Set(remote.map(s => s.ref));
        const merged = [...remote, ...local.filter(s => !refs.has(s.ref))];
        if (merged.length > remote.length) jsonbinPut(merged).catch(() => {});
        return merged;
      }
    } catch (e) { console.warn('JSONBin GET:', e.message); }
    return getLocal();
  },

  async adminList() {
    try {
      return await jsonbinGet();
    } catch (e) { console.error('JSONBin GET:', e.message); }
    return [];
  },

  async create(sub) {
    const list = getLocal();
    list.unshift(sub);
    setLocal(list);
    setMySub(sub);
    try {
      const remote = await jsonbinGet();
      remote.unshift(sub);
      await jsonbinPut(remote);
    } catch (e) { console.warn('JSONBin create:', e.message); }
  },

  async updateStatus(ref, status, meta) {
    const updates = {
      status,
      activated_at: status === 'active' ? new Date().toISOString() : null,
      expires_at: status === 'active' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null,
      ...meta
    };
    const local = getLocal();
    const idx = local.findIndex(s => s.ref === ref);
    if (idx !== -1) Object.assign(local[idx], updates);
    setLocal(local);
    const cur = getMySub();
    if (cur && cur.ref === ref) { Object.assign(cur, updates); setMySub(cur); }
    try {
      const remote = await jsonbinGet();
      const rIdx = remote.findIndex(s => s.ref === ref);
      if (rIdx !== -1) { Object.assign(remote[rIdx], updates); await jsonbinPut(remote); }
    } catch (e) { console.warn('JSONBin update:', e.message); }
  },

  async remove(ref) {
    const local = getLocal().filter(s => s.ref !== ref);
    setLocal(local);
    const cur = getMySub();
    if (cur && cur.ref === ref) setMySub(null);
    try {
      const remote = (await jsonbinGet()).filter(s => s.ref !== ref);
      await jsonbinPut(remote);
    } catch (e) { console.warn('JSONBin remove:', e.message); }
  },

  async clearAll() {
    localStorage.removeItem('bem_all_subs');
    localStorage.removeItem('bem_subscription');
    try {
      await jsonbinPut([]);
    } catch (e) { console.warn('JSONBin clear:', e.message); }
  }
};
