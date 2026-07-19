# Architecture Decisions

Key decisions made during the project's development — what was chosen, what was rejected, and why. Preserved here so future contributors (and AI assistants) don't re-litigate settled questions.

---

## Styling: Tailwind CSS over CSS-in-JS

**Decision:** Use Tailwind CSS utility classes exclusively.

**Rejected:** Styled-components, Emotion, CSS Modules.

**Reason:**
- Smaller bundle (Tailwind purges unused classes)
- No runtime cost (unlike CSS-in-JS)
- Faster development with utility classes
- Easier dark mode with `dark:` variants
- Consistent with modern React ecosystem patterns

**Implication:** Never introduce styled-components or CSS Modules. All styling is inline `className`.

---

## State Management: React Context over Redux/Zustand

**Decision:** Use React Context API for theme and language state.

**Rejected:** Redux, Zustand, Jotai.

**Reason:**
- The app has only 2 global state concerns (theme, language)
- Context is sufficient and has zero dependencies
- Redux would add 50+ KB for no meaningful benefit
- Zustand would be fine but is unnecessary overhead

**Implication:** If global state needs grow beyond theme + language, evaluate adding Zustand at that point.

---

## i18n: Custom Context over react-i18next

**Decision:** Custom `LanguageContext` with dot-path type-safe `t()` function.

**Rejected:** react-i18next, react-intl, lingui.

**Reason:**
- Only 2 languages to support
- TypeScript compile-time key checking is more valuable than i18n library features
- Zero dependency — no risk of breaking changes
- Simple interpolation `{param}` syntax is sufficient

**Implication:** If a third language is added or if pluralization/ICU format is needed, consider migrating to react-i18next.

---

## Animation: Motion (Framer Motion fork)

**Decision:** Use the `motion` package (maintained fork of Framer Motion).

**Rejected:** React Spring, GreenSock (GSAP), CSS-only animations.

**Reason:**
- Best-in-class React animation API
- `AnimatePresence` for route transitions is uniquely well-suited to this use case
- `motion` is the actively maintained fork after Framer Motion ownership change
- Type-safe and composable

**Implication:** Import from `"motion/react"`, not `"framer-motion"`.

---

## Content: Hardcoded TypeScript over CMS

**Decision:** Content lives in TypeScript files in `src/data/`.

**Rejected:** TinaCMS (was explored in branch `cms-implementation` and reverted), Contentful, Sanity.

**Reason:**
- Portfolio content changes infrequently
- CMS adds infrastructure complexity and cost
- TypeScript content is type-safe and version-controlled
- No need for non-technical content editors

**History:** TinaCMS was implemented (see commits from Feb 2025) but the branch was ultimately not merged to main. The content data files remain the source of truth.

**Implication:** Content updates require a code change + deploy. This is acceptable for a personal portfolio.

---

## Routing: React Router DOM (client-side SPA)

**Decision:** Single Page Application with React Router DOM v6.

**Rejected:** Next.js, Remix, Astro.

**Reason:**
- Portfolio is mostly static; SSR adds no meaningful SEO benefit for this use case
- Vite + React is simpler, faster to develop, and easier to maintain
- No server needed — deploys as static files to Vercel

**Implication:** All routing is client-side. `vercel.json` handles SPA rewrite for direct URL access.

---

## Build Tool: Vite over Create React App

**Decision:** Vite 7 as the build tool.

**Rejected:** Create React App (deprecated), Webpack custom config.

**Reason:**
- CRA is deprecated
- Vite is significantly faster (HMR, build times)
- Modern ES modules by default
- Simple configuration

---

## Font: Inter Variable (self-hosted)

**Decision:** Self-host Inter Variable font from `public/files/font/`.

**Rejected:** Google Fonts CDN.

**Reason:**
- Privacy (no third-party font requests)
- Reliability (no external CDN dependency)
- Performance (single font file covers all weights)
- GDPR-friendlier

---

## Images: WebP format, native lazy loading

**Decision:** Use WebP for all portfolio images; use native `loading="lazy"`.

**Rejected:** Next.js Image component, custom image optimization pipeline.

**Reason:**
- WebP gives ~30% smaller file size vs. JPEG
- Native lazy loading is supported in all modern browsers
- No need for a full image optimization pipeline for a personal portfolio

---

## TypeScript: Strict Mode

**Decision:** `"strict": true` in `tsconfig.json`, zero `any` policy.

**Reason:**
- Catches errors at compile time, not runtime
- Forces better API design (explicit types)
- Type-safe i18n paths are only possible with strict inference

**Implication:** Never use `any`. Use `unknown` + type guards when type is genuinely uncertain.

---

## Propostas comerciais: Vercel Blob + serverless (não no SPA React)

**Decision:** Propostas geradas pelo ProspectOS são HTML self-contained publicados no Vercel Blob (`propostas/{slug}.html`). A URL pública é `https://maycondouglas.work/proposta-{slug}`, servida por `api/proposta.js` via rewrite no `vercel.json` — fora do React Router.

**Rejected:** Commit de HTML em `public/` a cada lead; rota React que embute o conteúdo; proxy para localhost do CRM.

**Reason:**
- O lead precisa abrir o link fora da rede local do ProspectOS
- Publicação sob demanda sem redeploy do portfólio
- OG tags e WhatsApp in-app browser funcionam com HTML real (não shell SPA)

**Implication:** Configure `BLOB_READ_WRITE_TOKEN` no projeto Vercel do portfólio (e no `.env` do backend ProspectOS). URLs são públicas por design — quem tem o link lê a proposta.
