const API = '/api/subs';

async function apiFetch(method, body) {
  const opts = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(API, opts);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || res.status);
  return json;
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
      const { data } = await apiFetch('GET');
      if (data && data.length > 0) {
        const local = getLocal();
        const refs = new Set(data.map(s => s.ref));
        const merged = [...data, ...local.filter(s => !refs.has(s.ref))];
        if (merged.length > data.length) setLocal(merged);
        else setLocal(data);
        return merged;
      }
    } catch (e) { console.warn('API GET:', e.message); }
    return getLocal();
  },

  async adminList() {
    return this.list();
  },

  async create(sub) {
    const local = getLocal();
    local.unshift(sub);
    setLocal(local);
    setMySub(sub);
    try {
      await apiFetch('POST', sub);
    } catch (e) { console.warn('API POST:', e.message); }
  },

  async updateStatus(ref, status) {
    const local = getLocal();
    const idx = local.findIndex(s => s.ref === ref);
    if (idx !== -1) {
      local[idx].status = status;
      if (status === 'active') {
        local[idx].activated_at = new Date().toISOString();
        local[idx].expires_at = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      }
    }
    setLocal(local);
    const cur = getMySub();
    if (cur && cur.ref === ref) {
      cur.status = status;
      if (status === 'active') {
        cur.activated_at = new Date().toISOString();
        cur.expires_at = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
      }
      setMySub(cur);
    }
    try {
      await apiFetch('PUT', { ref, status });
    } catch (e) { console.warn('API PUT:', e.message); }
  },

  async remove(ref) {
    const local = getLocal().filter(s => s.ref !== ref);
    setLocal(local);
    const cur = getMySub();
    if (cur && cur.ref === ref) setMySub(null);
    try {
      await apiFetch('DELETE', { ref });
    } catch (e) { console.warn('API DELETE:', e.message); }
  },

  async clearAll() {
    localStorage.removeItem('bem_all_subs');
    localStorage.removeItem('bem_subscription');
    try {
      await apiFetch('DELETE', {});
    } catch (e) { console.warn('API CLEAR:', e.message); }
  }
};
