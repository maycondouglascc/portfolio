# View Modes

How to write and tag case study content for each view mode - Visual, Overview, and Detailed.

---

## What This Feature Does

A **View Mode Selector** appears on every case study page, below the header. It lets visitors choose how much content to see based on their intent and available time.

The mode is stored in `localStorage` (key: `"viewMode"`) and persists across visits. The default is `"overview"`.

**The selector does not change the header** (title, description, role, goal). It only filters the `sections` array.

---

## The Three Modes

| Mode | Target Persona | Time Budget | What They Want |
|------|---------------|-------------|----------------|
| `"visual"` | Founders, CEOs, stakeholders | 1–3 min | Outcomes, shipped visuals, hard metrics - no process prose |
| `"overview"` | Recruiters, hiring managers | 2–5 min | The full case study as written - current default behavior |
| `"detailed"` | Design managers, senior ICs | 5–15 min | Everything in Overview + deeper rationale, iteration logs, edge cases |

---

## How Visibility Works

Every section in the `sections` array accepts an optional `visibility` field:

```ts
visibility?: ViewMode[]  // "visual" | "overview" | "detailed"
```

**Rules:**
- `visibility` is `undefined` → section appears in **all modes** (no tag needed)
- `visibility: ["overview", "detailed"]` → hidden in Visual, shown in the other two
- `visibility: ["detailed"]` → only shown in Detailed mode
- `visibility: ["visual"]` → only shown in Visual mode (rare - use for executive summary callouts)

This is evaluated by `filterSectionsByMode()` in `src/utils/filterSectionsByMode.ts` before rendering.

---

## Default Tagging Rules

Follow these as your baseline for every case study. Only deviate with purpose.

> **Note:** The system currently uses **two view modes** (`visual` and `overview`). Content that the editorial template marks as `["detailed"]` (like Aprendizados) should use `["overview"]` instead.

### No tag (visible in all modes)

These sections must always be visible - they form the "visual proof" layer:

| Section type | Rationale |
|-------------|-----------|
| `image` with `priority: true` (hero image) | Visual context for the project |
| `imageGrid` | Shows finished, shipped UI |
| `results` | The outcome - always relevant |

**Legacy studies only:**
| Section type | Rationale |
|-------------|-----------|
| `metrics` (hero KPIs at top) | First thing founders and recruiters look for |

> Template-compliant studies don't use a top `metrics` section - KPIs go in `results` instead.

### `visibility: ["overview"]`

The bulk of a standard case study. Shows to everyone except founders in a hurry:

- `text` sections (Contexto, Role, Aprendizados)
- `problems` sections
- `process` sections
- `imageStack` (process screenshots)
- Non-hero `image` sections (research, sitemaps, process artefacts)

---

## The TL;DR Pattern

There are two approaches depending on the case study structure:

### Template-compliant studies (new standard)
The header `description` IS the TL;DR. There is no standalone TL;DR text section. The description should be 2–3 sentences that front-load impact.

In Visual mode, the reader sees: `Header (title + description) → Hero image → imageGrid(s) → Results`. That is the entire story for a founder.

### Legacy studies (GSK, Thrivent)
These have a **TL;DR text section immediately after the hero image**, with no `visibility` tag. This section is the only prose visible in Visual mode.

In Visual mode, the reader sees: `metrics → hero image → TL;DR → imageGrids → results`.

---

## Writing Per Mode

### Writing for Visual mode

Ask yourself: *"If a founder had 90 seconds, what three things should they walk away with?"*

- **Template-compliant:** The header `description` is the only prose - make it count (outcome first, challenge second, key metric third)
- **Legacy:** The TL;DR section and top metrics must be punchy and specific
- imageGrid captions (alt text) should name what the UI does, not just describe it visually
- The results section should be the climax - close with the most impressive outcome

### Writing for Overview mode

This is the default. Write it as you would a portfolio case study:

- Problem → Process → Solution → Outcome
- Each text section should have a clear, scannable `title`
- Use `problems` sections to list specific pain points (not generic statements)
- Use `process` sections for ordered workflows - `label` should be a verb phrase
- Avoid long unbroken prose; use short paragraphs and `<ul>` lists inside `body`

### Writing for Detailed mode

Detailed mode is identical to Overview until you start adding `visibility: ["detailed"]` sections. Use these for content that rewards careful reading:

- **Design decisions:** "We chose X over Y because..." with concrete tradeoffs
- **What didn't work:** Be honest about dead ends and pivots
- **Constraint context:** Why certain decisions were made (technical debt, client constraints, timeline)
- **Extended process:** Deeper explanation of research methodology, testing sessions, synthesis

