import type { CaseStudyData } from "../projects";
import type { Language } from "../../context/LanguageContext";

// Source provenance and editorial limits: context/case-studies/vendd-sources.md
const content = {
  "title": [
    "Vendd — Design de produto e design system",
    "Vendd — Product Design & Design System"
  ],
  "description": [
    "Estruturei a base de design da Vendd como designer solo, conectando direção visual, design system e fluxos de produto. O desafio era manter a coerência de um ecossistema em expansão, entre ferramentas de vendas e plataformas web e mobile. O trabalho abrangeu mais de 5 produtos e mais de 10 fluxos principais, com componentes reutilizáveis e suporte a temas claro e escuro.",
    "As Vendd’s sole designer, I established its design foundation, connecting visual direction, a design system, and core product flows. The challenge was to maintain coherence across an expanding ecosystem of sales tools on web and mobile. The work covered 5+ products and 10+ core flows, with reusable components and light and dark theme support."
  ],
  "role": [
    "Product Designer solo",
    "Solo Product Designer"
  ],
  "goal": [
    "Criar uma experiência consistente e uma base de design reutilizável para o ecossistema de vendas da Vendd, em web e mobile.",
    "Create a consistent experience and a reusable design foundation for Vendd’s sales ecosystem across web and mobile."
  ],
  "context": [
    [
      "A Vendd é um ecossistema SaaS brasileiro voltado a produtores digitais, afiliados e pequenos negócios. A proposta reúne CRM, criação de páginas, ferramentas de vendas e conteúdo educacional em uma plataforma, aproximando atividades que normalmente ficam distribuídas entre diferentes ferramentas.",
      "A expansão para múltiplos produtos trouxe um desafio de design: organizar a navegação, permitir a gestão de diferentes empresas e manter padrões de interação compartilhados. Era necessário construir essa base enquanto os fluxos de produto continuavam evoluindo."
    ],
    [
      "Vendd is a Brazilian SaaS ecosystem for digital producers, affiliates, and small businesses. It brings CRM, page creation, sales tools, and educational content into one platform, connecting activities usually spread across separate tools.",
      "Expansion into multiple products introduced a design challenge: organize navigation, support multiple businesses, and maintain shared interaction patterns. This foundation had to be built while product flows continued to evolve."
    ]
  ],
  "contributionIntro": [
    "Atuei como único Product Designer, em colaboração com o líder técnico e o time de desenvolvimento. Minha responsabilidade conectava a direção visual às decisões de experiência e à documentação para implementação.",
    "I worked as the sole Product Designer, collaborating with the technical lead and development team. My role connected visual direction with experience decisions and implementation documentation."
  ],
  "contributions": [
    [
      "Defini a linguagem visual e construí o design system, com tokens, componentes reutilizáveis e suporte a temas claro e escuro.",
      "Desenhei fluxos de onboarding, CRM, cadastro de negócios e contatos, Link na Bio, Catálogo Virtual e Vendd Academy.",
      "Revisei a arquitetura de navegação para organizar os produtos e o contexto de múltiplas empresas.",
      "Documentei fluxos, estados de interação e recomendações para o handoff, com revisões de protótipos junto ao time técnico.",
      "Adaptei os fluxos centrais do CRM para mobile, preservando a lógica de negócios, contatos e navegação."
    ],
    [
      "Defined the visual language and built the design system, with tokens, reusable components, and light and dark theme support.",
      "Designed onboarding, CRM, business and contact creation, Link na Bio, Virtual Catalog, and Vendd Academy flows.",
      "Reviewed the navigation architecture to organize products and the context of multiple businesses.",
      "Documented flows, interaction states, and handoff recommendations, reviewing prototypes with the technical team.",
      "Adapted core CRM flows for mobile, preserving business, contact, and navigation logic."
    ]
  ],
  "challengesIntro": [
    "O trabalho precisava equilibrar a evolução de novas funcionalidades com decisões que sustentassem o conjunto da plataforma.",
    "The work had to balance new feature development with decisions that supported the platform as a whole."
  ],
  "challenges": [
    [
      [
        "Um ecossistema sem linguagem compartilhada",
        "Sem uma base reutilizável, cada novo produto poderia introduzir variações de componentes, navegação e comportamento. O sistema precisava acompanhar a expansão para web e mobile."
      ],
      [
        "An ecosystem without a shared language",
        "Without a reusable foundation, each new product could introduce variations in components, navigation, and behavior. The system had to support expansion across web and mobile."
      ]
    ],
    [
      [
        "Navegação entre produtos e empresas",
        "Alternar entre ferramentas e administrar diferentes negócios exigia clareza sobre o contexto atual. A auditoria apontou problemas de hierarquia, agrupamento e microcopy na navegação."
      ],
      [
        "Navigation across products and businesses",
        "Switching tools and managing different businesses required a clear sense of context. The audit identified hierarchy, grouping, and microcopy issues in navigation."
      ]
    ],
    [
      [
        "Fluxos comerciais com caminhos fragmentados",
        "Na Academy, jornadas diferentes para usuários autenticados e visitantes criavam um risco de descontinuidade na compra. No CRM, ações frequentes precisavam ser diretas, inclusive em telas menores."
      ],
      [
        "Fragmented commercial flows",
        "In Academy, separate journeys for signed-in users and visitors created a risk of purchase discontinuity. In CRM, frequent actions needed to remain direct, including on smaller screens."
      ]
    ]
  ],
  "process": [
    [
      [
        "Auditar a experiência e o contexto",
        "Analisei navegação, hierarquia, microcopy e requisitos de acessibilidade. O benchmarking de ferramentas de Link na Bio e catálogo ajudou a orientar propostas conectadas ao contexto brasileiro, incluindo Pix e WhatsApp."
      ],
      [
        "Audit the experience and context",
        "I reviewed navigation, hierarchy, microcopy, and accessibility requirements. Benchmarking link-in-bio and catalog tools helped shape proposals for the Brazilian context, including Pix and WhatsApp."
      ]
    ],
    [
      [
        "Construir a fundação do sistema",
        "Defini tokens, cores, tipografia e componentes reutilizáveis, com temas claro e escuro. Documentei padrões para que os novos fluxos partissem de uma linguagem comum em web e mobile."
      ],
      [
        "Build the system foundation",
        "I defined tokens, colors, typography, and reusable components with light and dark themes. I documented patterns so new flows could share a common language across web and mobile."
      ]
    ],
    [
      [
        "Reorganizar a navegação do ecossistema",
        "Trabalhei a separação entre produtos e os menus contextuais, considerando a gestão de múltiplas empresas. A proposta de navegação incluiu breadcrumbs, busca global e atalhos para itens recentes e favoritos."
      ],
      [
        "Reorganize ecosystem navigation",
        "I worked on product separation and contextual menus, accounting for multiple-business management. The navigation proposal included breadcrumbs, global search, and shortcuts for recent and favorite items."
      ]
    ],
    [
      [
        "Simplificar a edição no CRM",
        "No drawer de detalhes do negócio, desenhei a edição de título e valor no próprio campo, com confirmação por Enter ou ao sair do campo. A decisão aproximou a ação da informação e evitou abrir outro formulário para uma alteração pontual."
      ],
      [
        "Simplify editing in CRM",
        "In the business details drawer, I designed inline title and value editing, confirmed with Enter or by leaving the field. This brought the action closer to the information and avoided opening another form for a small change."
      ]
    ],
    [
      [
        "Conectar catálogo e jornada de compra",
        "Desenhei a conexão entre Link na Bio e Catálogo Virtual. Na Academy, identifiquei o risco dos caminhos de autenticação separados e recomendei uma experiência unificada, preservando a seleção do usuário ao longo da jornada."
      ],
      [
        "Connect the catalog and purchase journey",
        "I designed the connection between Link na Bio and Virtual Catalog. In Academy, I identified the risk of separate authentication paths and recommended a unified experience that preserved the user’s selection throughout the journey."
      ]
    ],
    [
      [
        "Adaptar os fluxos para mobile",
        "Adaptei a visão geral do negócio, produtos, conversas e criação e edição de negócios e contatos. O espelhamento preservou a lógica do CRM web, ajustando as interações ao uso por toque e ao espaço disponível."
      ],
      [
        "Adapt flows for mobile",
        "I adapted business overview, products, conversations, and business and contact creation and editing. The adaptation preserved web CRM logic while adjusting interactions for touch and the available screen space."
      ]
    ]
  ],
  "resultsIntro": [
    "O trabalho estabeleceu uma fundação compartilhada para o ecossistema. Os resultados documentados descrevem o alcance e os entregáveis de design.",
    "The work established a shared foundation for the ecosystem. The documented results describe design scope and deliverables."
  ],
  "results": [
    [
      [
        "5+ produtos contemplados",
        "A base de design abrangeu CRM, Pages, VSL, Mobile e Academy, conectando as frentes do ecossistema por uma linguagem visual compartilhada."
      ],
      [
        "5+ products covered",
        "The design foundation covered CRM, Pages, VSL, Mobile, and Academy, connecting the ecosystem through a shared visual language."
      ]
    ],
    [
      [
        "Design system para 2 plataformas",
        "Tokens, componentes e padrões documentados para web e mobile, com suporte a temas claro e escuro."
      ],
      [
        "A design system for 2 platforms",
        "Documented tokens, components, and patterns for web and mobile, with light and dark theme support."
      ]
    ],
    [
      [
        "10+ fluxos principais desenhados",
        "O escopo incluiu onboarding, CRM, cadastro de negócios e contatos, catálogo, Academy e dashboard. A documentação conectou decisões de experiência ao handoff."
      ],
      [
        "10+ core flows designed",
        "The scope included onboarding, CRM, business and contact creation, catalog, Academy, and dashboard. Documentation connected experience decisions with handoff."
      ]
    ],
    [
      [
        "CRM adaptado para mobile",
        "Os registros de execução confirmam a conclusão do espelhamento dos detalhes de negócio, criação e edição de negócios e contatos e nova navegação."
      ],
      [
        "CRM adapted for mobile",
        "Execution records confirm completion of the design adaptation for business details, business and contact creation and editing, and new navigation."
      ]
    ]
  ],
  "disclaimer": [
    "Não há métricas verificadas de conversão, retenção ou adoção em produção nas fontes consultadas. Os números representam escopo de design; recomendações de UX não são apresentadas como impacto medido.",
    "The reviewed sources contain no verified production conversion, retention, or adoption metrics. These numbers describe design scope; UX recommendations are not presented as measured impact."
  ],
  "learnings": [
    "Trabalhar como designer solo em um ecossistema em expansão me levou a conectar decisões de sistema a interações específicas. A mesma base precisava orientar a navegação entre produtos e a edição de um valor no CRM. O principal aprendizado foi tratar consistência como parte do trabalho cotidiano: documentar padrões, revisar os fluxos com desenvolvimento e distinguir o que já estava desenhado do que ainda dependia de validação.",
    "Working as the sole designer in an expanding ecosystem led me to connect system decisions with specific interactions. The same foundation had to guide both navigation across products and editing a value in CRM. My main learning was to make consistency part of everyday work: document patterns, review flows with development, and distinguish completed design from decisions still awaiting validation."
  ]
};
const labels = {
  "context": [
    "Contexto",
    "Context"
  ],
  "role": [
    "Meu papel e contribuição",
    "My role and contribution"
  ],
  "challenges": [
    "Desafios",
    "Challenges"
  ],
  "process": [
    "Processo",
    "Process"
  ],
  "results": [
    "Resultados",
    "Results"
  ],
  "learnings": [
    "Aprendizados",
    "Learnings"
  ]
};

