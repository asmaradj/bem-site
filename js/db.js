const SUPABASE_URL = 'https://vcflomphcmmctpczhmzx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Rk58lrT6uXsf-r6WCr7_TA_NJCI46rg';

async function supabase(method, path, body) {
  const opts = {
    method,
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': 'Bearer ' + SUPABASE_KEY, 'Content-Type': 'application/json' }
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(SUPABASE_URL + '/rest/v1/' + path, opts);
  if (!r.ok && method !== 'DELETE') throw new Error('Supabase ' + method + ' ' + r.status);
  if (method === 'DELETE') return;
  return r.json();
}

function local() { return JSON.parse(localStorage.getItem('bem_all_subs') || '[]'); }
function setLocal(d) { localStorage.setItem('bem_all_subs', JSON.stringify(d)); }
function mySub() { return JSON.parse(localStorage.getItem('bem_subscription') || 'null'); }
function setMySub(s) { if (s) localStorage.setItem('bem_subscription', JSON.stringify(s)); else localStorage.removeItem('bem_subscription'); }

window.db = {
  async list() {
    try { return await supabase('GET', 'subscriptions?order=date.desc'); }
    catch (e) { console.warn(e.message); return local(); }
  },
  async adminList() {
    try { return await supabase('GET', 'subscriptions?order=date.desc'); }
    catch (e) { console.warn(e.message); return local(); }
  },
  async create(sub) {
    const l = local(); l.unshift(sub); setLocal(l); setMySub(sub);
    try {
      await supabase('POST', 'subscriptions', sub);
    } catch (e) {
      try { await supabase('POST', 'subscriptions', sub); } catch (e2) { console.warn('create fail: ' + e2.message); }
    }
  },
  async updateStatus(ref, status) {
    const l = local();
    const i = l.findIndex(s => s.ref === ref);
    if (i !== -1) { l[i].status = status; setLocal(l); }
    const m = mySub();
    if (m && m.ref === ref) { m.status = status; setMySub(m); }
    try {
      const now = new Date().toISOString();
      const body = status === 'active'
        ? { status, activated_at: now, expires_at: new Date(Date.now() + 365*24*60*60*1000).toISOString() }
        : { status };
      await supabase('PATCH', 'subscriptions?ref=eq.' + encodeURIComponent(ref), body);
    } catch (e) { console.warn(e.message); }
  },
  async remove(ref) {
    setLocal(local().filter(s => s.ref !== ref));
    if (mySub()?.ref === ref) setMySub(null);
    try { await supabase('DELETE', 'subscriptions?ref=eq.' + encodeURIComponent(ref)); }
    catch (e) { console.warn(e.message); }
  },
  async clearAll() {
    localStorage.removeItem('bem_all_subs');
    localStorage.removeItem('bem_subscription');
    try { await supabase('DELETE', 'subscriptions'); }
    catch (e) { console.warn(e.message); }
  }
};
