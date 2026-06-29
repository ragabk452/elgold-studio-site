/* =========================================================
   ELGOLD STUDIO — main.js (Milestone 1)
   loader · i18n · lenis · reveals · nav · cursor · spotlight · magnetic
   ========================================================= */
(function () {
  'use strict';

  var fine = matchMedia('(pointer:fine)').matches;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  var lenis = null;
  var modalOpen = false;

  /* ---------- i18n (EN افتراضي + AR) ---------- */
  var T = {
    en: {
      'nav.work': 'Work', 'nav.services': 'Services', 'nav.process': 'Process',
      'nav.about': 'Studio', 'nav.contact': 'Contact', 'nav.cta': 'Start a project', 'lang': 'ع',
      'hero.eyebrow': 'ELGOLD STUDIO — Premium digital products',
      'hero.t1': 'We build digital', 'hero.t2': 'products that feel', 'hero.t3': 'like the future.',
      'hero.sub': 'Design and engineering for brands that refuse to look ordinary.',
      'hero.cta1': 'Start a project', 'hero.cta2': 'View our work',
      'hero.s1n': '18+', 'hero.s1l': 'Projects delivered',
      'hero.s2n': '15+', 'hero.s2l': 'Happy clients',
      'hero.s3n': '4+', 'hero.s3l': 'Years experience',
      'hero.scroll': 'Scroll', 'chip.1': 'Available for work', 'chip.2': 'Design', 'chip.3': 'Engineering',
      'trusted.eyebrow': 'Trusted by', 'trusted.t1': 'Ambitious teams', 'trusted.t2': 'build with ELGOLD.',
      'trusted.sub': 'Brands and founders who wanted more than ordinary.',
      'services.eyebrow': 'What we do', 'services.title': 'Services built for premium brands',
      'services.sub': 'Everything your product needs — from identity to launch.',
      'services.s1t': 'Brand Identity', 'services.s1d': 'Logos, visual systems and brand guidelines.',
      'services.s2t': 'Web Development', 'services.s2d': 'Fast, secure, SEO‑ready sites on a modern stack.',
      'services.s3t': 'SaaS Development', 'services.s3d': 'Multi‑tenant SaaS platforms & dashboards.',
      'services.s4t': 'UI / UX Design', 'services.s4d': 'Interfaces that blend beauty with conversion.',
      'services.s5t': 'Social Media Design', 'services.s5d': 'Marketing visuals that grow your brand.',
      'services.s6t': 'CRM Systems', 'services.s6d': 'Custom CRM & systems that automate work.',
      'work.eyebrow': 'Selected work', 'work.title': 'Featured projects',
      'work.sub': 'A few products we designed and engineered.', 'work.view': 'View project →',
      'work.p1t': 'AI Agency OS', 'work.p1d': 'SaaS for agencies — clients, projects, invoicing & AI.', 'work.p1tag': 'Multi‑tenant SaaS',
      'work.p2t': 'Anamil Yasin', 'work.p2d': 'Premium handcrafted store with a full dashboard.', 'work.p2tag': 'Live store',
      'work.p3t': 'Nexa Digital', 'work.p3d': 'Agency site with smooth motion & social proof.', 'work.p3tag': 'Live site',
      'process.eyebrow': 'How we work', 'process.title': 'A clear path from idea to launch',
      'process.sub': 'A calm, proven process — no chaos, no surprises.',
      'process.s1t': 'Discover', 'process.s1d': 'We learn your goals, users and brand.',
      'process.s2t': 'Plan', 'process.s2d': 'Scope, timeline and a clear roadmap.',
      'process.s3t': 'Design', 'process.s3d': 'Premium visuals and interface design.',
      'process.s4t': 'Develop', 'process.s4d': 'Fast, clean engineering and testing.',
      'process.s5t': 'Launch', 'process.s5d': 'We ship — and stay for support.',
      'stack.eyebrow': 'Our stack', 'stack.title': 'Tools we craft with',
      'stack.sub': 'A modern toolkit for design and engineering.',
      'why.eyebrow': 'Why ELGOLD', 'why.title': 'Built different. Built to last.',
      'why.sub': 'A studio that treats your product like its own.',
      'why.m1': 'Projects delivered', 'why.m2': 'Happy clients', 'why.m3': 'Years experience', 'why.m4': 'Designs delivered',
      'why.c1t': 'Designer + Developer in one', 'why.c1d': 'One mind for design and code — no gaps, no hand‑offs.',
      'why.c2t': 'Premium, never template', 'why.c2d': 'Every pixel and line crafted for your brand.',
      'why.c3t': 'Built to scale', 'why.c3d': 'Clean, fast foundations that grow with you.',
      'about.badge': 'Founder · ELGOLD STUDIO', 'about.eyebrow': 'The Studio',
      'about.title': 'A personal studio led by Kareem Ragab',
      'about.body': 'I started in graphic design, then grew into building complete digital products. Today I help companies and startups turn their ideas into SaaS platforms, CRM systems and dashboards — high performance, clean code, and design that sells.',
      'about.p1': "Product thinking + a designer's eye + a developer's experience, in one person.",
      'about.p2': 'Focused on conversion and performance — not just looks.',
      'about.p3': 'Clear communication and delivery on the agreed deadline.',
      'about.cta': 'Tell me about your project',
      'testi.eyebrow': 'Testimonials', 'testi.title': 'What clients say', 'testi.sub': 'Real words from people we built with.',
      'testi.q1': '“Professional level, quick to understand, respectful — and delivered the same day.”',
      'testi.q2': '“Great work and fast communication — thank you for the service.”',
      'testi.q3': '“Kareem is a respectful, creative and hardworking professional.”',
      'testi.q4': '“Excellent service and classy dealing — fast revisions and very professional work.”',
      'testi.q5': '“A respectful, patient and fast person. Worth working with again.”',
      'faq.eyebrow': 'FAQ', 'faq.title': 'Questions, answered', 'faq.sub': 'Everything you might want to know.',
      'faq.q1': 'How much does a project cost?', 'faq.a1': 'It depends on scope. We give a clear quote after a short call — no surprises.',
      'faq.q2': 'How long does it take?', 'faq.a2': 'Most projects ship in 2–6 weeks depending on size.',
      'faq.q3': 'Do you work with international clients?', 'faq.a3': 'Yes — in Arabic or English, with easy online payments.',
      'faq.q4': 'Do you offer support after launch?', 'faq.a4': 'Absolutely. We stay for updates, fixes and growth.',
      'faq.q5': 'How do we start?', 'faq.a5': 'Send us a message — we reply fast and book a quick call.',
      'cta.pill': 'Let’s talk', 'cta.t1': 'Ready to build', 'cta.t2': 'something premium?',
      'cta.sub': 'Tell us about your project — we reply within 24 hours.',
      'cta.btn1': 'Start a project', 'cta.btn2': 'Book a call',
      'contact.eyebrow': 'Contact', 'contact.title': 'Let’s start your project',
      'contact.sub': 'Tell us what you need and your budget — we reply within 24 hours.',
      'contact.wa': 'WhatsApp', 'contact.email': 'Email', 'contact.pay': 'Pay securely:',
      'contact.ph_name': 'Your name', 'contact.ph_email': 'Your email', 'contact.ph_brief': 'Describe your project…',
      'contact.s1': 'Brand identity', 'contact.s2': 'Website', 'contact.s3': 'Web app', 'contact.s4': 'Mobile app', 'contact.s5': 'Other',
      'contact.budget': 'Your budget', 'contact.submit': 'Send request',
      'contact.payNow': '— or pay directly —', 'contact.paypal': 'Pay with PayPal / Card',
      'contact.instapayLbl': 'InstaPay (Egypt)', 'contact.copy': 'Copy',
      'footer.tag': 'Digital products that sell — SaaS, CRM systems & dashboards, designed and engineered by Kareem Ragab.',
      'footer.links': 'Navigate', 'footer.faq': 'FAQ', 'footer.services': 'Services', 'footer.contact': 'Contact',
      'footer.news_ph': 'Your email', 'footer.rights': 'All rights reserved'
    },
    ar: {
      'nav.work': 'أعمالنا', 'nav.services': 'خدماتنا', 'nav.process': 'منهجيتنا',
      'nav.about': 'الاستوديو', 'nav.contact': 'تواصل', 'nav.cta': 'ابدأ مشروعك', 'lang': 'EN',
      'hero.eyebrow': 'إلجولد ستوديو — منتجات رقمية premium',
      'hero.t1': 'بنصنع منتجات', 'hero.t2': 'رقمية بإحساس', 'hero.t3': 'المستقبل.',
      'hero.sub': 'تصميم وبرمجة للعلامات اللي رافضة تبقى عادية.',
      'hero.cta1': 'ابدأ مشروعك', 'hero.cta2': 'شوف أعمالنا',
      'hero.s1n': '+18', 'hero.s1l': 'مشروع منجز',
      'hero.s2n': '+15', 'hero.s2l': 'عميل سعيد',
      'hero.s3n': '+4', 'hero.s3l': 'سنين خبرة',
      'hero.scroll': 'انزل', 'chip.1': 'متاح للعمل', 'chip.2': 'تصميم', 'chip.3': 'برمجة',
      'trusted.eyebrow': 'موثوق من', 'trusted.t1': 'فرق طموحة', 'trusted.t2': 'بتبني مع إلجولد.',
      'trusted.sub': 'علامات ومؤسّسين عايزين أكتر من العادي.',
      'services.eyebrow': 'اللي بنعمله', 'services.title': 'خدمات مصمّمة للعلامات الراقية',
      'services.sub': 'كل اللي منتجك محتاجه — من الهوية للإطلاق.',
      'services.s1t': 'الهوية البصرية', 'services.s1d': 'لوجوهات وأنظمة بصرية ودليل علامة.',
      'services.s2t': 'تطوير المواقع', 'services.s2d': 'مواقع سريعة وآمنة ومهيّأة للبحث بأحدث التقنيات.',
      'services.s3t': 'تطوير SaaS', 'services.s3d': 'منصّات SaaS ولوحات تحكم قابلة للتوسّع.',
      'services.s4t': 'تصميم UI / UX', 'services.s4d': 'واجهات تجمع بين الجمال والتحويل.',
      'services.s5t': 'تصميم سوشيال ميديا', 'services.s5d': 'تصاميم تسويقية بترفع علامتك.',
      'services.s6t': 'أنظمة CRM', 'services.s6d': 'أنظمة CRM وإدارة بتأتمت شغلك.',
      'work.eyebrow': 'مختارات من أعمالنا', 'work.title': 'مشاريع مختارة',
      'work.sub': 'نماذج من منتجات صمّمناها وبرمجناها.', 'work.view': 'عرض المشروع →',
      'work.p1t': 'AI Agency OS', 'work.p1d': 'منصّة SaaS للوكالات — عملاء ومشاريع وفواتير.', 'work.p1tag': 'SaaS متعدّد المستأجرين',
      'work.p2t': 'أنامل ياسين', 'work.p2d': 'متجر منتجات حرفية فاخر بلوحة تحكّم كاملة.', 'work.p2tag': 'متجر مباشر',
      'work.p3t': 'Nexa Digital', 'work.p3d': 'موقع وكالة بحركة سلسة وإثبات اجتماعي.', 'work.p3tag': 'موقع مباشر',
      'process.eyebrow': 'إزاي بنشتغل', 'process.title': 'طريق واضح من الفكرة للإطلاق',
      'process.sub': 'منهجية هادية ومجرّبة — مفيش لخبطة ولا مفاجآت.',
      'process.s1t': 'اكتشاف', 'process.s1d': 'نفهم أهدافك وجمهورك وعلامتك.',
      'process.s2t': 'تخطيط', 'process.s2d': 'نطاق وجدول وخطة واضحة.',
      'process.s3t': 'تصميم', 'process.s3d': 'تصميم بصري وواجهات راقية.',
      'process.s4t': 'تطوير', 'process.s4d': 'برمجة سريعة ونضيفة واختبار.',
      'process.s5t': 'إطلاق', 'process.s5d': 'بنطلق — ونفضل معاك للدعم.',
      'stack.eyebrow': 'أدواتنا', 'stack.title': 'الأدوات اللي بنشتغل بيها',
      'stack.sub': 'عُدّة حديثة للتصميم والبرمجة.',
      'why.eyebrow': 'ليه إلجولد', 'why.title': 'مختلفين. ومصمّمين نفضل.',
      'why.sub': 'استوديو بيعامل منتجك كأنه بتاعه.',
      'why.m1': 'مشروع منجز', 'why.m2': 'عميل سعيد', 'why.m3': 'سنين خبرة', 'why.m4': 'تصميم احترافي',
      'why.c1t': 'مصمم + مبرمج في واحد', 'why.c1d': 'عقل واحد للتصميم والكود — مفيش فجوات.',
      'why.c2t': 'premium مش قالب جاهز', 'why.c2d': 'كل بكسل وكل سطر متعمل لعلامتك.',
      'why.c3t': 'متبني عشان يكبر', 'why.c3d': 'أساس نضيف وسريع بيكبر معاك.',
      'about.badge': 'المؤسّس · إلجولد ستوديو', 'about.eyebrow': 'الاستوديو',
      'about.title': 'استوديو شخصي بقيادة كريم رجب',
      'about.body': 'بدأت من تصميم الجرافيك، ثم تطوّرت لبناء منتجات رقمية كاملة. اليوم أساعد الشركات والـ startups على تحويل أفكارهم إلى منصّات SaaS وأنظمة CRM ولوحات تحكم — بأداء عالٍ، كود نظيف، وتصميم يبيع.',
      'about.p1': 'تفكير المنتج + حسّ المصمم + خبرة المطوّر في شخص واحد.',
      'about.p2': 'تركيز على التحويل والأداء، لا الشكل فقط.',
      'about.p3': 'تواصل واضح وتسليم في الموعد المتفق عليه.',
      'about.cta': 'احكيلي عن مشروعك',
      'testi.eyebrow': 'آراء العملاء', 'testi.title': 'العملاء بيقولوا إيه', 'testi.sub': 'كلام حقيقي من ناس اشتغلنا معاهم.',
      'testi.q1': '«مستوى احترافي وسريع الاستيعاب وتعامل محترم وتسليم في نفس اليوم.»',
      'testi.q2': '«شغل حلو وسرعة في التعامل، شكرًا صديقي على الخدمة.»',
      'testi.q3': '«الأخ كريم شخصية محترمة ومبدعة ومجتهدة في العمل.»',
      'testi.q4': '«خدمة ممتازة وتعامل راقي، سريع في التعديلات والتصميم احترافي جدًا.»',
      'testi.q5': '«إنسان محترم وصبور وسريع، يستاهل التكرار.»',
      'faq.eyebrow': 'الأسئلة الشائعة', 'faq.title': 'إجابات على أسئلتك', 'faq.sub': 'كل اللي ممكن تحب تعرفه.',
      'faq.q1': 'المشروع بيتكلّف كام؟', 'faq.a1': 'حسب حجم الشغل. بنديك سعر واضح بعد مكالمة قصيرة — مفيش مفاجآت.',
      'faq.q2': 'بياخد وقت قد إيه؟', 'faq.a2': 'أغلب المشاريع بتتسلّم في ٢–٦ أسابيع حسب الحجم.',
      'faq.q3': 'بتشتغلوا مع عملاء بره مصر؟', 'faq.a3': 'أيوه — بالعربي أو الإنجليزي، ودفع أونلاين سهل.',
      'faq.q4': 'في دعم بعد الإطلاق؟', 'faq.a4': 'طبعاً. بنفضل معاك للتحديثات والإصلاحات والتطوير.',
      'faq.q5': 'إزاي نبدأ؟', 'faq.a5': 'ابعتلنا رسالة — بنرد بسرعة ونحجز مكالمة قصيرة.',
      'cta.pill': 'يلا نتكلم', 'cta.t1': 'جاهز تبني', 'cta.t2': 'حاجة فخمة؟',
      'cta.sub': 'احكيلنا عن مشروعك — بنرد خلال ٢٤ ساعة.',
      'cta.btn1': 'ابدأ مشروعك', 'cta.btn2': 'احجز مكالمة',
      'contact.eyebrow': 'تواصل', 'contact.title': 'يلا نبدأ مشروعك',
      'contact.sub': 'قوللنا محتاج إيه وميزانيتك — بنرد خلال ٢٤ ساعة.',
      'contact.wa': 'واتساب', 'contact.email': 'إيميل', 'contact.pay': 'ادفع بأمان:',
      'contact.ph_name': 'اسمك', 'contact.ph_email': 'إيميلك', 'contact.ph_brief': 'اوصف مشروعك…',
      'contact.s1': 'هوية بصرية', 'contact.s2': 'موقع', 'contact.s3': 'تطبيق ويب', 'contact.s4': 'تطبيق موبايل', 'contact.s5': 'أخرى',
      'contact.budget': 'ميزانيتك', 'contact.submit': 'ابعت الطلب',
      'contact.payNow': '— أو ادفع مباشرة —', 'contact.paypal': 'ادفع بـ PayPal / كارت',
      'contact.instapayLbl': 'إنستا باي (مصر)', 'contact.copy': 'نسخ',
      'footer.tag': 'منتجات رقمية بتبيع — SaaS وCRM ولوحات تحكم، تصميم وبرمجة من كريم رجب.',
      'footer.links': 'تنقّل', 'footer.faq': 'الأسئلة', 'footer.services': 'الخدمات', 'footer.contact': 'تواصل',
      'footer.news_ph': 'إيميلك', 'footer.rights': 'جميع الحقوق محفوظة'
    }
  };
  function curLang() { try { return localStorage.getItem('elgold_lang') || 'en'; } catch (e) { return 'en'; } }
  function applyLang(l) {
    var d = T[l] || T.en, html = document.documentElement;
    html.lang = l; html.dir = (l === 'ar') ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-i18n]').forEach(function (el) { var k = el.getAttribute('data-i18n'); if (d[k] != null) el.textContent = d[k]; });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) { var k = el.getAttribute('data-i18n-ph'); if (d[k] != null) el.setAttribute('placeholder', d[k]); });
    try { localStorage.setItem('elgold_lang', l); } catch (e) {}
  }
  applyLang(curLang());
  var langBtn = document.getElementById('lang');
  if (langBtn) langBtn.addEventListener('click', function () { applyLang(curLang() === 'en' ? 'ar' : 'en'); });

  /* ---------- اللودر ---------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    if (hasGsap && !reduce) {
      // نخفي عناصر الهيرو في حالة البداية لحد ما شاشة الاسم تتقلب وتكشفه (نمنع الوميض)
      gsap.set('.hero__eyebrow', { opacity: 0, y: 20 });
      gsap.set('.hero__title .line', { opacity: 0, yPercent: 110 });
      gsap.set('.hero__sub', { opacity: 0, y: 20 });
      gsap.set('.hero__cta .btn', { opacity: 0, y: 20 });
      gsap.set('.hero__stats .stat', { opacity: 0, y: 16 });
      gsap.set('.hero__visual', { opacity: 0, scale: .92 });
      var nameEl = document.querySelector('.loader__name');
      var travel = nameEl ? nameEl.offsetWidth + 18 : 240;   // الـ G يبدأ من اليمين ويكنس للشمال
      gsap.set('.loader__name', { clipPath: 'inset(0 0 0 100%)' });    // مخفي، يتكشف يمين←يسار مع كنس G
      gsap.set('.loader__g', { x: travel, scale: .6, opacity: 0 });    // يبدأ من آخر اليمين
      gsap.timeline()
        .to('.loader__g', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.7)' })
        .addLabel('sweep', '+=.15')
        .to('.loader__g', { x: 0, duration: 1.5, ease: 'power3.inOut' }, 'sweep')               // حركة الحرف زي الأول
        .to('.loader__name', { clipPath: 'inset(0 0 0 0%)', duration: 1.5, ease: 'power3.inOut' }, 'sweep')  // الاسم متزامن مع الحرف
        .to('.loader__bar i', { width: '100%', duration: 1.5, ease: 'power2.inOut' }, 'sweep')
        // بعد ما الاسم يظهر بثانية، شاشة الاسم تتقلب لفوق وتكشف الهيرو (قلب صفحة كاملة)
        .to(loader, { yPercent: -100, duration: 1.0, ease: 'power4.inOut', onComplete: function () { if (loader) loader.style.display = 'none'; } }, '+=1')
        .add(heroReveal, '-=.45');
    } else if (loader) { loader.style.display = 'none'; }
    initScroll();
  });

  function heroReveal() {
    if (!hasGsap || reduce) return;
    gsap.timeline()
      .to('.hero__eyebrow', { y: 0, opacity: 1, duration: .6, ease: 'power3.out' })
      .to('.hero__title .line', { yPercent: 0, opacity: 1, duration: .9, stagger: .12, ease: 'power4.out' }, '-=.3')
      .to('.hero__sub', { y: 0, opacity: 1, duration: .7, ease: 'power3.out' }, '-=.5')
      .to('.hero__cta .btn', { y: 0, opacity: 1, duration: .6, stagger: .12, ease: 'power3.out' }, '-=.4')
      .to('.hero__stats .stat', { y: 0, opacity: 1, duration: .5, stagger: .1 }, '-=.3')
      .to('.hero__visual', { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out' }, '-=1');
  }

  /* ---------- سكرول ناعم + reveals ---------- */
  function initScroll() {
    if (window.Lenis && !reduce) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: false, syncTouch: false });
      if (hasST) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(function (t) { lenis.raf(t * 1000); }); gsap.ticker.lagSmoothing(0); }
      else { (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(); }
    }
    if (!hasST) return;
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.from(el, { y: 40, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', once: true } });
    });

    // تعتيم الصفحة وهي بتتغطّى (عمق) — للديسكتوب فقط.
    // على الموبايل بنسيبه: القسم المغطّى مستخبي أصلاً، وإلغاؤه بيوفّر شغل كل لحظة سكرول = سلاسة أعلى.
    if (fine) {
      var pages = gsap.utils.toArray('.page');
      pages.forEach(function (pg, i) {
        if (i < pages.length - 1) {
          var inner = pg.querySelector('.container') || pg;
          gsap.to(inner, { opacity: .5, ease: 'none',
            scrollTrigger: { trigger: pages[i + 1], start: 'top bottom', end: 'top top', scrub: true } });
        }
      });
    }

    // خط التايم‑لاين يتعبّى مع السكرول
    if (document.querySelector('.timeline__fill')) {
      gsap.to('.timeline__fill', { scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '.timeline', start: 'top 78%', end: 'bottom 65%', scrub: true } });
    }

    // عدّاد الأرقام (Why ELGOLD)
    gsap.utils.toArray('.count').forEach(function (el) {
      var to = parseInt(el.getAttribute('data-to'), 10) || 0;
      var obj = { v: 0 };
      ScrollTrigger.create({ trigger: el, start: 'top 90%', once: true, onEnter: function () {
        gsap.to(obj, { v: to, duration: 1.6, ease: 'power2.out', onUpdate: function () { el.textContent = Math.round(obj.v); } });
      }});
    });

    initSnap();
  }

  /* ---------- سكرول بالصفحات (Snap): كل لفّة = صفحة كاملة ---------- */
  function initSnap() {
    if (reduce || !lenis) return;
    var targets = Array.prototype.slice.call(document.querySelectorAll('.page'));
    var footer = document.querySelector('.footer'); if (footer) targets.push(footer);
    if (targets.length < 2) return;

    // مهم: نحفظ مواضع الأقسام مرة واحدة (قبل ما الـsticky يلزق ويغيّر offsetTop وقت التشغيل)
    var offsets = [];
    function measure() { offsets = targets.map(function (t) { return t.offsetTop; }); }
    measure();
    window.addEventListener('resize', measure);

    var locked = false, lockT;
    // القسم الحالي = آخر قسم بدايته فاتت منتصف الشاشة
    function current() {
      var mid = window.scrollY + window.innerHeight * 0.5, best = 0;
      for (var i = 0; i < offsets.length; i++) { if (offsets[i] <= mid) best = i; }
      return best;
    }
    function go(dir) {
      if (locked) return;
      var n = current() + dir;
      if (n < 0 || n >= offsets.length) return;
      locked = true;
      lenis.scrollTo(offsets[n], { duration: 0.8, force: true });
      clearTimeout(lockT); lockT = setTimeout(function () { locked = false; }, 820);
    }
    window.addEventListener('wheel', function (e) {
      if (modalOpen) return;            // النافذة مفتوحة → سيب السكرول الطبيعي جواها
      if (Math.abs(e.deltaY) < 6) return;
      e.preventDefault();
      go(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });
    window.addEventListener('keydown', function (e) {
      if (modalOpen) return;
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); go(-1); }
    });
    // ملاحظة: مفيش سنّاب باللمس عمداً — الموبايل بيستخدم السكرول الطبيعي (الهاردوير) عشان يبقى سلس بلا تعليق.
    // السنّاب (العجلة/الكيبورد) للديسكتوب بس.
  }

  /* ---------- نافذة تفاصيل المشروع (Case Study) ---------- */
  var PROJECTS = {
    aios: {
      liveUrl: 'https://ai-agency-os-one.vercel.app',
      cover: 'assets/work/aios-2.jpg',
      gallery: ['assets/work/aios-2.jpg', 'assets/work/aios-3.jpg', 'assets/work/aios-1.jpg'],
      cat: { en: 'SaaS Platform', ar: 'منصّة SaaS' }, year: '2026',
      client: { en: 'In-house product · Elgold Studio', ar: 'منتج داخلي · إلجولد ستوديو' },
      title: { en: 'AI Agency OS', ar: 'AI Agency OS' },
      summary: { en: 'A multi-tenant SaaS that unites clients, projects, invoicing and an AI assistant in one workspace.', ar: 'منصّة SaaS متعدّدة المستأجرين تجمع إدارة العملاء والمشاريع والفواتير والمساعد الذكي في مساحة عمل واحدة.' },
      problem: { en: 'Agencies rely on disconnected tools: a sheet for clients, an app for tasks, software for invoices, docs for proposals. This fragments data, wastes time switching tools, and hides the full picture of agency performance.', ar: 'تعتمد الوكالات على أدوات منفصلة: جدول للعملاء، تطبيق للمهام، برنامج للفواتير، ومستندات للعروض. هذا التشتّت يبعثر البيانات، يضيّع الوقت في التنقّل بين الأدوات، ويحجب الصورة الكاملة لأداء الوكالة.' },
      solution: { en: 'A complete multi-tenant SaaS: a CRM with clear pipeline stages, a drag-and-drop Kanban for projects, full invoicing with PDF export, and an AI assistant that drafts proposals and emails — all behind roles and permissions, with a dashboard showing revenue and projects in real time.', ar: 'منصّة SaaS متكاملة متعدّدة المستأجرين: إدارة علاقات عملاء بمراحل واضحة، لوحة مشاريع ومهام Kanban بالسحب والإفلات، نظام فواتير كامل بتصدير PDF، ومساعد ذكاء اصطناعي يولّد العروض والرسائل — كله خلف نظام أدوار وصلاحيات، مع لوحة تحكّم تعرض الإيرادات والمشاريع لحظيًا.' },
      results: { en: 'A complete, live operating system that brings every agency operation into one place, automates repetitive admin work, and gives managers instant visibility into revenue and projects — ready to scale with fine-grained permissions.', ar: 'نظام تشغيل متكامل وحيّ يجمع كل عمليات الوكالة في مكان واحد، يؤتمت المهام الإدارية المتكرّرة، ويمنح الإدارة رؤية فورية للإيرادات والمشاريع — منصّة جاهزة للتوسّع بصلاحيات دقيقة.' },
      tech: ['Next.js', 'React 19', 'TypeScript', 'Tailwind v4', 'Supabase', 'PostgreSQL', 'RLS', 'Framer Motion', 'Vercel'],
      metrics: [{ v: '5+', l: { en: 'integrated modules', ar: 'وحدات متكاملة' } }, { v: 'Multi-tenant', l: { en: 'scalable architecture', ar: 'بنية قابلة للتوسّع' } }, { v: 'Realtime', l: { en: 'live data updates', ar: 'تحديث مباشر للبيانات' } }],
      quote: { en: 'Professional level, fast to grasp, respectful, and delivered the same day.', ar: 'مستوى احترافي وسريع الاستيعاب وتعامل محترم وتسليم بنفس اليوم.' }, author: 'Ahmed Mohmmed S.'
    },
    yasin: {
      liveUrl: 'https://yasin-app.vercel.app',
      cover: 'assets/work/yasin-1.jpg',
      gallery: ['assets/work/yasin-1.jpg', 'assets/work/yasin-2.jpg', 'assets/work/yasin-3.jpg'],
      cat: { en: 'E-commerce', ar: 'متجر إلكتروني' }, year: '2025',
      client: { en: 'Anamil Yasin', ar: 'أنامل ياسين' },
      title: { en: 'Anamil Yasin', ar: 'أنامل ياسين' },
      summary: { en: 'A premium online store for a handcrafted brand, with a design that reflects its identity and a dashboard for products and orders.', ar: 'متجر إلكتروني فاخر لعلامة منتجات حرفية، بتصميم يعكس هويتها ولوحة تحكّم تدير المنتجات والطلبات.' },
      problem: { en: 'The brand had no online store; orders were handled manually via chat, limiting growth and making it hard to present the products with the craftsmanship they deserve.', ar: 'لم يكن للعلامة متجر إلكتروني؛ كانت الطلبات تُدار يدويًا عبر المراسلة، ما يحدّ من النمو ويصعّب عرض المنتجات باحترافية تليق بطابعها الحرفي.' },
      solution: { en: 'A complete e-commerce store on Next.js and Supabase: elegant product pages, cart and orders, and a dashboard to manage products, orders and inventory — in a dark-gold design that reflects the premium, handcrafted feel.', ar: 'متجر إلكتروني متكامل مبني على Next.js وSupabase: صفحات منتجات أنيقة، سلّة وطلبات، ولوحة تحكّم لإدارة المنتجات والطلبات والمخزون — بتصميم داكن-ذهبي يعكس فخامة المنتج الحرفي.' },
      results: { en: 'A live online store that reflects the brand identity with elegance, converts visitors into orders, and gives the owner full self-management of products and orders — a digital foundation ready to grow.', ar: 'متجر إلكتروني مباشر يعكس هوية العلامة بفخامة، يحوّل الزوّار إلى طلبات، ويمنح صاحب العمل إدارة ذاتية كاملة للمنتجات والطلبات — أساس رقمي جاهز للنمو.' },
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vercel'],
      metrics: [{ v: '100%', l: { en: 'self-managed content', ar: 'إدارة ذاتية للمحتوى' } }, { v: 'Mobile-first', l: { en: 'mobile-first UX', ar: 'تجربة الجوال أولًا' } }, { v: 'Live', l: { en: 'live store', ar: 'متجر مباشر' } }],
      quote: { en: 'Great work and fast communication — thank you for the service.', ar: 'شغل حلو وسرعة في التعامل، شكرًا صديقي على الخدمة.' }, author: 'Givara H.'
    },
    nexa: {
      liveUrl: 'https://nexa-digital.vercel.app',
      cover: 'assets/work/nexa-1.jpg',
      gallery: ['assets/work/nexa-1.jpg', 'assets/work/nexa-2.jpg', 'assets/work/nexa-3.jpg'],
      cat: { en: 'Business Site', ar: 'موقع أعمال' }, year: '2025',
      client: { en: 'Nexa Digital', ar: 'Nexa Digital' },
      title: { en: 'Nexa Digital', ar: 'Nexa Digital' },
      summary: { en: 'A modern digital-agency website with smooth motion, clear messaging and social proof that builds trust and drives contact.', ar: 'موقع وكالة رقمية حديث بحركة سلسة ورسائل واضحة وإثبات اجتماعي يبني الثقة ويدفع للتواصل.' },
      problem: { en: 'The agency needed a digital presence that reflects its professionalism and stands out from competitors, with clear messaging and a strong call to contact — not a static site that doesn’t convert.', ar: 'احتاجت الوكالة حضورًا رقميًا يعكس احترافيتها ويميّزها عن المنافسين، برسالة واضحة ودعوة قوية للتواصل بدل موقع جامد لا يحقّق تحويلًا.' },
      solution: { en: 'A modern agency website with a bold visual identity (gradients and Framer Motion): a strong hero, a clear services section, proof numbers that build trust, and prominent contact CTAs — with a smooth experience on every device.', ar: 'موقع وكالة حديث بهوية بصرية جريئة (تدرّجات لونية وحركة Framer Motion): هيرو قوي، قسم خدمات واضح، أرقام إثبات تبني الثقة، ودعوات تواصل بارزة — بتجربة سلسة على كل الأجهزة.' },
      results: { en: 'A live, professional agency website that presents services clearly, builds trust with proof numbers and polished motion, and smoothly guides visitors toward contact — a digital presence worthy of an ambitious agency.', ar: 'موقع وكالة مباشر واحترافي يعرض الخدمات بوضوح، يبني الثقة بأرقام الإثبات والحركة المتقنة، ويوجّه الزوّار بسلاسة نحو التواصل — حضور رقمي يليق بوكالة طموحة.' },
      tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
      metrics: [{ v: 'Live', l: { en: 'live site', ar: 'موقع مباشر' } }, { v: 'Motion', l: { en: 'smooth animated UX', ar: 'تجربة متحرّكة سلسة' } }, { v: '100%', l: { en: 'responsive design', ar: 'تصميم متجاوب' } }],
      quote: { en: 'Kareem is a respectful, creative and hardworking professional.', ar: 'الأخ كريم شخصية محترمة ومبدعة ومجتهدة في العمل.' }, author: 'Modern Engineering'
    }
  };
  var WM = {
    en: { problem: 'The Problem', solution: 'The Solution', results: 'Results & Impact', tech: 'Technologies', gallery: 'Inside the project', live: 'Visit live site', close: 'Close' },
    ar: { problem: 'المشكلة', solution: 'الحل', results: 'النتائج والأثر', tech: 'التقنيات المستخدمة', gallery: 'جوّه المشروع', live: 'زيارة الموقع المباشر', close: 'إغلاق' }
  };
  var wmodal = document.getElementById('workModal');
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function openProject(key) {
    var p = PROJECTS[key]; if (!p || !wmodal) return;
    var lang = (document.documentElement.lang === 'ar') ? 'ar' : 'en';
    var L = WM[lang] || WM.en, tr = function (b) { return esc(b[lang] || b.en); };
    var metrics = p.metrics.map(function (m) { return '<div class="wm__metric"><b>' + esc(m.v) + '</b><span>' + tr(m.l) + '</span></div>'; }).join('');
    var tags = p.tech.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('');
    var gallery = p.gallery.map(function (g) { return '<img src="' + g + '" alt="" loading="lazy">'; }).join('');
    var live = '<a class="btn btn--primary wm__live" href="' + p.liveUrl + '" target="_blank" rel="noopener">' + L.live + ' ↗</a>';
    var quote = p.quote ? '<blockquote class="wm__quote">“' + tr(p.quote) + '”<cite>— ' + esc(p.author) + '</cite></blockquote>' : '';
    wmodal.innerHTML =
      '<button class="wm__close" aria-label="' + L.close + '">&times;</button>' +
      '<div class="wm__scroll">' +
        '<div class="wm__hero"><img src="' + p.cover + '" alt=""><div class="wm__heroOv"></div>' +
          '<div class="wm__head"><span class="wm__cat">' + tr(p.cat) + ' · ' + esc(p.year) + '</span>' +
          '<h2>' + tr(p.title) + '</h2><span class="wm__client">' + tr(p.client) + '</span></div></div>' +
        '<div class="wm__body">' +
          '<p class="wm__summary">' + tr(p.summary) + '</p>' + live +
          '<div class="wm__metrics">' + metrics + '</div>' +
          '<div class="wm__sec"><h3>' + L.problem + '</h3><p>' + tr(p.problem) + '</p></div>' +
          '<div class="wm__sec"><h3>' + L.solution + '</h3><p>' + tr(p.solution) + '</p></div>' +
          '<div class="wm__sec"><h3>' + L.results + '</h3><p>' + tr(p.results) + '</p></div>' +
          '<div class="wm__sec"><h3>' + L.tech + '</h3><div class="wm__tags">' + tags + '</div></div>' +
          '<div class="wm__sec"><h3>' + L.gallery + '</h3><div class="wm__gallery">' + gallery + '</div></div>' +
          quote + live +
        '</div>' +
      '</div>';
    wmodal.classList.add('is-open'); wmodal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-lock'); modalOpen = true;
    if (lenis && lenis.stop) lenis.stop();
    wmodal.querySelector('.wm__close').addEventListener('click', closeProject);
    var sc = wmodal.querySelector('.wm__scroll'); if (sc) sc.scrollTop = 0;
  }
  function closeProject() {
    if (!wmodal) return;
    wmodal.classList.remove('is-open'); wmodal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-lock'); modalOpen = false;
    if (lenis && lenis.start) lenis.start();
  }
  document.querySelectorAll('.work-card__link').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var k = a.getAttribute('data-project');
      if (k && PROJECTS[k]) { e.preventDefault(); openProject(k); }
    });
  });
  if (wmodal) {
    wmodal.addEventListener('click', function (e) { if (e.target === wmodal) closeProject(); });
    window.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modalOpen) closeProject(); });
  }

  /* ---------- النافبار + القائمة ---------- */
  var nav = document.getElementById('nav');
  addEventListener('scroll', function () { if (nav) nav.classList.toggle('is-scrolled', scrollY > 20); }, { passive: true });
  var burger = document.getElementById('burger'), menu = document.getElementById('menu');
  if (burger) burger.addEventListener('click', function () {
    var open = menu.classList.toggle('is-open'); nav.classList.toggle('menu-open', open);
  });
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = this.getAttribute('href'); if (id.length < 2) return;
      var t = document.querySelector(id); if (!t) return;
      e.preventDefault();
      if (menu) menu.classList.remove('is-open'); if (nav) nav.classList.remove('menu-open');
      if (lenis) lenis.scrollTo(t, { offset: -90 }); else t.scrollIntoView({ behavior: 'smooth' });
    });
  });

  /* ---------- المؤشر + Spotlight ---------- */
  if (fine) {
    document.documentElement.classList.add('has-cursor');
    var ring = document.querySelector('.cursor'), dot = document.querySelector('.cursor-dot');
    var rx = 0, ry = 0, tx = 0, ty = 0;
    addEventListener('mousemove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (dot) dot.style.transform = 'translate(' + (tx - 2.5) + 'px,' + (ty - 2.5) + 'px)';
      document.documentElement.style.setProperty('--mx', tx + 'px');
      document.documentElement.style.setProperty('--my', ty + 'px');
    });
    (function loop() { rx += (tx - rx) * .18; ry += (ty - ry) * .18; if (ring) ring.style.transform = 'translate(' + (rx - 19) + 'px,' + (ry - 19) + 'px)'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a,button,.magnetic,[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { if (ring) ring.classList.add('is-hover'); });
      el.addEventListener('mouseleave', function () { if (ring) ring.classList.remove('is-hover'); });
    });
  }

  /* ---------- أزرار مغناطيسية ---------- */
  if (fine && !reduce) {
    document.querySelectorAll('.magnetic').forEach(function (el) {
      el.addEventListener('mousemove', function (e) { var r = el.getBoundingClientRect(); el.style.transform = 'translate(' + ((e.clientX - (r.left + r.width / 2)) * .25) + 'px,' + ((e.clientY - (r.top + r.height / 2)) * .4) + 'px)'; });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- تمايل الكروت (tilt) ---------- */
  if (fine && !reduce) {
    document.querySelectorAll('.tilt').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(900px) rotateY(' + (px * 7) + 'deg) rotateX(' + (-py * 7) + 'deg) translateY(-6px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- FAQ accordion (واحد مفتوح بس) ---------- */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q'), a = item.querySelector('.faq-a');
    if (!q || !a) return;
    q.addEventListener('click', function () {
      var willOpen = !item.classList.contains('open');
      faqItems.forEach(function (it) {
        it.classList.remove('open');
        var aa = it.querySelector('.faq-a');
        if (aa) { if (hasGsap) gsap.to(aa, { height: 0, duration: .4, ease: 'power2.inOut' }); else aa.style.height = '0px'; }
      });
      if (willOpen) {
        item.classList.add('open');
        if (hasGsap) gsap.to(a, { height: 'auto', duration: .45, ease: 'power2.out' }); else a.style.height = 'auto';
      }
    });
  });

  /* ---------- Contact / Order form ---------- */
  var chips = document.querySelectorAll('.svc-chip');
  var selected = chips[0] ? chips[0].textContent.trim() : '';
  chips.forEach(function (c) {
    c.addEventListener('click', function () {
      chips.forEach(function (x) { x.classList.remove('is-active'); });
      c.classList.add('is-active'); selected = c.textContent.trim();
    });
  });

  var range = document.getElementById('budget-range'), bVal = document.getElementById('budget-val'), bCur = document.getElementById('budget-cur');
  var currency = 'USD';
  var ranges = { USD: { min: 50, max: 5000, step: 50, def: 500 }, EGP: { min: 1000, max: 200000, step: 1000, def: 15000 } };
  function fmtNum(n) { return Number(n).toLocaleString('en-US'); }
  if (range && bVal) range.addEventListener('input', function () { bVal.textContent = fmtNum(range.value); });
  document.querySelectorAll('.cur-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      document.querySelectorAll('.cur-btn').forEach(function (x) { x.classList.remove('is-active'); });
      b.classList.add('is-active');
      currency = b.getAttribute('data-cur'); var r = ranges[currency];
      if (range) { range.min = r.min; range.max = r.max; range.step = r.step; range.value = r.def; }
      if (bVal) bVal.textContent = fmtNum(r.def); if (bCur) bCur.textContent = currency;
    });
  });

  var oform = document.getElementById('order-form');
  if (oform) oform.addEventListener('submit', function (e) {
    e.preventDefault();
    if (oform.company && oform.company.value) return;          // مصيدة سبام
    var name = oform.name.value.trim(), email = oform.email.value.trim(), brief = oform.brief.value.trim();
    if (!name || email.indexOf('@') < 1) { alert('Please enter your name and a valid email.'); return; }
    var msg = 'New project request — ELGOLD STUDIO\n——————\nName: ' + name + '\nEmail: ' + email + '\nService: ' + selected + '\nBudget: ' + fmtNum(range ? range.value : '') + ' ' + currency + '\nDetails: ' + (brief || '—');
    window.open('https://wa.me/201069082986?text=' + encodeURIComponent(msg), '_blank');
    oform.innerHTML = '<div style="text-align:center;padding:24px 0"><div style="font-size:2.4rem">✅</div><h3 style="margin:10px 0;color:var(--ink)">Request sent!</h3><p style="color:#6b6256">We opened WhatsApp with your details — hit send and we’ll reply fast. Or email ragabk452@gmail.com</p></div>';
  });

  // الدفع المباشر: PayPal (بالإيميل — الكارت بيروح لـPayPal تلقائياً) + نسخ رقم InstaPay
  var PAYPAL_EMAIL = 'ragabk452@gmail.com';
  var payBtn = document.getElementById('pay-paypal');
  if (payBtn) payBtn.addEventListener('click', function () {
    var amt = (currency === 'USD' && range) ? range.value : '';   // PayPal بالدولار؛ لو EGP العميل يكتب المبلغ في صفحة PayPal
    var note = 'ELGOLD STUDIO' + (selected ? ' — ' + selected : '');
    var u = 'https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=' + encodeURIComponent(PAYPAL_EMAIL)
          + '&item_name=' + encodeURIComponent(note) + '&currency_code=USD' + (amt ? '&amount=' + amt : '');
    window.open(u, '_blank', 'noopener');
  });
  var copyBtn = document.getElementById('copy-instapay');
  if (copyBtn) copyBtn.addEventListener('click', function () {
    var done = function () { var t = copyBtn.getAttribute('data-done') || '✓'; var o = copyBtn.textContent; copyBtn.textContent = t; setTimeout(function () { copyBtn.textContent = o; }, 1500); };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText('01156963207').then(done, done); else done();
  });

  var news = document.getElementById('news-form');
  if (news) news.addEventListener('submit', function (e) {
    e.preventDefault(); var i = news.querySelector('input');
    if (i && i.value.indexOf('@') > 0) news.innerHTML = '<span style="color:var(--cream);font-weight:700">Subscribed ✓</span>';
  });
})();
