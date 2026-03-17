import type { CaseStudyData } from "../projects";
import type { Language } from "../../context/LanguageContext";

const IMG_BASE = "/files/case-studies/danone";

const danoneStudy = (language: Language): CaseStudyData => {
  const isPt = language === "pt";

  return {
    title: isPt ? "Redesign Danone NorAm" : "Danone NorAm Redesign",
    description: isPt
      ? "Revitalização da presença digital da Danone NorAm com renovação da linguagem visual e migração do portal institucional para a plataforma Adobe Experience Manager."
      : "Revitalizing the Danone NorAm digital presence by renewing its design language and migrating their institutional portal to the Adobe Experience Manager platform.",
    role: "Product Designer",
    goal: isPt
      ? "Modernizar a interface e migrar para um CMS dinâmico"
      : "Modernize interface and migrate to a dynamic CMS",
    hideOtherProjects: false,
    sections: [
      {
        type: "image",
        src: `${IMG_BASE}/shot 0.png`,
        alt: isPt
          ? "Hero do site da Danone North America com o slogan Bringing health through food to as many people as possible"
          : 'Danone North America website hero banner showing the tagline "Bringing health through food to as many people as possible"',
        priority: true,
      },
      {
        type: "metrics",
        id: "overview",
        label: isPt ? "Principais métricas" : "Key metrics",
        layout: "horizontal",
        items: [
          {
            variant: "positive",
            title: "150%",
            description: isPt
              ? "Aumento no tráfego do site"
              : "Increase in site traffic",
          },
          {
            variant: "positive",
            title: "20+",
            description: isPt
              ? "Componentes reutilizáveis criados"
              : "Reusable components built",
          },
          {
            variant: "positive",
            title: "10+",
            description: isPt
              ? "Templates de página criados"
              : "Page templates created",
          },
        ],
        disclaimer: isPt
          ? "*Por confidencialidade, os valores reais foram omitidos."
          : "*For confidentiality reasons, I have omitted the actual values for these metrics.",
      },
      {
        type: "text",
        title: isPt ? "Visão Geral" : "Overview",
        body: (
          <>
            <p>
              {isPt
                ? "Revitalização da presença digital da Danone North America com a migração do portal institucional para a plataforma Adobe Experience Manager."
                : "Revitalized the Danone North America digital presence by migrating their institutional portal to the Adobe Experience Manager platform."}
            </p>
            <p>
              {isPt
                ? "O projeto evoluiu além do redesign visual, para uma reestruturação estratégica da arquitetura da informação, performance em SEO e escalabilidade de conteúdo."
                : "This project moved beyond a simple redesign, focusing on a strategic overhaul of the information architecture, SEO performance, and content scalability."}
            </p>
            <p>
              {isPt
                ? "Implementação de biblioteca responsiva com mais de 20 componentes e reestruturação de 10+ páginas principais, resultando em aumento de 150% no tráfego ano a ano*."
                : "By implementing a responsive library of over 20+ components and restructuring 10+ core pages, the solution delivered a +150% increase in site traffic year-over-year*."}
            </p>
          </>
        ),
      },
      {
        type: "image",
        src: `${IMG_BASE}/shot 1.png`,
        alt: isPt
          ? "Seção Our Purpose da Danone com fundo rosa e declaração de missão"
          : 'Danone "Our Purpose" banner section with branded pink background and mission statement',
      },
      {
        type: "problems",
        visibility: ["overview"],
        id: "the-problem",
        title: isPt ? "O problema" : "The problem",
        intro: isPt
          ? "O portal Danone NorAm funciona como vitrine fundamental para investidores, parceiros e consumidores da América do Norte. O sistema legado, porém, apresentava barreiras significativas:"
          : "The Danone Noram portal serves as a critical vitrine for investors, partners, and North American consumers. However, the legacy system presented significant hurdles:",
        items: [
          {
            variant: "negative",
            title: isPt ? "CMS Rígido" : "Rigid CMS",
            description: isPt
              ? "Atualizações de conteúdo lentas e tecnicamente complexas, comprometendo a agilidade do marketing."
              : "Content updates were slow and technically demanding, hindering marketing agility.",
          },
          {
            variant: "negative",
            title: isPt ? "Diluição de Marca" : "Brand Dilution",
            description: isPt
              ? "Necessidade de alinhamento ao ecossistema digital global da Danone, preservando a autenticidade regional e a identidade B-Corp da unidade norte-americana."
              : "A need to align with the global Danone digital ecosystem while preserving the regional authenticity and B-Corp identity of the North American branch.",
          },
          {
            variant: "negative",
            title: isPt ? "Baixa Descoberta Orgânica" : "Poor Discoverability",
            description: isPt
              ? "Ausência de estrutura orientada a SEO, limitando o alcance e o impacto do portal como ferramenta de comunicação."
              : "The lack of an SEO-oriented structure limited the portal's reach and impact as a communication tool.",
          },
        ],
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "design-process",
        title: isPt ? "Processo de Design" : "Design Process",
        body: (
          <>
            <p>
              {isPt
                ? "O projeto seguiu um processo estruturado de Discovery e Curadoria para garantir que a arquitetura final atendesse aos objetivos de negócio e às necessidades do usuário."
                : "The project followed a structured Discovery and Curadoria process to ensure the final architecture met both business and user expectations."}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>
                  {isPt ? "Discovery e Pesquisa:" : "Discovery &amp; Research:"}
                </strong>{" "}
                {isPt
                  ? "Análise de pesquisas e expectativas de stakeholders, com identificação de temas centrais: recrutamento, portfólio de produtos e ESG."
                  : "Analyzed surveys and stakeholder expectations, identifying key themes such as recruitment, product portfolio, and ESG."}
              </li>
              <li>
                <strong>
                  {isPt
                    ? "Desenvolvimento de Proto-Personas:"
                    : "Proto-Persona Development:"}
                </strong>{" "}
                {isPt
                  ? "Com base nos dados coletados, criamos personas distintas para orientar narrativa de conteúdo e jornadas de usuário."
                  : "Based on the collected data, we created distinct personas to guide the content narrative and user journeys."}
              </li>
              <li>
                <strong>
                  {isPt
                    ? "Arquitetura da Informação:"
                    : "Information Architecture:"}
                </strong>{" "}
                {isPt
                  ? "Desenvolvimento de wireframes e sitemaps para aprimorar navegação e fluxo das informações institucionais."
                  : "Developed wireframes and site maps to improve navigation and the flow of institutional information."}
              </li>
            </ul>
          </>
        ),
      },
      {
        type: "imageStack",
        id: "approach",
        images: [
          {
            src: `${IMG_BASE}/shot 2.png`,
            alt: isPt
              ? "Processo de design da Danone: exploração de wireframes e mapa do site"
              : "Danone design process: wireframes and site map exploration",
          },
          {
            src: `${IMG_BASE}/shot 3.png`,
            alt: isPt
              ? "Processo de design da Danone: visão geral da biblioteca de componentes e design system"
              : "Danone design process: component library and design system overview",
          },
          {
            src: `${IMG_BASE}/shot 4.png`,
            alt: isPt
              ? "Processo de design da Danone: mockups de alta fidelidade das páginas principais"
              : "Danone design process: high-fidelity mockups of key pages",
          },
        ],
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "deliverables",
        title: isPt
          ? "Entregáveis-chave e Racional"
          : "Key Deliverables & Rationale",
        body: (
          <div className="space-y-2">
            <h3>
              {isPt
                ? "Biblioteca de Componentes Escalável"
                : "Scalable Component Library"}
            </h3>
            <div>
              <p>
                {isPt
                  ? "Desenvolvimento de biblioteca com mais de 20 componentes responsivos."
                  : "Developed a library of 20+ responsive components."}
              </p>
              <p>
                {isPt
                  ? "Possibilitou à equipe Danone gerenciar conteúdo com rapidez e eficiência sem dependência de desenvolvimento, garantindo consistência de marca em novas páginas e campanhas."
                  : "To empower the Danone team to manage content quickly and efficiently without developer intervention, ensuring brand consistency across all new pages and campaigns."}
              </p>
            </div>
          </div>
        ),
      },
      {
        type: "image",
        src: `${IMG_BASE}/shot 5.png`,
        alt: isPt
          ? "Biblioteca de componentes da Danone: seção hero da homepage"
          : "Danone component library: homepage hero section",
      },
      {
        type: "text",
        visibility: ["overview"],
        title: isPt
          ? "Framework de SEO e Acessibilidade"
          : "SEO & Accessibility Framework",
        body: (
          <>
            <p>
              {isPt
                ? "Criação de um guia para escrita orientada a SEO e conteúdo acessível. Redesenho exclusivo da camada visual seria insuficiente; a estrutura base precisava ser de alto nível para que mecanismos de busca impulsionassem o crescimento orgânico."
                : "Developed a guide for SEO-oriented writing and accessible content. Redesigning the visual layer was insufficient; the underlying structure needed to be best in class for search engines to drive organic growth"}
            </p>
          </>
        ),
      },
      {
        type: "image",
        src: `${IMG_BASE}/shot 6.png`,
        alt: isPt
          ? "Identidade visual da Danone: layouts de página com marca aplicada"
          : "Danone visual identity: branded page layouts",
      },
      {
        type: "image",
        src: `${IMG_BASE}/shot 7.png`,
        alt: isPt
          ? "Identidade visual da Danone: tipografia e paleta de cores em contexto"
          : "Danone visual identity: typography and color palette in context",
      },
      {
        type: "results",
        id: "outcomes",
        title: isPt ? "Resultados e Reflexão" : "Results & Reflection",
        intro: isPt
          ? "O impacto da nova experiência digital foi imediato e mensurável"
          : "The impact of the new digital experience was immediate and quantifiable",
        items: [
          {
            variant: "positive",
            title: isPt ? "Crescimento de Tráfego" : "Traffic Growth",
            description: isPt
              ? "Aumento de 150%+ em acessos em relação ao ano anterior, atribuído diretamente à nova estrutura de SEO e à melhoria da interface."
              : "A 150%+ increase in accesses compared to the previous year, directly attributed to the new SEO structure and improved UI.",
          },
          {
            variant: "positive",
            title: isPt ? "Eficiência Operacional" : "Operational Efficiency",
            description: isPt
              ? "Migração para AEM e criação da biblioteca de componentes reduziram drasticamente o tempo de publicação de novos conteúdos."
              : "The transition to AEM and the creation of the component library drastically reduced the time-to-market for new content updates.",
          },
        ],
        disclaimer: isPt
          ? "*Por confidencialidade, os valores reais foram omitidos."
          : "*For confidentiality reasons, I have omitted the actual values for these metrics.",
      },
      {
        type: "text",
        visibility: ["overview"],
        title: isPt ? "Aprendizado Pessoal" : "Personal Takeaway",
        body: (
          <p>
            {isPt
              ? "Reforço da importância da viabilidade técnica na liderança de design sênior: o sucesso não se limitou ao design atraente, mas à construção de um sistema que o cliente pudesse manter e evoluir com autonomia dentro do ecossistema AEM."
              : "This project reinforced the importance of technical feasibility in Senior Design leadership. Success was not just about attractive design, but about building a system that the client could actually maintain and grow independently within the AEM ecosystem."}
          </p>
        ),
      },
    ],
  };
};

export default danoneStudy;
