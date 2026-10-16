# Code Conventions

TypeScript, React, naming, and formatting conventions for this codebase. Follow these to keep contributions consistent.

---

## TypeScript Conventions

### Strict Mode
All files run under `"strict": true`. No exceptions. Never use `any` — use `unknown` with a type guard if the type is genuinely unknown.

### Props Interfaces
Define props as named interfaces (not inline types) at the top of the file:

```tsx
// Good
interface ButtonProps<T extends ElementType = "button"> {
  as?: T
  variant: "link" | "icon"
  className?: string
}

// Bad
const Button = ({ variant, className }: { variant: string; className?: string }) => {}
```

### Discriminated Unions
Use discriminated unions for section types and variants. Always include a `type` field:

```ts
type CaseStudySection =
  | { type: "text"; body: string; title?: string }
  | { type: "image"; src: string; alt: string }
  | { type: "metrics"; items: MetricItem[] }
```

### Utility Types
Use `Record<Language, T>` for localized fields, `ComponentPropsWithoutRef<T>` for polymorphic components.

### Type Exports
Export types alongside their related functions/components. Keep types in the same file as their consumer unless shared widely.

---

## React Conventions

### Functional Components Only
No class components. No `React.FC<>` — use explicit props typing and return type instead:

```tsx
// Good
function Button({ variant, children }: ButtonProps) { ... }

// Avoid
const Button: React.FC<ButtonProps> = ({ variant, children }) => { ... }
```

### Hooks
- Custom hooks must start with `use` and live in `src/context/` or inline in the consuming component
- Use `useLanguage()` for all translatable strings
- Use `useTheme()` for theme-dependent behavior
- Never call hooks conditionally

### State Management
Only React Context (no Redux, Zustand, etc.). Contexts are: `ThemeContext`, `LanguageContext`. New global state should extend one of these or add a new context provider in `App.tsx`.

### Lazy Loading
All page-level components must be `React.lazy`. Sub-components within a page do not need to be lazy.

```tsx
const Home = lazy(() => import("./pages/Home"))
```

---

## Naming Conventions

| Thing | Convention | Example |
|-------|------------|---------|
| Components | PascalCase | `CaseCard`, `SettingsBar` |
| Hooks | camelCase, `use` prefix | `useLanguage`, `useTheme` |
| Types/Interfaces | PascalCase | `CaseStudyData`, `Project` |
| Constants | camelCase or UPPER_SNAKE | `caseStudySlugs`, `ANIMATION_DEFAULTS` |
| Files (components) | PascalCase | `CaseCard.tsx`, `ThemeToggle.tsx` |
| Files (data/utils) | camelCase | `projects.ts`, `experience.ts` |
| Localization keys | dot-notation camelCase | `"intro.greeting"`, `"home.projects"` |
| CSS classes | Tailwind utilities only | No custom class names |

---

## File Organization

- One component per file (with small sub-components allowed in the same file if tightly coupled, e.g., `TransitionChild` in `PageTransition.tsx`)
- Imports order: React → external libs → internal (components, contexts, data, types) → assets
- Keep data-fetching logic in `src/data/`, not in components
- Keep string literals in `src/locales/`, not in components

---

## Styling Conventions

- **No inline styles** for visual styling (only for dynamic values Tailwind can't express, e.g., computed widths)
- **Always pair** light and dark color classes: `text-zinc-900 dark:text-zinc-50`
- **Use the custom typography scale** (`text-body-16-regular`, not `text-base`)
- **Mobile-first**: start with mobile styles, add responsive prefixes for larger screens
- **No magic numbers**: use Tailwind spacing tokens, not `px-[13px]`

---

## i18n Conventions

- Every user-facing string must be translated (English + Portuguese)
- Never hardcode strings in JSX — use `t("key")`
- Localization keys follow the pattern `section.element`: e.g., `intro.greeting`, `caseStudy.backButton`
- For dynamic strings: `t("key", { name: value })`
- Locale files (`en.ts`, `pt.ts`) are flat objects — no nesting

---

## Git Conventions

### Branch Names
```
feat/feature-name
fix/bug-description
chore/task-name
refactor/component-name
docs/what-you-documented
```

### Commit Messages
Imperative mood, lowercase after type prefix:
```
feat: add GSK Promx case study
fix: correct scroll restoration on route change
chore: update dependencies
refactor: extract TransitionChild from PageTransition
docs: update component inventory
```

### PR Strategy
- PRs go to `main`
- Keep PRs focused — one feature or fix per PR
- No force-push to `main`

---

## Accessibility Rules (non-negotiable)

1. Every `<button>` without visible text must have `aria-label`
2. Every `<img>` must have `alt` (empty string `alt=""` only for decorative images)
3. Links must have descriptive text (no "click here")
4. Form controls must have associated labels
5. Color alone must not convey information
6. Interactive elements must be keyboard-operable
7. Focus order must follow visual/logical reading order

---

## Performance Rules

- Import only what you use from `react-feather` (tree-shakeable)
- Images in case studies use `loading="lazy"` + `decoding="async"` via `CaseImage`
- Hero images (above the fold) use `priority={true}` on `CaseImage` → `loading="eager"`
- Do not import large libraries for single utilities (e.g., don't add `date-fns` for formatting one date — use `Intl`)
