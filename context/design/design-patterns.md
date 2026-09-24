# Design Patterns

Styling conventions, layout patterns, and design rules used throughout the portfolio.

---

## Styling Approach

**No CSS Modules, no styled-components.** This project uses Tailwind CSS exclusively for all styling. Inline `className` props are the only styling mechanism.

- All color, spacing, typography, and layout is done through Tailwind utility classes
- Dark mode uses Tailwind's `class` strategy — add `dark:` prefix for dark variants
- Never use inline `style={{}}` for visual styling; only for dynamic values Tailwind can't express
- Never hardcode hex colors or pixel values in `className`

---

## Layout System

### Page Layout
Every page content is wrapped in `<Wrapper>` which provides:
- `max-w-[720px]` for text content
- Horizontal padding (responsive)
- Fade-in animation on mount
- Dark background surface color

### Full-Width Sections
For case study images and wide content, break out of `Wrapper` using `max-w-[1200px]` and negative horizontal margins.

### Spacing Scale
Use Tailwind spacing (multiples of 4px). Prefer semantic gaps:
- Between sections: `gap-16` or `mt-16` (64px)
- Between cards: `gap-4` or `gap-6`
- Component internal padding: `p-4`, `p-6`

**Note:** Case study pages use context-aware spacing in visual mode. See `context/features/case-studies.md` for how image-to-text and image-to-image transitions are handled differently to optimize visual rhythm.

---

## Typography

Custom Tailwind font-size scale. Pattern: `text-{category}-{size}-{weight}`.

### Display (hero, large headings)
| Class | Size | Line Height | Letter Spacing |
|-------|------|-------------|----------------|
| `text-display-72-medium` | 72px | 76px | -0.045em |
| `text-display-64-medium` | 64px | 68px | -0.04em |
| `text-display-56-medium` | 56px | 60px | -0.035em |

### Heading
| Class | Size |
|-------|------|
| `text-heading-48-medium` | 48px |
| `text-heading-40-medium` | 40px |
| `text-heading-36-medium` | 36px |
| `text-heading-32-medium` | 32px |
| `text-heading-28-medium` | 28px |

### Body (default prose)
| Class | Size |
|-------|------|
| `text-body-18-regular` | 18px |
| `text-body-16-regular` | 16px |
| `text-body-15-regular` | 15px |
| `text-body-14-regular` | 14px |

Each size has both `-medium` and `-regular` weight variants. The same pattern applies to `subheading-{24|20}` and `caption-{13|12|11|10}`.

**Font:** Inter Variable (`public/files/font/`). Loaded via `@font-face` in `src/index.css`.

---

## Color System

**Palette:** The Zinc utility scale is the neutral foundation. Its hue and saturation change with the selected palette; the accent token colors links and palette previews.

| Role | Light | Dark |
|------|-------|------|
| Page background | bg-zinc-50 | dark:bg-zinc-950 |
| Surface | bg-white | dark:bg-zinc-900 |
| Border | border-zinc-200 | dark:border-zinc-800 |
| Primary text | text-zinc-900 | dark:text-zinc-100 |
| Secondary text | text-zinc-600 | dark:text-zinc-400 |
| Link | text-accent | dark:text-accent |

The current palette is stored as data-palette on the root element and in local storage. Its hue, saturation, and contrast values are defined in src/index.css; Tailwind maps them through tailwind.config.js.

**Status colors** (for HighlightCard / StatusIcon):
- Positive: lime-*
- Negative: red-*
- Neutral: zinc-*

## Shadow System

Custom shadow tokens defined in `tailwind.config.js`:
- `shadow-xs` → subtle lift
- `shadow-sm` → card default
- `shadow-md` → card hover, elevated elements
- `shadow-lg`, `shadow-xl`, `shadow-2xl` → modals, overlays
- `shadow-inner` → inset (input focus, pressed buttons)

---

## Animation

See `context/features/animations.md` for full details. Quick reference:

- Page fade-in: `animate-fade-in` class (0.3s ease-in, opacity + translateY)
- Route transitions: `PageTransition` + `TransitionChild` with stagger
- Respect `motion-reduce`: always add `motion-reduce:animate-none` or use Motion's `useReducedMotion`

---

## Dark Mode Rules

1. Every element with a background color must have a `dark:` counterpart
2. Every text color must have a `dark:` counterpart
3. Every border color must have a `dark:` counterpart
4. Use `dark:` variants for shadows when needed
5. `SystemThemeProvider` follows the operating system preference and keeps `html.dark`, `colorScheme`, and `meta[name="theme-color"]` in sync

---

## Responsive Design

Standard Tailwind breakpoints. Mobile-first approach.

| Breakpoint | Width |
|------------|-------|
| (default) | < 640px |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |

Most layout changes happen at `md:` and `lg:`. `sm:` is rarely used.

---

## Accessibility Patterns

- All interactive elements must have visible labels or `aria-label`
- Use `focus-visible:` (not `focus:`) for keyboard outlines — base styles defined in `index.css`
- Skip-to-content link: always present in `App.tsx`, links to `#main-content`
- `main#main-content` landmark on every page
- Reduced motion: check `prefers-reduced-motion` and conditionally disable animations
- Color contrast: zinc palette passes WCAG AA in both light and dark modes

---

## Component Visual Rules

### Cards (CaseCard)
- Rounded corners: `rounded-xl` or `rounded-2xl`
- Subtle border: `border border-zinc-200 dark:border-zinc-800`
- Hover state: scale transform or shadow increase via Motion
- Cursor: `cursor-pointer` when clickable

### Buttons
- `variant="link"`: text-based, with underline or color on hover
- `variant="icon"`: icon-only, square, `rounded-full` or `rounded-md`

### Inputs / Selectors (LanguageSelector)
- Language selection is rendered as a radio button group, visually styled as a segmented control
- Use `role="radiogroup"` + `role="radio"` for accessibility

### Images
- Always include meaningful `alt` text
- Use `CaseImage` for case study images (handles lazy loading, aspect ratio)
- Never use `width`/`height` attributes without also handling aspect ratio in CSS
