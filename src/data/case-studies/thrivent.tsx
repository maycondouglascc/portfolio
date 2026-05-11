import type { CaseStudyData } from "../projects";
import type { Language } from "../../context/LanguageContext";

const IMG_BASE = "/files/case-studies/thrivent";

const thriventStudy = (language: Language): CaseStudyData => {
  const isPt = language === "pt";

  return {
    title: "Thrivent Design System Foundation",
    description: isPt
      ? "Criei a fundação do design system para o portal financeiro da Thrivent, um canal com mais de uma década de crescimento sem diretrizes de design. O desafio era produzir artefatos com valor imediato e escaláveis para as demais marcas do ecossistema. Foram mais de 300 páginas catalogadas, design tokens definidos e componentes base construídos e documentados."
      : "I built the design system foundation for Thrivent's financial portal, a channel that had grown for over a decade without design guidelines. The challenge was to produce artifacts with imediate value to the team, and scalable to the broader ecosystem. Over 300 pages catalogued, design tokens defined, and base components documented.",
    role: "Product Designer",
    goal: isPt
      ? "Criar a fundação do design system para o portal Thrivent FP, garantindo que os artefatos fossem gerassem valor desde o dia 1 e que fossem escaláveis para as demais marcas do ecossistema"
      : "Build the Thrivent FP design system foundation, ensuring artifacts were usable from day one and scalable across the broader Thrivent ecosystem",
    sections: [
      // ---1. Hero image (all modes) ────────────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 0.png`,
        alt: isPt
          ? "Portal Thrivent FP redesenhado mostrando página de detalhes de fundo de investimento com navegação reestruturada e componentes do novo design system"
          : "Redesigned Thrivent FP portal showing fund detail page with restructured navigation and new design system components",
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
                ? "A Thrivent é uma organização financeira com mais de 120 anos de história, em processo de modernização dos seus canais digitais. O projeto focou no Thrivent FP, portal do braço Thrivent Asset Management voltado a profissionais do mercado financeiro, um canal crítico com anos de dívida técnica e de design acumuladas."
                : "Thrivent is a financial organization with over 120 years of history, in the process of modernizing its digital channels. The project focused on Thrivent FP, the portal for the Thrivent Asset Management arm aimed at financial market professionals, a critical channel with years of accumulated technical and design debt."}
            </p>
            <p>
              {isPt
                ? "Durante as duas semanas de onboarding no projeto, naveguei as interfaces dos diferentes portais da Thrivent e conduzi uma análise de competidores do mercado financeiro. O diagnóstico foi claro: divergências entre páginas, componentes sem padronização, e decisões de design sendo tomadas repetidamente sem referência. Não havia pauta imediata no roadmap, mas identifiquei a janela de oportunidade e tomei a iniciativa. Estruturei um planejamento completo (motivações, etapas, entregáveis e prazos), apresentei formalmente ao time, e recebi aprovação para executar."
                : "During the two-week onboarding, I navigated the interfaces across Thrivent's different portals and conducted a competitive analysis of the financial market. The diagnosis was clear: inconsistencies across pages, components without standardization, and design decisions being made repeatedly without any reference. There was no immediate roadmap item, but I identified the window of opportunity and took initiative. I structured a full plan (motivations, stages, deliverables, and timelines), presented it formally to the team, and received approval to execute."}
            </p>
          </>
        ),
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
                ? "Atuei como único designer no projeto, com validações periódicas com a design lead. Também colaborei com desenvolvedores para garantir viabilidade técnica e qualidade dos entregáveis de código. O prazo foi de 4 semanas."
                : "I worked as the sole designer on the project, with periodic check-ins with the design lead. I also collaborated with developers to ensure technical feasibility and quality of code deliverables. The timeline was 4 weeks."}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                {isPt
                  ? "Identifiquei a oportunidade e estruturei o planejamento do projeto, definindo motivações, etapas, entregáveis e prazos. Apresentei formalmente ao time e recebi aprovação para executar."
                  : "Identified the opportunity and structured the project plan, defining motivations, stages, deliverables, and timelines. Presented it formally to the team and received approval to execute."}
              </li>
              <li>
                {isPt
                  ? "Automatizei o catálogo de páginas, reduzindo uma etapa estimada em 7 dias para 1 hora. Mais de 300 páginas foram catalogadas nessa etapa."
                  : "Automated the page catalogue, reducing a task estimated at 7 days to 1 hour. Over 300 pages have been cataloged during this stage."}
              </li>
              <li>
                {isPt
                  ? "Criei toda a camada de design tokens, dos primitivos (cores, tipografia, espaçamentos) aos semânticos (atribuindo significado de uso a cada token). Após alinhamento com o time de desenvolvimento, adotei a convenção de nomenclatura do Tailwind CSS para diminuir a curva de aprendizado do sistema da equipe.."
                  : "Built the complete design token layer, from primitives (colors, typography, spacing) to semantic tokens (assigning usage meaning to each value). After collaborating with the development team, I adopted Tailwind CSS naming conventions to ease the learning curve of the team."}
              </li>
              <li>
                {isPt
                  ? "Criei componentes base documentados priorizando o fluxo de análise de fundo (home, listagem, detalhe do ativo), o caminho mais crítico identificado na análise de competidores."
                  : "Created documented base components prioritizing the fund analysis flow (home, listing, asset detail), the most critical path identified in the competitive analysis."}
              </li>
              <li>
                {isPt
                  ? "Prototipei em código e construí Storybook documentado usando Figma Make e Claude Code, testando navegação por teclado, responsividade, filtros e interações em ambiente real."
                  : "Prototyped in code and built a documented Storybook using Figma Make, and Claude Code, testing keyboard navigation, responsiveness, filters, and interactions in a real environment."}
              </li>
            </ul>
            <p>
              {isPt
                ? "Ferramentas: Figma, Claude Code, e Figma Make. | Prazo: 4 semanas"
                : "Tools: Figma, Claude Code, and Figma Make. | Timeline: 4 weeks"}
            </p>
          </>
        ),
      },

      // ---5. Desafios (overview) ───────────────────────────────
      {
        type: "problems",
        visibility: ["overview"],
        title: isPt ? "Desafios" : "Challenges",
        intro: isPt
          ? "O Thrivent FP era um portal construído ao longo de mais de uma década sem diretrizes de design, sem sistema e sem linguagem compartilhada entre designers e desenvolvedores."
          : "Thrivent FP was a portal built over more than a decade without design guidelines, without a system, and without a shared language between designers and developers.",
        items: [
          {
            variant: "negative",
            title: isPt
              ? "Portal sem padronização visual"
              : "Portal without visual standardization",
            description: isPt
              ? "Anos de crescimento orgânico geraram variações desnecessárias em toda a interface: 6 tipos de card com 23 variações estruturais, múltiplas variações de hero banner, 5 tipos de botão. Designers e desenvolvedores tomavam as mesmas decisões repetidamente, sem referência."
              : "Years of organic growth created unnecessary variations throughout the interface: 6 card types with 23 structural variations, multiple hero banner variations, and 5 button types. Designers and developers made the same decisions repeatedly, without any reference.",
          },
          {
            variant: "negative",
            title: isPt
              ? "Artefatos precisavam funcionar desde o dia 1"
              : "Artifacts needed to work from day one",
            description: isPt
              ? "Os componentes criados precisavam entrar em uso imediato e ser escaláveis para as demais interfaces e marcas da Thrivent no futuro."
              : "The components created needed to go into immediate use and be scalable to other Thrivent interfaces and brands in the future.",
          },
        ],
      },
      // ---3. Context image (all modes) ──────────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 1.png`,
        alt: isPt
          ? "Estado anterior do portal Thrivent FP mostrando inconsistências visuais entre páginas"
          : "Previous state of the Thrivent FP portal showing visual inconsistencies across pages",
      },

      // ---6. Processo (overview) ───────────────────────────────
      {
        type: "process",
        visibility: ["overview"],
        title: isPt ? "Processo" : "Process",
        steps: [
          {
            label: isPt
              ? "Planejar e apresentar a proposta"
              : "Plan and present the proposal",
            description: isPt
              ? "Após identificar a oportunidade durante o onboarding, estruturei um planejamento com motivações, etapas, entregáveis esperados e prazos para cada fase. Apresentei formalmente ao time e recebi aprovação para iniciar a execução."
              : "After identifying the opportunity during onboarding, I structured a plan with motivations, stages, expected deliverables, and timelines for each phase. I presented it formally to the team and received approval to begin execution.",
          },
          {
            label: isPt
              ? "Catalogar páginas do portal"
              : "Catalogue portal pages",
            description: isPt
              ? "Catalogar mais de 300 páginas manualmente levaria dias. Decidi automatizar: Usei Python para criar um bot que faz web crawl do portal, captura URLs e gera screenshots com parâmetros configuráveis. Uma etapa estimada em 7 dias foi concluída em 1 hora."
              : "Manually cataloguing over 300 pages would have taken days. I chose to automate: Using Python, I created a bot that crawls the portal, captures URLs, and generates screenshots with configurable parameters. A task estimated at 7 days was completed in 1 hour.",
          },
          {
            label: isPt
              ? "Inventariar padrões e inconsistências"
              : "Inventory patterns and inconsistencies",
            description: isPt
              ? "Com o catálogo em mãos, analisei os padrões de design existentes e mapeei as inconsistências. O resultado confirmou o diagnóstico do onboarding: cards com 6 tipos e 23 variações estruturais, hero banners com múltiplas variações, 5 tipos de botões."
              : "With the catalogue in hand, I analyzed the existing design patterns and mapped the inconsistencies. The result confirmed the onboarding diagnosis: cards with 6 types and 23 structural variations, hero banners with multiple variations, and 5 button types.",
          },
          {
            label: isPt
              ? "Priorizar com base em análise de competidores"
              : "Prioritize based on competitive analysis",
            description: isPt
              ? "A análise conduzida durante o onboarding mostrou um padrão claro: todos os portais financeiros analisados conduziam o usuário para a página de detalhes do ativo como fluxo central. Priorizei o fluxo de análise de um fundo (home, listagem de fundos, detalhe do ativo) por ser o mais crítico."
              : "The analysis conducted during onboarding revealed a clear pattern: every financial portal studied guided users toward the asset detail page as the core flow. I prioritized the fund analysis flow (home, fund listing, asset detail) as the most critical path.",
          },
          {
            label: isPt ? "Criar os design tokens" : "Create design tokens",
            description: isPt
              ? "Construí toda a camada de tokens do sistema: primitivos (cores, tipografia, espaçamentos) e semânticos (atribuindo significado de uso a cada valor). Adotei a convenção do Tailwind CSS como referência para nomenclatura, normalizando nomes proprietários. 'thrivent-navy-deep-blue' virou 'blue-900'."
              : "Built the complete token layer: primitive tokens (colors, typography, spacing) and semantic tokens (assigning usage meaning to each value). I adopted Tailwind CSS naming conventions as a reference, normalizing proprietary names. 'thrivent-navy-deep-blue' became 'blue-900'.",
          },

          {
            label: isPt ? "Prototipar em código" : "Prototype in code",
            description: isPt
              ? "Parti dos mockups para implementação direta em React. Um protótipo no Figma testa estética; um protótipo em código testa comportamento. Implementei as telas dos fluxos priorizados e testei navegação por teclado, responsividade, filtros e interações na tabela de ativos."
              : "I went from mockups to direct implementation in React. A Figma prototype tests aesthetics; a code prototype tests behavior. I implemented the prioritized flow screens and tested keyboard navigation, responsiveness, fund page filters, and asset table interactions.",
          },
          {
            label: isPt
              ? "Consolidar, documentar e entregar"
              : "Consolidate, document, and deliver",
            description: isPt
              ? "Documentei quando e como cada componente deve ser usado, para dois públicos: designers e desenvolvedores. Além da documentação visual, criei uma camada em formato AI-friendly: arquivos Markdown verbosos e autocontidos, sem dependência de contexto visual. Usei Claude Code para construir o Storybook final com componentes agnósticos a framework."
              : "Documented when and how each component should be used, for two audiences: designers and developers. Beyond the visual documentation, I created an AI-friendly layer: verbose, self-contained Markdown files with no reliance on visual context. I used Claude Code to build the final Storybook with framework-agnostic components.",
          },
        ],
      },

      // ---7. Process artifacts - Image 1 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 2.png`,
        alt: isPt
          ? "Processo Thrivent: output do script de catálogo com URLs e screenshots gerados automaticamente"
          : "Thrivent process: catalogue script output with automatically generated URLs and screenshots",
      },

      // ---8. Process artifacts - Image 2 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 3.png`,
        alt: isPt
          ? "Processo Thrivent: inventário de componentes mostrando variações de cards, botões e hero banners"
          : "Thrivent process: component inventory showing card, button, and hero banner variations",
      },

      // ---9. Process artifacts - Image 3 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 4.png`,
        alt: isPt
          ? "Processo Thrivent: tokens primitivos e semânticos com paleta de cores normalizada e tipografia"
          : "Thrivent process: primitive and semantic tokens with normalized color palette and typography",
      },

      // ---10. Final UI - Image 1 (all modes) ──────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 5.png`,
        alt: isPt
          ? "Componentes base do design system Thrivent: card, botão e elementos de formulário documentados"
          : "Thrivent design system base components: documented card, button, and form elements",
      },

      // ---11. Final UI - Image 2 (all modes) ──────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 6.png`,
        alt: isPt
          ? "PoC em código do Thrivent FP: protótipo React mostrando fluxo de análise de fundo com filtros e tabela de ativos"
          : "Thrivent FP code PoC: React prototype showing fund analysis flow with filters and asset table",
      },

      // ---12. Final UI - Image 3 (all modes) ──────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 7.png`,
        alt: isPt
          ? "Documentação do design system Thrivent: Markdown file"
          : "Thrivent design system documentation: Markdown file",
      },
      {
        type: "image",
        visibility: [],
        src: `${IMG_BASE}/shot 8.png`,
        alt: isPt
          ? "Documentação do design system Thrivent: Storybook com componentes documentados e handoff AI-friendly"
          : "Thrivent design system documentation: Storybook with documented components and AI-friendly handoff",
      },

      // ---13. Resultados (all modes) ────────────────────────────
      {
        type: "results",
        title: isPt ? "Resultados" : "Results",
        intro: isPt
          ? "Em 4 semanas entreguei a fundação completa do design system, pronta para uso imediato."
          : "In 4 weeks I delivered the complete design system foundation, ready for immediate use.",
        items: [
          {
            variant: "positive",
            title: isPt
              ? "300+ páginas catalogadas em 1 hora"
              : "300+ pages catalogued in 1 hour",
            description: isPt
              ? "Automação com Python + Playwright transformou a etapa mais demorada do processo em uma tarefa de minutos, liberando tempo para decisões estratégicas."
              : "Python + Playwright automation transformed the most time-consuming stage into a matter of minutes, freeing time for strategic decisions.",
          },
          {
            variant: "positive",
            title: isPt
              ? "Design tokens completos (primitivos + semânticos)"
              : "Complete design tokens (primitive + semantic)",
            description: isPt
              ? "Cores, tipografia e espaçamentos consolidados, com camada semântica atribuindo significado de uso. Prontos para extensão às demais marcas do ecossistema Thrivent."
              : "Colors, typography, and spacing consolidated, with a semantic layer assigning usage meaning. Ready for extension to other Thrivent brands.",
          },
          {
            variant: "positive",
            title: isPt
              ? "Componentes base documentados com dupla camada"
              : "Base components documented with dual layer",
            description: isPt
              ? "Documentação visual para designers e desenvolvedores, mais documentação AI-friendly em Markdown para coding agents. Um desenvolvedor do time descreveu o código como 'fácil de ler, organizado e documentado'."
              : "Visual documentation for designers and developers, plus AI-friendly Markdown documentation for coding agents. A team developer described the code as 'easy to read, organized, and documented.'",
          },
          {
            variant: "positive",
            title: isPt ? "PoC funcional em código" : "Functional code PoC",
            description: isPt
              ? "Protótipos feitos diretamento no código testando o fluxo completo de análise de fundo, com navegação por teclado, responsividade e interações reais validadas em ambiente funcional."
              : "Code prototypes testing the complete fund analysis flow, with keyboard navigation, responsiveness, and real interactions validated in a functional environment.",
          },
        ],
        disclaimer: isPt
          ? "*Dados de adoção em produção não disponíveis. O design system foi entregue como fundação, antes da janela de implementação no roadmap."
          : "*Production adoption data not available. The design system was delivered as a foundation, before the implementation window in the roadmap.",
      },

      // ---14. Aprendizados (overview) ──────────────────────────
      {
        type: "text",
        visibility: ["overview"],
        title: isPt ? "Aprendizados" : "Learnings",
        body: (
          <p>
            {isPt
              ? "Antes desse projeto, eu esperava que oportunidades de impacto viessem pelo roadmap. No onboarding da Thrivent, percebi que a dor do design system era real, a janela de calendário existia, e ninguém ia pautar isso a curto prazo. Decidi estruturar a proposta, apresentar formalmente e executar. O resultado validou algo que agora é parte do meu processo: quando identifico uma dor sistêmica com janela de execução, não espero que alguém transforme isso em tarefa."
              : "Before this project, I expected high-impact opportunities to come through the roadmap. During the Thrivent onboarding, I realized the design system pain was real, the calendar window existed, and nobody was going to put it on the agenda anytime soon. I chose to structure the proposal, present it formally, and execute. The result validated something that is now part of my process: when I identify a systemic pain with an execution window, I do not wait for someone else to turn it into a task."}
          </p>
        ),
      },
    ],
  };
};

export default thriventStudy;
