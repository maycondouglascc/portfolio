# Appearance and Color Palettes

The portfolio follows the operating system's light or dark color scheme automatically. A separate palette switcher changes the page's neutral hue and accent color while preserving readable contrast in both modes.

## System Color Scheme

`AppearanceProvider` listens to `window.matchMedia("(prefers-color-scheme: dark)")` and applies the result to the root element:

- Adds or removes the `dark` class used by Tailwind's `dark:` variants.
- Updates `color-scheme` so native browser controls match the page.
- Updates `meta[name="theme-color"]` to the current palette's page color.
- Tracks changes when the operating system preference changes.

`index.html` applies the initial preference before the app renders to avoid a flash. The portfolio does not save a separate light/dark preference.

## Applying Light and Dark Styles

Use paired Tailwind classes for colors:

```tsx
<div className="bg-white dark:bg-zinc-950">
  <p className="text-zinc-900 dark:text-zinc-50">Content</p>
  <span className="text-zinc-500 dark:text-zinc-400">Secondary</span>
</div>
```

Every color class should have a `dark:` counterpart. This is enforced by code review convention, not by a linter rule.

## Color Palette Switcher

`AppearanceProvider` stores the selected preset in `localStorage` under `color-palette` and applies it as `data-palette` on the root element. `ColorPaletteButton` selects a different preset each time it is clicked: Studio, Tide, Moss, Clay, or Iris.

Each preset sets the neutral hue and accent hue, with separate contrast values for light and dark appearances. Tailwind's Zinc shades resolve to palette-aware CSS variables; the accent token colors links and palette details. The palette works independently from the operating system color scheme.

The initial palette is applied in the `index.html` head script so it is present on first paint. The appearance provider updates the browser chrome color when either the palette or system color scheme changes.

## Tailwind Configuration

Dark styles use Tailwind's `class` strategy:

```js
module.exports = {
  darkMode: "class",
  // ...
}
```

`AppearanceProvider` toggles `dark` on `<html>` based on the current operating system preference.

## Smooth Transitions

Body background and text color transition smoothly when the system color scheme or palette changes. The styles live in `src/index.css` and respect reduced-motion preferences.

## Theme Color Reference

| System preference | Background | Text | Browser chrome |
|-------------------|------------|------|----------------|
| Light | `zinc-50` (selected palette tint) | `zinc-900` | Selected palette tint |
| Dark | `zinc-950` (selected palette tint) | `zinc-100` | Selected palette tint |
