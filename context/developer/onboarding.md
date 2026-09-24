# Developer Onboarding

Getting started with the portfolio codebase — stack overview, local setup, and what to know before making your first change.

---

## Who This Project Belongs To

Personal portfolio of **Maycon Douglas** — Product Designer. The portfolio showcases case studies, work experience, and contact information. It is public-facing at [maycondouglas.work](https://maycondouglas.work).

---

## Prerequisites

- Node.js (modern, LTS recommended — ES2020 target)
- npm (package-lock.json is the lockfile; use npm, not yarn/pnpm)
- A code editor with TypeScript support (VSCode recommended)

---

## Local Setup

```bash
# Clone the repo
git clone <repo-url>
cd portfolio

# Install dependencies
npm install

# Start dev server (Vite, hot reload)
npm run dev
```

Dev server runs at `http://localhost:5173`.

---

## Tech Stack at a Glance

| Layer | Tool | Notes |
|-------|------|-------|
| Framework | React 18.3 | Hooks-first, no class components |
| Language | TypeScript 5.5 (strict) | All files `.ts` or `.tsx` |
| Build | Vite 7.3 | Fast HMR, manual chunking |
| Styling | Tailwind CSS 3.4 | No CSS Modules, no CSS-in-JS |
| Routing | React Router DOM 6.26 | Client-side SPA |
| Animation | Motion 12.34 | Formerly Framer Motion |
| Icons | react-feather | Tree-shakeable SVG icons |
| Dev tooling | DialKit | Animation parameter tuning (dev-only) |
| Deployment | Vercel | Auto-deploy from `main` |

---

## Project Structure

```
src/
  App.tsx              # Root: providers, routing, SettingsBar, PageTransition
  main.tsx             # ReactDOM entry point

  components/          # All reusable UI
    case-study/        # Sub-components for CaseStudy page only

  pages/
    Home.tsx           # Landing page
    CaseStudy.tsx      # Dynamic case study renderer

  context/
    AppearanceContext.tsx # palette state and operating system color scheme
    LanguageContext.tsx   # useLanguage() + t() hook

  data/
    projects.ts        # getProjects(language)
    experience.ts      # getExperience(language)
    case-studies/
      index.ts         # getCaseStudy(slug, language) + caseStudySlugs
      danone.tsx       # Danone North America case study
      gskpromx.tsx     # GSK ProMx case study

  locales/
    en.ts              # English strings
    pt.ts              # Portuguese strings

  assets/
    lottie/            # Lottie animation JSON files
    resume/            # PDF resumes

public/
  files/
    font/              # Inter Variable font files
```

---

## Key Hooks

```tsx
const { language, setLanguage, t } = useLanguage()
```

- `t("key.path")` — type-safe translation lookup
- Language and selected color palette are persisted to `localStorage`
- Light and dark appearance follow the operating system preference automatically

---

## Available Scripts

```bash
npm run dev        # Start Vite dev server (localhost:5173)
npm run build      # Production build → dist/
npm run preview    # Serve production build locally
npm run lint       # ESLint with zero-warning policy
```

---

## Environment Variables

`.env` is gitignored. Values used:

| Variable | Purpose |
|----------|---------|
| `VITE_CLARITY_PROJECT_ID` | Microsoft Clarity analytics project ID |

---

## Deployment

- Hosting: **Vercel**
- Auto-deploy: Pushes to `main` trigger production deploy
- SPA rewrite: `vercel.json` redirects all routes to `index.html`
- Domain: `maycondouglas.work`

---

## TypeScript Strictness

`tsconfig.json` has `"strict": true`. This means:
- No implicit `any`
- No implicit `this`
- Strict null checks
- Strict function types

If you add a new file, TypeScript will enforce all of these. Do not use `// @ts-ignore` or `any` unless absolutely necessary.

---

## ESLint

Zero-warning policy (`--max-warnings 0`). Rules include:
- No unused variables
- React hooks rules (exhaustive deps)
- React refresh compatibility

Run `npm run lint` before committing.

---

## Adding a New Case Study

1. Create `src/data/case-studies/your-slug.tsx`
2. Export a function matching the `CaseStudyData` type
3. Register it in `src/data/case-studies/index.ts`
4. Add the project entry in `src/data/projects.ts` with the same slug
5. Add translations if needed in `src/locales/en.ts` and `src/locales/pt.ts`

See `context/features/case-studies.md` for full details.

---

## Adding a New Component

1. Create `src/components/YourComponent.tsx`
2. Define props interface (explicit TypeScript types)
3. Use `useLanguage()` for any user-facing strings
4. Include `dark:` variants for all color classes
5. Add `aria-label` or visible labels for interactive elements
6. Document the component in `context/design/components.md`
