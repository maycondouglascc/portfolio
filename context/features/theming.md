# Theming

Dark mode, light mode, and system preference support. Implemented via React Context (`ThemeContext`) and Tailwind's class strategy, syncing automatically with the user's operating system.

---

## How It Works

```
ThemeContext: resolves to "light" or "dark" based on OS (window.matchMedia)
        ↓
"dark" class on <html>  →  Tailwind dark: variants activate
        ↓
meta[name="theme-color"] synced for browser chrome color
```

---

## System Color Scheme Sync

- `ThemeContext` listens to `window.matchMedia("(prefers-color-scheme: dark)")`
- Resolves to `"dark"` or `"light"` based on OS setting
- Updates automatically when OS preference changes (event listener on `matchMedia`)

---

## Applying Dark Mode in JSX

```tsx
// Always pair light + dark variants
<div className="bg-white dark:bg-zinc-950">
  <p className="text-zinc-900 dark:text-zinc-100">Content</p>
  <span className="text-zinc-500 dark:text-zinc-400">Secondary</span>
</div>
```

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
meta.setAttribute("content", resolvedTheme === "dark" ? "#09090b" : "#ffffff")
```

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

---

## Theme Color Reference

| Resolved Theme | Background | Text | Chrome (meta) |
|----------------|------------|------|---------------|
| Light | `white` (#ffffff) | `zinc-900` | `#ffffff` |
| Dark | `zinc-950` (#09090b) | `zinc-100` | `#09090b` |
