const API = '/api/subs';

async function apiFetch(method, body) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 8000);
  const opts = { method, headers: { 'Content-Type': 'application/json' }, signal: ctrl.signal };
  if (body) opts.body = JSON.stringify(body);
  try {
    const res = await fetch(API, opts);
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || res.status);
    return json;
  } finally {
    clearTimeout(timer);
  }
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
      const local = getLocal();
      let unsynced = [];
      if (local.length > 0) {
        const apiRefs = new Set((data || []).map(s => s.ref));
        unsynced = local.filter(s => !apiRefs.has(s.ref));
        for (const item of unsynced) {
          try { await apiFetch('POST', item); } catch (e) {}
        }
      }
      const src = unsynced.length > 0 ? (await apiFetch('GET')).data : data;
      if (src && src.length > 0) {
        const refs = new Set(src.map(s => s.ref));
        const merged = [...src, ...local.filter(s => !refs.has(s.ref))];
        setLocal(merged);
        return merged;
      }
    } catch (e) { console.warn('API GET:', e.message); }
    return getLocal();
  },

  async adminList() {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 1200);
    try {
      const res = await fetch(API, { signal: ctrl.signal });
      clearTimeout(timer);
      if (res.ok) {
        const { data } = await res.json();
        if (data && data.length) { setLocal(data); return data; }
      }
    } catch (e) {} // timeout or error → fall back to local
    clearTimeout(timer);
    const local = getLocal();
    apiFetch('GET').then(({ data }) => {
      if (data && data.length) {
        setLocal(data);
        window.dispatchEvent(new CustomEvent('subs-updated', { detail: data }));
      }
    }).catch(() => {});
    return local;
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

  async syncLocal() {
    const local = getLocal();
    let synced = 0;
    try {
      const { data } = await apiFetch('GET');
      const apiRefs = new Set((data || []).map(s => s.ref));
      for (const item of local) {
        if (!apiRefs.has(item.ref)) {
          try { await apiFetch('POST', item); synced++; } catch (e) {}
        }
      }
    } catch (e) { console.warn('API sync:', e.message); }
    return { local: local.length, synced };
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
