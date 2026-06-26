// ─── Database layer ─── API-first, localStorage fallback ──────────

const API = '/api/subs';

async function api(method, body) {
  try {
    const res = await fetch(API, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!res.ok) throw new Error('API error: ' + res.status);
    return await res.json();
  } catch (e) {
    console.warn('⚠️ API unavailable, using localStorage:', e.message);
    return null;
  }
}

// ─── Local helpers (fallback) ────────────────────────────────────

function localList() {
  return JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
}

function localSave(list) {
  localStorage.setItem('bem_all_subs', JSON.stringify(list));
}

function localCurrent() {
  return JSON.parse(localStorage.getItem('bem_subscription') || 'null');
}

function localSetCurrent(sub) {
  if (sub) localStorage.setItem('bem_subscription', JSON.stringify(sub));
  else localStorage.removeItem('bem_subscription');
}

// ─── Public API ──────────────────────────────────────────────────

window.db = {
  async list() {
    const data = await api('GET');
    if (data) return data;
    return localList();
  },

  async create(sub) {
    const data = await api('POST', sub);
    if (data) {
      const list = localList();
      list.unshift(sub);
      localSave(list);
      localSetCurrent(sub);
      return data;
    }
    const list = localList();
    list.unshift(sub);
    localSave(list);
    localSetCurrent(sub);
    return sub;
  },

  async updateStatus(ref, status) {
    const expiresAt = status === 'active'
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      : null;
    const updates = { status, activated_at: status === 'active' ? new Date().toISOString() : null, expires_at: expiresAt };

    const data = await api('PUT', { ref, updates });
    if (data) {
      const list = localList();
      const idx = list.findIndex(s => s.ref === ref);
      if (idx !== -1) Object.assign(list[idx], updates);
      localSave(list);
      const cur = localCurrent();
      if (cur && cur.ref === ref) { Object.assign(cur, updates); localSetCurrent(cur); }
      return data;
    }
    const list = localList();
    const idx = list.findIndex(s => s.ref === ref);
    if (idx !== -1) Object.assign(list[idx], updates);
    localSave(list);
    const cur = localCurrent();
    if (cur && cur.ref === ref) { Object.assign(cur, updates); localSetCurrent(cur); }
    return updates;
  },

  async remove(ref) {
    const data = await api('DELETE', { ref });
    if (data) {
      let list = localList().filter(s => s.ref !== ref);
      localSave(list);
      const cur = localCurrent();
      if (cur && cur.ref === ref) localSetCurrent(null);
      return data;
    }
    let list = localList().filter(s => s.ref !== ref);
    localSave(list);
    const cur = localCurrent();
    if (cur && cur.ref === ref) localSetCurrent(null);
    return { ok: true };
  },

  async clearAll() {
    const data = await api('DELETE', { all: true });
    if (data) { localStorage.removeItem('bem_all_subs'); localStorage.removeItem('bem_subscription'); return data; }
    localStorage.removeItem('bem_all_subs');
    localStorage.removeItem('bem_subscription');
    return { ok: true };
  }
};
