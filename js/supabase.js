const SUPABASE_URL = 'https://vcflomphcmmctpczhmzx.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Rk58lrT6uXsf-r6WCr7_TA_NJCI46rg';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function getCurrentUser() {
  const { data: { user }, error } = await supabaseClient.auth.getUser();
  return error ? null : user;
}

async function signUp(email, password, name) {
  return await supabaseClient.auth.signUp({
    email, password,
    options: { data: { name }, emailRedirectTo: window.location.origin + '/index.html' }
  });
}

async function signIn(email, password) {
  return await supabaseClient.auth.signInWithPassword({ email, password });
}

async function signOut() {
  return await supabaseClient.auth.signOut();
}

function onAuthStateChange(callback) {
  return supabaseClient.auth.onAuthStateChange((event, session) => {
    callback(event, session?.user || null);
  });
}
