(function () {
  let app, loginView, panelView;
  let cachedSubs = null;

  function init() {
    app = document.getElementById('adminTabContent');
    loginView = document.getElementById('adminLoginView');
    panelView = document.getElementById('adminPanelView');
    if (!app) return;

    function getSubs() {
      return cachedSubs || JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
    }

    function getSettings() {
      const s = JSON.parse(localStorage.getItem('bem_admin_settings') || '{}');
      if (!s.password) s.password = 'admin123';
      return s;
    }

    function saveSettings(s) {
      localStorage.setItem('bem_admin_settings', JSON.stringify(s));
    }

    function isLoggedIn() { return localStorage.getItem('bem_admin_logged') === 'yes'; }
    function setLoggedIn(v) {
      if (v) localStorage.setItem('bem_admin_logged', 'yes');
      else localStorage.removeItem('bem_admin_logged');
    }

    function statusLabel(st) {
      return { pending: 'قيد المراجعة', paid: 'في انتظار التفعيل', active: 'نشط' }[st] || st;
    }

    function showLogin() {
      loginView.style.display = 'block';
      panelView.style.display = 'none';
    }

    async function showPanel() {
      loginView.style.display = 'none';
      panelView.style.display = 'block';
      app.innerHTML = '<div class="loading">⏳ جاري التحميل...</div>';
      await loadSubs();
      renderCurrentTab();
    }

    async function loadSubs() {
      const fast = JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
      if (fast.length) cachedSubs = fast;
      db.adminList().then(r => { cachedSubs = r; renderCurrentTab(); });
      if (!fast.length) cachedSubs = await db.adminList();
      return cachedSubs;
    }

    document.getElementById('adminLoginBtn')?.addEventListener('click', () => {
      const pw = document.getElementById('adminPassword').value;
      const err = document.getElementById('adminLoginError');
      const settings = getSettings();
      if (!pw) { err.style.display = 'block'; err.textContent = '⚠️ أدخل كلمة المرور'; return; }
      if (pw !== settings.password) {
        err.style.display = 'block'; err.textContent = '❌ كلمة المرور غير صحيحة';
        document.getElementById('adminPassword').value = '';
        return;
      }
      setLoggedIn(true);
      showPanel();
    });

    document.getElementById('adminPassword')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('adminLoginBtn')?.click();
    });

    document.getElementById('adminLogoutBtn')?.addEventListener('click', () => {
      if (!confirm('تسجيل الخروج؟')) return;
      setLoggedIn(false);
      showLogin();
    });

    function tbody(rows) {
      const pm = { edahabia: 'Edahabia', cib: 'CIB', ccp: 'CCP' };
      return rows.map(s => `
        <tr>
          <td class="cell-name">${s.name || '-'}</td>
          <td>${s.phone || '-'}</td>
          <td>${s.wilaya || '-'}</td>
          <td>${s.level || '-'}</td>
          <td>${pm[s.payment] || s.payment || '-'}</td>
          <td>${s.date ? new Date(s.date).toLocaleDateString('ar-DZ') : s.created_at ? new Date(s.created_at).toLocaleDateString('ar-DZ') : '-'}</td>
          <td><span class="status-badge ${s.status}">${statusLabel(s.status)}</span></td>
          <td style="white-space:nowrap">
            ${s.status !== 'active' ? `<button class="table-activate" onclick="adminActivate('${s.ref}')">تفعيل</button> ` : ''}
            <button class="table-delete" onclick="adminDelete('${s.ref}')">حذف</button>
          </td>
        </tr>
      `).join('');
    }

    function renderPending() {
      const a = getSubs().filter(s => s.status !== 'active');
      if (!a.length) { app.innerHTML = '<div class="admin-empty"><p>✅ لا يوجد اشتراكات في انتظار التفعيل</p></div>'; return; }
      app.innerHTML = `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>الاسم</th><th>الهاتف</th><th>الولاية</th><th>المستوى</th><th>الدفع</th><th>التاريخ</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody>${tbody(a)}</tbody></table></div>`;
    }

    function renderAll() {
      const a = getSubs();
      if (!a.length) { app.innerHTML = '<div class="admin-empty"><p>لا يوجد أي اشتراك مسجل بعد</p></div>'; return; }
      const active = a.filter(s => s.status === 'active');
      const inactive = a.filter(s => s.status !== 'active');
      app.innerHTML = `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>الاسم</th><th>الهاتف</th><th>الولاية</th><th>المستوى</th><th>الدفع</th><th>التاريخ</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody>
        ${active.length ? `<tr class="section-header"><td colspan="8">✅ الحسابات النشطة (${active.length})</td></tr>${tbody(active)}` : ''}
        ${inactive.length ? `<tr class="section-header inactive"><td colspan="8">⏳ الحسابات غير المفعلة (${inactive.length})</td></tr>${tbody(inactive)}` : ''}
      </tbody></table></div>`;
    }

    function renderSettings() {
      const a = getSubs();
      const s = getSettings();
      const stats = { total: a.length, pending: a.filter(x => x.status === 'pending').length, paid: a.filter(x => x.status === 'paid').length, active: a.filter(x => x.status === 'active').length };
      app.innerHTML = `<div class="admin-settings">
        <div class="admin-stats-grid">
          <div class="stat-card"><span class="stat-num">${stats.total}</span><span class="stat-label">الإجمالي</span></div>
          <div class="stat-card pending"><span class="stat-num">${stats.pending}</span><span class="stat-label">قيد المراجعة</span></div>
          <div class="stat-card paid"><span class="stat-num">${stats.paid}</span><span class="stat-label">في انتظار التفعيل</span></div>
          <div class="stat-card active"><span class="stat-num">${stats.active}</span><span class="stat-label">نشط</span></div>
        </div>
        <div class="admin-actions-card"><h3>🔑 تغيير كلمة المرور</h3>
          <div class="form-group"><label>الحالية</label><input type="password" id="oldPw" class="form-input"></div>
          <div class="form-group"><label>الجديدة</label><input type="password" id="newPw" class="form-input"></div>
          <div class="form-group"><label>التأكيد</label><input type="password" id="confirmPw" class="form-input"></div>
          <div id="pwError" class="auth-error" style="display:none"></div>
          <button class="admin-btn" style="background:#1565c0;color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer" onclick="changePassword()">💾 حفظ</button>
        </div>
        <div class="admin-actions-card"><h3>⚙️ إجراءات</h3>
          <button class="admin-btn" style="background:#d32f2f;color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer" onclick="adminClearAll()">🗑️ حذف الكل</button>
          <button class="admin-btn" style="background:#1565c0;color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer;margin-top:8px" onclick="adminExport()">📥 تصدير JSON</button>
        </div>
      </div>`;
    }

    async function renderCurrentTab() {
      const tab = document.querySelector('.admin-tab.active');
      if (!tab) { renderAll(); return; }
      if (tab.dataset.adminTab === 'pending') renderPending();
      else if (tab.dataset.adminTab === 'all') renderAll();
      else if (tab.dataset.adminTab === 'settings') renderSettings();
    }

    document.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', async () => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderCurrentTab();
      });
    });

    window.adminActivate = async (ref) => {
      if (!confirm(`تفعيل ${ref}؟`)) return;
      await db.updateStatus(ref, 'active');
      alert(`✅ تم التفعيل`);
      await loadSubs();
      renderCurrentTab();
    };

    window.adminDelete = async (ref) => {
      if (!confirm(`حذف ${ref}؟`)) return;
      await db.remove(ref);
      await loadSubs();
      renderCurrentTab();
    };

    window.adminClearAll = async () => {
      if (!confirm('⚠️ حذف الكل؟')) return;
      if (!confirm('تأكيد نهائي؟')) return;
      await db.clearAll();
      await loadSubs();
      renderCurrentTab();
    };

    window.adminExport = () => {
      const a = getSubs();
      if (!a.length) { alert('لا توجد بيانات'); return; }
      const blob = new Blob([JSON.stringify(a, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const aEl = document.createElement('a');
      aEl.href = url;
      aEl.download = 'bem-subs-' + new Date().toISOString().slice(0, 10) + '.json';
      aEl.click();
    };

    window.adminRefresh = async () => {
      app.innerHTML = '<div class="loading">⏳ جاري التحديث...</div>';
      cachedSubs = null;
      await loadSubs();
      renderCurrentTab();
    };

    window.changePassword = () => {
      const old = document.getElementById('oldPw').value;
      const np = document.getElementById('newPw').value;
      const cf = document.getElementById('confirmPw').value;
      const err = document.getElementById('pwError');
      const s = getSettings();
      if (!old || !np || !cf) { err.style.display = 'block'; err.textContent = '⚠️ املأ الحقول'; return; }
      if (old !== s.password) { err.style.display = 'block'; err.textContent = '❌ كلمة المرور الحالية خطأ'; return; }
      if (np.length < 6) { err.style.display = 'block'; err.textContent = '⚠️ 6 أحرف على الأقل'; return; }
      if (np !== cf) { err.style.display = 'block'; err.textContent = '⚠️ غير متطابقة'; return; }
      s.password = np;
      saveSettings(s);
      alert('✅ تم التغيير');
      document.getElementById('oldPw').value = '';
      document.getElementById('newPw').value = '';
      document.getElementById('confirmPw').value = '';
    };

    if (isLoggedIn()) showPanel();
    else showLogin();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
