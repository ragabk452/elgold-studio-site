# ELGOLD STUDIO — Client Brief (sent in parts)

> Status: RECEIVING PARTS. Do NOT start building until the user says "خلصت / finished".

---

## PART 1 — PROJECT VISION

**MISSION**
Build a portfolio that does not look like a portfolio. It should feel like the homepage of a premium technology company. Visitors should instantly trust ELGOLD STUDIO.

**PRIMARY OBJECTIVE**
The website exists for one reason: Generate high quality clients. Everything should support this objective.

**FIRST IMPRESSION**
The first three seconds are everything. The visitor should immediately understand: this developer builds premium products.

**DESIGN DIRECTION**
Do not create a busy website. Avoid unnecessary graphics. Avoid stock illustrations. Avoid random colors. Avoid excessive text.
Focus on: Whitespace, Motion, Typography, Depth, Glow, Lighting, Glass, Premium interactions.

**VISUAL STYLE**
Dark environment, large empty spaces, floating light, gradient mesh, soft shadows, rounded surfaces, glass cards, animated borders, noise texture, modern grids, subtle particles.

**EMOTIONAL GOALS**
Curious, Safe, Inspired, Impressed, Excited, Confident.

**USER JOURNEY**
Landing → Hero → Services → Projects → Technologies → Workflow → Testimonials → FAQ → CTA → Contact.

**CONTENT RULES**
Every sentence short. Easy to scan. No long paragraphs. No marketing nonsense. Every word increases trust.

**INTERACTION RULES**
Everything responds. Buttons react. Cards react. Cursor reacts. Sections animate. Scrolling feels physical.

**VISUAL RHYTHM**
Large spacing → Headline → Small text → Action → Animation → Whitespace. Repeat.

**MOTION RULES**
Motion feels alive. Nothing appears/disappears instantly. Use opacity, scale, blur, translate, parallax, depth.

**COLOR STRATEGY**
Use CSS Variables ONLY. Never hardcode colors. Everything themeable. Changing the brand color updates the entire website.

**TYPOGRAPHY**
Large headings. Minimal paragraphs. Perfect line height. Premium spacing. Strong hierarchy.

**PREMIUM DETAILS**
Glow follows the mouse. Background slowly moves. Gradient breathes. Cards slightly tilt. Buttons feel magnetic. Hover effects elegant. Nothing flashy.

**LOADING EXPERIENCE**
Cinematic open. Smooth loader. Logo reveal. Background fade. Hero reveal.

**SUCCESS METRIC**
A visitor should believe the website cost thousands of dollars. That is the minimum quality target.

---

## PART 2 — DESIGN SYSTEM (ELGOLD STUDIO V2)

**DESIGN PRINCIPLE:** Premium, modern, timeless. Avoid trendy UI that ages. Consistency above all. Every component follows the same visual language.

**DESIGN DNA:** Luxury, Minimal, Modern, Elegant, Interactive, Powerful, Creative, Technical, Premium.

**LAYOUT SYSTEM**
- Max width: 1440px · Content width: 1280px · Reading width: 720px
- Section padding: Desktop 160px top/bottom · Tablet 120px · Mobile 80px
- Container padding: Desktop 32px · Tablet 24px · Mobile 20px

**GRID:** Desktop 12 cols · Tablet 8 · Mobile 4. Use CSS Grid. Avoid nested grids unless necessary.

**SPACING SCALE (only these):** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 120, 160. Never random spacing.

**BORDER RADIUS:** Small 10px · Medium 18px · Large 28px · Hero cards 36px · Floating 999px.

**TYPOGRAPHY**
- Style: minimal, modern, large, confident.
- Headings: weight 800, slightly tight letter-spacing, line-height 1.05.
- Paragraphs: weight 400, line-height 1.8, max-width 680px.
- Small labels: uppercase, medium weight, wide letter-spacing.

**VISUAL HIERARCHY (each section):** Eyebrow → Headline → Description → Action → Content.

**CARD DESIGN:** Floating. Glass, soft border, background blur, soft glow, large radius, subtle shadow. Never flat.

**BUTTONS**
- Primary: filled, glow, animated, hover lift.
- Secondary: glass, border, soft glow.
- Text button: arrow animation, underline animation.

**ICONS:** Line icons. Not colorful. Animate on hover.

**SHADOWS:** Soft only. No hard shadows. Layer multiple, low opacity.

**GLOW:** Never aggressive. Appears on hover/active/CTA/hero/mouse-spotlight. Slowly breathes.

**GLASSMORPHISM:** Backdrop blur, transparent bg, thin border, soft reflection, large radius.

**BACKGROUND (alive):** Animated gradient, grid pattern, noise texture, glow, floating particles, moving blur, aurora. Everything moves slowly.

**CURSOR (desktop only):** Mouse spotlight, cursor glow, magnetic buttons, cursor scale, cursor text on interactive elements.

**ANIMATION SPEED:** Fast 0.25 · Normal 0.45 · Slow 0.8 · Premium 1.2. Nothing instant.

**MOTION STYLE:** Fade, blur, scale, translate, minimal rotate, parallax, reveal. Never bounce/shake/flash.

