# Component Inventory

Full catalogue of all UI components in this portfolio. For each component, includes location, purpose, props, and usage patterns.

---

## Page-Level Components

### `Home` — `src/pages/Home.tsx`
Root homepage layout. Composes: `Wrapper`, `Intro`, `ProjectsGrid`, `ExperienceList`, `Footer`. No props — pulls everything from contexts.

### `CaseStudy` — `src/pages/CaseStudy.tsx`
Dynamic case study renderer. Reads `slug` from URL params, calls `getCaseStudy(slug, language)`, renders sections via discriminated union switch. Renders a "Coming soon" message when a slug is valid but content is pending.

---

## Layout Components

### `Wrapper` — `src/components/Wrapper.tsx`
Max-width container wrapping all page content. Applies padding, `animate-fade-in`, and dark mode surface color. All pages are wrapped in this.

```tsx
<Wrapper>
  <p>Page content here</p>
</Wrapper>
```

### `SettingsBar` — `src/components/SettingsBar.tsx`
Top bar with language and color palette controls. The page follows the operating system color scheme automatically.

---

## Core Feature Components

### `Intro` — `src/components/Intro.tsx`
Hero section. Shows profile photo, name, bio, resume link. All text via `useLanguage()`. No props.

### `ProjectsGrid` — `src/components/ProjectsGrid.tsx`
Displays all projects from `getProjects(language)`. Splits into two groups: projects with case studies and projects without. Renders `CaseCard` for each.

### `CaseCard` — `src/components/CaseCard.tsx`
Card for a single project. Optional Lottie hover preview (tracks pointer position). Links to case study if `href` is provided.

**Props:**
```ts
{
  title: string
  description: string
  thumbnail: string         // image path
  thumbnailAlt: string
  href?: string             // if present, card is a link to case study
}
```

### `ExperienceList` — `src/components/ExperienceList.tsx`
Renders work experience timeline from `getExperience(language)`. No props.

### `Footer` — `src/components/Footer.tsx`
Contact section. Contains `CopyEmailLink`, LinkedIn link, and Literal link.

---

## UI Utility Components

### `Button` — `src/components/Button.tsx`
Polymorphic button. Defaults to `<button>`, can be rendered as `<a>` via `as` prop.

**Props:**
```ts
{
  as?: ElementType           // default: "button"
  variant: "link" | "icon"
  className?: string
  // + all native element props
}
```

**Usage:**
```tsx
<Button as="a" href="/projects/foo" variant="link">View project</Button>
<Button variant="icon" aria-label="Close"><X /></Button>
```

### `LanguageSelector` — `src/components/LanguageSelector.tsx`
Radio group for EN / PT language. Reads/writes `useLanguage()`.

**Props:**
```ts
{ embedded?: boolean }
```

### `CopyEmailLink` — `src/components/CopyEmailLink.tsx`
Renders a button that copies an email to clipboard. Shows toast feedback on copy.

**Props:**
```ts
{
  email: string
  label?: string
}
```

### `LocalTime` — `src/components/LocalTime.tsx`
Displays the user's local time, updated every second. Uses `Intl.DateTimeFormat`. No props.

---

## Page Transition Components

### `PageTransition` — `src/components/PageTransition.tsx`
Wraps route children in `AnimatePresence`. Orchestrates exit → enter with staggered children.

**Props:**
```ts
{
  children: ReactNode
  routeLocation: Location  // from useLocation()
}
```

### `TransitionChild` — `src/components/PageTransition.tsx` (exported from same file)
Wrapper for individual animated children. Stagger delay is computed from `index`.

**Props:**
```ts
{
  children: ReactNode
  index: number
  className?: string
}
```

---

## Case Study Sub-Components (`src/components/case-study/`)

These are only used inside `CaseStudy.tsx` to render case study sections.

### `CaseNavBar`
Back navigation + optional external project link.
```ts
{ externalHref?: string }
```

### `CaseImage`
Single image with lazy loading and optional aspect ratio.
```ts
{
  src: string
  alt: string
  aspectRatio?: string    // e.g. "16/9"
  rounded?: boolean
  priority?: boolean      // eager loading for hero images
  className?: string
}
```

### `HighlightCard`
Status-colored card with icon, title, description. Used for problems/results.
```ts
{
  variant: "positive" | "negative" | "neutral"
  title: string
  description: string
}
```

### `MetricsRow`
Horizontal flex layout for metrics, problems list, or results list.
```ts
{
  items: MetricItem[]
  disclaimer?: string
  layout?: "metrics" | "problems" | "results"
}
```

### `StatusIcon`
Colored icon badge — Check (positive), AlertTriangle (negative), Info (neutral).
```ts
{ variant: "positive" | "negative" | "neutral"; className?: string }
```

### `ImageStack`
Vertical stack of images, each rendered via `CaseImage`.
```ts
{ images: { src: string; alt: string }[] }
```

### `ImageGrid`
Responsive grid: 1 column on mobile, 2 columns on desktop.
```ts
{ images: { src: string; alt: string }[] }
```

---

## Component Patterns to Follow

1. **Polymorphic components** — use `as` prop + `ElementType` generic (see `Button.tsx`)
2. **No prop drilling** — theme and language always from context
3. **Localized content** — never hardcode strings; always use `t("key")` from `useLanguage()`
4. **Accessibility first** — every interactive element needs `aria-label` or visible label
5. **Lazy loading** — pages are `React.lazy`; images use `loading="lazy"` and `decoding="async"`
6. **dark: variants** — all color-affecting classes must have a `dark:` counterpart

## ColorPaletteButton — src/components/ColorPaletteButton.tsx
Generates a different curated palette on each click. Reads the current palette from ColorPaletteContext and persists the selection.

The five options are Studio, Tide, Moss, Clay, and Iris. Each palette works in both light and dark mode.
