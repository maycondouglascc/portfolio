import type { CaseStudyData } from "../projects";
import type { Language } from "../../context/LanguageContext";

const IMG_BASE = "/files/case-studies/danone";

const danoneStudy = (language: Language): CaseStudyData => {
  const isPt = language === "pt";

  return {
    title: "Redesign - Danone North America",
    description: isPt
      ? "Redesenhei a presença digital institucional da Danone North America, criando a biblioteca de componentes e os templates do novo portal. O desafio: unir uma identidade visual em desenvolvimento às restrições técnicas do Adobe Experience Manager. O resultado: 150%+ de aumento em tráfego comparado ao ano anterior."
      : "I redesigned Danone North America's institutional digital presence, building the component library and templates for the new portal. The challenge: merging an evolving visual identity with Adobe Experience Manager's technical constraints. The result: 150%+ traffic increase year-over-year.",
    role: "UI Designer",
    goal: isPt
      ? "Criar a biblioteca de componentes e os templates do novo portal institucional dentro do AEM"
      : "Build the component library and page templates for the new institutional portal on AEM",
    hideOtherProjects: false,
    sections: [
      // ---1. Hero image (all modes) ────────────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 0.png`,
        alt: isPt
          ? "Portal institucional da Danone North America mostrando homepage redesenhada com navegação reestruturada e componentes do novo design system"
          : "Danone North America institutional portal showing the redesigned homepage with restructured navigation and new design system components",
        priority: true,
      },

      // ---2. Contexto (overview) ───────────────────────────────
      {
        type: "text",
        visibility: ["overview"],
        title: isPt ? "Contexto" : "Context",
        body: (
          <>
            <p>
              {isPt
                ? "A Danone North America é uma das maiores divisões da Danone globalmente, responsável por marcas líderes em alimentos e bebidas nos EUA e Canadá. O portal institucional, principal ponto de contato digital com investidores, parceiros, imprensa e consumidores, precisava refletir essa relevância. Paralelamente, a empresa desenvolvia uma nova identidade visual, o que criou a oportunidade para repensar o portal por completo."
                : "Danone North America is one of Danone's largest global divisions, home to leading food and beverage brands across the US and Canada. The institutional portal, the primary digital touchpoint for investors, partners, press, and consumers, needed to reflect that scale. At the same time, the company was developing a new visual identity, which created the opportunity to rethink the portal entirely."}
            </p>
            <p>
              {isPt
                ? "O cenário de partida era um site não-responsivo, lento, sem padrões de acessibilidade e com gestão de conteúdo engessada. O projeto operava sobre a infraestrutura do Adobe Experience Manager (AEM), premissa do cliente. Essa restrição definiu os limites de flexibilidade: cada solução de design precisava ser viável dentro das capacidades do CMS."
                : "The starting point was a non-responsive, slow site with no accessibility standards and rigid content management. The project ran on Adobe Experience Manager (AEM), a non-negotiable client requirement. That constraint set the boundaries: every design solution had to be feasible within the CMS's capabilities."}
            </p>
          </>
        ),
      },

      // ---3. Context image (all modes) ──────────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 1.png`,
        alt: isPt
          ? "Seção Our Purpose da Danone com fundo rosa e declaração de missão"
          : 'Danone "Our Purpose" banner section with branded pink background and mission statement',
      },

      // ---4. Meu papel e contribuição (overview) ──────────────
      {
        type: "text",
        visibility: ["overview"],
        title: isPt ? "Meu papel e contribuição" : "My role and contribution",
        body: (
          <>
            <p>
              {isPt
                ? "Atuei como UI Designer em um time de 4 designers e 3 desenvolvedores. Três líderes de design supervisionavam frentes distintas: uma gerente conduzia as conversas com o cliente e orientava decisões de UX, uma coordenadora cuidava de usabilidade, e um diretor de arte guiava a linguagem visual. Eu era o designer responsável por toda a execução, e também participei ativamente de todas as decisões de design, não apenas da produção."
                : "I worked as the UI Designer in a team of 4 designers and 3 developers. Three design leads oversaw different fronts: a manager handled client conversations and guided UX decisions, a coordinator managed usability, and an art director led the visual language. I owned all execution and also actively participated in every design decision, not just production."}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                {isPt
                  ? "Criei a biblioteca completa de 20+ componentes reutilizáveis, definindo padrões visuais, de interação e de acessibilidade para cada elemento, operando dentro das restrições do AEM."
                  : "Built the full library of 20+ reusable components, defining visual, interaction, and accessibility standards for each element while working within AEM's constraints."}
              </li>
              <li>
                {isPt
                  ? "Desenhei os templates responsivos do portal, traduzindo a nova identidade visual em páginas funcionais e escaláveis."
                  : "Designed the portal's responsive templates, translating the new visual identity into functional, scalable pages."}
              </li>
              <li>
                {isPt
                  ? "Preparei moodboards e referências visuais para os workshops de direcionamento visual, registrei insights das sessões e produzi artefatos derivados das decisões tomadas."
                  : "Prepared moodboards and visual references for art direction workshops, captured session insights, and produced artifacts from the decisions made."}
              </li>
              <li>
                {isPt
                  ? "Conduzi revisão heurística e QA interno de todos os componentes e templates, documentando padrões de uso, especificações de interação e diretrizes de acessibilidade."
                  : "Led heuristic review and internal QA on every component and template, documenting usage patterns, interaction specs, and accessibility guidelines."}
              </li>
            </ul>
          </>
        ),
      },

      // ---5. Desafios (overview) ───────────────────────────────
      {
        type: "problems",
        visibility: ["overview"],
        title: isPt ? "Desafios" : "Challenges",
        intro: isPt
          ? "O portal anterior acumulava problemas que iam além da estética: comprometiam a experiência, a operação e o alcance da plataforma."
          : "The previous portal had issues that went beyond aesthetics: they compromised the experience, operations, and the platform's reach.",
        items: [
          {
            variant: "negative",
            title: isPt
              ? "Portal não-responsivo, inacessível e lento"
              : "Non-responsive, inaccessible, and slow portal",
            description: isPt
              ? "O site não se adaptava a diferentes dispositivos, ignorava padrões de acessibilidade e apresentava carregamento lento. O design era datado e a estrutura técnica travava qualquer atualização. O time de marketing dependia de desenvolvimento para publicar ou alterar conteúdos."
              : "The site didn't adapt to different devices, ignored accessibility standards, and loaded slowly. The design was outdated and the technical structure blocked any updates. The marketing team depended on developers to publish or change content.",
          },
          {
            variant: "negative",
            title: isPt
              ? "Restrições da plataforma AEM"
              : "AEM platform constraints",
            description: isPt
              ? "Todas as soluções de design precisavam funcionar sobre o Adobe Experience Manager, premissa não-negociável do cliente. Isso exigia equilibrar a experiência ideal com as capacidades reais da plataforma, propondo soluções viáveis sem comprometer usabilidade ou objetivos de negócio."
              : "Every design solution had to work on Adobe Experience Manager, a non-negotiable client requirement. This meant balancing the ideal experience with the platform's actual capabilities, proposing feasible solutions without compromising usability or business goals.",
          },
          {
            variant: "negative",
            title: isPt
              ? "Arquitetura desalinhada com múltiplos públicos"
              : "Architecture misaligned with multiple audiences",
            description: isPt
              ? "O portal servia consumidores, investidores e imprensa com a mesma estrutura de navegação, sem diferenciação de jornadas ou priorização de conteúdo por audiência, o que gerava fricção para todos os públicos."
              : "The portal served consumers, investors, and press with the same navigation structure, with no journey differentiation or audience-based content prioritization, which created friction for every user group.",
          },
        ],
      },

      // ---6. Processo (overview) ───────────────────────────────
      {
        type: "process",
        visibility: ["overview"],
        title: isPt ? "Processo" : "Process",
        steps: [
          {
            label: isPt
              ? "Analisar o contexto e mapear o problema"
              : "Analyze context and map the problem",
            description: isPt
              ? "Mergulhei no cenário da Danone North America para entender as dores do portal existente, os públicos atendidos e as restrições técnicas. Essa imersão gerou o diagnóstico que orientou todas as decisões seguintes."
              : "Deep-dived into the Danone North America landscape to understand the existing portal's pain points, target audiences, and technical constraints. This immersion produced the diagnosis that guided every subsequent decision.",
          },
          {
            label: isPt
              ? "Definir o direcionamento visual"
              : "Define the visual direction",
            description: isPt
              ? "Preparei moodboards e referências visuais para os workshops com stakeholders, alinhando a direção de arte à nova identidade da marca. O KV aprovado foi desdobrado para todos os portais institucionais da Danone, não apenas o North America."
              : "Prepared moodboards and visual references for stakeholder workshops, aligning art direction with the new brand identity. The approved Key Visual was rolled out across all Danone institutional portals, not just North America.",
          },
          {
            label: isPt
              ? "Desenhar protótipos de alta fidelidade"
              : "Design wireframes and user journeys",
            description: isPt
              ? "Desenhei os protótipos de alta fidelidade com base nas diretivas definidas anteriormente para os fluxos principais, diferenciando jornadas por tipo de público. Cada protótipo conectava a narrativa de conteúdo à estrutura de navegação proposta."
              : "Designed high-fidelity prototypes based on the previously defined guidelines for the main flows, differentiating journeys by audience type. Each prototype connected the content narrative to the proposed navigation structure.",
          },
          {
            label: isPt
              ? "Criar a biblioteca de componentes"
              : "Create the component library",
            description: isPt
              ? "Desenhei 20+ componentes reutilizáveis no Figma, garantindo consistência visual, acessibilidade e viabilidade dentro do AEM. Documentei padrões de uso e especificações de interação para o handoff com desenvolvimento."
              : "Designed 20+ reusable components in Figma, ensuring visual consistency, accessibility, and feasibility within AEM. Documented usage patterns and interaction specs for the developer handoff.",
          },
          {
            label: isPt
              ? "Revisar acessibilidade e qualidade"
              : "Review accessibility and quality",
            description: isPt
              ? "Conduzi revisão heurística e QA interno em todos os componentes e templates, verificando conformidade com padrões de acessibilidade e consistência entre breakpoints."
              : "Led heuristic review and internal QA across all components and templates, verifying accessibility compliance and cross-breakpoint consistency.",
          },
        ],
      },

      // ---7. Process artifacts - Image 1 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 2.png`,
        alt: isPt
          ? "Processo de design da Danone: exploração de wireframes e mapa do site"
          : "Danone design process: wireframes and site map exploration",
      },

      // ---8. Process artifacts - Image 2 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 3.png`,
        alt: isPt
          ? "Processo de design da Danone: visão geral da biblioteca de componentes e design system"
          : "Danone design process: component library and design system overview",
      },

      // ---9. Process artifacts - Image 3 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 4.png`,
        alt: isPt
          ? "Processo de design da Danone: mockups de alta fidelidade das páginas principais"
          : "Danone design process: high-fidelity mockups of key pages",
      },

      // ---10. Final UI - Image 1 (all modes) ──────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 5.png`,
        alt: isPt
          ? "Biblioteca de componentes da Danone: seção hero da homepage"
          : "Danone component library: homepage hero section",
      },

      // ---11. Final UI - Image 2 (all modes) ──────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 6.png`,
        alt: isPt
          ? "Identidade visual da Danone: layouts de página com marca aplicada"
          : "Danone visual identity: branded page layouts",
      },

      // ---12. Final UI - Image 3 (all modes) ──────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 7.png`,
        alt: isPt
          ? "Identidade visual da Danone: tipografia e paleta de cores em contexto"
          : "Danone visual identity: typography and color palette in context",
      },

      // ---13. Resultados (all modes) ────────────────────────────
      {
        type: "results",
        title: isPt ? "Resultados" : "Results",
        intro: isPt
          ? "O redesign transformou o portal de um site estático e limitado em uma plataforma escalável e autônoma para o time da Danone."
          : "The redesign transformed the portal from a static, limited site into a scalable, self-service platform for the Danone team.",
        items: [
          {
            variant: "positive",
            title: isPt
              ? "150%+ de aumento em tráfego"
              : "150%+ traffic increase",
            description: isPt
              ? "Comparado ao ano anterior. Resultado da combinação entre nova arquitetura, melhor performance e experiência redesenhada."
              : "Compared to the previous year. The result of combining new architecture, better performance, and a redesigned experience.",
          },
          {
            variant: "positive",
            title: isPt
              ? "20+ componentes reutilizáveis"
              : "20+ reusable components",
            description: isPt
              ? "Deram autonomia ao time de marketing para criar e publicar páginas diretamente no AEM, sem dependência de desenvolvimento, acelerando a produção de conteúdo."
              : "Gave the marketing team autonomy to create and publish pages directly in AEM without developer dependency, accelerating content production.",
          },
          {
            variant: "positive",
            title: isPt
              ? "Templates responsivos e acessíveis"
              : "Responsive, accessible templates",
            description: isPt
              ? "Padronizaram a experiência do portal em diferentes dispositivos e contextos de uso, eliminando as inconsistências do site anterior."
              : "Standardized the portal experience across devices and usage contexts, eliminating the inconsistencies of the previous site.",
          },
          {
            variant: "positive",
            title: isPt
              ? "Nova arquitetura de informação"
              : "New information architecture",
            description: isPt
              ? "Diferenciou jornadas de consumidores, investidores e imprensa, reduzindo fricção na navegação e alinhando a estrutura ao modelo mental de cada público."
              : "Differentiated journeys for consumers, investors, and press, reducing navigation friction and aligning the structure with each audience's mental model.",
          },
        ],
        disclaimer: isPt
          ? "*Valores reais omitidos por confidencialidade."
          : "*Actual values omitted for confidentiality.",
      },

      // ---14. Aprendizados (overview) ──────────────────────────
      {
        type: "text",
        visibility: ["overview"],
        title: isPt ? "Aprendizados" : "Learnings",
        body: <p>[PREENCHER]</p>,
      },
    ],
  };
};

export default danoneStudy;
