(function () {
  let app, loginView, panelView;
  let cachedSubs = null;

  function init() {
    app = document.getElementById('adminTabContent');
    loginView = document.getElementById('adminLoginView');
    panelView = document.getElementById('adminPanelView');
    if (!app) return;

    function getSubs() { return cachedSubs || JSON.parse(localStorage.getItem('bem_all_subs') || '[]'); }

    function getSettings() {
      const s = JSON.parse(localStorage.getItem('bem_admin_settings') || '{}');
      if (!s.password) s.password = 'admin123';
      return s;
    }

    function saveSettings(s) { localStorage.setItem('bem_admin_settings', JSON.stringify(s)); }

    function isLoggedIn() { return localStorage.getItem('bem_admin_logged') === 'yes'; }

    function setLoggedIn(v) {
      if (v) localStorage.setItem('bem_admin_logged', 'yes');
      else localStorage.removeItem('bem_admin_logged');
    }

    function statusLabel(st) {
      return { pending: 'Ù‚ÙŠØ¯ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©', paid: 'ÙÙŠ Ø§Ù†ØªØ¸Ø§Ø± Ø§Ù„ØªÙØ¹ÙŠÙ„', active: 'Ù†Ø´Ø·' }[st] || st;
    }

    function showLogin() {
      loginView.style.display = 'block';
      panelView.style.display = 'none';
    }

    async function showPanel() {
      loginView.style.display = 'none';
      panelView.style.display = 'block';
      app.innerHTML = '<div class="loading">â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ù…ÙŠÙ„...</div>';
      await loadSubs();
      renderCurrentTab();
    }

    async function loadSubs() {
      try {
        cachedSubs = await db.adminList();
        return cachedSubs;
      } catch (e) { console.warn('adminList error:', e); }
      const l = JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
      if (l.length) cachedSubs = l;
      return cachedSubs || [];
    }

    document.getElementById('adminLoginBtn')?.addEventListener('click', () => {
      const pw = document.getElementById('adminPassword').value;
      const err = document.getElementById('adminLoginError');
      const settings = getSettings();
      if (!pw) { err.style.display = 'block'; err.textContent = 'âš ï¸ Ø£Ø¯Ø®Ù„ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±'; return; }
      if (pw !== settings.password) {
        err.style.display = 'block'; err.textContent = 'âŒ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± ØºÙŠØ± ØµØ­ÙŠØ­Ø©';
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
      if (!confirm('ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø®Ø±ÙˆØ¬ØŸ')) return;
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
            ${s.status !== 'active' ? `<button class="table-activate" onclick="adminActivate('${s.ref}')">ØªÙØ¹ÙŠÙ„</button> ` : ''}
            <button class="table-delete" onclick="adminDelete('${s.ref}')">Ø­Ø°Ù</button>
          </td>
        </tr>
      `).join('');
    }

    function renderPending() {
      const a = getSubs().filter(s => s.status !== 'active');
      app.innerHTML = a.length
        ? `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Ø§Ù„Ø§Ø³Ù…</th><th>Ø§Ù„Ù‡Ø§ØªÙ</th><th>Ø§Ù„ÙˆÙ„Ø§ÙŠØ©</th><th>Ø§Ù„Ù…Ø³ØªÙˆÙ‰</th><th>Ø§Ù„Ø¯ÙØ¹</th><th>Ø§Ù„ØªØ§Ø±ÙŠØ®</th><th>Ø§Ù„Ø­Ø§Ù„Ø©</th><th>Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th></tr></thead><tbody>${tbody(a)}</tbody></table></div>`
        : '<div class="admin-empty"><p>âœ… Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø§Ø´ØªØ±Ø§ÙƒØ§Øª ÙÙŠ Ø§Ù†ØªØ¸Ø§Ø± Ø§Ù„ØªÙØ¹ÙŠÙ„</p></div>';
    }

    function renderAll() {
      const all = getSubs();
      if (!all.length) { app.innerHTML = '<div class="admin-empty"><p>âš ï¸ Ù„Ø§ ÙŠÙˆØ¬Ø¯ Ø£ÙŠ Ø§Ø´ØªØ±Ø§Ùƒ Ù…Ø³Ø¬Ù„ Ø¨Ø¹Ø¯. ØªØ£ÙƒØ¯ Ù…Ù† Ø§ØªØµØ§Ù„ JSONBin.</p><button class="admin-btn" onclick="adminRefresh()" style="margin-top:12px;background:#1565c0;color:#fff;padding:10px 20px;border:none;border-radius:8px;cursor:pointer">ðŸ”„ Ø¥Ø¹Ø§Ø¯Ø© ØªØ­Ù…ÙŠÙ„</button></div>'; return; }
      const active = all.filter(s => s.status === 'active');
      const inactive = all.filter(s => s.status !== 'active');
      app.innerHTML = `<div class="admin-table-wrap"><table class="admin-table"><thead><tr><th>Ø§Ù„Ø§Ø³Ù…</th><th>Ø§Ù„Ù‡Ø§ØªÙ</th><th>Ø§Ù„ÙˆÙ„Ø§ÙŠØ©</th><th>Ø§Ù„Ù…Ø³ØªÙˆÙ‰</th><th>Ø§Ù„Ø¯ÙØ¹</th><th>Ø§Ù„ØªØ§Ø±ÙŠØ®</th><th>Ø§Ù„Ø­Ø§Ù„Ø©</th><th>Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</th></tr></thead><tbody>
        ${active.length ? `<tr class="section-header"><td colspan="8">âœ… Ø§Ù„Ø­Ø³Ø§Ø¨Ø§Øª Ø§Ù„Ù†Ø´Ø·Ø© (${active.length})</td></tr>${tbody(active)}` : ''}
        ${inactive.length ? `<tr class="section-header inactive"><td colspan="8">â³ Ø§Ù„Ø­Ø³Ø§Ø¨Ø§Øª ØºÙŠØ± Ø§Ù„Ù…ÙØ¹Ù„Ø© (${inactive.length})</td></tr>${tbody(inactive)}` : ''}
      </tbody></table></div>`;
    }

    function renderSettings() {
      const a = getSubs();
      const s = getSettings();
      const stats = { total: a.length, pending: a.filter(x => x.status === 'pending').length, paid: a.filter(x => x.status === 'paid').length, active: a.filter(x => x.status === 'active').length };
      app.innerHTML = `<div class="admin-settings">
        <div class="admin-stats-grid">
          <div class="stat-card"><span class="stat-num">${stats.total}</span><span class="stat-label">Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ</span></div>
          <div class="stat-card pending"><span class="stat-num">${stats.pending}</span><span class="stat-label">Ù‚ÙŠØ¯ Ø§Ù„Ù…Ø±Ø§Ø¬Ø¹Ø©</span></div>
          <div class="stat-card paid"><span class="stat-num">${stats.paid}</span><span class="stat-label">ÙÙŠ Ø§Ù†ØªØ¸Ø§Ø± Ø§Ù„ØªÙØ¹ÙŠÙ„</span></div>
          <div class="stat-card active"><span class="stat-num">${stats.active}</span><span class="stat-label">Ù†Ø´Ø·</span></div>
        </div>
        <div class="admin-actions-card"><h3>ðŸ”‘ ØªØºÙŠÙŠØ± ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ±</h3>
          <div class="form-group"><label>Ø§Ù„Ø­Ø§Ù„ÙŠØ©</label><input type="password" id="oldPw" class="form-input"></div>
          <div class="form-group"><label>Ø§Ù„Ø¬Ø¯ÙŠØ¯Ø©</label><input type="password" id="newPw" class="form-input"></div>
          <div class="form-group"><label>Ø§Ù„ØªØ£ÙƒÙŠØ¯</label><input type="password" id="confirmPw" class="form-input"></div>
          <div id="pwError" class="auth-error" style="display:none"></div>
          <button class="admin-btn" style="background:#1565c0;color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer" onclick="changePassword()">ðŸ’¾ Ø­ÙØ¸</button>
        </div>
        <div class="admin-actions-card"><h3>âš™ï¸ Ø¥Ø¬Ø±Ø§Ø¡Ø§Øª</h3>
          <button class="admin-btn" style="background:#d32f2f;color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer" onclick="adminClearAll()">ðŸ—‘ï¸ Ø­Ø°Ù Ø§Ù„ÙƒÙ„</button>
          <button class="admin-btn" style="background:#1565c0;color:#fff;width:100%;padding:12px;border:none;border-radius:8px;font-weight:600;cursor:pointer;margin-top:8px" onclick="adminExport()">ðŸ“¥ ØªØµØ¯ÙŠØ± JSON</button>
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
      if (!confirm(`ØªÙØ¹ÙŠÙ„ ${ref}ØŸ`)) return;
      app.innerHTML = '<div class="loading">â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªÙØ¹ÙŠÙ„...</div>';
      try {
        const r = await fetch('https://api.jsonbin.io/v3/b/6a3e6a0eda38895dfe02709a/latest', { headers: { 'X-Master-Key': '$2a$10$rC3ecItXnAfIvauWD7iScelNRNvIEYDU1/ZXDTRine2xItBTrsc3W' } });
        const j = await r.json();
        const data = (j.record && j.record.data) || [];
        const item = data.find(s => s.ref === ref);
        if (!item) { app.innerHTML = '<div class="admin-empty"><p>âŒ Ø§Ù„Ø§Ø´ØªØ±Ø§Ùƒ ØºÙŠØ± Ù…ÙˆØ¬ÙˆØ¯</p></div>'; return; }
        item.status = 'active';
        await fetch('https://api.jsonbin.io/v3/b/6a3e6a0eda38895dfe02709a', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-Master-Key': '$2a$10$rC3ecItXnAfIvauWD7iScelNRNvIEYDU1/ZXDTRine2xItBTrsc3W' }, body: JSON.stringify({ data }) });
        await loadSubs();
        renderCurrentTab();
      } catch (e) {
        app.innerHTML = `<div class="admin-empty"><p>âŒ ÙØ´Ù„ Ø§Ù„ØªÙØ¹ÙŠÙ„: ${e.message}</p><button class="admin-btn" onclick="adminRefresh()" style="margin-top:12px;padding:10px 20px;background:#1565c0;color:#fff;border:none;border-radius:8px;cursor:pointer">ðŸ”„ Ø¥Ø¹Ø§Ø¯Ø©</button></div>`;
      }
    };

    window.adminDelete = async (ref) => {
      if (!confirm(`Ø­Ø°Ù ${ref}ØŸ`)) return;
      app.innerHTML = '<div class="loading">â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­Ø°Ù...</div>';
      try {
        const r = await fetch('https://api.jsonbin.io/v3/b/6a3e6a0eda38895dfe02709a/latest', { headers: { 'X-Master-Key': '$2a$10$rC3ecItXnAfIvauWD7iScelNRNvIEYDU1/ZXDTRine2xItBTrsc3W' } });
        const j = await r.json();
        const data = (j.record && j.record.data) || [];
        const filtered = data.filter(s => s.ref !== ref);
        await fetch('https://api.jsonbin.io/v3/b/6a3e6a0eda38895dfe02709a', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-Master-Key': '$2a$10$rC3ecItXnAfIvauWD7iScelNRNvIEYDU1/ZXDTRine2xItBTrsc3W' }, body: JSON.stringify({ data: filtered }) });
        await loadSubs();
        renderCurrentTab();
      } catch (e) {
        app.innerHTML = `<div class="admin-empty"><p>âŒ ÙØ´Ù„ Ø§Ù„Ø­Ø°Ù: ${e.message}</p><button class="admin-btn" onclick="adminRefresh()" style="margin-top:12px;padding:10px 20px;background:#1565c0;color:#fff;border:none;border-radius:8px;cursor:pointer">ðŸ”„ Ø¥Ø¹Ø§Ø¯Ø©</button></div>`;
      }
    };

    window.adminClearAll = async () => {
      if (!confirm('âš ï¸ Ø­Ø°Ù Ø§Ù„ÙƒÙ„ØŸ')) return;
      if (!confirm('ØªØ£ÙƒÙŠØ¯ Ù†Ù‡Ø§Ø¦ÙŠØŸ')) return;
      app.innerHTML = '<div class="loading">â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„Ø­Ø°Ù...</div>';
      try {
        await fetch('https://api.jsonbin.io/v3/b/6a3e6a0eda38895dfe02709a', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'X-Master-Key': '$2a$10$rC3ecItXnAfIvauWD7iScelNRNvIEYDU1/ZXDTRine2xItBTrsc3W' }, body: JSON.stringify({ data: [] }) });
        localStorage.removeItem('bem_all_subs');
        localStorage.removeItem('bem_subscription');
        cachedSubs = null;
        await loadSubs();
        renderCurrentTab();
      } catch (e) {
        app.innerHTML = `<div class="admin-empty"><p>âŒ ÙØ´Ù„ Ø§Ù„Ø­Ø°Ù: ${e.message}</p></div>`;
      }
    };

    window.adminExport = () => {
      const a = getSubs();
      if (!a.length) { alert('Ù„Ø§ ØªÙˆØ¬Ø¯ Ø¨ÙŠØ§Ù†Ø§Øª'); return; }
      const blob = new Blob([JSON.stringify(a, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const aEl = document.createElement('a');
      aEl.href = url;
      aEl.download = 'bem-subs-' + new Date().toISOString().slice(0, 10) + '.json';
      aEl.click();
    };

    window.adminRefresh = async () => {
      app.innerHTML = '<div class="loading">â³ Ø¬Ø§Ø±ÙŠ Ø§Ù„ØªØ­Ø¯ÙŠØ«...</div>';
      cachedSubs = null;
      localStorage.removeItem('bem_all_subs');
      await loadSubs();
      renderCurrentTab();
    };

    window.changePassword = () => {
      const old = document.getElementById('oldPw').value;
      const np = document.getElementById('newPw').value;
      const cf = document.getElementById('confirmPw').value;
      const err = document.getElementById('pwError');
      const s = getSettings();
      if (!old || !np || !cf) { err.style.display = 'block'; err.textContent = 'âš ï¸ Ø§Ù…Ù„Ø£ Ø§Ù„Ø­Ù‚ÙˆÙ„'; return; }
      if (old !== s.password) { err.style.display = 'block'; err.textContent = 'âŒ ÙƒÙ„Ù…Ø© Ø§Ù„Ù…Ø±ÙˆØ± Ø§Ù„Ø­Ø§Ù„ÙŠØ© Ø®Ø·Ø£'; return; }
      if (np.length < 6) { err.style.display = 'block'; err.textContent = 'âš ï¸ 6 Ø£Ø­Ø±Ù Ø¹Ù„Ù‰ Ø§Ù„Ø£Ù‚Ù„'; return; }
      if (np !== cf) { err.style.display = 'block'; err.textContent = 'âš ï¸ ØºÙŠØ± Ù…ØªØ·Ø§Ø¨Ù‚Ø©'; return; }
      s.password = np;
      saveSettings(s);
      alert('âœ… ØªÙ… Ø§Ù„ØªØºÙŠÙŠØ±');
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
