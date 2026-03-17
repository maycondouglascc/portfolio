# Project Scope

What is in and out of scope for this portfolio. Use this to avoid over-engineering and to quickly assess whether a proposed feature fits.

---

## In Scope

### Core Portfolio Functionality
- Project showcase (grid, cards, thumbnails)
- Case study pages with rich content
- Work experience timeline
- Contact section (email, LinkedIn, Literal)

### Design & UX Quality
- Polished UI with consistent design system (Tailwind + custom tokens)
- Smooth page transitions and component animations
- Dark mode / light mode / system preference
- Bilingual support (English + Portuguese)

### Performance & Accessibility
- Fast initial load (code splitting, Brotli compression)
- Accessible interactive elements (ARIA, keyboard navigation)
- Responsive design (mobile-first, desktop polished)
- Reduced motion support

### Developer Experience
- TypeScript strict mode for type safety
- ESLint with zero-warning policy
- Context documentation (`/context` folder)
- Fast dev iteration (Vite HMR)

---

## Out of Scope

### Backend / Server-side
- No API routes
- No database
- No authentication
- No server-side rendering (Vite SPA only)
- No serverless functions (unless contact form is added)

### Content Management
- No CMS (content is hardcoded TypeScript)
- No admin panel
- No content preview environments
- No scheduled publishing

### Social / Community Features
- No comments
- No likes or reactions
- No sharing widgets (except open graph meta tags)
- No newsletter

### E-commerce
- No paid content
- No subscriptions
- No checkout flow

### Testing
- No unit tests, integration tests, or E2E tests currently
- This is a deliberate scope decision — benefits don't outweigh cost for a personal portfolio

---

## Guiding Principles for Scope Decisions

**When evaluating whether to add something, ask:**

1. **Does it serve the primary audience?** (hiring managers, potential clients)
2. **Does it add complexity that needs ongoing maintenance?**
3. **Is it something a personal portfolio genuinely needs, or is it scope creep?**
4. **Can it be done with the existing stack, or does it require new dependencies?**

**Default to simplicity.** A portfolio's job is to get out of the way and showcase the work.
