/* =========================================================
   ELGOLD STUDIO — main.js (Milestone 1)
   loader · i18n · lenis · reveals · nav · cursor · spotlight · magnetic
   ========================================================= */
(function () {
  'use strict';

  /* لو المتصفح رجّع الصفحة من ذاكرته (bfcache / استرجاع تبويب) يعيد تحميلها
     عشان العميل دايمًا يشوف آخر نسخة — مفيش لوب لأن إعادة التحميل بتيجي persisted=false */
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) window.location.reload();
  });

  /* تحديث تلقائي: لو فيه نسخة أجدد على السيرفر، الموقع يعمل ريفريش لوحده —
     على الموبايل مع السكرول، وعند الرجوع للتبويب/الفوكس. العميل دايمًا يشوف آخر تحديث. */
  var BUILD = '20260701c';                       // يتبمب كل نشر (نفس رقم ?v=)
  var _lastCheck = 0, _checking = false;
  function checkUpdate() {
    if (_checking) return;
    var now = Date.now();
    if (now - _lastCheck < 25000) return;        // مرة كل 25 ثانية بحد أقصى
    _lastCheck = now; _checking = true;
    fetch('version.txt?t=' + now, { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.text() : null; })
      .then(function (v) {
        _checking = false;
        if (!v) return; v = v.trim();
        if (v && v !== BUILD) {
          var ae = document.activeElement;
          if (ae && /^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName)) return;  // ما نقاطعش وهو بيملا فورم
          window.location.reload();
        }
      })
      .catch(function () { _checking = false; });
  }
  window.addEventListener('scroll', checkUpdate, { passive: true });
  document.addEventListener('visibilitychange', function () { if (!document.hidden) checkUpdate(); });
  window.addEventListener('focus', checkUpdate);
  setTimeout(checkUpdate, 4000);

  var fine = matchMedia('(pointer:fine)').matches;
  var reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  var lenis = null;
  var modalOpen = false;
  var snapRemeasure = null;

  /* ---------- i18n (EN افتراضي + AR) ---------- */
  var T = {
    en: {
      'nav.work': 'Work', 'nav.services': 'Services', 'nav.process': 'Process',
      'nav.about': 'Studio', 'nav.contact': 'Contact', 'nav.cta': 'Start a project', 'lang': 'ع',
      'hero.eyebrow': 'ELGOLD STUDIO — Premium digital products',
      'hero.t1': 'We build digital', 'hero.t2': 'products that feel', 'hero.t3': 'like the future.',
      'hero.sub': 'Design and engineering for brands that refuse to look ordinary.',
      'hero.cta1': 'Start a project', 'hero.cta2': 'View work',
      'hero.role': 'Graphic Designer · Web Developer',
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
      'work.sub': 'Selected design & development work — tap any project to explore it.', 'work.view': 'View project →',
      'work.fall': 'All', 'work.fdev': 'Development', 'work.fdesign': 'Design', 'work.projects': 'Projects',
      'work.p1t': 'AI Agency OS', 'work.p1d': 'SaaS for agencies — clients, projects, invoicing & AI.', 'work.p1tag': 'Multi‑tenant SaaS',
      'work.p2t': 'Anamil Yasin', 'work.p2d': 'Premium handcrafted store with a full dashboard.', 'work.p2tag': 'Live store',
      'work.p3t': 'Nexa Digital', 'work.p3d': 'Agency site with smooth motion & social proof.', 'work.p3tag': 'Live site',
      'work.p4t': "Gold Skincare", 'work.p4d': "Skincare e-commerce store with a clean, premium UI.", 'work.p4tag': "Live store",
      'work.p5t': "Pizza Height", 'work.p5d': "Premium pizza restaurant site with tasty motion.", 'work.p5tag': "Live site",
      'work.p6t': "Bright Dental", 'work.p6d': "Dental clinic website with online booking.", 'work.p6tag': "Live site",
      'work.p7t': "Fast Round", 'work.p7d': "Full brand identity & guidelines.", 'work.p7tag': "Brand identity",
      'work.p8t': "JUN Profile", 'work.p8d': "Company profile for real estate & contracting.", 'work.p8tag': "Company profile",
      'work.p9t': "Al-Yasmina", 'work.p9d': "Real-estate brochure for Ecobuild Developments.", 'work.p9tag': "Brochure",
      'work.p10t': "Optima Eye", 'work.p10d': "Social media designs for an eye clinic.", 'work.p10tag': "Social media",
      'work.p11t': "Social Designs · I", 'work.p11d': "A collection of scroll-stopping social posts.", 'work.p11tag': "Social media",
      'work.p12t': "Social Designs · II", 'work.p12d': "More social designs across brands & niches.", 'work.p12tag': "Social media",
      'work.p13t': "Logo Collection", 'work.p13d': "A selection of logos & brand marks.", 'work.p13tag': "Logos",
      'process.eyebrow': 'How we work', 'process.title': 'A clear path from idea to launch',
      'process.sub': 'A calm, proven process — no chaos, no surprises.',
      'process.s1t': 'Discover', 'process.s1d': 'We listen and understand your goal.',
      'process.s2t': 'Design', 'process.s2d': 'We turn it into a clear, beautiful design.',
      'process.s3t': 'Build', 'process.s3d': 'We build it — fast and clean.',
      'process.s4t': 'Launch', 'process.s4d': 'We launch it and stay for support.',
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
      'hero.cta1': 'ابدأ مشروعك', 'hero.cta2': 'شوف الأعمال',
      'hero.role': 'مصمم جرافيك · مطوّر ويب',
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
      'work.sub': 'مختارات من أعمال التصميم والتطوير — اضغط أي مشروع لتشوفه بالكامل.', 'work.view': 'عرض المشروع →',
      'work.fall': 'الكل', 'work.fdev': 'برمجة', 'work.fdesign': 'تصميم', 'work.projects': 'مشروع',
      'work.p1t': 'AI Agency OS', 'work.p1d': 'منصّة SaaS للوكالات — عملاء ومشاريع وفواتير.', 'work.p1tag': 'SaaS متعدّد المستأجرين',
      'work.p2t': 'أنامل ياسين', 'work.p2d': 'متجر منتجات حرفية فاخر بلوحة تحكّم كاملة.', 'work.p2tag': 'متجر مباشر',
      'work.p3t': 'Nexa Digital', 'work.p3d': 'موقع وكالة بحركة سلسة وإثبات اجتماعي.', 'work.p3tag': 'موقع مباشر',
      'work.p4t': "Gold Skincare", 'work.p4d': "متجر سكين‑كير إلكتروني بواجهة نظيفة وفاخرة.", 'work.p4tag': "متجر مباشر",
      'work.p5t': "Pizza Height", 'work.p5d': "موقع مطعم بيتزا فاخر بحركة شهية.", 'work.p5tag': "موقع مباشر",
      'work.p6t': "Bright Dental", 'work.p6d': "موقع عيادة أسنان بحجز أونلاين.", 'work.p6tag': "موقع مباشر",
      'work.p7t': "Fast Round", 'work.p7d': "هوية بصرية كاملة ودليل استخدام.", 'work.p7tag': "هوية بصرية",
      'work.p8t': "بروفايل JUN", 'work.p8d': "بروفايل شركة عقارات ومقاولات.", 'work.p8tag': "بروفايل شركة",
      'work.p9t': "الياسمينة", 'work.p9d': "بروشور عقاري لإيكوبيلد.", 'work.p9tag': "بروشور",
      'work.p10t': "Optima Eye", 'work.p10d': "تصاميم سوشيال ميديا لعيادة عيون.", 'work.p10tag': "سوشيال",
      'work.p11t': "تصاميم سوشيال · ١", 'work.p11d': "مجموعة تصاميم سوشيال ميديا لافتة.", 'work.p11tag': "سوشيال",
      'work.p12t': "تصاميم سوشيال · ٢", 'work.p12d': "المزيد من تصاميم السوشيال لعلامات متنوّعة.", 'work.p12tag': "سوشيال",
      'work.p13t': "مجموعة شعارات", 'work.p13d': "مجموعة شعارات وعلامات تجارية.", 'work.p13tag': "شعارات",
      'process.eyebrow': 'إزاي بنشتغل', 'process.title': 'طريق واضح من الفكرة للإطلاق',
      'process.sub': 'منهجية هادية ومجرّبة — مفيش لخبطة ولا مفاجآت.',
      'process.s1t': 'نتفاهم', 'process.s1d': 'نسمعك ونفهم هدفك بالظبط.',
      'process.s2t': 'نصمّم', 'process.s2d': 'نحوّل الفكرة لتصميم واضح وجميل.',
      'process.s3t': 'ننفّذ', 'process.s3d': 'نبرمجها بسرعة وجودة عالية.',
      'process.s4t': 'نطلق', 'process.s4d': 'ننزّلها ونفضل معاك للدعم.',
      'stack.eyebrow': 'أدواتنا', 'stack.title': 'الأدوات اللي بنشتغل بيها',
      'stack.sub': 'عُدّة حديثة للتصميم والبرمجة.',
      'why.eyebrow': 'ليه إلجولد', 'why.title': 'مختلفين — وشغل يدوم.',
      'why.sub': 'استوديو بيعامل منتجك كأنه بتاعه.',
      'why.m1': 'مشروع منجز', 'why.m2': 'عميل سعيد', 'why.m3': 'سنين خبرة', 'why.m4': 'تصميم احترافي',
      'why.c1t': 'مصمم + مبرمج في واحد', 'why.c1d': 'عقل واحد للتصميم والكود — مفيش فجوات.',
      'why.c2t': 'مميّز مش قالب جاهز', 'why.c2d': 'كل بكسل وكل سطر متعمل لعلامتك.',
      'why.c3t': 'متبني عشان يكبر', 'why.c3d': 'أساس نضيف وسريع بيكبر معاك.',
      'about.badge': 'المؤسّس · إلجولد ستوديو', 'about.eyebrow': 'الاستوديو',
      'about.title': 'استوديو شخصي بقيادة كريم رجب',
      'about.body': 'بدأت مصمم جرافيك، وبعدين اتطوّرت لبناء منتجات رقمية كاملة. دلوقتي بساعد الشركات والشركات الناشئة تحوّل أفكارها لمنصّات SaaS وأنظمة CRM ولوحات تحكم — بأداء عالي، كود نضيف، وتصميم بيبيع.',
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
      gsap.set('.hero__lockup-img', { opacity: 0, clipPath: 'inset(0 0 0 100%)' });
      gsap.set('.hero__divider', { opacity: 0, scaleX: 0 });
      gsap.set('.hero__role', { opacity: 0, y: 14, letterSpacing: '.5em' });
      gsap.set('.hero__cta .btn', { opacity: 0, y: 18 });
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
    } else if (loader) { loader.style.display = 'none'; heroReveal(); }
    initScroll();
  });

  function heroReveal() {
    var hero = document.getElementById('hero');
    if (hero) hero.classList.add('is-revealed');   // خلفية المعرض المموّهة تظهر
    if (!hasGsap || reduce) return;
    gsap.timeline()
      .to('.hero__lockup-img', { opacity: 1, clipPath: 'inset(0 0 0 0%)', duration: 1.7, ease: 'power3.inOut' })
      .to('.hero__divider', { scaleX: 1, opacity: 1, duration: .6, ease: 'power2.out' }, '-=.5')
      .to('.hero__role', { y: 0, opacity: 1, letterSpacing: '.34em', duration: .7, ease: 'power3.out' }, '-=.4')
      .to('.hero__cta .btn', { y: 0, opacity: 1, duration: .6, stagger: .12, ease: 'power3.out' }, '-=.35');
  }

  /* ---------- سكرول ناعم + reveals ---------- */
  function initScroll() {
    // Lenis للديسكتوب الواسع بس (للسنّاب + السكرول الناعم). الموبايل/التابلت = سكرول طبيعي خالص
    // عشان اللمس يشتغل بسلاسة (Lenis كان بيمنع السكرول الطبيعي باللمس).
    if (window.Lenis && !reduce && fine && window.innerWidth > 1024) {
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
    if (fine && window.innerWidth > 1024) {
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

    // إعادة حساب مواقع التشغيل بعد ما الصور/الخطوط تحمّل وبعد ما اللودر يخلّص —
    // مهم جداً عشان إزاحة المحتوى ما تخليش أي قسم يفضل مخفي (opacity:0) على أي جهاز
    var doRefresh = function () { ScrollTrigger.refresh(); };
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(doRefresh); }
    if (document.readyState === 'complete') { doRefresh(); } else { window.addEventListener('load', doRefresh); }
    setTimeout(doRefresh, 1600);
    setTimeout(doRefresh, 3800);

    initSnap();
  }

  /* ---------- سكرول بالصفحات (Snap): كل لفّة = صفحة كاملة ---------- */
  function initSnap() {
    if (reduce || !lenis) return;
    var targets = Array.prototype.slice.call(document.querySelectorAll('.page'));
    var footer = document.querySelector('.footer'); if (footer) targets.push(footer);
    if (targets.length < 2) return;

    // نحفظ المواضع + نحدّد الأقسام الأطول من الشاشة (محتوى كتير زي الأعمال) عشان تسكرول طبيعي جوّاها بدل ما تتقص
    var offsets = [], tall = [];
    function measure() {
      var vh = window.innerHeight;
      offsets = []; tall = [];
      targets.forEach(function (t) {
        offsets.push(t.offsetTop);
        var isTall = t.offsetHeight > vh + 20;
        tall.push(isTall);
        t.classList.toggle('page--tall', isTall);   // .page--tall = position:relative فبيسكرول كامل
      });
    }
    measure();
    window.addEventListener('resize', measure);
    snapRemeasure = measure;   // عشان نعيد القياس بعد الفلترة

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
    // داخل قسم طويل ولسه فيه محتوى في اتجاه السكرول؟ → سيب السكرول الطبيعي (مايتسنّابش)
    function freeScroll(down) {
      var i = current();
      if (!tall[i]) return false;
      var r = targets[i].getBoundingClientRect(), vh = window.innerHeight;
      return down ? (r.bottom > vh + 8) : (r.top < -8);
    }
    // السنّاب للديسكتوب الواسع بس (مؤشر دقيق + عرض > 1024). التابلت/الموبايل = سكرول طبيعي.
    function snapActive() { return fine && window.innerWidth > 1024; }
    window.addEventListener('wheel', function (e) {
      if (modalOpen || !snapActive()) return;
      if (Math.abs(e.deltaY) < 6) return;
      if (freeScroll(e.deltaY > 0)) return;   // سكرول طبيعي جوّه القسم الطويل
      e.preventDefault();
      go(e.deltaY > 0 ? 1 : -1);
    }, { passive: false });
    window.addEventListener('keydown', function (e) {
      if (modalOpen || !snapActive()) return;
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') { if (freeScroll(true)) return; e.preventDefault(); go(1); }
      else if (e.key === 'ArrowUp' || e.key === 'PageUp') { if (freeScroll(false)) return; e.preventDefault(); go(-1); }
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
    },
    gold: {
      liveUrl: "https://gold-skincare.vercel.app", liveLabel: "visit",
      cover: "assets/work/covers/gold-skincare-store.jpg",
      gallery: ["assets/work/covers/gold-skincare-store.jpg"],
      cat: { en: "E-commerce", ar: "متجر إلكتروني" }, year: "2025",
      client: { en: "Gold Skincare", ar: "Gold Skincare" },
      title: { en: "Gold Skincare", ar: "Gold Skincare" },
      summary: { en: "A full skincare e-commerce store: category browsing, cart, orders & checkout, and an admin dashboard — Next.js + Prisma + PostgreSQL.", ar: "متجر إلكتروني متكامل للعناية بالبشرة: تصفّح بالتصنيفات، سلة، طلبات ودفع، ولوحة تحكم — Next.js + Prisma + PostgreSQL." },
      problem: { en: "The brand needed a professional store to showcase products and manage orders, checkout, and inventory smoothly without off-the-shelf platforms.", ar: "العلامة تحتاج متجرًا احترافيًا يعرض المنتجات ويدير الطلبات والدفع والمخزون بسلاسة دون اعتماد على منصّات جاهزة." },
      solution: { en: "Built a Next.js + Prisma + PostgreSQL store: category browsing, cart, checkout (COD/online), order tracking, and a full admin dashboard for products and orders.", ar: "بنيت متجر Next.js + Prisma + PostgreSQL: تصفّح بالتصنيفات، سلة، إتمام طلب (دفع عند الاستلام/إلكتروني)، تتبّع الطلب، ولوحة تحكم أدمن كاملة لإدارة المنتجات والطلبات." },
      results: { en: "A sell-ready store with a smooth buying experience and full self-service management from the dashboard.", ar: "متجر جاهز للبيع بتجربة شراء سلسة وإدارة كاملة ذاتية من لوحة التحكم." },
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Vercel"],
      metrics: [{ v: "Live", l: { en: "live store", ar: "متجر مباشر" } }, { v: "Mobile-first", l: { en: "mobile-first UX", ar: "تجربة الجوال أولًا" } }, { v: "Fast", l: { en: "fast checkout", ar: "دفع سريع" } }]
    },
    pizza: {
      liveUrl: "https://pizza-height.vercel.app", liveLabel: "visit",
      cover: "assets/work/covers/pizza-height.jpg",
      gallery: ["assets/work/covers/pizza-height.jpg"],
      cat: { en: "Restaurant", ar: "مطعم" }, year: "2025",
      client: { en: "Pizza Height", ar: "Pizza Height" },
      title: { en: "Pizza Height", ar: "Pizza Height" },
      summary: { en: "An interactive site for an artisan pizza brand with cinematic motion and an elegant ordering experience.", ar: "موقع تفاعلي لمطعم بيتزا حرفي بتأثيرات حركية سينمائية وتجربة طلب أنيقة." },
      problem: { en: "The restaurant needed a premium digital presence that reflects its artisan quality and drives direct orders.", ar: "المطعم يحتاج حضورًا رقميًا فاخرًا يعكس جودة منتجه الحرفي ويشجّع على الطلب مباشرة." },
      solution: { en: "Built a Next.js site with a cinematic hero and Framer Motion effects, interactive menu/story/locations sections, and a smooth fully-responsive ordering flow.", ar: "بنيت موقع Next.js بهيرو سينمائي وتأثيرات Framer Motion، أقسام تفاعلية للقائمة والقصة والفروع، وتجربة طلب سلسة ريسبونسيف بالكامل." },
      results: { en: "A standout visual experience that builds brand trust and makes browsing and ordering more compelling.", ar: "تجربة بصرية مميّزة ترفع الثقة بالعلامة وتجعل تصفّح القائمة والطلب أكثر إقناعًا." },
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      metrics: [{ v: "Live", l: { en: "live site", ar: "موقع مباشر" } }, { v: "Motion", l: { en: "smooth motion", ar: "حركة سلسة" } }, { v: "100%", l: { en: "responsive", ar: "متجاوب" } }]
    },
    bright: {
      liveUrl: "https://bright-dental-clinic.vercel.app", liveLabel: "visit",
      cover: "assets/work/covers/bright-dental-clinic.jpg",
      gallery: ["assets/work/covers/bright-dental-clinic.jpg"],
      cat: { en: "Clinic / Booking", ar: "عيادة / حجز" }, year: "2025",
      client: { en: "Bright Dental", ar: "Bright Dental" },
      title: { en: "Bright Dental", ar: "Bright Dental" },
      summary: { en: "A premium Arabic dental clinic site with an elegant UI, appointment booking, doctors and services.", ar: "موقع عيادة أسنان فاخر بواجهة عربية أنيقة ونظام حجز مواعيد وعرض الأطباء والخدمات." },
      problem: { en: "The clinic needed a reassuring digital presence that makes booking effortless without phone calls.", ar: "العيادة تحتاج حضورًا رقميًا يطمئن المريض ويسهّل حجز المواعيد دون اتصال هاتفي." },
      solution: { en: "A Next.js site with a premium Arabic (RTL) UI, an appointment booking system, doctor/service pages, and a calm, trustworthy design.", ar: "موقع Next.js بواجهة عربية فاخرة (RTL)، نظام حجز مواعيد، صفحات أطباء وخدمات، وتصميم يبعث على الثقة والراحة." },
      results: { en: "An easier booking experience and a professional image that boosts patient trust.", ar: "تجربة حجز أسهل وصورة احترافية ترفع ثقة المرضى بالعيادة." },
      tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
      metrics: [{ v: "Booking", l: { en: "online booking", ar: "حجز أونلاين" } }, { v: "Live", l: { en: "live site", ar: "موقع مباشر" } }, { v: "100%", l: { en: "responsive", ar: "متجاوب" } }]
    },
    fastround: {
      liveUrl: "https://fgdmqhyclnaotgptkbkt.supabase.co/storage/v1/object/public/portfolio-media/projects/fast-round-guidelines.pdf", liveLabel: "pdf",
      cover: "assets/work/covers/fast-round-brand-identity.jpg",
      gallery: ["assets/work/g/fast-round-brand-identity-1.jpg", "assets/work/g/fast-round-brand-identity-2.jpg", "assets/work/g/fast-round-brand-identity-3.jpg", "assets/work/g/fast-round-brand-identity-4.jpg", "assets/work/g/fast-round-brand-identity-5.jpg", "assets/work/g/fast-round-brand-identity-6.jpg", "assets/work/g/fast-round-brand-identity-7.jpg", "assets/work/g/fast-round-brand-identity-8.jpg", "assets/work/g/fast-round-brand-identity-9.jpg", "assets/work/g/fast-round-brand-identity-10.jpg"],
      cat: { en: "Brand Identity", ar: "هوية بصرية" }, year: "2025",
      client: { en: "Fast Round", ar: "Fast Round" },
      title: { en: "Fast Round", ar: "Fast Round" },
      summary: { en: "The full brand identity guidelines for Fast Round — logo, colors, typography, and applications.", ar: "دليل الهوية البصرية الكامل لعلامة Fast Round — الشعار، الألوان، الخطوط، والتطبيقات." },
      problem: { en: "The brand needed a complete, unified identity expressing the speed and energy of its service.", ar: "احتاجت العلامة هوية متكاملة وموحّدة تعبّر عن سرعة الخدمة وحيويتها." },
      solution: { en: "We built a full identity system with a distinctive logo, a vibrant color palette, clear usage guidelines, and practical applications.", ar: "بنينا نظام هوية كامل بشعار مميز ولوحة ألوان حيوية ودليل استخدام واضح وتطبيقات عملية." },
      results: { en: "A cohesive, professional identity ready to apply across every touchpoint.", ar: "هوية احترافية متماسكة جاهزة للتطبيق على كل نقاط التواصل." },
      tech: ["Adobe Illustrator", "Photoshop", "InDesign"],
      metrics: [{ v: "Identity", l: { en: "full identity", ar: "هوية كاملة" } }, { v: "Guidelines", l: { en: "brand guidelines", ar: "دليل الهوية" } }, { v: "Print", l: { en: "print-ready", ar: "جاهز للطباعة" } }]
    },
    jun: {
      liveUrl: "https://fgdmqhyclnaotgptkbkt.supabase.co/storage/v1/object/public/portfolio-media/projects/jun-company-profile.pdf", liveLabel: "pdf",
      cover: "assets/work/covers/jun-company-profile.jpg",
      gallery: ["assets/work/g/jun-company-profile-1.jpg", "assets/work/g/jun-company-profile-2.jpg", "assets/work/g/jun-company-profile-3.jpg", "assets/work/g/jun-company-profile-4.jpg", "assets/work/g/jun-company-profile-5.jpg", "assets/work/g/jun-company-profile-6.jpg", "assets/work/g/jun-company-profile-7.jpg", "assets/work/g/jun-company-profile-8.jpg", "assets/work/g/jun-company-profile-9.jpg", "assets/work/g/jun-company-profile-10.jpg"],
      cat: { en: "Company Profile", ar: "بروفايل شركة" }, year: "2025",
      client: { en: "JUN", ar: "JUN" },
      title: { en: "JUN Profile", ar: "بروفايل JUN" },
      summary: { en: "A professional 35-page company profile for JUN real estate & contracting.", ar: "تصميم بروفايل شركة احترافي (35 صفحة) لشركة جون التجارية والعقارية للمقاولات." },
      problem: { en: "The company needed a profile that presents its services and projects professionally to clients and partners.", ar: "الشركة تحتاج بروفايلًا يعرض خدماتها ومشاريعها باحترافية تليق بها أمام العملاء والشركاء." },
      solution: { en: "Designed a 35-page profile with a cohesive identity: cover, vision/mission, services, projects, and contact — with a premium layout.", ar: "صمّمت بروفايل 35 صفحة بهوية متناسقة: غلاف، رؤية/رسالة، الخدمات، المشاريع، وبيانات التواصل — بإخراج فاخر." },
      results: { en: "A professional profile that strengthens the company's credibility in tenders and meetings.", ar: "بروفايل احترافي يعزّز مصداقية الشركة في العطاءات والاجتماعات." },
      tech: ["Adobe InDesign", "Photoshop", "Illustrator"],
      metrics: [{ v: "Profile", l: { en: "company profile", ar: "بروفايل شركة" } }, { v: "Real estate", l: { en: "real estate & contracting", ar: "عقارات ومقاولات" } }, { v: "Print", l: { en: "print-ready", ar: "جاهز للطباعة" } }]
    },
    yasmina: {
      liveUrl: "https://fgdmqhyclnaotgptkbkt.supabase.co/storage/v1/object/public/portfolio-media/projects/yasmina-brochure.pdf", liveLabel: "pdf",
      cover: "assets/work/covers/yasmina-brochure.jpg",
      gallery: ["assets/work/g/yasmina-brochure-1.jpg", "assets/work/g/yasmina-brochure-2.jpg", "assets/work/g/yasmina-brochure-3.jpg", "assets/work/g/yasmina-brochure-4.jpg", "assets/work/g/yasmina-brochure-5.jpg", "assets/work/g/yasmina-brochure-6.jpg", "assets/work/g/yasmina-brochure-7.jpg", "assets/work/g/yasmina-brochure-8.jpg", "assets/work/g/yasmina-brochure-9.jpg", "assets/work/g/yasmina-brochure-10.jpg"],
      cat: { en: "Brochure", ar: "بروشور" }, year: "2025",
      client: { en: "Ecobuild Developments", ar: "إيكوبيلد" },
      title: { en: "Al-Yasmina", ar: "الياسمينة" },
      summary: { en: "A premium 14-page real-estate brochure for the 'Al-Yasmina' project by Ecobuild.", ar: "تصميم بروشور عقاري فاخر (14 صفحة) لمشروع «الياسمينا» السكني من Ecobuild." },
      problem: { en: "The developer needed a brochure that presents the project and its units attractively to drive sales.", ar: "المطوّر يحتاج بروشورًا يقدّم المشروع ووحداته بشكل جذّاب يحفّز على الشراء." },
      solution: { en: "Designed a 14-page brochure with 3D renders, unit layouts, and features, in an elegant green identity.", ar: "صمّمت بروشور 14 صفحة بصور ريندر ثلاثية الأبعاد، مخططات الوحدات، والمميّزات، بهوية خضراء أنيقة." },
      results: { en: "A premium marketing asset that highlights the project's value and supports the buying decision.", ar: "أداة تسويقية فاخرة تبرز قيمة المشروع وتدعم قرار الشراء." },
      tech: ["Adobe InDesign", "Photoshop", "3D Visualization"],
      metrics: [{ v: "Brochure", l: { en: "property brochure", ar: "بروشور عقاري" } }, { v: "3D", l: { en: "3D visualization", ar: "تصوّر ثلاثي الأبعاد" } }, { v: "Print", l: { en: "print-ready", ar: "جاهز للطباعة" } }]
    },
    optima: {
      cover: "assets/work/covers/optima-eye-clinic-social.jpg",
      gallery: ["assets/work/g/optima-eye-clinic-social-1.jpg"],
      cat: { en: "Social Media", ar: "سوشيال ميديا" }, year: "2025",
      client: { en: "Optima Eye Clinic", ar: "عيادة Optima للعيون" },
      title: { en: "Optima Eye", ar: "Optima Eye" },
      summary: { en: "An awareness social media design for an eye clinic highlighting the importance of eye care.", ar: "تصميم سوشيال ميديا توعوي لعيادة عيون يبرز أهمية العناية بالبصر." },
      problem: { en: "The clinic needed eye-catching awareness content encouraging eye care.", ar: "احتاجت العيادة محتوى توعويًا لافتًا يشجّع على العناية بالعيون." },
      solution: { en: "We designed a 3D scene with vibrant colors, a clear message, and brand elements.", ar: "صممنا مشهدًا ثلاثي الأبعاد بألوان حيوية ورسالة واضحة وعناصر العلامة." },
      results: { en: "A striking design that raised audience awareness and engagement with the clinic.", ar: "تصميم لافت رفع وعي الجمهور وتفاعله مع العيادة." },
      tech: ["Photoshop", "Cinema 4D"],
      metrics: [{ v: "Social", l: { en: "social media", ar: "سوشيال ميديا" } }, { v: "3D", l: { en: "3D visuals", ar: "عناصر ثلاثية الأبعاد" } }, { v: "Brand", l: { en: "on-brand", ar: "متّسق مع الهوية" } }]
    },
    social1: {
      cover: "assets/work/covers/social-media-designs-1.jpg",
      gallery: ["assets/work/g/social-media-designs-1-1.jpg", "assets/work/g/social-media-designs-1-2.jpg", "assets/work/g/social-media-designs-1-3.jpg", "assets/work/g/social-media-designs-1-4.jpg", "assets/work/g/social-media-designs-1-5.jpg", "assets/work/g/social-media-designs-1-6.jpg", "assets/work/g/social-media-designs-1-7.jpg", "assets/work/g/social-media-designs-1-8.jpg", "assets/work/g/social-media-designs-1-9.jpg", "assets/work/g/social-media-designs-1-10.jpg"],
      cat: { en: "Social Media", ar: "سوشيال ميديا" }, year: "2025",
      client: { en: "Various clients", ar: "عملاء متنوّعون" },
      title: { en: "Social Designs · I", ar: "تصاميم سوشيال · ١" },
      summary: { en: "A selected collection of social media designs for various brands.", ar: "مجموعة مختارة من تصاميم السوشيال ميديا لعلامات تجارية متنوّعة." },
      problem: { en: "Brands need consistent, eye-catching visual content that builds identity and boosts social engagement.", ar: "العلامات التجارية تحتاج محتوى بصري ثابت وجذّاب يبني هويتها ويزيد التفاعل على السوشيال ميديا." },
      solution: { en: "Designed a variety of social posts (offers, occasions, ads) with a consistent visual identity and engaging styles per brand.", ar: "صمّمت منشورات سوشيال ميديا متنوّعة (عروض، مناسبات، إعلانات) بهوية بصرية متّسقة وأساليب جذّابة لكل علامة." },
      results: { en: "Professional visual content that strengthens brand presence and lifts engagement.", ar: "محتوى بصري احترافي يعزّز حضور العلامة ويرفع التفاعل." },
      tech: ["Adobe Photoshop", "Illustrator"],
      metrics: [{ v: "Posts", l: { en: "social posts", ar: "بوستات سوشيال" } }, { v: "Brand", l: { en: "on-brand", ar: "متّسق مع الهوية" } }, { v: "Vol. 1", l: { en: "collection", ar: "مجموعة" } }]
    },
    social2: {
      cover: "assets/work/covers/social-media-designs-2.jpg",
      gallery: ["assets/work/g/social-media-designs-2-1.jpg", "assets/work/g/social-media-designs-2-2.jpg", "assets/work/g/social-media-designs-2-3.jpg", "assets/work/g/social-media-designs-2-4.jpg", "assets/work/g/social-media-designs-2-5.jpg", "assets/work/g/social-media-designs-2-6.jpg", "assets/work/g/social-media-designs-2-7.jpg", "assets/work/g/social-media-designs-2-8.jpg", "assets/work/g/social-media-designs-2-9.jpg", "assets/work/g/social-media-designs-2-10.jpg"],
      cat: { en: "Social Media", ar: "سوشيال ميديا" }, year: "2025",
      client: { en: "Various clients", ar: "عملاء متنوّعون" },
      title: { en: "Social Designs · II", ar: "تصاميم سوشيال · ٢" },
      summary: { en: "Another collection of social media designs for various brands and occasions.", ar: "مجموعة أخرى من تصاميم السوشيال ميديا لعلامات ومناسبات متنوّعة." },
      problem: { en: "Brands need consistent, eye-catching visual content that builds identity and boosts social engagement.", ar: "العلامات التجارية تحتاج محتوى بصري ثابت وجذّاب يبني هويتها ويزيد التفاعل على السوشيال ميديا." },
      solution: { en: "Designed a variety of social posts (offers, occasions, ads) with a consistent visual identity and engaging styles per brand.", ar: "صمّمت منشورات سوشيال ميديا متنوّعة (عروض، مناسبات، إعلانات) بهوية بصرية متّسقة وأساليب جذّابة لكل علامة." },
      results: { en: "Professional visual content that strengthens brand presence and lifts engagement.", ar: "محتوى بصري احترافي يعزّز حضور العلامة ويرفع التفاعل." },
      tech: ["Adobe Photoshop", "Illustrator"],
      metrics: [{ v: "Posts", l: { en: "social posts", ar: "بوستات سوشيال" } }, { v: "Brand", l: { en: "on-brand", ar: "متّسق مع الهوية" } }, { v: "Vol. 2", l: { en: "collection", ar: "مجموعة" } }]
    },
    logo: {
      cover: "assets/work/covers/logo-design-collection.jpg",
      gallery: ["assets/work/g/logo-design-collection-1.jpg", "assets/work/g/logo-design-collection-2.jpg", "assets/work/g/logo-design-collection-3.jpg", "assets/work/g/logo-design-collection-4.jpg", "assets/work/g/logo-design-collection-5.jpg", "assets/work/g/logo-design-collection-6.jpg"],
      cat: { en: "Logo & Brand Mark", ar: "شعارات وهوية" }, year: "2025",
      client: { en: "Various clients", ar: "عملاء متنوّعون" },
      title: { en: "Logo Collection", ar: "مجموعة شعارات" },
      summary: { en: "A collection of logos I designed for various brands.", ar: "مجموعة من الشعارات التي صمّمتها لعلامات تجارية متنوّعة." },
      problem: { en: "Every brand needs a distinctive logo that expresses it and sticks in customers' minds.", ar: "كل علامة تجارية تحتاج شعارًا مميّزًا يعبّر عنها ويترسّخ في ذهن العميل." },
      solution: { en: "Designed logos with thoughtful visual concepts per brand — simple, distinctive, and application-ready across media.", ar: "صمّمت شعارات بمفاهيم بصرية مدروسة لكل علامة — بساطة، تميّز، وقابلية للتطبيق على كل الوسائط." },
      results: { en: "Strong logos that build a clear identity and leave a lasting impression.", ar: "شعارات قوية تبني هوية واضحة وتترك انطباعًا يدوم." },
      tech: ["Adobe Illustrator", "Photoshop"],
      metrics: [{ v: "Logos", l: { en: "logo marks", ar: "شعارات" } }, { v: "Brand", l: { en: "brand identity", ar: "هوية بصرية" } }, { v: "Vector", l: { en: "scalable vector", ar: "فيكتور قابل للتكبير" } }]
    }
  };
  var WM = {
    en: { problem: 'The Problem', solution: 'The Solution', results: 'Results & Impact', tech: 'Technologies', gallery: 'Inside the project', live: 'Visit live site', pdf: 'View the full PDF', close: 'Close' },
    ar: { problem: 'المشكلة', solution: 'الحل', results: 'النتائج والأثر', tech: 'التقنيات المستخدمة', gallery: 'جوّه المشروع', live: 'زيارة الموقع المباشر', pdf: 'عرض الملف كامل (PDF)', close: 'إغلاق' }
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
    var live = p.liveUrl ? '<a class="btn btn--primary wm__live" href="' + p.liveUrl + '" target="_blank" rel="noopener">' + (p.liveLabel === 'pdf' ? L.pdf : L.live) + ' ↗</a>' : '';
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

  /* ---------- فلتر الأعمال (الكل / برمجة / تصميم) ---------- */
  (function () {
    var btns = document.querySelectorAll('.wf-btn');
    if (!btns.length) return;
    var cards = document.querySelectorAll('#work .work-card');
    // معلومات تحت كل تايل: اسم (يسار) + السنة (يمين) — مع حقن السنة من بيانات المشروع
    cards.forEach(function (c) {
      var lnk = c.querySelector('.work-card__link');
      var k = lnk && lnk.getAttribute('data-project');
      var body = c.querySelector('.work-card__body');
      var h3 = body && body.querySelector('h3');
      if (!body || !h3 || body.querySelector('.work-card__top')) return;
      var top = document.createElement('div');
      top.className = 'work-card__top';
      h3.parentNode.insertBefore(top, h3);
      top.appendChild(h3);
      var yr = (k && PROJECTS[k] && PROJECTS[k].year) || '';
      if (yr) {
        var ys = document.createElement('span');
        ys.className = 'work-card__year';
        ys.textContent = yr;
        top.appendChild(ys);
      }
    });
    // عدّاد المشاريع فوق الفلتر
    var grid = document.querySelector('.work-grid');
    var filter = document.querySelector('.work-filter');
    if (grid && filter) {
      var lang = curLang();
      var cnt = document.createElement('span');
      cnt.className = 'work-count';
      cnt.innerHTML = cards.length + ' <span data-i18n="work.projects">' + (((T[lang] || T.en)['work.projects']) || 'Projects') + '</span>';
      filter.parentNode.insertBefore(cnt, filter);
    }
    // دائرة "View ↗" تتبع الماوس فوق المعرض (ديسكتوب فقط)
    if (grid && fine && !reduce) {
      var wc = document.createElement('div');
      wc.className = 'work-cursor';
      document.body.appendChild(wc);
      grid.addEventListener('mousemove', function (e) { wc.style.left = e.clientX + 'px'; wc.style.top = e.clientY + 'px'; });
      grid.addEventListener('mouseover', function (e) { if (e.target.closest && e.target.closest('.work-card:not(.is-hidden)')) wc.classList.add('is-on'); });
      grid.addEventListener('mouseout', function (e) { var to = e.relatedTarget; if (!to || !to.closest || !to.closest('.work-card')) wc.classList.remove('is-on'); });
      grid.addEventListener('mouseleave', function () { wc.classList.remove('is-on'); });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var f = b.getAttribute('data-filter');
        btns.forEach(function (x) { x.classList.toggle('is-active', x === b); });
        cards.forEach(function (c) {
          var show = (f === 'all') || (c.getAttribute('data-wtype') === f);
          c.classList.toggle('is-hidden', !show);
        });
        if (snapRemeasure) snapRemeasure();          // ارتفاع القسم اتغيّر → أعِد قياس السنّاب
        if (hasST) { try { ScrollTrigger.refresh(); } catch (e) {} }
      });
    });
  })();
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

  /* ---------- تفاعل الماوس مع اسم الهيرو (parallax خفيف) ---------- */
  if (fine && !reduce) {
    var heroSec = document.getElementById('hero');
    var lockEl = document.querySelector('.hero__lockup');
    if (heroSec && lockEl) {
      heroSec.addEventListener('mousemove', function (e) {
        var dx = (e.clientX / window.innerWidth - .5) * 18;
        var dy = (e.clientY / window.innerHeight - .5) * 12;
        lockEl.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)';
      });
      heroSec.addEventListener('mouseleave', function () { lockEl.style.transform = ''; });
    }
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
