---
slug: thrivent-fp
title: Thrivent Design System Foundation
language: en
role: Product Designer
goal: Build the Thrivent FP design system foundation, ensuring artifacts were usable from day one and scalable across the broader Thrivent ecosystem
source: src/data/case-studies/thrivent.tsx
---

# Thrivent Design System Foundation

I built the design system foundation for Thrivent's financial portal, a channel that had grown for over a decade without design guidelines. The challenge was to produce artifacts with imediate value to the team, and scalable to the broader ecosystem. Over 300 pages catalogued, design tokens defined, and base components documented.

- Role: Product Designer
- Goal: Build the Thrivent FP design system foundation, ensuring artifacts were usable from day one and scalable across the broader Thrivent ecosystem
- Source: src/data/case-studies/thrivent.tsx

![Redesigned Thrivent FP portal showing fund detail page with restructured navigation and new design system components](/files/case-studies/thrivent/shot 0.png)

## Context

Thrivent is a financial organization with over 120 years of history, in the process of modernizing its digital channels. The project focused on Thrivent FP, the portal for the Thrivent Asset Management arm aimed at financial market professionals, a critical channel with years of accumulated technical and design debt.

During the two-week onboarding, I navigated the interfaces across Thrivent's different portals and conducted a competitive analysis of the financial market. The diagnosis was clear: inconsistencies across pages, components without standardization, and design decisions being made repeatedly without any reference. There was no immediate roadmap item, but I identified the window of opportunity and took initiative. I structured a full plan (motivations, stages, deliverables, and timelines), presented it formally to the team, and received approval to execute.

## My role and contribution

I worked as the sole designer on the project, with periodic check-ins with the design lead. I also collaborated with developers to ensure technical feasibility and quality of code deliverables. The timeline was 4 weeks.

- Identified the opportunity and structured the project plan, defining motivations, stages, deliverables, and timelines. Presented it formally to the team and received approval to execute.
- Automated the page catalogue, reducing a task estimated at 7 days to 1 hour. Over 300 pages have been cataloged during this stage.
- Built the complete design token layer, from primitives (colors, typography, spacing) to semantic tokens (assigning usage meaning to each value). After collaborating with the development team, I adopted Tailwind CSS naming conventions to ease the learning curve of the team.
- Created documented base components prioritizing the fund analysis flow (home, listing, asset detail), the most critical path identified in the competitive analysis.
- Prototyped in code and built a documented Storybook using Figma Make, and Claude Code, testing keyboard navigation, responsiveness, filters, and interactions in a real environment.

Tools: Figma, Claude Code, and Figma Make. | Timeline: 4 weeks

## Challenges

Thrivent FP was a portal built over more than a decade without design guidelines, without a system, and without a shared language between designers and developers.

- Portal without visual standardization: Years of organic growth created unnecessary variations throughout the interface: 6 card types with 23 structural variations, multiple hero banner variations, and 5 button types. Designers and developers made the same decisions repeatedly, without any reference.
- Artifacts needed to work from day one: The components created needed to go into immediate use and be scalable to other Thrivent interfaces and brands in the future.

![Previous state of the Thrivent FP portal showing visual inconsistencies across pages](/files/case-studies/thrivent/shot 1.png)

## Process

1. Plan and present the proposal — After identifying the opportunity during onboarding, I structured a plan with motivations, stages, expected deliverables, and timelines for each phase. I presented it formally to the team and received approval to begin execution.
1. Catalogue portal pages — Manually cataloguing over 300 pages would have taken days. I chose to automate: Using Python, I created a bot that crawls the portal, captures URLs, and generates screenshots with configurable parameters. A task estimated at 7 days was completed in 1 hour.
1. Inventory patterns and inconsistencies — With the catalogue in hand, I analyzed the existing design patterns and mapped the inconsistencies. The result confirmed the onboarding diagnosis: cards with 6 types and 23 structural variations, hero banners with multiple variations, and 5 button types.
1. Prioritize based on competitive analysis — The analysis conducted during onboarding revealed a clear pattern: every financial portal studied guided users toward the asset detail page as the core flow. I prioritized the fund analysis flow (home, fund listing, asset detail) as the most critical path.
1. Create design tokens — Built the complete token layer: primitive tokens (colors, typography, spacing) and semantic tokens (assigning usage meaning to each value). I adopted Tailwind CSS naming conventions as a reference, normalizing proprietary names. 'thrivent-navy-deep-blue' became 'blue-900'.
1. Prototype in code — I went from mockups to direct implementation in React. A Figma prototype tests aesthetics; a code prototype tests behavior. I implemented the prioritized flow screens and tested keyboard navigation, responsiveness, fund page filters, and asset table interactions.
1. Consolidate, document, and deliver — Documented when and how each component should be used, for two audiences: designers and developers. Beyond the visual documentation, I created an AI-friendly layer: verbose, self-contained Markdown files with no reliance on visual context. I used Claude Code to build the final Storybook with framework-agnostic components.

![Thrivent process: catalogue script output with automatically generated URLs and screenshots](/files/case-studies/thrivent/shot 2.png)

![Thrivent process: component inventory showing card, button, and hero banner variations](/files/case-studies/thrivent/shot 3.png)

![Thrivent process: primitive and semantic tokens with normalized color palette and typography](/files/case-studies/thrivent/shot 4.png)

![Thrivent design system base components: documented card, button, and form elements](/files/case-studies/thrivent/shot 5.png)

![Thrivent FP code PoC: React prototype showing fund analysis flow with filters and asset table](/files/case-studies/thrivent/shot 6.png)

![Thrivent design system documentation: Markdown file](/files/case-studies/thrivent/shot 7.png)

![Thrivent design system documentation: Storybook with documented components and AI-friendly handoff](/files/case-studies/thrivent/shot 8.png)

## Results

In 4 weeks I delivered the complete design system foundation, ready for immediate use.

- 300+ pages catalogued in 1 hour: Python + Playwright automation transformed the most time-consuming stage into a matter of minutes, freeing time for strategic decisions.
- Complete design tokens (primitive + semantic): Colors, typography, and spacing consolidated, with a semantic layer assigning usage meaning. Ready for extension to other Thrivent brands.
- Base components documented with dual layer: Visual documentation for designers and developers, plus AI-friendly Markdown documentation for coding agents. A team developer described the code as 'easy to read, organized and documented.'
- Functional code PoC: Code prototypes testing the complete fund analysis flow, with keyboard navigation, responsiveness, and real interactions validated in a functional environment.

*Production adoption data not available. The design system was delivered as a foundation, before the implementation window in the roadmap.

## Learnings

Before this project, I expected high-impact opportunities to come through the roadmap. During the Thrivent onboarding, I realized the design system pain was real, the calendar window existed, and nobody was going to put it on the agenda anytime soon. I chose to structure the proposal, present it formally, and execute. The result validated something that is now part of my process: when I identify a systemic pain with an execution window, I do not wait for someone else to turn it into a task.
