import type { CaseStudyData } from "../projects";
import type { Language } from "../../context/LanguageContext";

// Source provenance and editorial limits: context/case-studies/vendd-sources.md
const content = {
  "title": [
    "Vendd — Design de produto e design system",
    "Vendd — Product Design & Design System"
  ],
  "description": [
    "Estruturei a base de design da Vendd como designer solo, conectando direção visual, design system e fluxos de produto. O desafio era manter a coerência de um ecossistema em expansão para plataformas web e mobile.",
    "As Vendd’s sole designer, I established its design foundation, connecting visual direction, a design system, and product flows. The challenge was to keep an expanding ecosystem consistent across web and mobile."
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
    "Atuei como único Product Designer, em colaboração com o líder técnico e o time de desenvolvimento. Fui responsável pela direção visual, pelo design system e pelo desenho dos principais fluxos do produto.",
    "I worked as the sole Product Designer alongside the technical lead and development team. I was responsible for visual direction, the design system, and the main product flows."
  ],
  "contributions": [
    [
      "Defini a linguagem visual e construí o design system, com tokens, componentes reutilizáveis e suporte a temas claro e escuro.",
      "Desenhei os fluxos de onboarding e de cadastro de negócios e contatos, além das funcionalidades de CRM, Link na Bio, Catálogo Virtual e Vendd Academy.",
      "Redesenhei a arquitetura de navegação para organizar os produtos e a gestão de múltiplas empresas e contas."
    ],
    [
      "Defined the visual language and built the design system, with tokens, reusable components, and light and dark theme support.",
      "Designed onboarding and business and contact creation flows, as well as CRM, Link na Bio, Virtual Catalog, and Vendd Academy features.",
      "Redesigned the navigation architecture to organize products and support managing multiple businesses and accounts."
    ]
  ],
  "challengesIntro": [
    "Eu precisava desenhar novas funcionalidades em ritmo acelerado e manter a experiência compreensível à medida que a Vendd crescia.",
    "I needed to design new features at a fast pace while keeping the experience understandable as Vendd grew."
  ],
  "challenges": [
    [
      [
        "Inconsistência entre produtos",
        "Sem padrões comuns, o usuário teria de reaprender ações conhecidas ao trocar de ferramenta. O desafio era manter a navegação e as interações previsíveis, mesmo com a entrada de novos produtos e a expansão para mobile."
      ],
      [
        "Inconsistency across products",
        "Without shared patterns, users would have to relearn familiar actions when switching tools. The challenge was to keep navigation and interactions predictable as new products and mobile experiences were added."
      ]
    ],
    [
      [
        "Dificuldade para se localizar na plataforma",
        "A troca de produto e os menus de cada ferramenta tinham pouca distinção visual. Isso dificultava entender onde encontrar uma função. Para quem administrava mais de uma empresa, a navegação também precisava deixar claro em qual delas estava trabalhando."
      ],
      [
        "Difficulty finding your way around",
        "The product switcher and each tool’s menus had little visual distinction, making it harder to know where to find a feature. For users managing more than one business, navigation also needed to make the active business clear."
      ]
    ]
  ],
  "process": [
    [
      [
        "Alinhar prioridades com o time",
        "Nos alinhamentos com o líder técnico, discutia as demandas, as restrições de implementação e o escopo de cada entrega. Como designer solo, precisava definir onde concentrar o trabalho de design entre as diferentes frentes do produto."
      ],
      [
        "Align priorities with the team",
        "In reviews with the technical lead, I discussed requests, implementation constraints, and the scope of each delivery. As the sole designer, I had to decide where to focus design work across the product."
      ]
    ],
    [
      [
        "Analisar a jornada antes de desenhar",
        "Revisava os fluxos e a navegação para identificar dúvidas, interrupções e problemas de hierarquia. Consultava referências e concorrentes para comparar alternativas e avaliar o que fazia sentido para o público da Vendd."
      ],
      [
        "Review the journey before designing",
        "I reviewed flows and navigation to identify unclear steps, interruptions, and hierarchy problems. I looked at references and competitors to compare options and assess what suited Vendd’s audience."
      ]
    ],
    [
      [
        "Desenhar com padrões compartilhados",
        "Usava o design system como base para os protótipos e expandia a biblioteca conforme surgiam novas necessidades. A cada fluxo, considerava os estados de interação, a acessibilidade e as diferenças de uso entre web e mobile."
      ],
      [
        "Design with shared patterns",
        "I used the design system as the foundation for prototypes and expanded the library as new needs emerged. For each flow, I considered interaction states, accessibility, and differences between web and mobile use."
      ]
    ],
    [
      [
        "Revisar as soluções com desenvolvimento",
        "Apresentava os protótipos ao time técnico antes da implementação, explicando as decisões e discutindo dúvidas de comportamento e viabilidade. Incorporava os ajustes e registrava o que ainda precisava de definição."
      ],
      [
        "Review solutions with development",
        "I presented prototypes to the technical team before implementation, explained my decisions, and discussed behavior and feasibility. I incorporated adjustments and recorded decisions that were still open."
      ]
    ],
    [
      [
        "Documentar e manter o sistema",
        "Documentava os fluxos, componentes e comportamentos para orientar a implementação. Mantinha os padrões atualizados conforme o produto evoluía, para que o time pudesse reutilizar as decisões nos próximos trabalhos."
      ],
      [
        "Document and maintain the system",
        "I documented flows, components, and behavior to guide implementation. I kept patterns up to date as the product evolved so the team could reuse those decisions in later work."
      ]
    ]
  ],
  "resultsIntro": [
    "A Vendd passou a ter uma direção de design comum entre seus produtos. O time ganhou referências para evoluir as funcionalidades, e as revisões dos fluxos trouxeram problemas de experiência para a discussão antes da implementação.",
    "Vendd gained a shared design direction across its products. The team had patterns to build on as features evolved, and flow reviews brought experience problems into the discussion before implementation."
  ],
  "results": [
    [
      [
        "Coerência entre os produtos",
        "Unifiquei a linguagem visual e os padrões de interação que orientavam as diferentes ferramentas. Isso deu ao time uma referência para manter a mesma experiência à medida que o portfólio da Vendd crescia."
      ],
      [
        "Consistency across products",
        "I unified the visual language and interaction patterns across the tools. This gave the team a reference for keeping the experience consistent as Vendd’s product range grew."
      ]
    ],
    [
      [
        "Menos decisões refeitas a cada entrega",
        "Com os padrões definidos no design system, o time passou a contar com soluções reutilizáveis para problemas recorrentes de interface. Novas funcionalidades podiam partir dessas decisões, sem redesenhar os mesmos elementos."
      ],
      [
        "Fewer repeated design decisions",
        "With patterns defined in the design system, the team had reusable solutions to recurring interface problems. New features could build on those decisions without redesigning the same elements."
      ]
    ],
    [
      [
        "Riscos de compra identificados antes da implementação",
        "Na revisão da Academy, identifiquei que a separação entre visitantes e usuários logados poderia interromper a compra. Propus unificar a jornada e preservar a seleção do usuário, dando ao time uma alternativa para tratar esse risco."
      ],
      [
        "Purchase risks identified before implementation",
        "During the Academy review, I identified how separate paths for visitors and signed-in users could interrupt a purchase. I proposed a unified journey that preserved the user’s selection, giving the team a way to address that risk."
      ]
    ]
  ],
  "learnings": [
    "Ser o único designer me ensinou a assumir também a definição do problema e das prioridades. Para decidir onde investir tempo, precisei entender o negócio e discutir as escolhas com desenvolvimento. Levo essa postura para os próximos projetos: participar dessas conversas desde o início e construir padrões que permitam ao time continuar o trabalho com autonomia.",
    "Being the sole designer taught me to take responsibility for defining problems and priorities too. To decide where to spend my time, I had to understand the business and discuss choices with development. In future projects, I want to be part of those conversations from the start and build patterns that let the team continue the work independently."
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
      { type: "results", title: labels.results[i], intro: content.resultsIntro[i], items: content.results.map(item => ({ variant: "positive", title: item[i][0], description: item[i][1] })) },
      { type: "text", visibility: ["overview"], title: labels.learnings[i], body: <p>{content.learnings[i]}</p> },
    ],
  };
};

export default venddStudy;
