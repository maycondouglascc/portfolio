# Case Studies

How the case study system works — data model, routing, section types, and how to add a new case study.

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

### `CaseStudySection` — Discriminated Union

| `type` | Component | Key Props |
|--------|-----------|-----------|
| `"text"` | Inline `<p>` / `<h2>` | `body`, `title?`, `id?` |
| `"image"` | `CaseImage` | `src`, `alt`, `aspectRatio?`, `rounded?`, `priority?` |
| `"imageStack"` | `ImageStack` | `images: {src, alt}[]` |
| `"imageGrid"` | `ImageGrid` | `images: {src, alt}[]` |
| `"metrics"` | `MetricsRow` | `items`, `layout?`, `disclaimer?` |
| `"problems"` | `MetricsRow` variant | `title`, `intro`, `items` |
| `"results"` | `MetricsRow` variant | `title`, `intro`, `items`, `disclaimer?` |

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

| Slug | File | Status |
|------|------|--------|
| `danone-north-america` | `src/data/case-studies/danone.tsx` | Live |
| `gskpromx` | `src/data/case-studies/gskpromx.tsx` | Live |

---

## How to Add a New Case Study

### Step 1 — Create the content file

`src/data/case-studies/your-slug.tsx`

```tsx
import { Language } from "../../context/LanguageContext"
import { CaseStudyData } from "./index"

export function getYourSlug(language: Language): CaseStudyData {
  const isEn = language === "en"

  return {
    title: isEn ? "Project Title" : "Título do Projeto",
    description: isEn ? "Short description" : "Descrição curta",
    role: isEn ? "Product Designer" : "Product Designer",
    goal: isEn ? "The goal was to..." : "O objetivo era...",
    externalHref: "https://example.com",   // optional
    sections: [
      {
        type: "text",
        title: isEn ? "Background" : "Contexto",
        body: isEn ? "Long paragraph..." : "Parágrafo longo...",
      },
      {
        type: "image",
        src: "/path/to/image.webp",
        alt: isEn ? "Screenshot of X" : "Captura de tela de X",
        priority: true,   // hero image — load eagerly
      },
      {
        type: "metrics",
        items: [
          { label: isEn ? "Users" : "Usuários", value: "12k+" },
          { label: isEn ? "Sessions" : "Sessões", value: "40k" },
        ],
      },
      // ... more sections
    ],
  }
}
```

### Step 2 — Register in the index

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

### Step 3 — Add to projects list

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

### Step 4 — Add images

Place images in `src/assets/` or `public/`. For case study images:
- Format: WebP preferred (smaller, modern)
- Size: Width ≤ 1400px (full-width case study images)
- Thumbnails: Width ≤ 600px, consistent aspect ratio

---

## Section Writing Guidelines

### Text sections
- Keep paragraphs focused — one idea per section
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
