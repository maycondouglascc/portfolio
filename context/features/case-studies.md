# Case Studies

How the case study system works - data model, routing, section types, and how to add a new case study.

---

## Overview

Case studies are fully client-side. Content is hardcoded in TypeScript files, localized via factory functions, and rendered dynamically from a discriminated union of section types.

**URL pattern:** `/projects/:slug`
**Content source:** `src/data/case-studies/`

---

## Routing Flow

```
/projects/danone-north-america
          ↓
CaseStudy.tsx reads slug from useParams()
          ↓
getCaseStudy(slug, language) → CaseStudyData | undefined
          ↓
Render each section via switch on section.type
```

If `slug` is unknown → redirect to Not Found.
If `slug` is known but content is pending → "Coming soon" message.

---

## Data Model

### `CaseStudyData`

```ts
interface CaseStudyData {
  title: string
  description: string
  role: string
  goal: string
  sections: CaseStudySection[]
  externalHref?: string   // link to the live product (shown in CaseNavBar)
}
```

### `CaseStudySection` - Discriminated Union

| `type` | Component | Key Props |
|--------|-----------|-----------|
| `"text"` | Inline `<p>` / `<h2>` | `body`, `title?`, `id?` |
| `"image"` | `CaseImage` | `src`, `alt`, `aspectRatio?`, `rounded?`, `priority?` |
| `"imageStack"` | `ImageStack` | `images: {src, alt}[]` |
| `"imageGrid"` | `ImageGrid` | `images: {src, alt}[]` |
| `"metrics"` | `MetricsRow` | `items`, `layout?`, `disclaimer?` |
| `"problems"` | `MetricsRow` variant | `title`, `intro`, `items` |
| `"results"` | `MetricsRow` variant | `title`, `intro`, `items`, `disclaimer?` |
| `"process"` | `ProcessSteps` | `steps: ProcessStep[]`, `title?`, `id?` |

### `MetricItem`

```ts
interface MetricItem {
  label: string
  value: string
  description?: string
}
```

---

## Existing Case Studies

| Slug | File | Status | Template-compliant? |
|------|------|--------|---------------------|
| `danone-north-america` | `src/data/case-studies/danone.tsx` | Live | Yes |
| `gskpromx` | `src/data/case-studies/gskpromx.tsx` | Live | No (legacy structure) |
| `thrivent-fp` | `src/data/case-studies/thrivent.tsx` | Live | No (legacy structure) |

---

## How to Add a New Case Study

### Template-compliant vs legacy structure

**Template-compliant studies** (new standard) follow this pattern:
- Header `description` IS the TL;DR (no standalone TL;DR text section)
- No `metrics` section at top - KPIs go in `results`
- Section order: Hero → Contexto → Context image → Role → Challenges → Process → Process images → imageGrid → Results → Aprendizados

**Legacy studies** (GSK, Thrivent) use the older pattern with top metrics + TL;DR section. They still work fine - no need to migrate.

### Step 1 - Create the content file

`src/data/case-studies/your-slug.tsx`

```tsx
import type { CaseStudyData } from "../projects"
import type { Language } from "../../context/LanguageContext"

const IMG_BASE = "/files/case-studies/your-slug"

const yourSlugStudy = (language: Language): CaseStudyData => {
  const isPt = language === "pt"

  return {
    title: "Project Title",
    description: isPt ? "3-sentence TL;DR in PT" : "3-sentence TL;DR in EN",
    role: "UI Designer",
    goal: isPt ? "1-sentence goal" : "1-sentence goal",
    sections: [
      { type: "image", src: `${IMG_BASE}/hero.png`, alt: "...", priority: true },
      { type: "text", visibility: ["overview"], title: "Contexto", body: (<>...</>) },
      { type: "problems", visibility: ["overview"], title: "Desafios", intro: "...", items: [...] },
      { type: "process", visibility: ["overview"], title: "Processo", steps: [...] },
      { type: "imageGrid", images: [...] },
      { type: "results", title: "Resultados", intro: "...", items: [...] },
      { type: "text", visibility: ["overview"], title: "Aprendizados", body: (<p>...</p>) },
    ],
  }
}

export default yourSlugStudy
```

### Step 2 - Register in the index

`src/data/case-studies/index.ts`

```ts
import { getYourSlug } from "./your-slug"

export const caseStudySlugs = new Set([
  "danone-north-america",
  "gskpromx",
  "your-slug",   // ← add here
])

const caseStudies: Record<string, (language: Language) => CaseStudyData> = {
  "danone-north-america": getDanone,
  "gskpromx": getGskPromx,
  "your-slug": getYourSlug,   // ← add here
}
```

### Step 3 - Add to projects list

`src/data/projects.ts`

Add an entry to `projectsCatalog`:
```ts
{
  slug: "your-slug",
  title: { en: "Project Title", pt: "Título do Projeto" },
  description: { en: "...", pt: "..." },
  thumbnail: "/path/to/thumbnail.webp",
  thumbnailAlt: { en: "...", pt: "..." },
  hoverLottie: undefined,   // optional: path to .json lottie file
}
```

### Step 4 - Add images

Place images in `src/assets/` or `public/`. For case study images:
- Format: WebP preferred (smaller, modern)
- Size: Width ≤ 1400px (full-width case study images)
- Thumbnails: Width ≤ 600px, consistent aspect ratio

---

## Section Writing Guidelines

### Text sections
- Keep paragraphs focused - one idea per section
- Use `title` for section headings (H2 level)
- Use `id` on text sections for anchor linking

### Image sections
- Set `priority: true` only on the first image (above fold)
- Always provide meaningful `alt` text
- Use `rounded: true` for UI screenshots (adds border-radius)
- Use `aspectRatio` to prevent layout shift during load

### Metrics sections
- 3–4 metrics per row is the sweet spot
- Values should be impactful numbers (KPIs, not vanity metrics)
- Use `disclaimer` for caveats or data source attribution

### Problems / Results sections
- Use `HighlightCard variant="negative"` for problems
- Use `HighlightCard variant="positive"` for results
- 3–5 items is ideal
- Be specific and concrete

### Process sections
- Use for ordered workflows, design phases, or step-by-step decisions
- `label`: one short action phrase (5–8 words)
- `description`: 1–2 sentences explaining the step
- 3–7 steps is the practical range; beyond that consider splitting into multiple sections

### Spacing & Layout in Visual Mode

In **visual mode**, section spacing is intelligent and context-aware:

| Context | Spacing | Rationale |
|---------|---------|-----------|
| Image → Image | 16px (mb-4) | Matches `ImageStack` internal gap; maintains visual rhythm |
| Image → Text | 32px (mb-8) | Breathing room before prose sections (role, goal, results) |
| Text → Any | 64px (mb-16) | Comfortable spacing for readability |
| Other modes | 64px (mb-16) | Consistent spacing across all section types |

This ensures that visual mode transitions like "shot 0 → my role" and "last image → results" feel properly balanced - tight between images, spacious around text.

---

## CaseNavBar

Appears at the top of every case study page. Provides:
- Back button (`← Projects`)
- Optional external link button (if `externalHref` is set)

```tsx
<CaseNavBar externalHref="https://example.com" />
```

---

## "Coming Soon" Pattern

If a slug is in `caseStudySlugs` but the factory function returns minimal content, the page shows a "coming soon" message. This allows listing a project in the grid without full case study content being ready.
