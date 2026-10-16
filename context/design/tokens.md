# Design Tokens

All design tokens for the portfolio — typography scale, color palette, spacing, shadows, and animation values. Source of truth is `tailwind.config.js`.

---

## Typography Scale

Defined under `theme.extend.fontSize` in Tailwind config. Format: `[fontSize, { lineHeight, letterSpacing }]`.

### Display
| Token | px | lineHeight | letterSpacing |
|-------|----|------------|---------------|
| `display-72-medium` | 72 | 76px | -0.045em |
| `display-64-medium` | 64 | 68px | -0.040em |
| `display-56-medium` | 56 | 60px | -0.035em |
| `display-72-regular` | 72 | 76px | -0.045em |
| `display-64-regular` | 64 | 68px | -0.040em |
| `display-56-regular` | 56 | 60px | -0.035em |

### Heading
| Token | px | lineHeight | letterSpacing |
|-------|----|------------|---------------|
| `heading-48-medium` | 48 | 52px | -0.030em |
| `heading-40-medium` | 40 | 44px | -0.025em |
| `heading-36-medium` | 36 | 40px | -0.020em |
| `heading-32-medium` | 32 | 36px | -0.015em |
| `heading-28-medium` | 28 | 32px | -0.010em |
| (+ `-regular` variants for each) | | | |

### Subheading
| Token | px | lineHeight | letterSpacing |
|-------|----|------------|---------------|
| `subheading-24-medium` | 24 | 28px | -0.005em |
| `subheading-20-medium` | 20 | 24px | -0.003em |
| (+ `-regular` variants) | | | |

### Body
| Token | px | lineHeight | letterSpacing |
|-------|----|------------|---------------|
| `body-18-medium` | 18 | 26px | 0 |
| `body-18-regular` | 18 | 26px | 0 |
| `body-16-medium` | 16 | 24px | 0 |
| `body-16-regular` | 16 | 24px | 0 |
| `body-15-medium` | 15 | 22px | 0 |
| `body-15-regular` | 15 | 22px | 0 |
| `body-14-medium` | 14 | 20px | 0 |
| `body-14-regular` | 14 | 20px | 0 |

### Caption
| Token | px | lineHeight |
|-------|----|------------|
| `caption-13-regular` | 13 | 18px |
| `caption-12-regular` | 12 | 16px |
| `caption-11-regular` | 11 | 16px |
| `caption-10-regular` | 10 | 14px |
| (+ `-medium` variants) | | |

---

## Color Palette

**Base palette:** Tailwind Zinc (all 11 shades: 50–950).

### Semantic Mapping

| Semantic Role | Light Mode | Dark Mode |
|---------------|------------|-----------|
| Page BG | `zinc-50` / `white` | `zinc-950` |
| Surface BG | `zinc-100` | `zinc-900` |
| Elevated Surface | `zinc-200` | `zinc-800` |
| Border | `zinc-200` | `zinc-800` |
| Border Muted | `zinc-100` | `zinc-900` |
| Text Primary | `zinc-900` | `zinc-50` |
| Text Secondary | `zinc-500` | `zinc-400` |
| Text Disabled | `zinc-300` | `zinc-700` |
| Link | `zinc-900` | `zinc-100` |
| Focus Ring | `zinc-900` | `zinc-100` |

### Status Colors
| Status | Color | Usage |
|--------|-------|-------|
| Positive | Lime 500 / Lime 400 (dark) | `HighlightCard variant="positive"` |
| Negative | Red 500 / Red 400 (dark) | `HighlightCard variant="negative"` |
| Neutral | Zinc 500 / Zinc 400 (dark) | `HighlightCard variant="neutral"` |

### Theme Colors (meta theme-color)
| Theme | Color |
|-------|-------|
| Light | `#fafafa` (zinc-50) |
| Dark | `#09090b` (zinc-950) |

---

## Shadow System

Defined under `theme.extend.boxShadow` in Tailwind config.

| Token | Value |
|-------|-------|
| `shadow-xs` | `0px 1px 2px rgba(0,0,0,0.05)` |
| `shadow-sm` | `0px 1px 3px rgba(0,0,0,0.07), 0px 1px 2px rgba(0,0,0,0.05)` |
| `shadow-md` | `0px 2px 4px -1px rgba(0,0,0,0.06), 0px 4px 6px -1px rgba(0,0,0,0.08)` |
| `shadow-lg` | `0px 4px 6px -2px rgba(0,0,0,0.05), 0px 10px 15px -3px rgba(0,0,0,0.10)` |
| `shadow-xl` | `0px 10px 10px -5px rgba(0,0,0,0.04), 0px 20px 25px -5px rgba(0,0,0,0.10)` |
| `shadow-2xl` | `0px 25px 50px -12px rgba(0,0,0,0.25)` |
| `shadow-inner` | `inset 0px 2px 4px rgba(0,0,0,0.06)` |

---

## Animation Tokens

Defined in `tailwind.config.js` under `keyframes` and `animation`.

### Keyframe: `fadeIn`
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

### Animation Classes
| Class | Duration | Easing | Notes |
|-------|----------|--------|-------|
| `animate-fade-in` | 0.3s | ease-in | Page/section entrance |

### Motion (Runtime) Tokens
Managed via DialKit in dev mode (`PageTransitionDev.tsx`). Defaults:

| Token | Value | Description |
|-------|-------|-------------|
| `enterDuration` | 0.3s | Page enter animation |
| `exitDuration` | 0.2s | Page exit animation |
| `enterDelay` | 0.1s | Delay before content enters |
| `childDelay` | 0.05s | Extra delay per stagger child |
| `childStagger` | 0.08s | Interval between staggered children |

---

## Spacing

Standard Tailwind spacing scale (4px base unit). Key values used in this project:

| Tailwind | px | Common use |
|----------|----|------------|
| `2` | 8px | Tight internal padding |
| `4` | 16px | Default component padding |
| `6` | 24px | Card padding |
| `8` | 32px | Section internal spacing |
| `12` | 48px | Section separation (small) |
| `16` | 64px | Section separation (standard) |
| `24` | 96px | Major section separation |

---

## Border Radius

| Token | Value | Common use |
|-------|-------|------------|
| `rounded` | 4px | Buttons, small elements |
| `rounded-md` | 6px | Inputs, small cards |
| `rounded-lg` | 8px | Cards |
| `rounded-xl` | 12px | Large cards |
| `rounded-2xl` | 16px | Feature cards, images |
| `rounded-full` | 9999px | Pills, icon buttons |

---

## Font Weight

Inter Variable supports weights 100–900. Used weights:
- **Regular** → `font-normal` (400)
- **Medium** → `font-medium` (500)
- **Semibold** → `font-semibold` (600) — rare, mostly for emphasis
