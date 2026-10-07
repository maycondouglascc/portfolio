# Analytics

Analytics and session recording setup for the portfolio.

---

## Google Analytics

**Implementation:** `index.html` (loaded globally, outside React)
**Tracking ID:** `G-010LYS365T`
**Method:** `gtag.js` script tag

```html
<!-- index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-010LYS365T"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-010LYS365T');
</script>
```

Page views are tracked automatically because React Router updates the URL (GA4 fires on history changes with the standard config).

**No custom event tracking** implemented currently.

---

## Microsoft Clarity

**Implementation:** `src/main.tsx` (React entry point)
**Environment variable:** `VITE_CLARITY_PROJECT_ID`
**Tracking ID:** `vgvl92p4uo` (stored in `.env`)

```ts
// main.tsx
import Clarity from "@microsoft/clarity"
Clarity.init(import.meta.env.VITE_CLARITY_PROJECT_ID)
```

Clarity provides:
- Session recordings (heatmaps, click maps)
- User behavior insights
- Rage click detection
- Scroll depth tracking

---

## Privacy Notes

- Neither GA nor Clarity collects personally identifiable information (PII) from portfolio visitors
- No cookie consent banner implemented (evaluate based on target market regulations)
- GA4 is configured with default anonymization settings

---

## Removing/Replacing Analytics

To remove Google Analytics: delete the two `<script>` tags in `index.html`.

To remove Clarity: remove the `Clarity.init()` call in `main.tsx` and uninstall `@microsoft/clarity`.

To replace with Plausible, Fathom, or similar privacy-first tools:
1. Remove gtag and Clarity
2. Add the new script per their documentation
3. Update `.env` with any required keys

---

## Local Development

Analytics fire in development too (if `.env` is configured). To suppress analytics locally:
- Option 1: Leave `.env` empty — Clarity won't initialize if the ID is undefined
- Option 2: Add an `import.meta.env.PROD` guard around analytics initialization

Currently there is no dev guard — analytics fire on localhost if the env vars are set.

---

## Visitor Geolocation & GitHub-Style Heatmap

**Implementation:**
- Serverless detection endpoint: `api/visitors.js` (reads Vercel `x-vercel-ip-city`, `x-vercel-ip-country`, `x-vercel-ip-country-region` headers)
- Client-side tracking service: `src/services/visitorService.ts` (with multi-tier fallbacks: session storage, serverless endpoint, public IP APIs, and Intl timezone heuristic)
- UI visualization: `src/components/VisitorHeatmap.tsx` (GitHub contribution graph + distribution bar for countries and cities)

**Privacy & Characteristics:**
- Anonymized: Only city and country are recorded/displayed; no IP address is stored or exposed.
- Palette-integrated: Uses `--palette-accent-...` for heatmap levels and distribution bar, tinting seamlessly with Studio, Tide, Moss, Clay, and Iris palettes.
- Localized: Full i18n support (`visitorStats` namespace in `en.ts` and `pt.ts`).
