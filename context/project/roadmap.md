# Roadmap

Planned features, in-progress work, and future directions for the portfolio. Updated as work progresses.

Last updated: September 2026

---

## Currently In Progress

### Context & Documentation Organization (`organizing-project` branch)
Creating structured `/context` folder with comprehensive documentation for developers and AI assistants. Includes design, developer, features, and project subfolders.

---

## Planned

### More Case Studies
- Add additional case studies for projects currently shown as "coming soon"
- Each case study should follow the existing pattern (see `context/features/case-studies.md`)

### SEO Improvements
- Branch `ai-seo` exists in remote — suggests AI-assisted SEO work was explored
- Dynamic `<title>` and `<meta description>` per page/case study
- Open Graph tags for case study pages
- Structured data (JSON-LD) for portfolio/person schema

### Performance Monitoring
- Clarify analytics goal — current setup has both GA4 and Clarity
- Consider consolidating to a privacy-first option (Plausible, Fathom)
- Add Core Web Vitals monitoring

### Accessibility Audit
- Full WCAG 2.1 AA audit
- Screen reader testing
- Color contrast verification for all component states

---

## Potential Future Work

### More Projects (Without Full Case Studies)
- Projects listed in the grid without a case study page link
- Good for breadth; case studies are reserved for most impactful work

### Contact Form
- Low priority — email copy + LinkedIn covers most contact needs
- Would require a serverless function or form service (Formspree, Resend)

### Blog / Writing Section
- Currently out of scope
- Would require significant content management rethinking

### CMS Integration
- Was attempted (TinaCMS branch) but reverted in favor of hardcoded TypeScript
- Revisit if content update frequency increases or non-technical editing is needed
- Sanity or Contentful would be the natural choices

---

## Completed (Recent)

- [x] ProjectsGrid component — categorizes projects by case study availability
- [x] GSK Promx case study page
- [x] Danone North America case study page
- [x] Language selector (EN/PT)
- [x] Google Analytics integration (GA4)
- [x] Microsoft Clarity session recording
- [x] SettingsBar unifying language + palette controls
- [x] Page transition animations with stagger
- [x] Automatic light/dark appearance based on system preference
- [x] Live color palette generator with five curated palettes
- [x] CaseCard with Lottie hover preview
- [x] Brotli + gzip compression
- [x] Code splitting (router, lottie, vendor chunks)
- [x] Vercel deployment setup
