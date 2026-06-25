document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('adminTabContent');

  function getAllSubscriptions() {
    return JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
  }

  function saveAllSubscriptions(subs) {
    localStorage.setItem('bem_all_subs', JSON.stringify(subs));
  }

  function renderPending(all) {
    const pending = all.filter(s => s.status !== 'active');
    if (pending.length === 0) {
      return `<div class="admin-empty"><p>✅ لا يوجد اشتراكات في انتظار التفعيل</p></div>`;
    }
    return `<div class="admin-list">${pending.map(s => `
      <div class="admin-item">
        <div class="admin-item-header">
          <span class="admin-ref">${s.ref}</span>
          <span class="status-badge ${s.status}">${{ 'pending': 'قيد المراجعة', 'paid': 'في انتظار التفعيل', 'active': 'نشط' }[s.status] || s.status}</span>
        </div>
        <div class="admin-item-body">
          <div><span>الاسم:</span> ${s.name}</div>
          <div><span>البريد:</span> ${s.email}</div>
          <div><span>الهاتف:</span> ${s.phone}</div>
          <div><span>الولاية:</span> ${s.wilaya}</div>
          <div><span>المستوى:</span> ${s.level}</div>
          <div><span>طريقة الدفع:</span> ${{ 'edahabia': 'Edahabia', 'cib': 'CIB', 'ccp': 'CCP' }[s.payment] || s.payment}</div>
          <div><span>المبلغ:</span> ${s.amount.toLocaleString()} ${s.currency}</div>
          <div><span>تاريخ الطلب:</span> ${new Date(s.date).toLocaleString('ar-DZ')}</div>
        </div>
        <div class="admin-actions">
          <button class="admin-btn activate" onclick="window.adminActivate('${s.ref}')">✅ تفعيل الاشتراك</button>
          <button class="admin-btn delete" onclick="window.adminDelete('${s.ref}')">🗑️ حذف</button>
        </div>
      </div>
    `).join('')}</div>`;
  }

  function renderAll(all) {
    if (all.length === 0) {
      return `<div class="admin-empty"><p>لا يوجد أي اشتراك مسجل بعد</p></div>`;
    }
    return `<div class="admin-list">${all.map(s => {
      const statusMap = { 'pending': 'قيد المراجعة', 'paid': 'في انتظار التفعيل', 'active': 'نشط' };
      return `
      <div class="admin-item ${s.status}">
        <div class="admin-item-header">
          <span class="admin-ref">${s.ref}</span>
          <span class="status-badge ${s.status}">${statusMap[s.status] || s.status}</span>
        </div>
        <div class="admin-item-body">
          <div><span>الاسم:</span> ${s.name}</div>
          <div><span>البريد:</span> ${s.email}</div>
          <div><span>الهاتف:</span> ${s.phone}</div>
          <div><span>الولاية:</span> ${s.wilaya}</div>
          <div><span>المستوى:</span> ${s.level}</div>
          <div><span>طريقة الدفع:</span> ${{ 'edahabia': 'Edahabia', 'cib': 'CIB', 'ccp': 'CCP' }[s.payment] || s.payment}</div>
          <div><span>المبلغ:</span> ${s.amount.toLocaleString()} ${s.currency}</div>
          <div><span>تاريخ الطلب:</span> ${new Date(s.date).toLocaleString('ar-DZ')}</div>
          ${s.status === 'active' ? `<div><span>تاريخ التفعيل:</span> ${new Date(s.activatedAt).toLocaleString('ar-DZ')}</div>` : ''}
          ${s.expiresAt ? `<div><span>تاريخ الانتهاء:</span> ${new Date(s.expiresAt).toLocaleDateString('ar-DZ')}</div>` : ''}
        </div>
        <div class="admin-actions">
          ${s.status !== 'active' ? `<button class="admin-btn activate" onclick="window.adminActivate('${s.ref}')">✅ تفعيل الاشتراك</button>` : ''}
          <button class="admin-btn delete" onclick="window.adminDelete('${s.ref}')">🗑️ حذف</button>
        </div>
      </div>`;
    }).join('')}</div>`;
  }

  function renderSettings() {
    const all = getAllSubscriptions();
    const stats = {
      total: all.length,
      pending: all.filter(s => s.status === 'pending').length,
      paid: all.filter(s => s.status === 'paid').length,
      active: all.filter(s => s.status === 'active').length
    };

    return `
      <div class="admin-settings">
        <div class="admin-stats-grid">
          <div class="stat-card"><span class="stat-num">${stats.total}</span><span class="stat-label">إجمالي الاشتراكات</span></div>
          <div class="stat-card pending"><span class="stat-num">${stats.pending}</span><span class="stat-label">قيد المراجعة</span></div>
          <div class="stat-card paid"><span class="stat-num">${stats.paid}</span><span class="stat-label">في انتظار التفعيل</span></div>
          <div class="stat-card active"><span class="stat-num">${stats.active}</span><span class="stat-label">نشط</span></div>
        </div>
        <div class="admin-actions-card">
          <h3>⚙️ إجراءات</h3>
          <button class="admin-btn danger" onclick="window.adminClearAll()">🗑️ حذف جميع الاشتراكات</button>
          <button class="admin-btn" onclick="window.adminExport()">📥 تصدير البيانات (JSON)</button>
        </div>
      </div>
    `;
  }

  function renderTab(tab) {
    const all = getAllSubscriptions();
    if (tab === 'pending') app.innerHTML = renderPending(all);
    else if (tab === 'all') app.innerHTML = renderAll(all);
    else if (tab === 'settings') app.innerHTML = renderSettings();
  }

  window.adminActivate = (ref) => {
    if (!confirm(`هل أنت متأكد من تفعيل الاشتراك ${ref}؟`)) return;
    const all = getAllSubscriptions();
    const idx = all.findIndex(s => s.ref === ref);
    if (idx === -1) { alert('❌ الاشتراك غير موجود'); return; }
    all[idx].status = 'active';
    all[idx].activatedAt = new Date().toISOString();
    all[idx].expiresAt = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
    saveAllSubscriptions(all);

    const current = JSON.parse(localStorage.getItem('bem_subscription') || 'null');
    if (current && current.ref === ref) {
      current.status = 'active';
      current.activatedAt = all[idx].activatedAt;
      current.expiresAt = all[idx].expiresAt;
      localStorage.setItem('bem_subscription', JSON.stringify(current));
    }

    alert(`✅ تم تفعيل الاشتراك ${ref} بنجاح`);
    renderTab(document.querySelector('.admin-tab.active')?.dataset.adminTab || 'pending');
  };

  window.adminDelete = (ref) => {
    if (!confirm(`هل أنت متأكد من حذف الاشتراك ${ref}؟`)) return;
    let all = getAllSubscriptions();
    all = all.filter(s => s.ref !== ref);
    saveAllSubscriptions(all);

    const current = JSON.parse(localStorage.getItem('bem_subscription') || 'null');
    if (current && current.ref === ref) {
      localStorage.removeItem('bem_subscription');
    }

    alert(`🗑️ تم حذف الاشتراك ${ref}`);
    renderTab(document.querySelector('.admin-tab.active')?.dataset.adminTab || 'pending');
  };

  window.adminClearAll = () => {
    if (!confirm('⚠️ هل أنت متأكد؟ سيتم حذف جميع الاشتراكات!')) return;
    if (!confirm('تأكيد نهائي: حذف جميع الاشتراكات؟')) return;
    saveAllSubscriptions([]);
    localStorage.removeItem('bem_subscription');
    alert('🗑️ تم حذف جميع الاشتراكات');
    renderTab(document.querySelector('.admin-tab.active')?.dataset.adminTab || 'pending');
  };

  window.adminExport = () => {
    const all = getAllSubscriptions();
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bem-subscriptions.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── Tabs ─────────────────────────────────────────────────────────────

  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderTab(tab.dataset.adminTab);
    });
  });

  renderTab('pending');
});
