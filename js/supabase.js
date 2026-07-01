const SUPABASE_URL = 'https://vcflomphcmmctpczhmzx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Rk58lrT6uXsf-r6WCr7_TA_NJCI46rg';

async function supabaseAuth(method, path, body) {
  const opts = {
    method,
    headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + SUPABASE_ANON_KEY, 'Content-Type': 'application/json' }
  };
  if (body) opts.body = JSON.stringify(body);
  const r = await fetch(SUPABASE_URL + '/auth/v1/' + path, opts);
  const json = await r.json();
  if (!r.ok) throw new Error(json.msg || json.error || json.error_description || 'Auth error ' + r.status);
  return json;
}

async function getCurrentUser() {
  const accessToken = localStorage.getItem('sb-access-token');
  if (!accessToken) return null;
  try {
    const r = await fetch(SUPABASE_URL + '/auth/v1/user', {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + accessToken }
    });
    if (!r.ok) { localStorage.removeItem('sb-access-token'); return null; }
    const user = await r.json();
    return user;
  } catch { return null; }
}

async function signUp(email, password, name) {
  const result = await supabaseAuth('POST', 'signup', { email, password, data: { name } });
  if (result.access_token) localStorage.setItem('sb-access-token', result.access_token);
  return { data: result, error: null };
}

async function signIn(email, password) {
  const result = await supabaseAuth('POST', 'token?grant_type=password', { email, password });
  if (result.access_token) localStorage.setItem('sb-access-token', result.access_token);
  return { data: result, error: null };
}

async function signOut() {
  const accessToken = localStorage.getItem('sb-access-token');
  localStorage.removeItem('sb-access-token');
  if (accessToken) {
    try {
      await fetch(SUPABASE_URL + '/auth/v1/logout', {
        method: 'POST',
        headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': 'Bearer ' + accessToken }
      });
    } catch {}
  }
  return { error: null };
}
