# Theming

Dark mode, light mode, and system preference support. Implemented via React Context and Tailwind's class strategy.

---

## How It Works

```
ThemeContext stores: theme + resolvedTheme + setTheme
        ↓
"dark" class on <html>  →  Tailwind dark: variants activate
        ↓
meta[name="theme-color"] synced for browser chrome color
        ↓
localStorage persists user's choice
```

---

## Theme Values

```ts
type Theme = "light" | "dark" | "system"
type ResolvedTheme = "light" | "dark"
```

- `theme` — the user's explicit choice (or `"system"` for OS preference)
- `resolvedTheme` — the actual applied theme (never "system"; resolved to "light" or "dark")

---

## Using the Theme in Components

```tsx
import { useTheme } from "../context/ThemeContext"

function MyComponent() {
  const { theme, resolvedTheme, setTheme } = useTheme()

  return (
    <div>
      <p>Current theme: {resolvedTheme}</p>
      <button onClick={() => setTheme("dark")}>Go dark</button>
    </div>
  )
}
```

Most components don't need `useTheme()` directly — they just use Tailwind's `dark:` variants.

---

## Applying Dark Mode in JSX

```tsx
// Always pair light + dark variants
<div className="bg-white dark:bg-zinc-950">
  <p className="text-zinc-900 dark:text-zinc-50">Content</p>
  <span className="text-zinc-500 dark:text-zinc-400">Secondary</span>
</div>
```

**Rule:** Every color class must have a `dark:` counterpart. This is enforced by code review convention, not by a linter rule.

---

## How System Preference Works

When `theme = "system"`:
1. `ThemeContext` listens to `window.matchMedia("(prefers-color-scheme: dark)")`
2. Resolves to `"dark"` or `"light"` based on OS setting
3. Updates automatically when OS preference changes (event listener on `matchMedia`)

---

## DOM Side Effects

`ThemeContext` manages these side effects when theme changes:

```ts
// 1. Toggle class on <html>
document.documentElement.classList.toggle("dark", resolvedTheme === "dark")

// 2. Sync colorScheme style
document.documentElement.style.colorScheme = resolvedTheme

// 3. Update browser chrome color
const meta = document.querySelector('meta[name="theme-color"]')
meta.setAttribute("content", resolvedTheme === "dark" ? "#09090b" : "#fafafa")
```

---

## Persistence

Theme is persisted to `localStorage` under the key `"theme"`.

Valid values: `"light"`, `"dark"`, `"system"`.

On initial load:
1. Read from `localStorage`
2. Fall back to `"system"` if not set

---

## ThemeToggle Component

The UI for theme switching is `ThemeToggle` — a radio button group styled as a segmented control.

```tsx
<ThemeToggle />              // standalone
<ThemeToggle embedded />     // inside SettingsBar (different visual style)
```

Options rendered: Light, Dark, System (with icons from react-feather).

---

## Tailwind Configuration

Theme is handled via Tailwind's `class` strategy:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
  // ...
}
```

This means dark mode activates when the `dark` class is on any ancestor element (typically `<html>`).

---

## Smooth Transitions

Body background and text color transition smoothly on theme change (0.2s ease). Defined in `src/index.css`:

```css
body {
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

This prevents harsh flashes when switching themes.

---

## Theme Color Reference

| Resolved Theme | Background | Text | Chrome (meta) |
|----------------|------------|------|---------------|
| Light | `zinc-50` (#fafafa) | `zinc-900` | `#fafafa` |
| Dark | `zinc-950` (#09090b) | `zinc-50` | `#09090b` |
