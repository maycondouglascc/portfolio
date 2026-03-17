# Project Overview

Core facts about the portfolio — what it is, who it's for, and what it does.

---

## What It Is

A personal portfolio website for **Maycon Douglas**, Product Designer. The portfolio serves as a professional showcase for hiring managers, clients, and collaborators.

**Live URL:** [maycondouglas.work](https://maycondouglas.work)
**Repository:** GitHub (private)
**Hosting:** Vercel (auto-deploy from `main`)

---

## Purpose

1. **Showcase work** — Display projects and case studies with detailed process documentation
2. **Establish credibility** — Show experience, role history, and design thinking
3. **Enable contact** — Simple, low-friction contact (email copy, LinkedIn link)
4. **Bilingual reach** — Serve both English and Portuguese-speaking audiences

---

## Core Features

| Feature | Description |
|---------|-------------|
| Project showcase | Grid of projects with thumbnails and optional Lottie hover animations |
| Case study pages | Rich content pages with text, images, metrics, and problem/result analysis |
| Experience timeline | Work history with company, role, and period |
| i18n | Full English and Portuguese support |
| Theme switching | Light, dark, and system-preference modes |
| Page transitions | Smooth orchestrated enter/exit animations |
| Contact | Copy-to-clipboard email, LinkedIn, and Literal links |

---

## Audience

**Primary:** Product design hiring managers and team leads — evaluating design craft, process, and communication quality.

**Secondary:** Product designers and developers in the design community — potential collaborators, referrals.

**Geography:** Global, with emphasis on Brazil and international markets (hence bilingual support).

---

## Success Criteria

- Fast load time (Vite build + Brotli compression + Vercel CDN)
- Accessible to all users (WCAG AA target)
- Looks polished on mobile and desktop
- Case studies communicate design thinking clearly
- Easy to add new projects and case studies

---

## What This Project Is NOT

- Not a blog
- Not an e-commerce site
- Not a CMS-driven content platform (content is hardcoded TypeScript)
- Not a full-stack application (no backend, no database, no auth)
- Not a React component library

---

## Tech Summary

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 7 |
| Styling | Tailwind CSS 3 |
| Routing | React Router 6 |
| Animation | Motion (Framer Motion fork) |
| Deployment | Vercel |

For full tech details, see `context/developer/onboarding.md`.