---

## Annotated Example

```tsx
sections: [
  // ─── Visible in all modes ───────────────────────────────────
  {
    type: "metrics",
    // No visibility - always shown
    layout: "horizontal",
    items: [{ variant: "positive", title: "150%", description: "Traffic increase YoY" }],
    disclaimer: "*Confidential values omitted.",
  },
  {
    type: "image",
    priority: true,
    // No visibility - hero image always shown
    src: "/files/case-studies/project/hero.png",
    alt: "Final homepage design after redesign",
  },
  {
    type: "text",
    title: "TL;DR",
    // No visibility - the only prose visible in Visual mode
    body: (
      <>
        <p>Rebuilt the portal from scratch, shipping 20+ components in 8 weeks.</p>
        <p>Resulted in a 150% increase in traffic and a 40% drop in bounce rate.</p>
      </>
    ),
  },
  {
    type: "imageGrid",
    // No visibility - finished UI always shown
    images: [
      { src: "/files/case-studies/project/grid-1.png", alt: "Homepage redesign" },
      { src: "/files/case-studies/project/grid-2.png", alt: "Product listing page" },
    ],
  },
  {
    type: "results",
    // No visibility - outcomes always shown
    title: "Results & Reflection",
    intro: "The new experience launched in Q3 and showed immediate impact.",
    items: [
      { variant: "positive", title: "Traffic Growth", description: "+150% YoY." },
      { variant: "positive", title: "Bounce Rate", description: "-40% on key pages." },
    ],
  },

  // ─── Visible in Overview + Detailed ─────────────────────────
  {
    type: "problems",
    visibility: ["overview", "detailed"],
    title: "The Problem",
    intro: "The legacy portal had three critical issues:",
    items: [
      { variant: "negative", title: "Rigid CMS", description: "..." },
      { variant: "negative", title: "Brand Dilution", description: "..." },
    ],
  },
  {
    type: "text",
    visibility: ["overview", "detailed"],
    title: "Design Process",
    body: <p>We followed a triple diamond approach...</p>,
  },
  {
    type: "imageStack",
    visibility: ["overview", "detailed"],
    images: [
      { src: "/files/case-studies/project/process-1.png", alt: "Wireframes" },
      { src: "/files/case-studies/project/process-2.png", alt: "Component library" },
    ],
  },

  // ─── Visible in Detailed only ───────────────────────────────
  {
    type: "text",
    visibility: ["detailed"],
    title: "Why We Chose AEM Over Contentful",
    body: (
      <>
        <p>The client was already invested in the Adobe ecosystem...</p>
        <p>Contentful would have been faster to ship but created a vendor conflict...</p>
      </>
    ),
  },
],
```

---

## Checklist When Adding a New Case Study

### Template-compliant studies (new standard)
- [ ] Header `description` serves as the TL;DR (2–3 sentences, impact-first)
- [ ] Hero image has `priority: true` and no `visibility` tag
- [ ] No top `metrics` section - KPIs are in `results`
- [ ] All imageGrid sections have no `visibility` tag
- [ ] Results section has no `visibility` tag
- [ ] All body text sections have `visibility: ["overview"]`
- [ ] Problems section has `visibility: ["overview"]`
- [ ] Process sections (both `process` type and process imageStacks) have `visibility: ["overview"]`
- [ ] Non-hero images have `visibility: ["overview"]`
- [ ] Aprendizados section uses `visibility: ["overview"]` (template's "detailed" maps to "overview")
- [ ] Visual mode flow: Header → Hero → imageGrid(s) → Results (~90 sec)
- [ ] Overview mode flow: Full narrative, complete and scannable

### Legacy studies (GSK, Thrivent)
- [ ] Metrics section has no `visibility` tag (shown to all)
- [ ] TL;DR text section exists, has no `visibility` tag, and opens with impact
- [ ] Visual mode flow: metrics → hero → TL;DR → imageGrids → results

---

## Implementation Reference

| File | Role |
|------|------|
| `src/data/projects.ts` | `ViewMode` type, `VIEW_MODES` constant, `visibility?` on `CaseStudySection` |
| `src/context/ViewModeContext.tsx` | Context provider, `useViewMode()` hook, localStorage persistence |
| `src/components/ViewModeSelector.tsx` | UI component (radiogroup with tooltips) |
| `src/utils/filterSectionsByMode.ts` | Pure filter function used in `CaseStudy.tsx` |
| `src/pages/CaseStudy.tsx` | Renders filtered sections inside `AnimatePresence` |
| `src/components/ui/tooltip.tsx` | Radix-based tooltip used by the selector |
