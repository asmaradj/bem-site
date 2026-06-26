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
    const local = localList();
    const data = await api('GET');
    if (data && data.length > 0) {
      // Merge: API items win, but keep local-only items too
      const refs = new Set(data.map(s => s.ref));
      const merged = [...data, ...local.filter(s => !refs.has(s.ref))];
      return merged;
    }
    return local;
  },

  async create(sub) {
    const list = localList();
    list.unshift(sub);
    localSave(list);
    localSetCurrent(sub);

    await api('POST', sub);
    return sub;
  },

  async updateStatus(ref, status) {
    const expiresAt = status === 'active'
      ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
      : null;
    const updates = { status, activated_at: status === 'active' ? new Date().toISOString() : null, expires_at: expiresAt };

    const list = localList();
    const idx = list.findIndex(s => s.ref === ref);
    if (idx !== -1) Object.assign(list[idx], updates);
    localSave(list);
    const cur = localCurrent();
    if (cur && cur.ref === ref) { Object.assign(cur, updates); localSetCurrent(cur); }

    await api('PUT', { ref, updates });
    return updates;
  },

  async remove(ref) {
    let list = localList().filter(s => s.ref !== ref);
    localSave(list);
    const cur = localCurrent();
    if (cur && cur.ref === ref) localSetCurrent(null);

    await api('DELETE', { ref });
    return { ok: true };
  },

  async clearAll() {
    localStorage.removeItem('bem_all_subs');
    localStorage.removeItem('bem_subscription');

    await api('DELETE', { all: true });
    return { ok: true };
  }
};
