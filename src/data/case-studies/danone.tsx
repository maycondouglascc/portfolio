import type { CaseStudyData } from '../projects'

const IMG_BASE = '/files/case-studies/danone'

const danoneStudy: CaseStudyData = {
  title: 'Danone NorAm Redesign',
  description:
    'Revitalizing the Danone NorAm digital presence by renewing its design language and migrating their institutional portal to the Adobe Experience Manager platform.',
  role: 'Product Designer',
  goal: 'Modernize interface and migrate to a dynamic CMS',

  sections: [
    // ── Overview: Metrics ──
    {
      type: 'metrics',
      id: 'overview',
      label: 'Metrics',
      layout: 'horizontal',
      items: [
        {
          variant: 'positive',
          title: '150%',
          description: 'Increase in site traffic',
        },
        {
          variant: 'positive',
          title: '15+',
          description: 'Reusable components built',
        },
        {
          variant: 'positive',
          title: '10+',
          description: 'Page templates created',
        },
      ],
      disclaimer:
        '*For confidentiality reasons, I have omitted the actual values for these metrics.',
    },

    // ── Hero image ──
    {
      type: 'image',
      src: `${IMG_BASE}/hero.png`,
      alt: 'Danone North America website hero banner showing the tagline "Bringing health through food to as many people as possible"',
      priority: true,
      rounded: false,
    },

    // ── TL;DR ──
    {
      type: 'text',
      title: 'TL;DR',
      body: (
        <>
          <p>
            Revitalized the Danone North America digital presence by migrating
            their institutional portal to the Adobe Experience Manager platform.
          </p>
          <p>
            This project moved beyond a simple redesign, focusing on a strategic
            overhaul of the information architecture, SEO performance, and
            content scalability.
          </p>
          <p>
            By implementing a responsive library of over 15+ components and
            restructuring 10+ core pages, the solution delivered a +150%
            increase in site traffic year-over-year*.
          </p>
        </>
      ),
    },

    // ── Purpose banner ──
    {
      type: 'image',
      src: `${IMG_BASE}/purpose-banner.png`,
      alt: 'Danone "Our Purpose" banner section with branded pink background and mission statement',
    },

    // ── The Problem ──
    {
      type: 'problems',
      id: 'the-problem',
      title: 'The problem',
      intro: 'The Danone Noram portal serves as a critical vitrine for investors, partners, and North American consumers. However, the legacy system presented significant hurdles:',
      items: [
        {
          variant: 'negative',
          title: 'Rigid CMS',
          description:
            'Content updates were slow and technically demanding, hindering marketing agility.',
        },
        {
          variant: 'negative',
          title: 'Brand Dilution',
          description:
            'A need to align with the global Danone digital ecosystem while preserving the regional authenticity and B-Corp identity of the North American branch.',
        },
        {
          variant: 'negative',
          title: 'Poor Discoverability',
          description:
            "The lack of an SEO-oriented structure limited the portal's reach and impact as a communication tool.",
        },
      ],
    },

    // ── Design Process ──
    {
      type: 'text',
      id: 'design-process',
      title: 'Design Process',
      body: (
        <>
          <p>
            The project followed a structured Discovery and Curadoria process to
            ensure the final architecture met both business and user
            expectations.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Discovery &amp; Research:</strong>{' '}
              Analyzed surveys and stakeholder expectations, identifying key
              themes such as recruitment, portfolio, and &ldquo;One Planet, One
              Health&rdquo;.
            </li>
            <li>
              <strong>Proto-Persona Development:</strong>{' '}
              Created four distinct personas&mdash;Theo, Lea, Ryan, and
              Ralph&mdash;to guide the content narrative and user journeys.
            </li>
            <li>
              <strong>Information Architecture:</strong>{' '}
              Developed wireframes and site maps to improve navigation and the
              flow of institutional information.
            </li>
          </ul>
        </>
      ),
    },

    // ── Process image stack ──
    {
      type: 'imageStack',
      id: 'approach',
      images: [
        {
          src: `${IMG_BASE}/process-1.png`,
          alt: 'Danone design process: wireframes and site map exploration',
        },
        {
          src: `${IMG_BASE}/process-2.png`,
          alt: 'Danone design process: component library and design system overview',
        },
        {
          src: `${IMG_BASE}/process-3.png`,
          alt: 'Danone design process: high-fidelity mockups of key pages',
        },
      ],
    },

    // ── Key Deliverables & Rationale ──
    {
      type: 'text',
      id: 'deliverables',
      title: 'Key Deliverables & Rationale',
      body: (
        <div className="space-y-2">
          <p className="text-body-15-regular text-zinc-900 dark:text-zinc-100">
            Scalable Component Library
          </p>
          <div>
            <p className="text-zinc-900 dark:text-zinc-100">
              Developed a library of 20+ responsive components.
            </p>
            <p>
              To empower the Danone team to manage content quickly and
              efficiently without developer intervention, ensuring brand
              consistency across all new pages and campaigns.
            </p>
          </div>
        </div>
      ),
    },

    // ── Grid 1: deliverables visuals ──
    {
      type: 'imageGrid',
      images: [
        {
          src: `${IMG_BASE}/grid1-1.png`,
          alt: 'Danone component library: homepage hero section',
        },
        {
          src: `${IMG_BASE}/grid1-2.png`,
          alt: 'Danone component library: product grid and brand imagery',
        },
        {
          src: `${IMG_BASE}/grid1-3.png`,
          alt: 'Danone component library: content cards and navigation patterns',
        },
        {
          src: `${IMG_BASE}/grid1-4.png`,
          alt: 'Danone component library: responsive layout examples',
        },
      ],
    },

    // ── SEO & Accessibility Framework ──
    {
      type: 'text',
      title: 'SEO & Accessibility Framework',
      body: (
        <>
          <p className="text-zinc-900 dark:text-zinc-100">
            Established a guide for SEO-oriented writing and accessible content.
          </p>
          <p>
            Redesigning the visual layer was insufficient; the underlying
            structure needed to be &ldquo;best in class&rdquo; for search engines
            to drive organic growth.
          </p>
        </>
      ),
    },

    // ── Integrated Visual Identity ──
    {
      type: 'text',
      title: 'Integrated Visual Identity',
      body: (
        <>
          <p>Balanced global branding with regional nuances.</p>
          <p>
            Utilized organic shapes and a vibrant color palette to reflect
            Danone&rsquo;s commitment to health through food while maintaining a
            professional institutional tone.
          </p>
        </>
      ),
    },

    // ── Grid 2: visual identity examples ──
    {
      type: 'imageGrid',
      images: [
        {
          src: `${IMG_BASE}/grid2-1.png`,
          alt: 'Danone visual identity: branded page layouts',
        },
        {
          src: `${IMG_BASE}/grid2-2.png`,
          alt: 'Danone visual identity: typography and color palette in context',
        },
        {
          src: `${IMG_BASE}/grid2-3.png`,
          alt: 'Danone visual identity: mobile-responsive page examples',
        },
        {
          src: `${IMG_BASE}/grid2-4.png`,
          alt: 'Danone visual identity: hero banner with child and healthy food imagery',
        },
      ],
    },

    // ── Results & Reflection ──
    {
      type: 'results',
      id: 'outcomes',
      title: 'Results & Reflection',
      intro:
        'The impact of the new digital experience was immediate and quantifiable',
      items: [
        {
          variant: 'positive',
          title: 'Traffic Growth',
          description:
            'A 150%+ increase in accesses compared to the previous year, directly attributed to the new SEO structure and improved UI.',
        },
        {
          variant: 'positive',
          title: 'Operational Efficiency',
          description:
            'The transition to AEM and the creation of the component library drastically reduced the time-to-market for new content updates.',
        },
      ],
      disclaimer:
        '*For confidentiality reasons, I have omitted the actual values for these metrics.',
    },

    // ── Personal Takeaway ──
    {
      type: 'text',
      title: 'Personal Takeaway',
      body: (
        <p>
          This project reinforced the importance of technical feasibility in
          Senior Design leadership. Success wasn&rsquo;t just about the
          &ldquo;attractive design&rdquo;&mdash;but about building a system that
          the client could actually maintain and grow independently within the
          AEM ecosystem.
        </p>
      ),
    },
  ],
}

export default danoneStudy
