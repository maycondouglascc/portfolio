# Claude Code Guide — Maycon Douglas Portfolio

This file tells Claude how to use the `/context` documentation folder to produce high-quality, consistent output for this project. Read this first, then consult the relevant context documents before making changes.

---

## How to Use the Context Folder

The `/context` folder is the source of truth for project knowledge. Before writing code, generating content, or making architectural suggestions, consult the relevant documents:

```
context/
  design/
    components.md       ← Component catalogue, props, usage patterns
    design-patterns.md  ← Styling conventions, layout rules, color/spacing/a11y rules
    tokens.md           ← Typography scale, colors, shadows, animation values
  developer/
    onboarding.md       ← Stack overview, local setup, file structure
    conventions.md      ← TypeScript, React, naming, file, and git conventions
    workflow.md         ← Dev workflow, PR checklist, deployment, debugging
  features/
    i18n.md             ← Translation system, how to add keys, LocalizedText pattern
    theming.md          ← Dark/light/system theme, ThemeContext, DOM side effects
    case-studies.md     ← Case study data model, how to add a case study
    view-modes.md       ← View mode system, visibility tagging, writing guide per mode
    animations.md       ← Motion library, page transitions, DialKit, performance rules
    analytics.md        ← GA4 and Clarity setup
  project/
    overview.md         ← What this project is, audience, purpose
    decisions.md        ← Architecture decisions and rationale (don't re-litigate these)
    roadmap.md          ← Planned features, completed work
    scope.md            ← What is and isn't in scope
    tasks.md            ← Active task queue
```

---

## What to Read for Common Tasks

### "Add a new component"
Read: `context/design/components.md` + `context/design/design-patterns.md` + `context/developer/conventions.md`

### "Add a new case study"
Read: `context/features/case-studies.md` + `context/features/view-modes.md`

### "Update a translation / add a new string"
Read: `context/features/i18n.md`

### "Change the styling of something"
Read: `context/design/design-patterns.md` + `context/design/tokens.md`

### "Add an animation or transition"
Read: `context/features/animations.md`

### "Fix a bug or understand why something works"
Read: `context/developer/workflow.md` → debugging section. Then read the relevant feature doc.

### "Understand an architecture decision"
Read: `context/project/decisions.md` — do not propose reverting documented decisions without strong justification.

### "Plan a new feature"
Read: `context/project/scope.md` + `context/project/roadmap.md` — verify it fits scope before implementation.

---

## Core Conventions (Quick Reference)

1. **Styling:** Tailwind CSS only. No CSS Modules, no inline styles for visual properties, no styled-components.
2. **Dark mode:** Every color class must have a `dark:` counterpart.
3. **Typography:** Use the custom Tailwind scale (`text-body-16-regular`, `text-heading-32-medium`, etc.) — never `text-base`, `text-lg`, etc.
4. **Strings:** Never hardcode user-facing strings in JSX. Always use `t("key")` from `useLanguage()`.
5. **Colors:** Zinc palette only. No hardcoded hex values. No colors from outside the Tailwind config.
6. **TypeScript:** Strict mode. No `any`. Explicit props interfaces.
7. **Components:** Functional only. No class components. No `React.FC<>`.
8. **Imports:** `"motion/react"`, not `"framer-motion"`.

---

## What NOT to Do

- Do not introduce new state management libraries (Context API is sufficient)
- Do not introduce CSS-in-JS or CSS Modules
- Do not add i18n libraries (custom `t()` is in use and type-safe)
- Do not add `any` types
- Do not hardcode strings — add them to `en.ts` and `pt.ts` first
- Do not suggest reverting decisions documented in `context/project/decisions.md` without strong new reasoning
- Do not add complexity that isn't required by the current task (see scope document)
- Do not skip `dark:` variants on color classes
- Do not use `React.lazy` for sub-components (only pages)

---

## Project-Specific Patterns

### Adding Localized Content
```tsx
// In data files, use LocalizedText
const title: LocalizedText = {
  en: "English text",
  pt: "Texto em português",
}

// In components, use the t() function
const { t } = useLanguage()
t("section.key")
```

### Adding a New Section to a Case Study
Use the discriminated union types. Every section has a `type` field:
```ts
{ type: "text", title: "...", body: "..." }
{ type: "image", src: "...", alt: "..." }
{ type: "metrics", items: [...] }
```

### New Interactive Component
```tsx
// Always include:
// 1. aria-label or visible label
// 2. focus-visible styles (handled globally in index.css)
// 3. dark: color variants
// 4. keyboard operability
```

---

## Updating Context Documents

When you introduce a new pattern, component, or architectural decision:
1. Update the relevant context document
2. If it's a new architectural decision, add it to `context/project/decisions.md`
3. If it's a completed task, move it from `context/project/tasks.md` to `context/project/roadmap.md`
4. Keep docs concise — they should be scannable, not exhaustive prose

Context docs are as important as the code itself. Outdated docs mislead future contributors.
