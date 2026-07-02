# Portfolio — "Digital Exhibition" (معمارية القسم)

قسم الأعمال (`#work`) اتعمل كـ**معرض رقمي**: كل مشروع "لوحة" تملى النظر، الوسيط (media) هو البطل، والمعلومات مساندة.
البناء على 4 مراحل. **الحالة: المرحلة 1 (هيكل ثابت) + المرحلة 2 (تفاعلات) مكتملتان.** المرحلة 3/4 لسه.

## الملفات
| الملف | المسؤولية |
|---|---|
| `index.html` (قسم `#work`) | الهيكل الثابت: `.exhibit-track` فيها 13 × `.exhibit` |
| `css/style.css` (بلوك `Exhibition`) | ستايل اللوحات + تنويعات النوع |
| `css/responsive.css` | سلوك الموبايل/التابلت للـ`.exhibit` |
| `js/main.js` | `applyWorks()` (CMS) · فتح المودال عبر `.exhibit__cta` · الفلتر + العدّاد + حقن السنة |

## المكوّن `.exhibit` ومسؤولية كل جزء
```
article.exhibit  [data-slug][data-type][data-wtype][data-accent][style=--i]
  .exhibit__inner
    figure.exhibit__media  [data-video]      ← الوسيط المهيمن (سلوت الفيديو)
      .exhibit__screen                        ← الإطار (نسبة/حواف حسب النوع)
        img.exhibit__img                      ← الغلاف/poster (fallback دائم)
    .exhibit__info                            ← محتوى مساند
      p.exhibit__meta  ( .exhibit__no · .exhibit__cat · .exhibit__year )
      h3.exhibit__title
      p.exhibit__desc
      ul.exhibit__stack > li…                 ← شرائح الـstack
      a.exhibit__cta  [data-project]          ← يفتح الـcase study
```

## الـ data-attributes (نقاط التوسّع بدون إعادة هيكلة)
- `data-slug` — مفتاح المشروع (يربط بـ `PROJECTS[slug]` و `portal_works`).
- `data-type` = `website | brand | social` — يحدّد تنويع العرض (CSS فقط). أضِف `app`/`uiux` لاحقًا = قاعدة CSS جديدة بس.
- `data-wtype` = `development | design` — للفلتر.
- `data-accent` = قيمة HSL خافتة (مكتومة، من عيلة الكحلي) — **محجوزة للإضاءة المحيطة في Phase 2** (غير مستخدمة بصريًا دلوقتي).
- `data-video` — فاضي دلوقتي؛ لمّا يتحط رابط فيديو، JS يحقن `<video muted loop playsinline preload=none poster=cover>` جوّه `.exhibit__screen` **بدون تغيير الهيكل**.
- `style="--i:N"` — ترتيب اللوحة (هيستخدمه سكرول Phase 2).
- توسعة مستقبلية (award / featured / category / filters): إضافة `data-*` جديد + قاعدة CSS، من غير لمس الهيكل.

## تدفّق البيانات
1. **النصوص** عبر `data-i18n` (قاموس `T` في main.js) — تشتغل بالعربي/الإنجليزي.
2. **الـCMS**: `portal_works` (Supabase) → `applyWorks()` بيحدّث العنوان/الغلاف/السنة/رابط الـCTA + يملأ `PROJECTS[slug]` (بيانات المودال) — انتقاء عبر `.exhibit[data-slug]`.
3. **السنة**: تتحقن من `PROJECTS[slug].year` لو مش جايّة من الـCMS.

## تنويعات النوع (نفس لغة التصميم)
- `website` → نسبة 16/10 + إطار متصفح خفيف (شريط + 3 نقاط).
- `brand` → نسبة 4/3 (لوحة عرض).
- `social` → نسبة 4/5 عمودي، أضيق، في المنتصف.

## توافق نظام السكرول
`#work` قسم `.page`؛ `initSnap → measure()` بيحوّله تلقائيًا لـ`.page--tall` (لأنه أطول من الشاشة) فيسكرول طبيعي جوّاه. **مفيش تدخّل يدوي مطلوب.**

## Phase 2 — التفاعلات (منفّذة) — `exhibitionFX()` في main.js + بلوك "Phase 2" في style.css
- **سكرول سينمائي:** لكل `.exhibit` تايم-لاين مربوط بالسكرول (scrub 0.6): تدخل (opacity .3→1, scale .955→1, y 52→0) → ثبات عند المنتصف → تخرج (تنحسر). النتيجة: لوحة واحدة مسيطرة. (ديسكتوب؛ الموبايل = fade-up بسيط once).
- **إضاءة محيطة:** طبقة `.work__ambient` (sticky، خلف المحتوى) لونها `--amb` يتغيّر للـ`data-accent` بتاع اللوحة النشطة (عبر ScrollTrigger)، تدرّج ناعم عبر `@property --amb`. ألوان مكتومة من عيلة الكحلي فقط.
- **كيرسر VIEW:** يعيد استخدام `.work-cursor`؛ يظهر فوق `.exhibit__media` ويخفي الكيرسر العام (`.exhibit-hovering`)، تتبّع سلس بـrAF. ديسكتوب فقط.
- **hover (CSS):** صورة scale 1.05 · العنوان يرتفع 6px · سهم الـCTA يتحرّك. الضغط على الوسيط يفتح الـcase study.
- كله محمي بـ`reduce`/اللمس؛ لا يغيّر بنية الـHTML.

## المراحل القادمة (مش منفّذة)
- **Phase 3:** استبدال المودال بـ overlay ملء الشاشة (GSAP FLIP + History API) + أقسام case study قابلة للتوسّع.
- **Phase 4:** أداء (تشغيل فيديو واحد + lazy) + a11y + موبايل + Lighthouse.
