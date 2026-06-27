// ─── Admin Panel ─── Standalone page, localStorage-based ───────────

(function () {
  let app, loginView, panelView;

  function init() {
    app = document.getElementById('adminTabContent');
    loginView = document.getElementById('adminLoginView');
    panelView = document.getElementById('adminPanelView');
    if (!app) return;

    // ─── Helpers ──────────────────────────────────────────────────────

    var cachedSubs = null;

    async function loadSubs() {
      cachedSubs = await db.adminList();
      return cachedSubs;
    }

    function getSubs() {
      if (cachedSubs && cachedSubs.length > 0) return cachedSubs;
      return JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
    }

    function getSettings() {
      const s = JSON.parse(localStorage.getItem('bem_admin_settings') || '{}');
      if (!s.password) s.password = 'admin123';
      if (!s.name) s.name = 'المشرف';
      return s;
    }

    function saveSettings(s) {
      localStorage.setItem('bem_admin_settings', JSON.stringify(s));
    }

    function isLoggedIn() {
      return localStorage.getItem('bem_admin_logged') === 'yes';
    }

    function setLoggedIn(v) {
      if (v) localStorage.setItem('bem_admin_logged', 'yes');
      else localStorage.removeItem('bem_admin_logged');
    }

    function statusLabel(st) {
      return { pending: 'قيد المراجعة', paid: 'في انتظار التفعيل', active: 'نشط' }[st] || st;
    }

    // ─── Auth UI ──────────────────────────────────────────────────────

    function showLogin() {
      loginView.style.display = 'block';
      panelView.style.display = 'none';
      const pwInput = document.getElementById('adminPassword');
      if (pwInput) { pwInput.value = ''; pwInput.focus(); }
      const err = document.getElementById('adminLoginError');
      if (err) err.style.display = 'none';
    }

    async function showPanel() {
      loginView.style.display = 'none';
      panelView.style.display = 'block';
      const s = getSettings();
      const info = document.getElementById('adminSessionInfo');
      if (info) info.textContent = '👤 ' + s.name;
      app.innerHTML = '<div class="loading">⏳ جاري تحميل البيانات...</div>';
      await loadSubs();
      renderCurrentTab();
    }

    // ─── Login Handler ────────────────────────────────────────────────

    document.getElementById('adminLoginBtn')?.addEventListener('click', () => {
      const pw = document.getElementById('adminPassword').value;
      const err = document.getElementById('adminLoginError');
      const settings = getSettings();

      if (!pw) { err.style.display = 'block'; err.textContent = '⚠️ من فضلك أدخل كلمة المرور'; return; }
      if (pw !== settings.password) {
        err.style.display = 'block';
        err.textContent = '❌ كلمة المرور غير صحيحة';
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
      if (!confirm('تسجيل الخروج من لوحة الإدارة؟')) return;
      setLoggedIn(false);
      showLogin();
    });

    // ─── Render Tabs ──────────────────────────────────────────────────

    function tbody(rows) {
      const pm = { edahabia: 'Edahabia', cib: 'CIB', ccp: 'CCP' };
      return rows.map(s => `
        <tr class="${s.status}">
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
      const all = getSubs();
      const pending = all.filter(s => s.status !== 'active');
      if (!pending.length) {
        app.innerHTML = '<div class="admin-empty"><p>✅ لا يوجد اشتراكات في انتظار التفعيل</p></div>';
        return;
      }
      app.innerHTML = `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr>
              <th>الاسم</th><th>الهاتف</th><th>الولاية</th><th>المستوى</th><th>الدفع</th><th>التاريخ</th><th>الحالة</th><th>إجراءات</th>
            </tr></thead>
            <tbody>${tbody(pending)}</tbody>
          </table>
        </div>`;
    }

    function renderAll() {
      const all = getSubs();
      if (!all.length) {
        app.innerHTML = '<div class="admin-empty"><p>لا يوجد أي اشتراك مسجل بعد</p></div>';
        return;
      }
      const active = all.filter(s => s.status === 'active');
      const inactive = all.filter(s => s.status !== 'active');
      app.innerHTML = `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead><tr>
              <th>الاسم</th><th>الهاتف</th><th>الولاية</th><th>المستوى</th><th>الدفع</th><th>التاريخ</th><th>الحالة</th><th>إجراءات</th>
            </tr></thead>
            <tbody>
              ${active.length ? `<tr class="section-header"><td colspan="8">✅ الحسابات النشطة (${active.length})</td></tr>${tbody(active)}` : ''}
              ${inactive.length ? `<tr class="section-header inactive"><td colspan="8">⏳ الحسابات غير المفعلة (${inactive.length})</td></tr>${tbody(inactive)}` : ''}
            </tbody>
          </table>
        </div>`;
    }

    function renderSettings() {
      const all = getSubs();
      const settings = getSettings();
      const stats = {
        total: all.length,
        pending: all.filter(s => s.status === 'pending').length,
        paid: all.filter(s => s.status === 'paid').length,
        active: all.filter(s => s.status === 'active').length
      };
      app.innerHTML = `
        <div class="admin-settings">
          <div class="admin-stats-grid">
            <div class="stat-card"><span class="stat-num">${stats.total}</span><span class="stat-label">إجمالي الاشتراكات</span></div>
            <div class="stat-card pending"><span class="stat-num">${stats.pending}</span><span class="stat-label">قيد المراجعة</span></div>
            <div class="stat-card paid"><span class="stat-num">${stats.paid}</span><span class="stat-label">في انتظار التفعيل</span></div>
            <div class="stat-card active"><span class="stat-num">${stats.active}</span><span class="stat-label">نشط</span></div>
          </div>
          <div class="admin-actions-card" style="margin-bottom:16px">
            <h3>🔑 تغيير كلمة المرور</h3>
            <div class="form-group"><label>كلمة المرور الحالية</label><input type="password" id="oldPw" class="form-input" placeholder="••••••••"></div>
            <div class="form-group"><label>كلمة المرور الجديدة</label><input type="password" id="newPw" class="form-input" placeholder="••••••••"></div>
            <div class="form-group"><label>تأكيد كلمة المرور الجديدة</label><input type="password" id="confirmPw" class="form-input" placeholder="••••••••"></div>
            <div id="pwError" class="auth-error" style="display:none"></div>
            <button class="admin-btn" style="background:var(--primary);color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer" onclick="changePassword()">💾 حفظ كلمة المرور الجديدة</button>
          </div>
          <div class="admin-actions-card">
            <h3>⚙️ إجراءات</h3>
            <button class="admin-btn" style="background:#2e7d32;color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer" onclick="adminSyncLocal()">🔄 ترحيل البيانات المحلية إلى الخادم</button>
            <div id="syncStatus" style="margin-top:6px;font-size:13px;display:none"></div>
            <button class="admin-btn danger" onclick="adminClearAll()" style="margin-top:8px">🗑️ حذف جميع الاشتراكات</button>
            <button class="admin-btn" style="background:#1565c0;color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer;margin-top:8px" onclick="adminExport()">📥 تصدير البيانات (JSON)</button>
          </div>
        </div>`;
    }

    function renderFields(s) {
      const pm = { edahabia: 'Edahabia', cib: 'CIB', ccp: 'CCP' };
      let h = '';
      h += `<div><span>الاسم:</span> ${s.name || '-'}</div>`;
      h += `<div><span>البريد:</span> ${s.email || '-'}</div>`;
      h += `<div><span>الهاتف:</span> ${s.phone || '-'}</div>`;
      h += `<div><span>الولاية:</span> ${s.wilaya || '-'}</div>`;
      h += `<div><span>المستوى:</span> ${s.level || '-'}</div>`;
      h += `<div><span>طريقة الدفع:</span> ${pm[s.payment] || s.payment || '-'}</div>`;
      h += `<div><span>المبلغ:</span> ${(+s.amount || 0).toLocaleString()} ${s.currency || 'د.ج'}</div>`;
      h += `<div><span>تاريخ الطلب:</span> ${s.date ? new Date(s.date).toLocaleString('ar-DZ') : s.created_at ? new Date(s.created_at).toLocaleString('ar-DZ') : '-'}</div>`;
      if (s.status === 'active' && s.activated_at) h += `<div><span>تاريخ التفعيل:</span> ${new Date(s.activated_at).toLocaleString('ar-DZ')}</div>`;
      if (s.expires_at) h += `<div><span>تاريخ الانتهاء:</span> ${new Date(s.expires_at).toLocaleDateString('ar-DZ')}</div>`;
      return h;
    }

    async function renderCurrentTab() {
      await loadSubs();
      const active = document.querySelector('.admin-tab.active');
      if (!active) { renderAll(); return; }
      const tab = active.dataset.adminTab;
      if (tab === 'pending') renderPending();
      else if (tab === 'all') renderAll();
      else if (tab === 'settings') renderSettings();
    }

    document.querySelectorAll('.admin-tab').forEach(tab => {
      tab.addEventListener('click', async () => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        await renderCurrentTab();
      });
    });

    // ─── Global Actions ───────────────────────────────────────────────

    window.adminActivate = async (ref) => {
      if (!confirm(`هل أنت متأكد من تفعيل الاشتراك ${ref}؟`)) return;
      await db.updateStatus(ref, 'active');
      alert(`✅ تم تفعيل الاشتراك ${ref} بنجاح`);
      await renderCurrentTab();
    };

    window.adminDelete = async (ref) => {
      if (!confirm(`هل أنت متأكد من حذف الاشتراك ${ref}؟`)) return;
      await db.remove(ref);
      alert(`🗑️ تم حذف الاشتراك ${ref}`);
      await renderCurrentTab();
    };

    window.adminClearAll = async () => {
      if (!confirm('⚠️ هل أنت متأكد؟ سيتم حذف جميع الاشتراكات!')) return;
      if (!confirm('تأكيد نهائي: سيتم حذف جميع الاشتراكات نهائياً؟')) return;
      await db.clearAll();
      alert('🗑️ تم حذف جميع الاشتراكات');
      await renderCurrentTab();
    };

    window.adminSyncLocal = async () => {
      const st = document.getElementById('syncStatus');
      if (st) { st.style.display = 'block'; st.innerHTML = '⏳ جاري الترحيل...'; }
      const result = await db.syncLocal();
      if (result.synced > 0) {
        if (st) st.innerHTML = `✅ تم ترحيل ${result.synced} اشتراك من المتصفح إلى قاعدة البيانات`;
      } else if (result.local > 0) {
        if (st) st.innerHTML = `ℹ️ الاشتراكات المحلية (${result.local}) موجودة بالفعل في قاعدة البيانات`;
      } else {
        if (st) st.innerHTML = '⚠️ لا يوجد أي اشتراكات في المتصفح لترحيلها';
      }
      await loadSubs();
      renderCurrentTab();
      setTimeout(() => { if (st) st.style.display = 'none'; }, 5000);
    };

    window.adminExport = () => {
      const all = getSubs();
      if (!all.length) { alert('لا توجد بيانات للتصدير'); return; }
      const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'bem-subscriptions-' + new Date().toISOString().slice(0, 10) + '.json';
      a.click();
      URL.revokeObjectURL(url);
    };

    window.changePassword = () => {
      const old = document.getElementById('oldPw').value;
      const newPw = document.getElementById('newPw').value;
      const confirm = document.getElementById('confirmPw').value;
      const err = document.getElementById('pwError');
      const settings = getSettings();
      if (!old || !newPw || !confirm) { err.style.display = 'block'; err.textContent = '⚠️ من فضلك املأ جميع الحقول'; return; }
      if (old !== settings.password) { err.style.display = 'block'; err.textContent = '❌ كلمة المرور الحالية غير صحيحة'; return; }
      if (newPw.length < 6) { err.style.display = 'block'; err.textContent = '⚠️ كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل'; return; }
      if (newPw !== confirm) { err.style.display = 'block'; err.textContent = '⚠️ كلمة المرور الجديدة غير متطابقة مع التأكيد'; return; }
      err.style.display = 'none';
      settings.password = newPw;
      saveSettings(settings);
      alert('✅ تم تغيير كلمة المرور بنجاح');
      document.getElementById('oldPw').value = '';
      document.getElementById('newPw').value = '';
      document.getElementById('confirmPw').value = '';
    };

    // ─── Listen for background sync ──────────────────────────────────

    window.addEventListener('subs-updated', async (e) => {
      cachedSubs = e.detail;
      if (document.getElementById('adminPanelView')?.style?.display !== 'none') {
        renderCurrentTab();
      }
    });

    // ─── Init ─────────────────────────────────────────────────────────

    if (isLoggedIn()) showPanel();
    else showLogin();
  }

  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
