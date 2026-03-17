# Animations & Transitions

How motion and animation work in the portfolio — library setup, page transitions, component-level animations, and dev tooling.

---

## Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| `motion` | 12.34 | Route transitions, component animations (Framer Motion fork) |
| `lottie-react` | 2.4 | Lottie JSON animation playback (CaseCard hover preview) |
| DialKit | 0.2 | Dev-only panel for tuning animation values |

---

## Page Transitions

Managed by `PageTransition` component wrapping route content in `App.tsx`.

### Architecture

```
AnimatePresence (mode="wait")
  └── PageTransition (key = routeLocation.pathname)
        └── motion.div (exit animation)
              └── children (enter animation via TransitionChild)
```

### Animation Sequence

```
1. Old page exits:
   opacity 1 → 0  (exitDuration = 0.2s)

2. New page enters (after exitDuration delay):
   opacity 0 → 1 + translateY 8px → 0  (enterDuration = 0.3s)

3. Children stagger:
   Each TransitionChild animates in sequence:
   delay = enterDelay + childDelay + (index × childStagger)
   default: 0.1 + 0.05 + (index × 0.08) seconds
```

### Default Animation Config

```ts
const config = {
  exitDuration: 0.2,
  enterDuration: 0.3,
  enterDelay: 0.1,
  childDelay: 0.05,
  childStagger: 0.08,
}
```

### Using TransitionChild

Wrap sections inside a page to get staggered entrance:

```tsx
// In a page component
<TransitionChild index={0}>
  <Intro />
</TransitionChild>

<TransitionChild index={1}>
  <ProjectsGrid />
</TransitionChild>

<TransitionChild index={2}>
  <ExperienceList />
</TransitionChild>
```

`index` determines stagger order. Start at 0.

---

## CSS Animations (Tailwind)

### `animate-fade-in`

Utility class for simple entrance animations. Used on the `Wrapper` component.

```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in forwards;
}
```

**Usage:** `<div className="animate-fade-in">`

Always pair with `motion-reduce:animate-none` for accessibility:
```tsx
<div className="animate-fade-in motion-reduce:animate-none">
```

---

## Lottie Animations (CaseCard Hover)

`CaseCard` shows a Lottie animation preview on hover. The animation follows the pointer position within the card.

```ts
// In projects.ts
hoverLottie?: string  // path to .json file in src/assets/lottie/
```

When `hoverLottie` is set, the card renders a positioned Lottie player that:
1. Becomes visible on `mouseenter`
2. Tracks pointer position via `mousemove`
3. Hides on `mouseleave`

Lottie player is chunk-split into a separate bundle (`lottie` chunk in `vite.config.ts`).

---

## DialKit (Dev-Only Animation Tuning)

`PageTransitionDev.tsx` renders a DialKit panel in development mode only.

```tsx
// Conditionally rendered in App.tsx
{import.meta.env.DEV && <PageTransitionDev />}
```

Provides real-time sliders for all animation config values. Workflow:
1. Run `npm run dev`
2. Adjust sliders in DialKit panel
3. Note the values you like
4. Copy them into `PageTransition.tsx` config object
5. DialKit is completely absent from production builds

---

## Reduced Motion

Always respect `prefers-reduced-motion`. Two approaches:

### Tailwind CSS approach
```tsx
<div className="animate-fade-in motion-reduce:animate-none">
```

### Motion library approach
```tsx
import { useReducedMotion } from "motion/react"

const shouldReduceMotion = useReducedMotion()
const variants = {
  enter: { opacity: 1, y: shouldReduceMotion ? 0 : 8 }
}
```

Motion's `AnimatePresence` also respects `prefers-reduced-motion` automatically when using its built-in variants.

---

## Adding Animations to New Components

### Simple entrance (Tailwind)
```tsx
<div className="animate-fade-in motion-reduce:animate-none">
  Content
</div>
```

### Controlled animation (Motion)
```tsx
import { motion } from "motion/react"

<motion.div
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>
  Content
</motion.div>
```

### Hover/tap interaction (Motion)
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
>
  Click me
</motion.button>
```

---

## Performance Rules for Animations

1. Only animate `opacity` and `transform` — these are GPU-accelerated and don't cause layout reflow
2. Never animate `width`, `height`, `padding`, `margin`, `top`, `left` directly
3. Use `will-change: transform` sparingly (only on elements that animate frequently)
4. Test on low-end devices — disable if performance is poor
5. Always respect reduced motion preferences
