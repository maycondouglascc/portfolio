# Portfolio – Context and Architecture

Reference document for developers and AI assistants. Describes the project structure, conventions, and patterns used in this codebase.

---

## 1. Project Overview

**Purpose:** Personal portfolio for Maycon Douglas (Product Designer).

**Core features:**
- Project showcase with cards linking to case studies
- Case study pages with structured sections (text, metrics, images, problems, results)
- Experience timeline with role history
- Contact section with copy-to-clipboard email
- Theme switching (light/dark/system)
- Internationalization (English and Portuguese)

**Languages:** `en` (English), `pt` (Portuguese)

---

## 2. Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | React 18.3 + TypeScript 5.5 |
| Build | Vite 7.3 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 6.26 |
| Animation | Motion (Framer Motion) 12.34, Lottie React |
| Analytics | Microsoft Clarity |
| Icons | react-feather |
| Dev Tools | DialKit (animation tuning, dev-only) |

---

## 3. Architecture

```
App (src/App.tsx)
├── LanguageProvider ( outermost )
├── ThemeProvider
├── BrowserRouter
│   └── AppContent
│       ├── ScrollToTop
│       ├── SettingsBar (LanguageSelector + ThemeToggle)
│       └── PageTransition
│           └── Routes
│               ├── /           → Home (lazy)
│               ├── /projects/:slug → CaseStudy (lazy)
│               └── *           → NotFound
```

**Provider order:** Language → Theme → Router (LanguageProvider wraps ThemeProvider so language is available everywhere).

---

## 4. File Structure

```
src/
  App.tsx              # Root: providers, routing, layout
  main.tsx             # Entry point, Clarity init
  index.css            # Global styles, font-face, base styles

  components/          # Reusable UI components
    Wrapper.tsx        # Max-width layout container
    Intro.tsx          # Hero/bio section
    ProjectsGrid.tsx    # Project cards grid
    CaseCard.tsx       # Project card (optional Lottie hover)
    ExperienceList.tsx # Experience timeline
    Footer.tsx         # Contact section
    Button.tsx         # Button variants
    SettingsBar.tsx    # Language + theme controls
    LanguageSelector.tsx
    ThemeToggle.tsx
    PageTransition.tsx # Route transitions (staggered children)
    PageTransitionDev.tsx  # Dev: DialKit integration
    CopyEmailLink.tsx
    LocalTime.tsx

    case-study/        # Case study–specific
      CaseNavBar.tsx
      CaseImage.tsx
      ImageStack.tsx
      ImageGrid.tsx
      MetricsRow.tsx
      HighlightCard.tsx
      StatusIcon.tsx

  pages/
    Home.tsx           # Intro, ProjectsGrid, ExperienceList, Footer
    CaseStudy.tsx      # Dynamic case study renderer

  context/
    ThemeContext.tsx   # theme, resolvedTheme, setTheme
    LanguageContext.tsx # language, setLanguage, t()

  data/
    projects.ts        # getProjects(), CaseStudySection types
    experience.ts      # getExperience()
    case-studies/
      index.ts         # getCaseStudy(), caseStudySlugs
      danone.tsx       # Case study content

  locales/
    en.ts              # English strings
    pt.ts              # Portuguese strings

  assets/             # Lottie JSON, images
public/
  files/              # Fonts, static assets
```

---

## 5. Patterns and Conventions

### 5.1 Context Providers

**ThemeContext** (`src/context/ThemeContext.tsx`):
- Values: `theme` (light | dark | system), `resolvedTheme`, `setTheme`
- Persists to `localStorage` key `theme`
- Syncs with `prefers-color-scheme`, updates `document.documentElement` class and `meta theme-color`
- Hook: `useTheme()`

**LanguageContext** (`src/context/LanguageContext.tsx`):
- Values: `language` (en | pt), `setLanguage`, `t(key, params?)`
- Persists to `localStorage` key `language`
- Type-safe keys via `DotPath<LocaleShape>`, e.g. `t("intro.greeting")`
- Interpolation: `t("copyEmail.copyAria", { email: "x@y.com" })`
- Hook: `useLanguage()`

### 5.2 Data Layer

**Projects** (`src/data/projects.ts`):
- `getProjects(language)` returns localized `Project[]` with `slug`, `title`, `description`, optional `hoverLottie`
- `projectsCatalog` stores `LocalizedText` per field

**Experience** (`src/data/experience.ts`):
- `getExperience(language)` returns localized `Experience[]` with `company`, `role`, `period`

**Case studies** (`src/data/case-studies/`):
- Add entry in `index.ts`: `caseStudies[slug] = studyModule`
- Each study exports `CaseStudyData`: `title`, `description`, `role`, `goal`, `sections[]`, optional `externalHref`
- `caseStudySlugs` set used for validation

**CaseStudySection** (discriminated union):

| type | Key fields |
|------|------------|
| text | `body`, optional `title`, `id` |
| metrics | `items`, `layout?`, `disclaimer?` |
| problems | `title`, `intro`, `items` |
| results | `title`, `intro`, `items`, `disclaimer?` |
| image | `src`, `alt`, `priority?`, `rounded?` |
| imageStack | `images` |
| imageGrid | `images` |

### 5.3 Page Transitions

- `PageTransition` wraps route content; uses `AnimatePresence` with `mode="wait"`
- Children use `TransitionChild` for staggered entrance (fade + slide up)
- `TransitionChild` receives `index` for stagger delay: `config.enterDelay + config.childDelay + index * config.childStagger`
- Dev: `PageTransitionDev` uses DialKit for tuning animation params

### 5.4 Styling

**Typography scale** (Tailwind custom `fontSize`):

- `display-{72|64|56}-{medium|regular}`
- `heading-{48|40|36|32|28}-{medium|regular}`
- `subheading-{24|20}-{medium|regular}`
- `body-{18|16|15|14}-{medium|regular}`
- `caption-{13|12|11|10}-{medium|regular}`

**Dark mode:** Tailwind `class` strategy. Use `dark:` variants.

**Colors:** Zinc palette (50–950).

**Font:** Inter variable font in `public/files/font/`.

### 5.5 Accessibility

- Skip-to-content link (visible on focus)
- `focus-visible` outlines
- ARIA labels on interactive elements
- `prefers-reduced-motion` support (e.g. scroll behavior)
- Semantic HTML (`main`, `nav`, `header`, `section`)

---

## 6. Routing

| Path | Component | Notes |
|------|-----------|--------|
| `/` | Home | Intro, projects, experience, footer |
| `/projects/:slug` | CaseStudy | Dynamic from `getCaseStudy(slug)` |
| `*` | NotFound | Link back to home |

- Lazy-loaded routes with `LoadingFallback`
- `ScrollToTop` on pathname change

---

## 7. Build and Scripts

**Vite config** (`vite.config.ts`):
- Manual chunks: `router`, `lottie`, `clarity`
- Gzip and Brotli compression plugins

**Scripts:**
- `npm run dev` – Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – ESLint

---

## 8. Environment

- `.env`: `VITE_CLARITY_PROJECT_ID` for Microsoft Clarity
- Clarity initialized in `main.tsx`
