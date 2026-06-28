const BIN_ID = '6a3e6a0eda38895dfe02709a';
const MASTER_KEY = '$2a$10$rC3ecItXnAfIvauWD7iScelNRNvIEYDU1/ZXDTRine2xItBTrsc3W';
const BASE = 'https://api.jsonbin.io/v3/b';

async function getRemote() {
  const r = await fetch(`${BASE}/${BIN_ID}/latest`, { headers: { 'X-Master-Key': MASTER_KEY } });
  if (!r.ok) throw new Error('JSONBin GET ' + r.status);
  const j = await r.json();
  return (j.record && j.record.data) || [];
}

async function putRemote(data) {
  const r = await fetch(`${BASE}/${BIN_ID}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'X-Master-Key': MASTER_KEY },
    body: JSON.stringify({ data })
  });
  if (!r.ok) throw new Error('JSONBin PUT ' + r.status);
}

function local() { return JSON.parse(localStorage.getItem('bem_all_subs') || '[]'); }
function setLocal(d) { localStorage.setItem('bem_all_subs', JSON.stringify(d)); }
function mySub() { return JSON.parse(localStorage.getItem('bem_subscription') || 'null'); }
function setMySub(s) { if (s) localStorage.setItem('bem_subscription', JSON.stringify(s)); else localStorage.removeItem('bem_subscription'); }

window.db = {
  async list() {
    try {
      const r = await getRemote();
      if (r.length) { setLocal(r); return r; }
    } catch (e) { console.warn(e.message); }
    return local();
  },
  async adminList() {
    try {
      const r = await getRemote();
      if (r.length) {
        const l = local();
        const refs = new Set(r.map(s => s.ref));
        const unsynced = l.filter(s => !refs.has(s.ref));
        if (unsynced.length) { r.push(...unsynced); try { await putRemote(r); } catch (e) {} }
        setLocal(r);
        return r;
      }
    } catch (e) { console.warn(e.message); }
    const l = local();
    if (l.length) { try { await putRemote(l); } catch (e) {} }
    return l;
  },
  async create(sub) {
    const l = local();
    l.unshift(sub);
    setLocal(l);
    setMySub(sub);
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const r = await getRemote();
        r.unshift(sub);
        await putRemote(r);
        return;
      } catch (e) {
        if (attempt === 2) {
          try { await putRemote(l); } catch (e2) { console.warn('create fail: ' + e2.message); }
        } else await new Promise(r => setTimeout(r, 1000));
      }
    }
  },
  async updateStatus(ref, status) {
    const l = local();
    const i = l.findIndex(s => s.ref === ref);
    if (i !== -1) { l[i].status = status; setLocal(l); }
    const m = mySub();
    if (m && m.ref === ref) { m.status = status; setMySub(m); }
    try {
      const r = await getRemote();
      const j = r.findIndex(s => s.ref === ref);
      if (j !== -1) { r[j].status = status; await putRemote(r); }
    } catch (e) { console.warn(e.message); }
  },
  async remove(ref) {
    setLocal(local().filter(s => s.ref !== ref));
    if (mySub()?.ref === ref) setMySub(null);
    try {
      const r = (await getRemote()).filter(s => s.ref !== ref);
      await putRemote(r);
    } catch (e) { console.warn(e.message); }
  },
  async clearAll() {
    localStorage.removeItem('bem_all_subs');
    localStorage.removeItem('bem_subscription');
    try { await putRemote([]); } catch (e) { console.warn(e.message); }
  }
};
