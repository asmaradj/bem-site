document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  let currentSubject = null;
  let currentTab = 'summaries';

  // ─── Subscription / Auth Helpers ──────────────────────────────────────

  function generateRef() {
    return 'BEM-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
  }

  function getSubscription() {
    return JSON.parse(localStorage.getItem('bem_subscription') || 'null');
  }

  function saveSubscription(data) {
    localStorage.setItem('bem_subscription', JSON.stringify(data));
  }

  function getAllSubscriptions() {
    return JSON.parse(localStorage.getItem('bem_all_subs') || '[]');
  }

  function saveAllSubscriptions(subs) {
    localStorage.setItem('bem_all_subs', JSON.stringify(subs));
  }

  function isContentUnlocked() {
    const sub = getSubscription();
    return sub && sub.status === 'active';
  }

  // ─── Home ─────────────────────────────────────────────────────────────

  function renderHome() {
    const stats = Object.values(bemData.details).reduce((acc, s) => {
      acc.units += s.units.length;
      s.units.forEach(u => {
        acc.lessons += u.lessons.length;
        acc.exercises += u.exercises.length;
      });
      return acc;
    }, { units: 0, lessons: 0, exercises: 0 });

    app.innerHTML = `
      <section class="hero">
        <h1>📚 <span>بكالوريا التعليم المتوسط</span> BEM</h1>
        <p>منصتك الشاملة لملخصات الدروس، تجارب التلميذات المتفوقات، المصادر الدراسية، وتمارين شهادة التعليم المتوسط مرتبة حسب المقاطع</p>
        <div class="hero-stats">
          <div class="stat-item"><div class="num">${bemData.subjects.length}</div><div class="label">مادة</div></div>
          <div class="stat-item"><div class="num">${stats.units}</div><div class="label">مقطع</div></div>
          <div class="stat-item"><div class="num">${stats.lessons}</div><div class="label">درس</div></div>
          <div class="stat-item"><div class="num">${stats.exercises}</div><div class="label">تمرين</div></div>
        </div>
        <div style="margin-top:20px">
          <button class="hero-sub-btn" onclick="window.bemGoSubscribe()">✨ اشترك الآن بـ 2000 د.ج / سنوياً</button>
        </div>
      </section>
      <div class="container">
        <h2 class="section-title">المواد الدراسية</h2>
        <div class="subjects-grid" id="subjectsGrid">
          ${bemData.subjects.map(s => `
            <div class="subject-card ${isContentUnlocked() ? '' : 'locked'}" data-subject="${s.id}" style="animation-delay: ${bemData.subjects.indexOf(s) * 0.05}s">
              <div class="icon">${s.icon}</div>
              <h3>${s.name}</h3>
              <p>${s.desc}</p>
              <span class="badge">${s.badge}</span>
              ${!isContentUnlocked() ? '<div class="lock-overlay"><span>🔒</span></div>' : ''}
            </div>
          `).join('')}
        </div>
        ${!isContentUnlocked() ? `
          <div class="unlock-banner">
            <p>🔒 المحتوى مقفل. اشترك الآن للوصول إلى جميع الدروس والتمارين والتجارب المتفوقة</p>
            <button class="btn-unlock" onclick="window.bemGoSubscribe()">🚀 فتح المحتوى - اشترك الآن</button>
          </div>
        ` : `
          <div class="unlock-banner active">
            <p>✅ اشتراكك نشط. يمكنك الوصول إلى جميع المحتويات</p>
          </div>
        `}
      </div>
    `;

    document.getElementById('subjectsGrid').addEventListener('click', e => {
      const card = e.target.closest('.subject-card');
      if (card) {
        if (!isContentUnlocked()) {
          renderSubscribe();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        currentSubject = card.dataset.subject;
        renderSubject(currentSubject);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  window.bemGoSubscribe = () => {
    renderSubscribe();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Subject ──────────────────────────────────────────────────────────

  function renderSubject(subjectId) {
    const data = bemData.details[subjectId];
    const subject = bemData.subjects.find(s => s.id === subjectId);
    document.querySelector('.main-header').style.display = 'none';

    app.innerHTML = `
      <div class="container subject-page active fade-in">
        <button class="back-btn" onclick="window.bemBack()">← العودة إلى الرئيسية</button>
        <div class="subject-header" style="background: linear-gradient(135deg, ${subject.color}, ${subject.color}88)">
          <h2>${subject.icon} ${subject.name}</h2>
          <p class="subtitle">${data.subtitle}</p>
        </div>
        ${isContentUnlocked() ? `
          <div class="tabs">
            <button class="tab-btn active" data-tab="summaries">📖 الدروس</button>
            <button class="tab-btn" data-tab="experience">⭐ تجربة متفوقة</button>
            <button class="tab-btn" data-tab="resources">📚 المصادر</button>
            <button class="tab-btn" data-tab="exercises">✏️ تمارين الشهادة</button>
          </div>
          <div class="tab-content active" id="tab-summaries">${renderSummaries(data.units)}</div>
          <div class="tab-content" id="tab-experience">${renderExperience(data.student)}</div>
          <div class="tab-content" id="tab-resources">${renderResources(data.resources)}</div>
          <div class="tab-content" id="tab-exercises">${renderAllExercises(data.units)}</div>
        ` : `
          <div class="locked-content-message">
            <div class="lock-icon">🔒</div>
            <h3>هذا المحتوى مقفل</h3>
            <p>اشترك سنوياً بـ <strong>2 000 د.ج</strong> للوصول إلى جميع ملخصات الدروس، تمارين الشهادة، وتجارب التلميذات المتفوقات</p>
            <button class="btn-unlock large" onclick="window.bemGoSubscribe()">🚀 اشترك الآن</button>
          </div>
        `}
      </div>
    `;

    if (isContentUnlocked()) {
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
          document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
          btn.classList.add('active');
          document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
          currentTab = btn.dataset.tab;
        });
      });
      document.querySelectorAll('.unit-header').forEach(header => {
        header.addEventListener('click', () => {
          const card = header.closest('.unit-card');
          card.classList.toggle('open');
        });
      });
    }
  }

  function renderSummaries(units) {
    return `<div class="units-list">${units.map((u, i) => `
      <div class="unit-card ${i === 0 ? 'open' : ''}">
        <div class="unit-header"><span>${u.title}</span><span class="toggle-icon">▼</span></div>
        <div class="unit-body"><ul>${u.lessons.map(l => `<li>${l}</li>`).join('')}</ul></div>
      </div>
    `).join('')}</div>`;
  }

  function renderExperience(student) {
    return `
      <div class="experience-card">
        <div class="student-name">👩‍🎓 ${student.name}</div>
        <div class="student-badge">🏆 ${student.year}</div>
        <p style="font-weight:600;margin-top:10px;">نصائحها للنجاح في شهادة التعليم المتوسط:</p>
        <ul class="advice">${student.advice.map(a => `<li>${a}</li>`).join('')}</ul>
      </div>`;
  }

  function renderResources(resources) {
    return `<div class="resources-grid">${resources.map(r => `
      <div class="resource-card">
        <div class="r-icon">${r.icon}</div>
        <h4>${r.title}</h4>
        <p>${r.desc}</p>
        <a href="${r.link}" class="btn">تصفح</a>
      </div>
    `).join('')}</div>`;
  }

  function renderAllExercises(units) {
    return `<div class="units-list">${units.map(u => `
      <div class="unit-card">
        <div class="unit-header"><span>${u.title}</span><span class="toggle-icon">▼</span></div>
        <div class="unit-body"><div class="exercise-list">${u.exercises.map(ex => `
          <div class="exercise-item">
            <div class="ex-info"><h4>${ex.title}</h4><span>${ex.year}</span></div>
            <a href="${ex.link}" class="ex-btn">حل التمرين</a>
          </div>
        `).join('')}</div></div>
      </div>
    `).join('')}</div>`;
  }

  // ─── Navigation ───────────────────────────────────────────────────────

  window.bemBack = () => {
    document.querySelector('.main-header').style.display = 'flex';
    currentSubject = null;
    renderHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.bemHome = () => {
    document.querySelector('.main-header').style.display = 'flex';
    currentSubject = null;
    renderHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Search ───────────────────────────────────────────────────────────

  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!query) return;
    if (!isContentUnlocked()) { renderSubscribe(); return; }
    const results = bemData.subjects.filter(s => s.name.includes(query) || s.desc.includes(query));
    if (results.length === 1) {
      currentSubject = results[0].id;
      renderSubject(currentSubject);
    } else if (results.length > 1) {
      window.scrollTo({ top: document.getElementById('subjectsGrid')?.offsetTop || 0, behavior: 'smooth' });
    }
  });

  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('searchBtn').click();
  });

  document.getElementById('subscribeBtn').addEventListener('click', () => { renderSubscribe(); window.scrollTo({ top: 0, behavior: 'smooth' }); });

  // ─── Subscribe Page ───────────────────────────────────────────────────

  function renderSubscribe() {
    const existing = getSubscription();
    if (existing && existing.status === 'active') {
      renderHome();
      return;
    }
    if (existing && (existing.status === 'pending' || existing.status === 'paid')) {
      renderSubscribePending(existing);
      return;
    }

    document.querySelector('.main-header').style.display = 'none';
    app.innerHTML = `
      <div class="container subscribe-page fade-in">
        <button class="back-btn" onclick="window.bemBack()">← العودة إلى الرئيسية</button>
        <div class="subscribe-hero">
          <div class="sub-icon">✨</div>
          <h2>اشتراك سنوي مميز</h2>
          <p>احصل على وصول كامل لجميع الملخصات، التمارين، والتجارب المتفوقة لهذه السنة الدراسية</p>
        </div>
        <div class="pricing-card">
          <div class="price-tag"><span class="price-amount">2 000</span><span class="price-currency">د.ج</span></div>
          <div class="price-period">سنوياً</div>
          <ul class="price-features">
            <li>✓ جميع ملخصات المواد (9 مواد)</li>
            <li>✓ تمارين شهادة التعليم المتوسط مرتبة حسب المقاطع</li>
            <li>✓ تجارب التلميذات المتفوقات</li>
            <li>✓ مصادر دراسية و روابط تعليمية</li>
            <li>✓ تحديثات مستمرة طيلة السنة</li>
            <li>✓ دعم فني عبر الواتساب</li>
          </ul>
        </div>
        <div class="subscribe-form">
          <h3>معلومات التسجيل</h3>
          <div class="form-group">
            <label>الاسم و اللقب</label>
            <input type="text" id="regName" placeholder="مثال: مريم بن علي" class="form-input">
          </div>
          <div class="form-group">
            <label>البريد الإلكتروني</label>
            <input type="email" id="regEmail" placeholder="example@email.com" class="form-input">
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>رقم الهاتف</label>
              <input type="tel" id="regPhone" placeholder="05XXXXXXXX" class="form-input">
            </div>
            <div class="form-group">
              <label>الولاية</label>
              <input type="text" id="regWilaya" placeholder="الجزائر" class="form-input">
            </div>
          </div>
          <div class="form-group">
            <label>المستوى الدراسي</label>
            <select id="regLevel" class="form-input">
              <option value="">-- اختر --</option>
              <option value="4am">الرابعة متوسط</option>
              <option value="3am">الثالثة متوسط</option>
              <option value="other">أخرى</option>
            </select>
          </div>
          <h3 style="margin-top:25px">طريقة الدفع</h3>
          <div class="payment-methods">
            <label class="payment-option">
              <input type="radio" name="payment" value="edahabia" checked>
              <div class="payment-info"><span class="pay-icon">💳</span><div><strong>Edahabia (بطاقة ذهبية)</strong><small>تحويل عبر بطاقة Edahabia لبريد الجزائر</small></div></div>
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="cib">
              <div class="payment-info"><span class="pay-icon">🏦</span><div><strong>بطاقة CIB</strong><small>الدفع عبر البطاقة البنكية CIB</small></div></div>
            </label>
            <label class="payment-option">
              <input type="radio" name="payment" value="ccp">
              <div class="payment-info"><span class="pay-icon">📮</span><div><strong>الحساب البريدي CCP</strong><small>تحويل بريدي إلى حسابنا</small></div></div>
            </label>
          </div>
          <div id="paymentInstructions" class="payment-instructions" style="display:none">
            <h4>📋 معلومات التحويل</h4>
            <div id="instructionsContent"></div>
          </div>
          <button class="subscribe-submit-btn" id="submitSubscription">✅ تأكيد الاشتراك</button>
          <p class="form-note">بالنقر على "تأكيد الاشتراك" فإنك توافق على شروط الاستخدام</p>
        </div>
      </div>
    `;

    document.querySelectorAll('input[name="payment"]').forEach(r => r.addEventListener('change', showPaymentInstructions));
    showPaymentInstructions();
    document.getElementById('submitSubscription').addEventListener('click', handleSubscribe);
  }

  function showPaymentInstructions() {
    const method = document.querySelector('input[name="payment"]:checked')?.value;
    const container = document.getElementById('paymentInstructions');
    const content = document.getElementById('instructionsContent');
    const info = {
      edahabia: {
        title: '💰 الدفع عبر Edahabia (بطاقة ذهبية)',
        steps: ['افتح تطبيق Baridimob أو توجه إلى مكتب بريد الجزائر', 'اختر "سحب أو تحويل من بطاقة ذهبية"', 'أدخل رقم الحساب: <strong>002 12345 67890 01</strong>', 'المبلغ: <strong>2 000 د.ج</strong>', 'أرسل إيصال الدفع عبر واتساب إلى الرقم: <strong>0555 00 00 00</strong>']
      },
      cib: {
        title: '💳 الدفع عبر بطاقة CIB',
        steps: ['ادخل إلى موقع الدفع الإلكتروني لبنكك', 'أدخل رقم الحساب: <strong>007 12345 67890 01</strong>', 'المبلغ: <strong>2 000 د.ج</strong>', 'بعد إتمام الدفع، أرسل تأكيد الدفع عبر واتساب: <strong>0555 00 00 00</strong>']
      },
      ccp: {
        title: '📮 الدفع عبر الحساب البريدي CCP',
        steps: ['توجه إلى أقرب مكتب بريد الجزائر', 'قم بعملية تحويل بريدي إلى الحساب: <strong>12345678 / Cle 90</strong>', 'المبلغ: <strong>2 000 د.ج</strong>', 'أرسل صورة إيصال التحويل عبر واتساب إلى: <strong>0555 00 00 00</strong>']
      }
    };
    const data = info[method];
    if (data) {
      container.style.display = 'block';
      content.innerHTML = `
        <p style="font-weight:600;margin-bottom:8px">${data.title}</p>
        <ol style="padding-right:20px">${data.steps.map(s => `<li style="margin-bottom:6px">${s}</li>`).join('')}</ol>
        <div class="whatsapp-btn">
          <a href="https://wa.me/213555000000?text=${encodeURIComponent('مرحباً، أريد تأكيد اشتراكي السنوي في منصة BEM')}" target="_blank" class="btn-whatsapp">📱 أرسل الإيصال عبر واتساب</a>
        </div>`;
    }
  }

  function handleSubscribe() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const phone = document.getElementById('regPhone').value.trim();
    const wilaya = document.getElementById('regWilaya').value.trim();
    const level = document.getElementById('regLevel').value;
    const payment = document.querySelector('input[name="payment"]:checked')?.value;

    if (!name || !email || !phone || !wilaya || !level) { alert('⚠️ من فضلك املأ جميع الحقول'); return; }
    if (!/^0[567]\d{8}$/.test(phone.replace(/\s/g, ''))) { alert('⚠️ رقم الهاتف غير صحيح. يجب أن يبدأ بـ 05 أو 06 أو 07'); return; }

    const ref = generateRef();
    const sub = { ref, name, email, phone, wilaya, level, payment, amount: 2000, currency: 'د.ج', date: new Date().toISOString(), status: 'pending' };

    saveSubscription(sub);
    const all = getAllSubscriptions();
    const idx = all.findIndex(s => s.ref === sub.ref);
    if (idx === -1) all.push(sub); else all[idx] = sub;
    saveAllSubscriptions(all);

    renderSubscribePending(sub);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderSubscribePending(sub) {
    document.querySelector('.main-header').style.display = 'none';
    const payNames = { edahabia: 'Edahabia (بطاقة ذهبية)', cib: 'بطاقة CIB', ccp: 'الحساب البريدي CCP' };

    app.innerHTML = `
      <div class="container subscribe-page fade-in">
        <button class="back-btn" onclick="window.bemBack()">← العودة إلى الرئيسية</button>
        <div class="subscribe-hero pending">
          <div class="sub-icon">⏳</div>
          <h2>طلبك قيد المراجعة</h2>
          <p>تم حفظ طلب اشتراكك برقم. سيتم تفعيل حسابك من طرف الإدارة بعد تأكيد الدفع.</p>
        </div>
        <div class="pending-card">
          <div class="pending-ref"><span>رقم الاشتراك:</span> <strong>${sub.ref}</strong></div>
          <div class="pending-details">
            <div><span>الاسم:</span> ${sub.name}</div>
            <div><span>البريد:</span> ${sub.email}</div>
            <div><span>الهاتف:</span> ${sub.phone}</div>
            <div><span>طريقة الدفع:</span> ${payNames[sub.payment] || sub.payment}</div>
            <div><span>المبلغ:</span> <strong style="color:var(--secondary)">${sub.amount.toLocaleString()} ${sub.currency}</strong></div>
            <div><span>الحالة:</span> <span class="status-badge pending">في انتظار التفعيل</span></div>
          </div>
          <div class="pending-action" style="background:#fff3e0">
            <p style="font-size:15px">📌 قم بالتحويل إلى الحساب المذكور ثم أرسل الإيصال عبر واتساب</p>
            <p style="font-size:13px;color:var(--text-light);margin:8px 0">سيتم تفعيل حسابك فور تأكيد الدفع من طرف الإدارة</p>
            <a href="https://wa.me/213555000000?text=${encodeURIComponent('تأكيد دفع اشتراك BEM\nالرقم: ' + sub.ref + '\nالاسم: ' + sub.name + '\nالمبلغ: ' + sub.amount + ' د.ج')}" target="_blank" class="btn-whatsapp large">📱 أرسل الإيصال عبر واتساب</a>
          </div>
          <button class="btn-refresh" onclick="window.bemCheckStatus()">🔄 التحقق من حالة الاشتراك</button>
        </div>
      </div>`;
  }

  window.bemCheckStatus = () => {
    const sub = getSubscription();
    if (sub && sub.status === 'active') {
      renderHome();
    } else if (sub) {
      renderSubscribePending(sub);
    } else {
      renderHome();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Init ─────────────────────────────────────────────────────────────

  renderHome();
});
