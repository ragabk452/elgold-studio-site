# ELGOLD STUDIO

**🔗 Live: [elgold-1.vercel.app](https://elgold-1.vercel.app)**

A premium, bilingual (English / Arabic) one‑page portfolio for **ELGOLD STUDIO** — a personal design + development studio led by **Kareem Ragab**, specialising in SaaS platforms, CRM systems and dashboards.

## Features
- **Cinematic loader** + full‑page **cover scroll** (sections stack over each other on desktop).
- **Bilingual EN / AR** with full RTL support (toggle, persisted in `localStorage`).
- **Works gallery** — 13 real projects (design + development) in a dark, modern grid with an **All / Development / Design** filter, a cursor‑following *View* affordance, and in‑page **case‑study modals** (cover, problem / solution / results, tech, image gallery, live or PDF link).
- Sections: hero, trusted‑by, services, works, process, tech stack, why, **studio / about**, testimonials, contact.
- **Contact form** → WhatsApp, plus direct **PayPal (card)** and **InstaPay** payment.
- Performance‑tuned: self‑hosted libraries + fonts, optimised/lazy images, GPU‑friendly effects, reduced‑motion support, mobile‑light mode, and cache‑busting so visitors always get the latest build.

## Tech
Vanilla **HTML5 / CSS3 / JavaScript** · **GSAP** + ScrollTrigger · **Lenis** smooth scroll. No build step, no framework.

## Run locally
```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

## Structure
```
index.html          # the page
css/                # tokens · style · responsive
js/main.js          # loader · i18n · cover/snap scroll · works filter · case‑study modal · form
assets/             # fonts · libraries (gsap/scrolltrigger/lenis) · project images · founder photo
```

---
© ELGOLD STUDIO — Kareem Ragab