**SECTION TRANSITIONS (each differs):** Hero=Reveal · Projects=Slide · Services=Scale · Timeline=Progressive reveal · Testimonials=Fade.

**IMAGES:** Rounded corners, soft shadows, glass frame, lazy loaded, zoom on hover, parallax optional.

**INTERACTIONS:** Buttons hover · Cards tilt · Images zoom · Links underline animation · Icons rotate.

**COLOR SYSTEM:** No hardcoded colors. CSS Variables only. All themes replaceable; brand color updates instantly.

**CSS VARIABLES (list):** Background, Surface, Card, Glass, Border, Primary, Secondary, Accent, Text, Muted, Success, Warning, Danger, Glow, Gradient Start, Gradient End.

**RESPONSIVE:** Desktop first, tablet optimized, mobile dedicated. No overflow, no broken layouts.

**QUALITY CONTROL:** Perfect alignment, consistent spacing/radius/shadows/motion/typography. No random values.

**FINAL RULE:** Any new component MUST follow every rule here. Consistency > creativity.

---

## PART 3 — UI LAYOUT ARCHITECTURE (ELGOLD STUDIO V2)

**MAIN OBJECTIVE:** Premium interactive experience. Never feel like a normal portfolio. Each section = entering a new scene. Cinematic scrolling.

**PAGE STRUCTURE (final order):**
Loading Screen → Hero → Trusted By → Services → Featured Projects → Workflow → Technology Stack → Why Choose ELGOLD → Testimonials → FAQ → Final CTA → Footer.

**NAVIGATION:** Always fixed. Transparent initially. Blur/glass. Border-bottom on scroll. Height 84px. Desktop: Logo left, Nav center, CTA right. Mobile: hamburger → fullscreen menu animating from opacity + blur (NOT slide from left).

**SCROLL:** Smooth (Lenis). Natural spacing rhythm. NEVER CSS snap scrolling. No abrupt stopping.

**HERO:** Height 100vh, center aligned, two-column (desktop). Left: headline + description + buttons + statistics. Right: interactive visual + floating shapes + animated gradient + glass card. Communicates Premium/Modern/Innovation/Trust.
- Headline: max 3 lines, large, gradient highlight, animated reveal.
- Description: max 3 lines.
- Buttons: Primary + Secondary CTA, magnetic, hover glow.
- Background: animated aurora, noise, moving gradient, floating light, soft grid, mouse spotlight.

**TRUSTED BY:** Right below hero. Infinite logo marquee. Glass bg. Gradient fade edges. Hover enlarges logos.

**SERVICES:** Large title. 3–6 premium cards, grid. Enter one by one. Hover: lift, glow, border animation, tilt, icon animation.

**FEATURED PROJECTS:** Large premium cards, lots of space. Each: image, title, description, technology, result, CTA. Alternate left/right. Hover image zoom + animated overlay.

**WORKFLOW:** Timeline. Vertical desktop / horizontal mobile. Animated connecting line. Each step on scroll. Steps: Discover → Plan → Design → Develop → Launch.

**TECH STACK:** Large animated section. Infinite marquee. Icons float slightly, hover enlarges. No static grids.

**WHY CHOOSE ELGOLD:** Premium comparison. Metrics + animated counters. Feature cards. Glass panels.

**TESTIMONIALS:** Auto-moving carousel, pause on hover. Glass cards: avatar, company, review, rating.

**FAQ:** Accordion. Smooth height animation. Rotate icon. Only one open at a time.

**FINAL CTA:** Very dramatic. Huge typography. Animated glow. Gradient bg. Powerful CTA. Emotional peak of the site.

**FOOTER:** Large spacing, minimal. Logo, links, social, copyright. Background gradient.

**SPACING:** Each section min 160px vertical. Hero no margin. Footer extra breathing room.

**RESPONSIVE:** Desktop 2 cols · Tablet adaptive · Mobile single column. No horizontal scroll. Everything centered.

**VISUAL BALANCE:** Never two heavy sections together. Alternate Heavy → Light → Heavy → Light (rhythm).

**WHITE SPACE:** Part of the design. Never fill empty space. Luxury breathes.

**DEPTH SYSTEM (layers per section):** Background → Glow → Grid → Particles → Content → Floating decorations.

**SECTION RULE:** Each section: Eyebrow → Headline → Description → Interactive content → CTA (optional).

**VISUAL STORYTELLING (flow):** Arrival → Trust → Capabilities → Proof → Process → Technology → Confidence → Conversion. Never break this flow.

**FINAL EXPERIENCE:** Visitor feels they explored a premium product, not a personal portfolio.

---

## PART 4 — REFERENCE STYLE GUIDE (ELGOLD STUDIO V2)

**PROJECT GOAL:** Recreate the same premium feeling, visual rhythm, and interaction quality as the reference. Not a generic portfolio. Should feel like a luxury software company. Modern, elegant, immersive.

**OVERALL STYLE:** Dark, minimal, huge whitespace, premium typography, large rounded corners, glassmorphism, animated gradients, floating glow, cinematic scrolling, interactive mouse effects, soft lighting, layered depth.

