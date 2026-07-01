// ─── Auth UI ──────────────────────────────────────────────────────────

let authCallback = null;

function onLoginRequired(callback) {
  authCallback = callback;
}

// ─── Render Login ─────────────────────────────────────────────────────

function renderLogin() {
  const app = document.getElementById('app');
  document.querySelector('.main-header').style.display = 'none';

  app.innerHTML = `
    <div class="container auth-page fade-in">
      <button class="back-btn" onclick="window.bemBack()">← العودة إلى الرئيسية</button>
      <div class="auth-card">
        <div class="auth-icon">🔐</div>
        <h2>تسجيل الدخول</h2>
        <p>سجل دخولك لإتمام عملية الاشتراك</p>
        <div class="auth-form">
          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="email" id="loginEmail" placeholder="example@email.com" class="form-input">
          </div>
          <div class="form-group">
            <label>كلمة المرور</label>
            <input type="password" id="loginPassword" placeholder="••••••••" class="form-input">
          </div>
          <div id="loginError" class="auth-error" style="display:none"></div>
          <button class="auth-submit-btn" id="loginBtn">🔑 دخول</button>
          <p class="auth-switch">ليس لديك حساب؟ <a href="#" onclick="renderSignup();return false">إنشاء حساب جديد</a></p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('loginBtn').addEventListener('click', handleLogin);
  document.getElementById('loginPassword').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
}

// ─── Render Signup ────────────────────────────────────────────────────

function renderSignup() {
  const app = document.getElementById('app');
  document.querySelector('.main-header').style.display = 'none';

  app.innerHTML = `
    <div class="container auth-page fade-in">
      <button class="back-btn" onclick="window.bemBack()">← العودة إلى الرئيسية</button>
      <div class="auth-card">
        <div class="auth-icon">📝</div>
        <h2>إنشاء حساب جديد</h2>
        <p>أنشئ حساباً للتمكن من الاشتراك في المنصة</p>
        <div class="auth-form">
          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="email" id="signupEmail" placeholder="example@email.com" class="form-input">
          </div>
          <div class="form-group">
            <label>الاسم و اللقب</label>
            <input type="text" id="signupName" placeholder="مثال: مريم بن علي" class="form-input">
          </div>
          <div class="form-group">
            <label>كلمة المرور</label>
            <input type="password" id="signupPassword" placeholder="••••••••" class="form-input">
          </div>
          <div class="form-group">
            <label>تأكيد كلمة المرور</label>
            <input type="password" id="signupConfirm" placeholder="••••••••" class="form-input">
          </div>
          <div id="signupError" class="auth-error" style="display:none"></div>
          <button class="auth-submit-btn" id="signupBtn">📝 إنشاء الحساب</button>
          <p class="auth-switch">لديك حساب بالفعل؟ <a href="#" onclick="renderLogin();return false">تسجيل الدخول</a></p>
        </div>
      </div>
    </div>
  `;

  document.getElementById('signupBtn').addEventListener('click', handleSignup);
  document.getElementById('signupConfirm').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSignup();
  });
}

// ─── Auth Handlers ────────────────────────────────────────────────────

async function handleLogin() {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const errorEl = document.getElementById('loginError');

  if (!email || !password) {
    showAuthError(errorEl, '⚠️ من فضلك أدخل البريد الإلكتروني وكلمة المرور');
    return;
  }

  document.getElementById('loginBtn').disabled = true;
  document.getElementById('loginBtn').textContent = '⏳ جاري...';

  const { data, error } = await signIn(email, password);

  if (error) {
    showAuthError(errorEl, error.message === 'Invalid login credentials'
      ? '❌ البريد الإلكتروني أو كلمة المرور غير صحيحة'
      : '❌ ' + error.message);
    document.getElementById('loginBtn').disabled = false;
    document.getElementById('loginBtn').textContent = '🔑 دخول';
    return;
  }

  if (authCallback) authCallback();
  else window.bemBack();
}

async function handleSignup() {
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  const name = document.getElementById('signupName')?.value.trim() || '';
  const errorEl = document.getElementById('signupError');

  if (!email || !password || !confirm) {
    showAuthError(errorEl, '⚠️ من فضلك املأ جميع الحقول');
    return;
  }

  if (password.length < 6) {
    showAuthError(errorEl, '⚠️ كلمة المرور يجب أن تكون 6 أحرف على الأقل');
    return;
  }

  if (password !== confirm) {
    showAuthError(errorEl, '⚠️ كلمة المرور غير متطابقة');
    return;
  }

  document.getElementById('signupBtn').disabled = true;
  document.getElementById('signupBtn').textContent = '⏳ جاري...';

  const { data, error } = await signUp(email, password, name);

  if (error) {
    showAuthError(errorEl, '❌ ' + error.message);
    document.getElementById('signupBtn').disabled = false;
    document.getElementById('signupBtn').textContent = '📝 إنشاء الحساب';
    return;
  }

  if (authCallback) authCallback();
  else window.bemBack();
}

function showAuthError(el, msg) {
  el.style.display = 'block';
  el.textContent = msg;
}

function hideAuthError(el) {
  el.style.display = 'none';
}

// ─── Check Auth & Redirect ────────────────────────────────────────────

async function requireAuth(callback) {
  const user = await getCurrentUser();
  if (user) {
    callback(user);
  } else {
    onLoginRequired(callback);
    renderLogin();
  }
}