const venddStudy = (language: Language): CaseStudyData => {
  const i = language === "pt" ? 0 : 1;
  return {
    title: content.title[i],
    description: content.description[i],
    role: content.role[i],
    goal: content.goal[i],
    sections: [
      {
        type: "image",
        src: "/files/case-thumbnails/project-thumbnail-3.png",
        alt: i === 0 ? "Apresentação visual do projeto Vendd" : "Vendd project visual presentation",
        priority: true,
      },
      { type: "text", visibility: ["overview"], title: labels.context[i], body: <>{content.context[i].map(text => <p key={text}>{text}</p>)}</> },
      {
        type: "text", visibility: ["overview"], title: labels.role[i],
        body: <><p>{content.contributionIntro[i]}</p><ul className="list-disc pl-5 space-y-2">{content.contributions[i].map(text => <li key={text}>{text}</li>)}</ul></>,
      },
      { type: "problems", visibility: ["overview"], title: labels.challenges[i], intro: content.challengesIntro[i], items: content.challenges.map(item => ({ variant: "negative", title: item[i][0], description: item[i][1] })) },
      { type: "process", visibility: ["overview"], title: labels.process[i], steps: content.process.map(item => ({ label: item[i][0], description: item[i][1] })) },
      { type: "results", title: labels.results[i], intro: content.resultsIntro[i], items: content.results.map(item => ({ variant: "positive", title: item[i][0], description: item[i][1] })), disclaimer: content.disclaimer[i] },
      { type: "text", visibility: ["overview"], title: labels.learnings[i], body: <p>{content.learnings[i]}</p> },
    ],
  };
};

export default venddStudy;
