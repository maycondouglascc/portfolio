# Development Workflow

Day-to-day workflow for developing, testing, and shipping changes to the portfolio.

---

## Daily Workflow

```bash
# 1. Start dev server
npm run dev

# 2. Make changes (hot reload is instant via Vite)

# 3. Lint before committing
npm run lint

# 4. Build to verify production output is clean
npm run build

# 5. Preview production build if needed
npm run preview

# 6. Commit and push to your branch
# 7. Open PR to main
```

---

## Branch Strategy

```
main                  ← production (auto-deploys to Vercel)
├── feat/...          ← new features
├── fix/...           ← bug fixes
├── chore/...         ← maintenance, tooling
├── refactor/...      ← code restructuring
└── docs/...          ← documentation only
```

**Never commit directly to `main`.** All changes go through PRs.

Active branches from git history:
- `organizing-project` — current branch (context/docs organization)
- `refactor` — in-progress refactoring work

---

## Making a Change

### Small fix or chore
1. Branch from `main`: `git checkout -b fix/your-description`
2. Make the change
3. `npm run lint` — fix any warnings
4. Commit with conventional message: `fix: correct footer link`
5. Push and open PR

### New feature
1. Branch from `main`: `git checkout -b feat/feature-name`
2. Implement in small, focused commits
3. Update `context/` docs if the feature introduces new patterns
4. Lint and build
5. Open PR with clear description of what changed and why

### New case study
See `context/features/case-studies.md` for the step-by-step process.

---

## PR Checklist

Before opening a PR, verify:

- [ ] `npm run lint` passes with zero warnings
- [ ] `npm run build` completes without errors
- [ ] All user-facing strings are translated (both `en.ts` and `pt.ts`)
- [ ] Dark mode works for any new UI
- [ ] New interactive elements have `aria-label` or visible labels
- [ ] No `any` types introduced
- [ ] No hardcoded strings in JSX
- [ ] Context docs updated if new patterns introduced

---

## Environment Variables

Copy `.env.example` to `.env` for local development (ask for values if needed):

```bash
VITE_CLARITY_PROJECT_ID=your_clarity_id
```

Prefix all variables with `VITE_` to expose them to the browser.

---

## Vite Dev Server

- Hot Module Replacement (HMR) is enabled — most changes are instant
- React Fast Refresh preserves component state during edits
- Port: `5173` (default)
- Proxy not required — fully client-side app

---

## Build Artifacts

`npm run build` outputs to `dist/`:
- HTML: `index.html`
- JS chunks: `router-[hash].js`, `lottie-[hash].js`, `index-[hash].js`, vendor chunk
- CSS: single optimized CSS file
- Compressed: `.gz` and `.br` variants of each JS/CSS file

Manual chunk split (from `vite.config.ts`):
- `router` → React Router DOM (changes infrequently, good for caching)
- `lottie` → Lottie library (large, changes infrequently)

---

## ESLint Configuration

File: `.eslintrc.cjs`

Key rules:
- `react-hooks/exhaustive-deps` — warns on missing hook dependencies
- `react-refresh/only-export-components` — warns for non-component default exports (HMR compatibility)
- Zero-warning policy: `--max-warnings 0`

Run the linter:
```bash
npm run lint

# Auto-fix what ESLint can fix:
npx eslint . --ext ts,tsx --fix
```

---

## Vercel Deployment

- **Trigger:** Push to `main` → automatic production deploy
- **Build command:** `npm run build` (auto-detected by Vercel)
- **Output directory:** `dist`
- **SPA routing:** `vercel.json` rewrites all paths to `index.html`
- **Preview deploys:** Every PR branch gets a preview URL automatically

---

## DialKit (Dev-Only)

DialKit is a dev-only panel for tuning animation parameters. It renders only when `import.meta.env.DEV` is true.

- Component: `PageTransitionDev.tsx`
- Provides sliders for: `enterDuration`, `exitDuration`, `enterDelay`, `childDelay`, `childStagger`
- Copy the final values into `PageTransition.tsx` once tuned

DialKit is stripped from production builds automatically (tree-shaken when dev condition is false).

---

## Analytics

- **Google Analytics:** gtag.js in `index.html` (ID: `G-010LYS365T`)
- **Microsoft Clarity:** initialized in `main.tsx` via `VITE_CLARITY_PROJECT_ID` env var
- Analytics are only active in production (Clarity checks `window.clarity` availability)
- No changes needed to analytics setup unless replacing tracking ID

---

## Debugging Tips

### Route not found locally
Make sure you're using `npm run dev` (Vite handles SPA routing). If using `npm run preview`, the Vite preview server also handles this. Issue would only appear if serving `dist/` with a plain static server.

### Theme not persisting
Check `localStorage` → key `"theme"`. Values: `"light"`, `"dark"`, `"system"`.

### Translation key not showing
1. Verify key exists in both `en.ts` and `pt.ts`
2. Check for typos in dot-path (TypeScript will catch this at compile time)
3. Check that `useLanguage()` is called within a `LanguageProvider`

### Case study not loading
1. Check the slug matches the key in `src/data/case-studies/index.ts`
2. Verify `caseStudySlugs` set includes the slug
3. Check the factory function returns valid `CaseStudyData`
