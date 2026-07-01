/* ELGOLD STUDIO — Client Portal logic (auth + client dashboard + owner admin) */
(function () {
  'use strict';
  var SB = window.SB, OWNER = (window.OWNER_EMAIL || '').toLowerCase();
  var STATUSES = ['new', 'reviewing', 'in_progress', 'delivered', 'cancelled'];

  /* ---------- i18n ---------- */
  var T = {
    en: {
      back: '← Site', logout: 'Log out',
      chpw: 'Change password', 'chpw.title': 'Change password', 'chpw.new': 'New password', 'chpw.confirm': 'Confirm password', 'chpw.cancel': 'Cancel', 'chpw.save': 'Save',
      chpw_ok: 'Password changed ✓', chpw_short: 'Password must be at least 6 characters.', chpw_nomatch: 'Passwords do not match.',
      'auth.title': 'Client Portal', 'auth.sub': 'Sign in to track your projects and dues.',
      'auth.login': 'Log in', 'auth.signup': 'Create account', 'auth.name': 'Full name',
      'auth.email': 'Email', 'auth.password': 'Password', 'auth.forgot': 'Forgot password?',
      'client.sub': 'Your projects & dues in one place.', 'client.new': '+ New request',
      'client.requests': 'Your requests', 'client.empty': 'No requests yet — start one from the site.',
      'owner.title': 'Studio dashboard', 'owner.sub': 'All requests — set price, payments & status.',
      'owner.refresh': 'Refresh', 'owner.empty': 'No requests yet.',
      st_new: 'New', st_reviewing: 'Reviewing', st_in_progress: 'In progress', st_delivered: 'Delivered', st_cancelled: 'Cancelled',
      m_requests: 'Requests', m_due: 'Total due', m_paid: 'Total paid', m_price: 'Price', m_paidL: 'Paid', m_dueL: 'Due',
      save: 'Save', saved: 'Saved ✓', all: 'All', proposed: 'Proposed budget', welcome: 'Welcome',
      err_login: 'Wrong email or password.', err_generic: 'Something went wrong — try again.',
      chk_confirm: 'Account created ✓ Check your email to confirm, then log in.',
      chk_reset: 'Password reset link sent to your email.',
      need_email: 'Enter your email first.', by: 'by'
    },
    ar: {
      back: '← الموقع', logout: 'خروج',
      chpw: 'غيّر كلمة السر', 'chpw.title': 'تغيير كلمة السر', 'chpw.new': 'كلمة السر الجديدة', 'chpw.confirm': 'تأكيد كلمة السر', 'chpw.cancel': 'إلغاء', 'chpw.save': 'حفظ',
      chpw_ok: 'اتغيّرت كلمة السر ✓', chpw_short: 'كلمة السر لازم ٦ حروف على الأقل.', chpw_nomatch: 'كلمتا السر مش متطابقتين.',
      'auth.title': 'بوابة العملاء', 'auth.sub': 'سجّل دخول عشان تتابع مشاريعك ومستحقاتك.',
      'auth.login': 'تسجيل الدخول', 'auth.signup': 'حساب جديد', 'auth.name': 'الاسم بالكامل',
      'auth.email': 'الإيميل', 'auth.password': 'كلمة السر', 'auth.forgot': 'نسيت كلمة السر؟',
      'client.sub': 'مشاريعك ومستحقاتك في مكان واحد.', 'client.new': '+ طلب جديد',
      'client.requests': 'طلباتك', 'client.empty': 'لسه مفيش طلبات — ابدأ واحد من الموقع.',
      'owner.title': 'لوحة التحكم', 'owner.sub': 'كل الطلبات — حدّد السعر والمدفوع والحالة.',
      'owner.refresh': 'تحديث', 'owner.empty': 'لسه مفيش طلبات.',
      st_new: 'جديد', st_reviewing: 'قيد المراجعة', st_in_progress: 'جاري التنفيذ', st_delivered: 'تم التسليم', st_cancelled: 'ملغي',
      m_requests: 'الطلبات', m_due: 'إجمالي المستحق', m_paid: 'إجمالي المدفوع', m_price: 'السعر', m_paidL: 'المدفوع', m_dueL: 'المتبقّي',
      save: 'حفظ', saved: 'اتحفظ ✓', all: 'الكل', proposed: 'الميزانية المقترحة', welcome: 'أهلاً',
      err_login: 'الإيميل أو كلمة السر غلط.', err_generic: 'حصل خطأ — جرّب تاني.',
      chk_confirm: 'اتعمل الحساب ✓ افتح إيميلك وأكّده، وبعدين سجّل دخول.',
      chk_reset: 'بعتنا لينك تغيير كلمة السر على إيميلك.',
      need_email: 'اكتب إيميلك الأول.', by: 'من'
    }
  };
  function curLang() { try { return localStorage.getItem('elgold_lang') === 'ar' ? 'ar' : 'en'; } catch (e) { return 'en'; } }
  function t(k) { var l = curLang(); return (T[l] && T[l][k]) || T.en[k] || k; }
  function applyLang() {
    var l = curLang();
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    [].forEach.call(document.querySelectorAll('[data-i18n]'), function (el) {
      var v = t(el.getAttribute('data-i18n')); if (v) el.textContent = v;
    });
    var lb = document.getElementById('pt-lang'); if (lb) lb.textContent = l === 'ar' ? 'EN' : 'ع';
  }

  /* ---------- helpers ---------- */
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function money(n, cur) { n = Number(n || 0); var c = (cur === 'EGP') ? 'EGP' : 'USD'; return n.toLocaleString(curLang() === 'ar' ? 'ar-EG' : 'en-US') + ' ' + c; }
  function fdate(s) { try { return new Date(s).toLocaleDateString(curLang() === 'ar' ? 'ar-EG' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' }); } catch (e) { return ''; } }
  function show(view) { ['pt-loading', 'pt-auth', 'pt-client', 'pt-owner'].forEach(function (id) { var el = $(id); if (el) el.classList.toggle('is-hidden', id !== view); }); }
  function statusLabel(s) { return t('st_' + s) || s; }
  function stCls(s) { return STATUSES.indexOf(s) >= 0 ? s : 'new'; }   // تعقيم الحالة قبل ما تتحط في اسم كلاس

  /* ---------- auth UI ---------- */
  var mode = 'login';
  function setMode(m) {
    mode = m;
    [].forEach.call(document.querySelectorAll('.pt-tab'), function (b) { b.classList.toggle('is-active', b.getAttribute('data-tab') === m); });
    document.querySelector('.pt-name').classList.toggle('is-hidden', m !== 'signup');
    $('pt-submit').textContent = t(m === 'signup' ? 'auth.signup' : 'auth.login');
    msg('', '');
  }
  function msg(txt, kind) { var m = $('pt-msg'); m.textContent = txt || ''; m.className = 'pt-msg' + (kind ? ' ' + kind : ''); }

  function wireAuth() {
    [].forEach.call(document.querySelectorAll('.pt-tab'), function (b) {
      b.addEventListener('click', function () { setMode(b.getAttribute('data-tab')); });
    });
    $('pt-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target, email = f.email.value.trim(), pass = f.password.value, name = f.name.value.trim();
      if (!email || pass.length < 6) { msg(t('err_generic'), 'err'); return; }
      var btn = $('pt-submit'); btn.disabled = true;
      var done = function (err, okTxt) { btn.disabled = false; if (err) msg(err, 'err'); else if (okTxt) msg(okTxt, 'ok'); };
      if (mode === 'signup') {
        SB.auth.signUp({ email: email, password: pass, options: { data: { name: name }, emailRedirectTo: location.href.split('#')[0] } })
          .then(function (r) {
            if (r.error) return done(r.error.message || t('err_generic'));
            if (r.data && r.data.session) { done(); }   // autoconfirm on → onAuthStateChange routes
            else { setMode('login'); done(null, t('chk_confirm')); }
          });
      } else {
        SB.auth.signInWithPassword({ email: email, password: pass })
          .then(function (r) { if (r.error) done(t('err_login')); else done(); });
      }
    });
    $('pt-forgot').addEventListener('click', function () {
      var email = $('pt-form').email.value.trim();
      if (!email) { msg(t('need_email'), 'err'); return; }
      SB.auth.resetPasswordForEmail(email, { redirectTo: location.href.split('#')[0] })
        .then(function () { msg(t('chk_reset'), 'ok'); });
    });
    $('pt-logout').addEventListener('click', function () { SB.auth.signOut(); });
  }

  /* ---------- client dashboard ---------- */
  function renderClient(user, rows) {
    var name = (user.user_metadata && user.user_metadata.name) || (user.email || '').split('@')[0];
    $('pt-hi').textContent = t('welcome') + ' ' + name;
    var totalDue = 0, totalPaid = 0;
    rows.forEach(function (r) { totalDue += Math.max(0, Number(r.price || 0) - Number(r.paid || 0)); totalPaid += Number(r.paid || 0); });
    $('pt-stats').innerHTML =
      stat(rows.length, t('m_requests')) +
      stat(money(totalDue, rows[0] && rows[0].currency), t('m_due'), 'due') +
      stat(money(totalPaid, rows[0] && rows[0].currency), t('m_paid'), 'paid');
    var list = $('pt-client-list'); list.innerHTML = rows.map(clientCard).join('');
    $('pt-client-empty').classList.toggle('is-hidden', rows.length > 0);
  }
  function stat(val, label, kind) {
    return '<div class="pt-stat' + (kind ? ' pt-stat--' + kind : '') + '"><b>' + esc(val) + '</b><span>' + esc(label) + '</span></div>';
  }
  function clientCard(r) {
    var due = Math.max(0, Number(r.price || 0) - Number(r.paid || 0));
    var m = Number(r.price || 0) > 0
      ? '<div class="pt-money"><div>' + t('m_price') + '<b>' + money(r.price, r.currency) + '</b></div>'
        + '<div>' + t('m_paidL') + '<b>' + money(r.paid, r.currency) + '</b></div>'
        + '<div class="due">' + t('m_dueL') + '<b>' + money(due, r.currency) + '</b></div></div>'
      : '';
    return '<article class="pt-req"><div class="pt-req__top"><span class="pt-req__svc">' + esc(r.service || '—') + '</span>'
      + '<span class="pt-badge s-' + stCls(r.status) + '">' + esc(statusLabel(r.status)) + '</span></div>'
      + '<div class="pt-req__date">' + fdate(r.created_at) + (r.budget ? ' · ' + t('proposed') + ': ' + esc(r.budget) : '') + '</div>'
      + (r.details ? '<p class="pt-req__brief">' + esc(r.details) + '</p>' : '') + m + '</article>';
  }

  /* ---------- owner dashboard ---------- */
  var ownerRows = [], ownerFilter = 'all';
  function renderOwner(rows) {
    ownerRows = rows;
    var due = 0, paid = 0;
    rows.forEach(function (r) { due += Math.max(0, Number(r.price || 0) - Number(r.paid || 0)); paid += Number(r.paid || 0); });
    $('pt-owner-stats').innerHTML =
      stat(rows.length, t('m_requests')) +
      stat(money(due, rows[0] && rows[0].currency), t('m_due'), 'due') +
      stat(money(paid, rows[0] && rows[0].currency), t('m_paid'), 'paid');
    var fils = ['all'].concat(STATUSES);
    $('pt-owner-filters').innerHTML = fils.map(function (s) {
      return '<button class="pt-fbtn' + (s === ownerFilter ? ' is-active' : '') + '" data-f="' + s + '">' + esc(s === 'all' ? t('all') : statusLabel(s)) + '</button>';
    }).join('');
    var view = ownerFilter === 'all' ? rows : rows.filter(function (r) { return r.status === ownerFilter; });
    $('pt-owner-list').innerHTML = view.map(ownerCard).join('');
    $('pt-owner-empty').classList.toggle('is-hidden', view.length > 0);
  }
  function ownerCard(r) {
    var opts = STATUSES.map(function (s) { return '<option value="' + s + '"' + (s === r.status ? ' selected' : '') + '>' + esc(statusLabel(s)) + '</option>'; }).join('');
    var curOpts = ['USD', 'EGP'].map(function (c) { return '<option' + (c === r.currency ? ' selected' : '') + '>' + c + '</option>'; }).join('');
    return '<article class="pt-req" data-id="' + r.id + '"><div class="pt-req__top">'
      + '<span class="pt-req__svc">' + esc(r.service || '—') + '</span><span class="pt-badge s-' + stCls(r.status) + '">' + esc(statusLabel(r.status)) + '</span></div>'
      + '<div class="pt-req__who">' + esc(r.name || '—') + ' · ' + esc(r.email || '') + (r.phone ? ' · ' + esc(r.phone) : '') + '</div>'
      + '<div class="pt-req__date">' + fdate(r.created_at) + (r.budget ? ' · ' + t('proposed') + ': ' + esc(r.budget) : '') + '</div>'
      + (r.details ? '<p class="pt-req__brief">' + esc(r.details) + '</p>' : '')
      + '<div class="pt-edit">'
      + '<label>' + t('m_price') + '<input type="number" min="0" step="1" class="e-price" value="' + Number(r.price || 0) + '"></label>'
      + '<label>' + t('m_paidL') + '<input type="number" min="0" step="1" class="e-paid" value="' + Number(r.paid || 0) + '"></label>'
      + '<label>' + esc(curLang() === 'ar' ? 'العملة' : 'Currency') + '<select class="e-cur">' + curOpts + '</select></label>'
      + '<label>' + esc(curLang() === 'ar' ? 'الحالة' : 'Status') + '<select class="e-status">' + opts + '</select></label>'
      + '<button class="pt-btn pt-btn--primary pt-save" type="button">' + t('save') + '</button>'
      + '</div></article>';
  }
  function wireOwner() {
    $('pt-refresh').addEventListener('click', loadOwner);
    $('pt-owner-filters').addEventListener('click', function (e) {
      var b = e.target.closest('.pt-fbtn'); if (!b) return; ownerFilter = b.getAttribute('data-f'); renderOwner(ownerRows);
    });
    $('pt-owner-list').addEventListener('click', function (e) {
      var btn = e.target.closest('.pt-save'); if (!btn) return;
      var card = btn.closest('.pt-req'), id = card.getAttribute('data-id');
      var payload = {
        price: Number(card.querySelector('.e-price').value || 0),
        paid: Number(card.querySelector('.e-paid').value || 0),
        currency: card.querySelector('.e-cur').value,
        status: card.querySelector('.e-status').value
      };
      btn.disabled = true; btn.textContent = '…';
      SB.from('portal_requests').update(payload).eq('id', id).then(function (r) {
        btn.disabled = false; btn.textContent = r.error ? t('err_generic') : t('saved');
        if (!r.error) { var row = ownerRows.filter(function (x) { return x.id === id; })[0]; if (row) { Object.assign(row, payload); } setTimeout(function () { renderOwner(ownerRows); }, 900); }
      });
    });
  }
  function loadOwner() {
    show('pt-owner');
    SB.from('portal_requests').select('*').order('created_at', { ascending: false }).then(function (r) {
      renderOwner((r.data) || []);
    });
  }

  /* ---------- routing ---------- */
  function route(session) {
    if (!session || !session.user) { show('pt-auth'); $('pt-logout').classList.add('is-hidden'); $('pt-chpw').classList.add('is-hidden'); return; }
    $('pt-logout').classList.remove('is-hidden');
    $('pt-chpw').classList.remove('is-hidden');
    var email = (session.user.email || '').toLowerCase();
    if (email === OWNER) { loadOwner(); return; }
    show('pt-client');
    SB.from('portal_requests').select('*').order('created_at', { ascending: false }).then(function (r) {
      renderClient(session.user, (r.data) || []);
    });
  }

  /* ---------- change password ---------- */
  function pwMsg(txt, kind) { var m = $('pt-pw-msg'); m.textContent = txt || ''; m.className = 'pt-msg' + (kind ? ' ' + kind : ''); }
  function wireChpw() {
    var modal = $('pt-pw-modal');
    $('pt-chpw').addEventListener('click', function () { $('pt-pw1').value = ''; $('pt-pw2').value = ''; pwMsg('', ''); modal.classList.remove('is-hidden'); $('pt-pw1').focus(); });
    $('pt-pw-cancel').addEventListener('click', function () { modal.classList.add('is-hidden'); });
    modal.addEventListener('click', function (e) { if (e.target === modal) modal.classList.add('is-hidden'); });
    $('pt-pw-save').addEventListener('click', function () {
      var p1 = $('pt-pw1').value, p2 = $('pt-pw2').value;
      if (p1.length < 6) { pwMsg(t('chpw_short'), 'err'); return; }
      if (p1 !== p2) { pwMsg(t('chpw_nomatch'), 'err'); return; }
      var b = $('pt-pw-save'); b.disabled = true;
      SB.auth.updateUser({ password: p1 }).then(function (r) {
        b.disabled = false;
        if (r.error) { pwMsg(r.error.message || t('err_generic'), 'err'); }
        else { pwMsg(t('chpw_ok'), 'ok'); setTimeout(function () { modal.classList.add('is-hidden'); }, 1300); }
      });
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    applyLang();
    $('pt-lang').addEventListener('click', function () {
      try { localStorage.setItem('elgold_lang', curLang() === 'ar' ? 'en' : 'ar'); } catch (e) {}
      applyLang();
      // إعادة رسم اللوحات باللغة الجديدة
      SB.auth.getSession().then(function (r) { route(r.data.session); });
    });
    if (!SB) { show('pt-auth'); msg('Supabase library failed to load.', 'err'); return; }
    wireAuth(); wireOwner(); wireChpw(); setMode('login');
    SB.auth.getSession().then(function (r) { route(r.data.session); });
    SB.auth.onAuthStateChange(function (_e, session) { applyLang(); route(session); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
