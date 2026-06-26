// ─── Database ─── Direct JSONBin storage ─────────────────────────

const JSONBIN_BIN_ID = '6a3e6a0eda38895dfe02709a';
const JSONBIN_MASTER_KEY = '$2a$10$rC3ecItXnAfIvauWD7iScelNRNvIEYDU1/ZXDTRine2xItBTrsc3W';
const JSONBIN_URL = 'https://api.jsonbin.io/v3/b';

async function jsonbinGet() {
  const res = await fetch(`${JSONBIN_URL}/${JSONBIN_BIN_ID}/latest`, {
    headers: { 'X-Master-Key': JSONBIN_MASTER_KEY }
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.record && json.record.data) || [];
}

async function jsonbinPut(data) {
  await fetch(`${JSONBIN_URL}/${JSONBIN_BIN_ID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': JSONBIN_MASTER_KEY },
    body: JSON.stringify({ data })
  });
}

// ─── Public API ──────────────────────────────────────────────────

window.db = {
  async list() {
    try {
      const remote = await jsonbinGet();
      if (remote.length > 0) {
        const local = JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
        const refs = new Set(remote.map(s => s.ref));
        const merged = [...remote, ...local.filter(s => !refs.has(s.ref))];
        if (merged.length > remote.length) jsonbinPut(merged);
        return merged;
      }
    } catch (e) { console.warn('⚠️ JSONBin GET:', e.message); }
    return JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
  },

  async create(sub) {
    const list = JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
    list.unshift(sub);
    localStorage.setItem('bem_all_subs', JSON.stringify(list));
    localStorage.setItem('bem_subscription', JSON.stringify(sub));
    try { await jsonbinPut(list); } catch (e) { console.warn('⚠️ JSONBin PUT:', e.message); }
  },

  async updateStatus(ref, status) {
    const updates = {
      status,
      activated_at: status === 'active' ? new Date().toISOString() : null,
      expires_at: status === 'active' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null
    };
    let list = JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
    const idx = list.findIndex(s => s.ref === ref);
    if (idx !== -1) Object.assign(list[idx], updates);
    localStorage.setItem('bem_all_subs', JSON.stringify(list));
    const cur = JSON.parse(localStorage.getItem('bem_subscription') || 'null');
    if (cur && cur.ref === ref) { Object.assign(cur, updates); localStorage.setItem('bem_subscription', JSON.stringify(cur)); }
    try { await jsonbinPut(list); } catch (e) { console.warn('⚠️ JSONBin PUT:', e.message); }
  },

  async remove(ref) {
    let list = JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
    list = list.filter(s => s.ref !== ref);
    localStorage.setItem('bem_all_subs', JSON.stringify(list));
    const cur = JSON.parse(localStorage.getItem('bem_subscription') || 'null');
    if (cur && cur.ref === ref) localStorage.removeItem('bem_subscription');
    try { await jsonbinPut(list); } catch (e) { console.warn('⚠️ JSONBin PUT:', e.message); }
  },

  async clearAll() {
    localStorage.removeItem('bem_all_subs');
    localStorage.removeItem('bem_subscription');
    try { await jsonbinPut([]); } catch (e) { console.warn('⚠️ JSONBin PUT:', e.message); }
  }
};