**VISUAL DENSITY:** Never overload. Few elements per section. Large empty spaces = luxury. Quality over quantity.

**HERO:** Full viewport. Large bold headline. Short paragraph. Two premium CTAs. Interactive background + animated lighting + floating decorations + mouse spotlight. Very smooth entrance. Immediate "WOW".

**NAVIGATION:** Transparent at load. Glass blur. Minimal links. CTA right. Subtle change on scroll.

**SECTIONS:** Each = new scene. Large spacing. Eyebrow → Headline → Description → Interactive content. No clutter.

**CARDS:** Expensive feel. Rounded, soft shadows, glass bg, thin border, glow on hover, slight lift, gentle tilt, border animation.

**BACKGROUND:** Never static. Animated gradient mesh, noise, grid, soft light, floating blur circles, aurora. Very slow movement.

**ANIMATION:** Subtle, never flashy/aggressive. Fade, blur, scale, translate, parallax, reveal. Smooth easing. Premium feel.

**MOUSE:** Spotlight follows cursor. Magnetic buttons. Cards react softly. No exaggeration.

**BUTTONS:** Primary = filled, strong glow, rounded, hover lift, soft shadow. Secondary = glass, thin border, glow on hover.

**PROJECT CARDS:** Large screenshots, image zoom on hover, overlay animation, technology badges, clean typography, premium spacing.

**SERVICES:** Premium glass cards, animated icons, reveal on scroll, hover glow + lift, consistent spacing.

**SCROLL:** Smooth. Sections appear naturally, staggered reveals, cinematic. No sudden transitions.

**LIGHTING:** Part of the design. Soft glows, breathing gradients, mouse spotlight, subtle reflections. Never harsh.

**MICRO INTERACTIONS:** Everything responds — buttons, cards, icons, links, images, sections. Nothing static.

**RESPONSIVE:** Desktop premium. Tablet graceful. Mobile redesigned (not just resized).

**PERFORMANCE:** 60 FPS. GPU-accelerated transforms only. Avoid layout thrashing. Lazy load heavy assets.

**QUALITY TARGET:** Looks like a premium technology studio. Visitor thinks: "This company builds world-class digital products."

**⭐ IMPORTANT (key clarification):** Use the reference ONLY for inspiration re: overall mood, motion language, spacing philosophy, interaction quality, premium feeling. DO NOT reproduce another company's branding, content, graphics, or unique visual assets. **Build an ORIGINAL ELGOLD STUDIO experience.**

---

## PART 5 — HOME PAGE BLUEPRINT (ELGOLD STUDIO V2)

**PAGE GOAL:** One message — ELGOLD STUDIO builds premium digital products. Every section increases trust; every scroll increases curiosity.

**PAGE FLOW:** Loading → Navigation → Hero → Client Logos → Services → Featured Projects → Process → Technology → Why ELGOLD → Testimonials → FAQ → CTA → Footer.

**01 LOADING:** Purpose = anticipation. Max 1.5s. Logo + soft bg + glow + progress animation. Fade into hero.

**02 NAVBAR:** 84px. Sticky. Transparent on top, glass blur after scroll. Logo + Navigation + Primary CTA + Mobile menu.

**03 HERO:** 100vh, centered, max content 1280px.
- Left: eyebrow text · main headline · supporting paragraph · primary CTA · secondary CTA · trust badges.
- Right: interactive visual area.
- Background: animated gradient, soft glow, grid, noise, floating shapes.
- Headline: max 3 lines, large, high contrast. Paragraph: max 3 lines, simple. CTAs: primary + secondary, on one row (desktop).

**04 CLIENT LOGOS:** Build trust immediately. Infinite marquee, pause on hover. Logos monochrome by default, highlight on hover.

**05 SERVICES:** 3-col desktop / 2-col tablet / 1-col mobile. Card: icon, title, description, CTA. Hover: lift, glow, border animation.

**06 FEATURED PROJECTS:** Large showcase, significant space each. Card: preview, title, summary, technology, outcome, CTA. Alternate image position for rhythm.

**07 WORKFLOW:** Vertical timeline. Steps: Discover, Plan, Design, Develop, Launch. Each step animates independently.

**08 TECH STACK:** Animated icon cloud / infinite marquee. Technology badges. Hover enlarges.

**09 WHY ELGOLD:** Feature comparison cards. Animated counters. Key strengths. Clean layout.

**10 TESTIMONIALS:** Glass cards. Auto carousel. Pause on hover.

**11 FAQ:** Accordion. Smooth expand. Only one open.

**12 FINAL CTA:** Large headline, short message, primary CTA, animated glow background. Strongest conversion section.

**13 FOOTER:** Logo, quick links, social links, copyright. Minimal.

**GLOBAL RULES:** Every section starts Eyebrow → Headline → Description → Interactive content, and ends with enough whitespace. Nothing cramped.

**SUCCESS CRITERIA:** Within seconds the visitor understands: what ELGOLD does, why it's different, why it's trustworthy, how to start working with it.
