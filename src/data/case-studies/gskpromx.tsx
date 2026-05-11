import type { CaseStudyData } from "../projects";
import type { Language } from "../../context/LanguageContext";

const IMG_BASE = "/files/case-studies/gskpromx";

const gskpromxStudy = (language: Language): CaseStudyData => {
  const isPt = language === "pt";

  return {
    title: "Redesign: GSK Pro México",
    description: isPt
      ? "Redesenhei a experiência do GSK Pro México, transformando um portal com baixa adesão entre profissionais de saúde em uma plataforma com jornadas personalizadas por especialidade. A mudança central: migrar a arquitetura de conteúdo de organizada por produto para organizada por condição clínica, alinhando o portal ao modelo mental dos usuários."
      : "I redesigned the GSK Pro México experience, transforming a low-engagement healthcare portal into a platform with personalized journeys by specialty. The core shift: migrating the content architecture from product-based to clinical condition-based, aligning the portal with how healthcare professionals actually think.",
    role: "Product Designer",
    goal: isPt
      ? "Transformar o portal GSK Pro México em uma plataforma centrada em condição clínica, com jornadas personalizadas e conteúdo relevante para cada especialidade médica"
      : "Transform the GSK Pro México portal into a clinical condition-centered platform with personalized journeys and relevant content for each medical specialty",
    hideOtherProjects: false,
    sections: [
      // ---1. Hero image (all modes) ────────────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 0.png`,
        alt: isPt
          ? "Portal GSK Pro México redesenhado mostrando navegação por condição clínica com conteúdo personalizado por especialidade médica"
          : "Redesigned GSK Pro México portal showing clinical condition-based navigation with content personalized by medical specialty",
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
                ? "A GSK é uma das maiores empresas globais do setor farmacêutico, com presença em mais de 100 países. Por meio do GSK Pro, seu ecossistema digital para profissionais de saúde (HCPs), a empresa mantém relacionamento com a comunidade médica através de conteúdos especializados, atualizações científicas e materiais de suporte clínico."
                : "GSK is one of the world's largest pharmaceutical companies, with a presence in more than 100 countries. Through GSK Pro, its digital ecosystem for healthcare professionals, the company maintains its relationship with the medical community through specialized content, scientific updates, and clinical support materials."}
            </p>
            <p>
              {isPt
                ? "No México, o portal já era um ponto de contato importante, mas enfrentava baixa adesão, navegação complexa, links quebrados e informação desatualizada. O cenário era mensurável: 46,2% de taxa de rejeição nas páginas de login, 300+ páginas com menos de 10 visitas em 6 meses, e 62% dos profissionais relatando dificuldade para encontrar o que precisavam. Antes de investir em um redesign completo, a prioridade era realizar um discovery estruturado que desse visibilidade às dores reais do produto."
                : "In Mexico, the portal was already an important touchpoint, but it struggled with low engagement, complex navigation, broken links, and outdated information. The situation was measurable: a 46.2% bounce rate on login pages, 300+ pages with fewer than 10 visits in 6 months, and 62% of professionals reporting difficulty finding what they needed. Before investing in a full redesign, the priority was to run a structured discovery that would surface the product's real pain points."}
            </p>
          </>
        ),
      },

      // ---3. Context image (all modes) ──────────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 1.png`,
        alt: isPt
          ? "Estado anterior do portal GSK Pro México mostrando problemas de navegação e organização de conteúdo"
          : "Previous state of the GSK Pro México portal showing navigation and content organization issues",
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
                ? "Atuei como Product Designer em um time horizontal de 5 designers com níveis iguais de atuação e responsabilidade. O projeto durou mais de 30 semanas, desde o discovery até o handoff."
                : "I worked as a Product Designer on a horizontal team of 5 designers with equal ownership and responsibility. The project ran for over 30 weeks, from discovery through handoff."}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                {isPt
                  ? "Criei o framework de conteúdo para páginas de produto, traduzindo necessidades dos profissionais de saúde em estruturas padronizadas que reduziram sobrecarga cognitiva e garantiram consistência entre áreas terapêuticas."
                  : "Built the content framework for product pages, translating healthcare professionals' needs into standardized structures that reduced cognitive load and ensured consistency across therapeutic areas."}
              </li>
              <li>
                {isPt
                  ? "Desenvolvi agentes de IA para produção de conteúdo usando WPP Imagine, automatizando a extração e estruturação de informações a partir de bulas, estudos científicos e transcrições de palestras. Essa iniciativa partiu de mim para resolver a ausência de um health copywriter no time. A solução foi adotada por todo o time e usada para produzir todas as páginas do portal."
                  : "Developed AI agents for content production using WPP Imagine, automating the extraction and structuring of information from package inserts, scientific studies, and lecture transcripts. This initiative came from me to address the absence of a health copywriter on the team. The solution was adopted by the entire team and used to produce all portal pages."}
              </li>
              <li>
                {isPt
                  ? "Conduzi 2 entrevistas com stakeholders da GSK e participei como ouvinte em outras 2 (de um total de 9), mapeando o processo de produção de conteúdo, desafios operacionais e a visão interna sobre o portal."
                  : "Conducted 2 stakeholder interviews with GSK and sat in as a listener on 2 more (out of a total of 9), mapping the content production process, operational challenges, and internal perspective on the portal."}
              </li>
              <li>
                {isPt
                  ? "Realizei benchmark interno e externo para identificar padrões de portais de saúde e oportunidades de diferenciação."
                  : "Ran internal and external benchmarking to identify patterns in healthcare portals and opportunities for differentiation."}
              </li>
              <li>
                {isPt
                  ? "Co-criei a arquitetura de informação e os templates escaláveis, contribuindo com o sitemap e as propostas de template que foram levadas para alta fidelidade e handoff."
                  : "Co-created the information architecture and scalable templates, contributing to the sitemap and template proposals that were taken to high-fidelity and handoff."}
              </li>
            </ul>
            <p>
              {isPt
                ? "Ferramentas: Figma, FigJam, WPP Imagine | Time: 5 designers (atuação horizontal) | Prazo: 30+ semanas"
                : "Tools: Figma, FigJam, WPP Imagine | Team: 5 designers (horizontal ownership) | Timeline: 30+ weeks"}
            </p>
          </>
        ),
      },

      // ---7. Process artifacts - Image 1 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 2.png`,
        alt: isPt
          ? "Artefatos do processo GSK: benchmark e diagnóstico de conteúdo"
          : "GSK process artifacts: benchmarking and content diagnosis",
      },

      // ---8. Process artifacts - Image 2 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 3.png`,
        alt: isPt
          ? "Artefatos do processo GSK: entrevistas com stakeholders e insights de arquitetura"
          : "GSK process artifacts: stakeholder interviews and architecture insights",
      },

      // ---5. Desafios (overview) ───────────────────────────────
      {
        type: "problems",
        visibility: ["overview"],
        title: isPt ? "Desafios" : "Challenges",
        intro: isPt
          ? "O discovery revelou um portal onde conteúdo de alto valor clínico era desperdiçado por problemas estruturais de navegação e organização."
          : "Discovery revealed a portal where high-value clinical content was being wasted due to structural problems in navigation and organization.",
        items: [
          {
            variant: "negative",
            title: isPt
              ? "Navegação inconsistente e conteúdo invisível"
              : "Inconsistent navigation and invisible content",
            description: isPt
              ? "Sem estrutura padronizada entre áreas terapêuticas, o portal gerava desorientação. O menu principal não representava o portfólio completo. Resultado concreto: 300+ páginas acumulavam menos de 10 visitas em 6 meses."
              : "Without a standardized structure across therapeutic areas, the portal created disorientation. The main menu did not represent the full portfolio. The concrete result: 300+ pages accumulated fewer than 10 visits in 6 months.",
          },
          {
            variant: "negative",
            title: isPt
              ? "Organização centrada no produto, não no paciente"
              : "Product-centered organization, not patient-centered",
            description: isPt
              ? "O conteúdo era organizado por marca, não por condição clínica. 62% dos profissionais relataram dificuldade para encontrar o que precisavam, porque a estrutura do portal não correspondia ao seu modelo mental, que prioriza diagnóstico e tratamento."
              : "Content was organized by brand, not by clinical condition. 62% of professionals reported difficulty finding what they needed, because the portal's structure did not match their mental model, which prioritizes diagnosis and treatment.",
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
            label: isPt ? "Mapear o cenário" : "Map the landscape",
            description: isPt
              ? "Realizei benchmark interno (outros portais GSK Pro regionais) e externo (portais concorrentes de HCP) para identificar padrões, lacunas e oportunidades. Em paralelo, fiz um diagnóstico do conteúdo existente, catalogando o que havia, o que faltava e o que estava desatualizado."
              : "Ran internal benchmarking (other regional GSK Pro portals) and external benchmarking (competitor HCP portals) to identify patterns, gaps, and opportunities. In parallel, conducted a content diagnosis, cataloguing what existed, what was missing, and what was outdated.",
          },
          {
            label: isPt ? "Entrevistar stakeholders" : "Interview stakeholders",
            description: isPt
              ? "Conduzi 2 entrevistas e participei como ouvinte em outras 2, de um total de 9 sessões com stakeholders da GSK México. O objetivo era entender o processo de produção de conteúdo, os desafios operacionais e a visão interna sobre o portal. Esses insights alimentaram diretamente as decisões de arquitetura e framework."
              : "Conducted 2 interviews and sat in as a listener on 2 more, out of a total of 9 sessions with GSK México stakeholders. The goal was to understand the content production process, operational challenges, and the internal perspective on the portal. These insights directly informed architecture and framework decisions.",
          },
          {
            label: isPt
              ? "Criar o framework de conteúdo"
              : "Create the content framework",
            description: isPt
              ? "Desenhei o framework que padronizou a estrutura das páginas de produto, definindo quais blocos de conteúdo apareciam em cada tipo de página e em qual ordem. O framework se adaptava à maturidade do produto (Simples, Médio, Avançado), garantindo consistência sem rigidez."
              : "Designed the framework that standardized product page structure, defining which content blocks appeared on each page type and in what order. The framework adapted to product maturity (Simple, Medium, Advanced), ensuring consistency without rigidity.",
          },
          {
            label: isPt
              ? "Reestruturar a arquitetura de informação"
              : "Restructure the information architecture",
            description: isPt
              ? "Contribuí para a migração da organização de conteúdo de centrada em produto para centrada em condição clínica. Essa reestruturação incluiu novo sitemap, definição de jornadas por especialidade e consolidação de recursos dispersos em um hub centralizado."
              : "Contributed to migrating content organization from product-centered to clinical condition-centered. This restructuring included a new sitemap, specialty-based journey definitions, and the consolidation of scattered resources into a centralized hub.",
          },
          {
            label: isPt
              ? "Automatizar produção com agentes de IA"
              : "Automate production with AI agents",
            description: isPt
              ? "Criei agentes e orquestradores na WPP Imagine que processavam materiais científicos fornecidos pela GSK (bulas, estudos, transcrições de palestras), extraíam informações relevantes de acordo com o framework de conteúdo e produziam textos estruturados para cada seção do template. Essa solução eliminou a necessidade de um health copywriter dedicado e foi adotada por todo o time."
              : "Built agents and orchestrators in WPP Imagine that processed scientific materials from GSK (package inserts, studies, lecture transcripts), extracted relevant information according to the content framework, and produced structured text for each template section. The solution eliminated the need for a dedicated health copywriter and was adopted by the entire team.",
          },
          {
            label: isPt
              ? "Prototipar, validar e entregar"
              : "Prototype, validate, and deliver",
            description: isPt
              ? "Transformei as decisões do discovery em protótipos de alta fidelidade no Figma, validei com stakeholders e entreguei o handoff com documentação clara para os times de autoria."
              : "Translated discovery decisions into high-fidelity prototypes in Figma, validated with stakeholders, and delivered handoff with clear documentation for the authoring teams.",
          },
        ],
      },

      // ---9. Process artifacts - Image 3 (all modes) ────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 4.png`,
        alt: isPt
          ? "Artefatos do processo GSK: framework de conteúdo e sitemap reestruturado"
          : "GSK process artifacts: content framework and restructured sitemap",
      },

      // ---10. Final UI - Image 1 (all modes) ──────────────────────
      {
        type: "image",
        src: `${IMG_BASE}/shot 5.png`,
        alt: isPt
          ? "Portal GSK Pro México redesenhado: página de condição clínica com jornada personalizada por especialidade"
          : "Redesigned GSK Pro México portal: clinical condition page with specialty-personalized journey",
      },

      // ---11. Final UI - Image 2 (all modes) ──────────────────────
      {
        type: "image",
        visibility: [],
        src: `${IMG_BASE}/shot 6.png`,
        alt: isPt
          ? "Portal GSK Pro México redesenhado: hub centralizado de recursos por área terapêutica"
          : "Redesigned GSK Pro México portal: centralized resource hub by therapeutic area",
      },

      // ---12. Final UI - Image 3 (all modes) ──────────────────────
      {
        type: "image",
        visibility: [],
        src: `${IMG_BASE}/shot 7.png`,
        alt: isPt
          ? "Portal GSK Pro México redesenhado: templates escaláveis por maturidade de produto"
          : "Redesigned GSK Pro México portal: scalable templates by product maturity",
      },
      {
        type: "image",
        visibility: [],
        src: `${IMG_BASE}/shot 8.png`,
        alt: isPt
          ? "Portal GSK Pro México redesenhado: homepage"
          : "Redesigned GSK Pro México portal: homepage",
      },

      // ---13. Resultados (all modes) ────────────────────────────
      {
        type: "results",
        title: isPt ? "Resultados" : "Results",
        intro: isPt
          ? "A reestruturação transformou o portal de um repositório desorganizado em uma plataforma orientada ao modelo mental dos profissionais de saúde."
          : "The restructuring transformed the portal from a disorganized repository into a platform oriented around healthcare professionals' mental model.",
        items: [
          {
            variant: "positive",
            title: isPt
              ? "Arquitetura centrada em condição clínica"
              : "Clinical condition-centered architecture",
            description: isPt
              ? "Reorganizou todo o conteúdo do portal de uma lógica de marca para uma lógica de diagnóstico e tratamento, eliminando a fricção que fazia 62% dos profissionais não encontrarem o que precisavam."
              : "Reorganized all portal content from brand logic to diagnosis-and-treatment logic, eliminating the friction that caused 62% of professionals to not find what they needed.",
          },
          {
            variant: "positive",
            title: isPt
              ? "7 jornadas personalizadas por especialidade"
              : "7 personalized journeys by specialty",
            description: isPt
              ? "Cada profissional passou a ser exposto ao conteúdo relevante para seu contexto clínico, reduzindo sobrecarga de informação e aumentando a percepção de valor do portal."
              : "Each professional was now exposed to content relevant to their clinical context, reducing information overload and increasing the perceived value of the portal.",
          },
          {
            variant: "positive",
            title: isPt
              ? "Hub centralizado de recursos"
              : "Centralized resource hub",
            description: isPt
              ? "Consolidou conteúdo educacional disperso (vídeos, podcasts, artigos, guias) em uma biblioteca única organizada por área terapêutica e tipo de material, resolvendo o problema das 300+ páginas invisíveis."
              : "Consolidated scattered educational content (videos, podcasts, articles, guides) into a single library organized by therapeutic area and material type, resolving the 300+ invisible pages problem.",
          },
          {
            variant: "positive",
            title: isPt
              ? "10+ templates escaláveis por maturidade de produto"
              : "10+ scalable templates by product maturity",
            description: isPt
              ? "Padronizaram a experiência entre áreas terapêuticas com três níveis de complexidade (Simples, Médio, Avançado), adaptando-se à quantidade de conteúdo disponível sem perder consistência."
              : "Standardized the experience across therapeutic areas with three complexity levels (Simple, Medium, Advanced), adapting to available content volume without losing consistency.",
          },
        ],
        disclaimer: isPt
          ? "*Dados de pós-lançamento não disponíveis. Métricas apresentadas referem-se ao diagnóstico pré-projeto."
          : "*Post-launch data not available. Metrics presented refer to pre-project diagnosis.",
      },

      // ---14. Aprendizados (overview) ──────────────────────────
      {
        type: "text",
        visibility: ["overview"],
        title: isPt ? "Aprendizados" : "Learnings",
        body: isPt ? (
          <p>
            This project demonstrated that content strategy and information
            architecture are as critical as visual design in healthcare portals.
            Functional limitations prevented healthcare professionals from
            accessing content that would add significant value to medical
            practice, proving that even the best content is useless if users
            cannot find it.
          </p>
        ) : (
          <p>
            This project demonstrated that content strategy and information
            architecture are as critical as visual design in healthcare portals.
            Functional limitations prevented healthcare professionals from
            accessing content that would add significant value to medical
            practice, proving that even the best content is useless if users
            cannot find it.
          </p>
        ),
      },
    ],
  };
};

export default gskpromxStudy;
