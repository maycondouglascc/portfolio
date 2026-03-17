import type { CaseStudyData } from "../projects";
import type { Language } from "../../context/LanguageContext";

const IMG_BASE = "/files/case-studies/thrivent";

const thriventStudy = (language: Language): CaseStudyData => {
  const isPt = language === "pt";

  return {
    title: isPt
      ? "Thrivent FP — Fundação do Design System"
      : "Thrivent FP — Design System Foundation",
    description: isPt
      ? "Um portal financeiro com mais de uma década de crescimento orgânico, sem diretrizes de design, sem sistema, sem linguagem compartilhada entre designers e desenvolvedores."
      : "A financial portal with over a decade of organic growth, with no design guidelines, no system, and no shared language between designers and developers.",
    role: "Product Designer",
    goal: isPt
      ? "Criar a fundação do design system para o portal, garantindo que os artefatos gerados fossem utilizados desde o dia 1 e escaláveis para as demais interfaces e marcas da Thrivent no futuro."
      : "Build the design system foundation for the portal, ensuring the generated artifacts would be used from day one and scalable to the other Thrivent interfaces and brands in the future.",
    sections: [
      {
        type: "metrics",
        id: "overview",
        layout: "horizontal",
        items: [
          {
            variant: "positive",
            title: "300+",
            description: isPt ? "Páginas catalogadas" : "Pages catalogued",
          },
          {
            variant: "positive",
            title: isPt ? "4 semanas" : "4 weeks",
            description: isPt ? "Prazo do projeto" : "Project timeline",
          },
          {
            variant: "positive",
            title: isPt ? "6 etapas" : "6 steps",
            description: isPt ? "Processo estruturado" : "Structured process",
          },
        ],
        disclaimer: isPt
          ? "*Por confidencialidade, os valores reais foram omitidos."
          : "*For confidentiality reasons, actual values have been omitted.",
      },
      {
        type: "image",
        src: `${IMG_BASE}/hero.png`,
        alt: isPt
          ? "Visão geral da fundação do design system do Thrivent FP"
          : "Overview of the Thrivent FP design system foundation",
        priority: true,
      },
      {
        type: "text",
        title: "TL;DR",
        body: (
          <>
            <p>
              {isPt
                ? "Um portal financeiro com mais de uma década de crescimento orgânico, sem diretrizes de design, sem sistema, sem linguagem compartilhada entre designers e desenvolvedores. Esse era o estado do Thrivent FP quando assumi o desafio de criar a fundação do seu design system."
                : "A financial portal with over a decade of organic growth, with no design guidelines, no system, and no shared language between designers and developers. That was the state of Thrivent FP when I took on the challenge of building its design system foundation."}
            </p>
            <p>
              {isPt
                ? "A Thrivent é uma organização financeira com mais de 120 anos de história, em um processo de modernização dos seus canais digitais para aumentar o reconhecimento de marca nos EUA. O projeto envolveu o canal de Fundos, do braço Thrivent Asset Management. O Thrivent FP é um portal voltado para profissionais do mercado financeiro, um canal crítico com anos de dívida técnica acumulados."
                : "Thrivent is a financial organization with over 120 years of history, in the process of modernizing its digital channels to increase brand recognition in the US. The project involved the Funds channel of the Thrivent Asset Management arm. Thrivent FP is a portal aimed at financial market professionals — a critical channel with years of accumulated technical debt."}
            </p>
            <p>
              {isPt
                ? "Não havia uma pauta imediata no roadmap, mas havia uma janela de oportunidade: criar uma base sólida que alavancaria todas as melhorias futuras. Essa foi a razão pela qual o projeto foi iniciado."
                : "There was no immediate roadmap item, but there was a window of opportunity: to build a solid foundation that would leverage all future improvements. That was the reason the project was started."}
            </p>
          </>
        ),
      },
      {
        type: "problems",
        visibility: ["overview"],
        id: "the-challenge",
        title: isPt ? "O Desafio" : "The Challenge",
        intro: isPt
          ? "O Thrivent FP é um portal voltado para profissionais do mercado financeiro com anos de dívida técnica acumulados — sem diretrizes de design, sem sistema, sem linguagem compartilhada."
          : "Thrivent FP is a portal aimed at financial market professionals with years of accumulated technical debt — no design guidelines, no system, no shared language.",
        items: [
          {
            variant: "negative",
            title: isPt ? "Sem linguagem compartilhada" : "No shared language",
            description: isPt
              ? "Designers e desenvolvedores tomavam as mesmas decisões repetidamente, sem nenhuma referência comum."
              : "Designers and developers made the same decisions repeatedly without any shared reference.",
          },
          {
            variant: "negative",
            title: isPt
              ? "Anos de drift acumulado"
              : "Years of accumulated drift",
            description: isPt
              ? "Card: 6 tipos, 23 variações de estrutura. Hero Banner: múltiplas variações estruturais e de estilo. Botões e Links: 5 tipos de botões, múltiplas variações."
              : "Cards: 6 types, 23 structural variations. Hero Banner: multiple structural and style variations. Buttons and links: 5 button types, multiple variations.",
          },
          {
            variant: "negative",
            title: isPt ? "Janela de oportunidade" : "Window of opportunity",
            description: isPt
              ? "Não havia uma pauta imediata no roadmap, mas havia espaço para criar uma base sólida que alavancaria todas as melhorias futuras — em 4 semanas."
              : "There was no immediate roadmap item, but there was space to build a solid foundation that would leverage all future improvements — in 4 weeks.",
          },
        ],
      },
      {
        type: "process",
        visibility: ["overview"],
        id: "the-process",
        title: isPt ? "O Processo" : "The Process",
        steps: [
          {
            label: isPt ? "Catálogo" : "Catalogue",
            description: isPt
              ? "Web crawl automatizado com Python e Playwright: mais de 300 páginas catalogadas em 1 hora. Estimativa manual: 7 dias."
              : "Automated web crawl with Python and Playwright: 300+ pages catalogued in 1 hour. Manual estimate: 7 days.",
          },
          {
            label: isPt ? "Inventário" : "Inventory",
            description: isPt
              ? "Análise dos padrões de design existentes e mapeamento das inconsistências — aquelas que precisariam ser corrigidas nas etapas seguintes."
              : "Analysis of existing design patterns and mapping of inconsistencies — those that would need to be addressed in the following stages.",
          },
          {
            label: isPt ? "Priorização" : "Prioritization",
            description: isPt
              ? "Análise de competidores para definir por onde começar. Decisão: fluxo de análise de um fundo, por atravessar as páginas-chave do portal — home, listagem de fundos e detalhe do ativo."
              : "Competitor analysis to decide where to start. Decision: fund analysis flow, for crossing the key pages of the portal — home, fund listing, and asset detail.",
          },
          {
            label: isPt
              ? "Padronização de componentes"
              : "Component standardization",
            description: isPt
              ? "Tokens primitivos com convenção Tailwind + criação dos componentes base priorizando o fluxo definido. PoC em código para validar comportamento real."
              : "Primitive tokens with Tailwind convention + base component creation prioritizing the defined flow. Code PoC to validate real behavior.",
          },
          {
            label: isPt
              ? "Consolidação e documentação"
              : "Consolidation & documentation",
            description: isPt
              ? "Documentação estruturada de quando e como cada componente deve ser usado, para dois públicos: designers e desenvolvedores."
              : "Structured documentation of when and how each component should be used, for two audiences: designers and developers.",
          },
          {
            label: "Handoff",
            description: isPt
              ? "Camada adicional de documentação em formato AI-friendly: arquivos Markdown reescritos de forma verbosa, sem dependência de contexto visual."
              : "Additional documentation layer in AI-friendly format: Markdown files rewritten verbosely, without relying on visual context.",
          },
        ],
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "catalogue",
        title: isPt ? "Catálogo" : "Catalogue",
        body: (
          <>
            <p>
              {isPt
                ? "Catalogar páginas é uma etapa conhecidamente maçante e suscetível a erros — o volume de artefatos é alto e o trabalho é repetitivo. Investir tempo demais aqui significava menos tempo para etapas mais estratégicas."
                : "Cataloguing pages is a famously tedious and error-prone step — the volume of artifacts is high and the work is repetitive. Spending too much time here meant less time for more strategic stages."}
            </p>
            <p>
              {isPt
                ? "Decidi automatizar. Criei um script em Python e Playwright que faz o web crawl do portal, captura as URLs e gera screenshots de cada página com parâmetros configuráveis (largura, altura, recorte de viewport). Disponibilizei a solução como open-source."
                : "I decided to automate. I wrote a Python and Playwright script that crawls the portal, captures URLs, and generates screenshots of each page with configurable parameters (width, height, viewport crop). The solution was released as open source."}
            </p>
            <p>
              {isPt ? "O fluxo ficou assim:" : "The flow worked like this:"}
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li>
                {isPt
                  ? "O script rastreia o portal e captura todas as URLs"
                  : "The script crawls the portal and captures all URLs"}
              </li>
              <li>
                {isPt
                  ? "Eu reviso a lista manualmente para eliminar duplicatas e páginas irrelevantes para o projeto"
                  : "I manually review the list to remove duplicates and pages irrelevant to the project"}
              </li>
              <li>
                {isPt
                  ? "O script gera os screenshots da lista final"
                  : "The script generates screenshots from the final list"}
              </li>
            </ol>
            <p>
              {isPt
                ? "Resultado: mais de 300 páginas catalogadas. Uma etapa estimada em 7 dias foi concluída em 1 hora."
                : "Result: more than 300 pages catalogued. A task estimated at 7 days was completed in 1 hour."}
            </p>
          </>
        ),
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "inventory",
        title: isPt ? "Inventário" : "Inventory",
        body: (
          <>
            <p>
              {isPt
                ? "Com o catálogo em mãos, o próximo passo foi analisar os padrões de design existentes e mapear as inconsistências — aquelas que precisariam ser corrigidas nas etapas seguintes."
                : "With the catalogue in hand, the next step was to analyze the existing design patterns and map the inconsistencies — those that would need to be addressed in the following stages."}
            </p>
            <p>
              {isPt
                ? "O resultado foi o esperado para portais que cresceram sem diretrizes: decisões sendo tomadas múltiplas vezes, sem referência, gerando variações desnecessárias."
                : "The result was expected for portals that grew without guidelines: decisions being made multiple times over, without any reference, generating unnecessary variation."}
            </p>
            <p>
              {isPt ? "Alguns exemplos encontrados:" : "Some examples found:"}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                {isPt
                  ? "Card: 6 tipos, 23 variações de estrutura"
                  : "Card: 6 types, 23 structural variations"}
              </li>
              <li>
                {isPt
                  ? "Hero Banner: múltiplas variações estruturais e de estilo"
                  : "Hero Banner: multiple structural and style variations"}
              </li>
              <li>
                {isPt
                  ? "Botões e Links: 5 tipos de botões, múltiplas variações"
                  : "Buttons and Links: 5 button types, multiple variations"}
              </li>
            </ul>
            <p>
              {isPt
                ? "Vale deixar claro o objetivo aqui: não se trata de engessar o processo ou limitar a criatividade. Trata-se de criar consistência nos elementos base da interface e estabelecer uma linguagem compartilhada. Designers e desenvolvedores não deveriam precisar decidir qual cor de botão usar toda vez que desenhassem algo semelhante."
                : "It is worth being clear about the objective here: this is not about rigidifying the process or limiting creativity. It is about creating consistency in the foundational interface elements and establishing a shared language. Designers and developers should not need to decide which button color to use every time they designed something similar."}
            </p>
          </>
        ),
      },
      {
        type: "image",
        visibility: ["overview"],
        id: "inventory-visual",
        src: `${IMG_BASE}/inventory-mosaic.png`,
        alt: isPt
          ? "Mosaico de telas do portal Thrivent FP mostrando variações de cards, blocos de conteúdo e perfis, usado no inventário de inconsistências"
          : "Mosaic of Thrivent FP portal screens showing variations in cards, content blocks, and profiles, used in the inconsistency inventory",
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "tokens",
        title: isPt
          ? "Padronização: tokens primitivos"
          : "Standardization: primitive tokens",
        body: (
          <>
            <p>
              {isPt
                ? "O primeiro passo foi sintetizar os tokens primitivos da interface: cores, tipografia e espaçamentos. Essa camada é a base de tudo — e precisava ser construída já pensando no futuro, onde o sistema seria integrado nas demais marcas da Thrivent."
                : "The first step was to synthesize the primitive interface tokens: colors, typography, and spacing. This layer is the foundation of everything — and it needed to be built with the future in mind, where the system would be integrated across the other Thrivent brands."}
            </p>
            <p>
              {isPt
                ? 'Uma decisão importante foi normalizar a nomenclatura das cores. O brand book da Thrivent usa nomes proprietários para cada cor, o que traz carga cognitiva desnecessária para o time. Adotei a convenção de nomenclatura do Tailwind CSS — um padrão amplamente reconhecido no mercado — como referência. Nomes como "thrivent-navy-deep-blue" se tornaram "blue-900". Removi cores que eram muito próximas e redundantes, mantendo apenas o que o brandbook existente permitia.'
                : 'An important decision was to normalize the color naming. The Thrivent brand book uses proprietary names for each color, which creates unnecessary cognitive load for the team. I adopted the Tailwind CSS naming convention — a widely recognized industry standard — as a reference. Names like "thrivent-navy-deep-blue" became "blue-900". I removed colors that were too close and redundant, keeping only what the existing brand book allowed.'}
            </p>
            <p>
              {isPt
                ? "Essa etapa resultou no guia de estilos consolidado, atrelado aos tokens primitivos."
                : "This stage resulted in the consolidated style guide, tied to the primitive tokens."}
            </p>
          </>
        ),
      },
      {
        type: "imageGrid",
        images: [
          {
            src: `${IMG_BASE}/tokens-colors.png`,
            alt: isPt
              ? 'Paleta de cores "Primitive Tokens" com rampas e famílias (white, blue, red, stone, honey, orange, purple, green)'
              : "Primitive Tokens color palette with ramps and families (white, blue, red, stone, honey, orange, purple, green)",
          },
          {
            src: `${IMG_BASE}/tokens-background.png`,
            alt: isPt
              ? "Tabela de background tokens com exemplos de superfície (primary, inverse, secondary, info-subtle) e seus nomes de token"
              : "Background tokens table with surface examples (primary, inverse, secondary, info-subtle) and their token names",
          },
          {
            src: `${IMG_BASE}/tokens-typography.png`,
            alt: isPt
              ? "Spec de tipografia para headings com exemplos (xl, lg, md) e valores de size, line height e letter spacing"
              : "Typography spec for headings with examples (xl, lg, md) and values for size, line height, and letter spacing",
          },
          {
            src: `${IMG_BASE}/components-card.png`,
            alt: isPt
              ? "Variações do componente card"
              : "Card component variations",
          },
        ],
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "components-base",
        title: isPt
          ? "Padronização: componentes base"
          : "Standardization: base components",
        body: (
          <>
            <p>
              {isPt
                ? "Com os tokens definidos, parti para a criação dos componentes base, priorizando aqueles que compõem o fluxo de análise de fundo definido anteriormente. A lógica era direta: construir primeiro o que seria usado primeiro."
                : "With the tokens defined, I moved on to creating the base components, prioritizing those that make up the fund analysis flow defined earlier. The logic was straightforward: build first what would be used first."}
            </p>
            <p>
              {isPt
                ? "Aqui normalizamos design e comportamento de componentes como card, botão, elementos de formulário e tabela — os blocos fundamentais do portal."
                : "Here we normalized the design and behavior of components such as card, button, form elements, and table — the fundamental building blocks of the portal."}
            </p>
          </>
        ),
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "poc",
        title: "PoC",
        body: (
          <>
            <p>
              {isPt
                ? "Com os componentes prontos, era hora de testá-los em contexto real."
                : "With the components ready, it was time to test them in real context."}
            </p>
            <p>
              {isPt
                ? "Parti dos mockups criados no Figma para a implementação direta em código — uma decisão consciente de não confiar apenas em simulações. Um protótipo no Figma testa estética. Um protótipo em código testa comportamento."
                : "I went from the mockups created in Figma directly to implementation in code — a conscious decision not to rely solely on simulations. A Figma prototype tests aesthetics. A code prototype tests behavior."}
            </p>
            <p>
              {isPt
                ? "Implementei as telas dos fluxos priorizados em ambiente real e testei: navegação por teclado, responsividade, funcionamento dos filtros da página de fundos e interações na tabela de ativos."
                : "I implemented the screens for the prioritized flows in a real environment and tested: keyboard navigation, responsiveness, the behavior of the funds page filters, and interactions in the asset table."}
            </p>
            <p>
              {isPt
                ? "A IA foi usada para acelerar a prototipagem em alta fidelidade, especialmente nas interações mais complexas. O loop foi iterativo: design → implementação → teste → correção."
                : "AI was used to accelerate high-fidelity prototyping, especially for the more complex interactions. The loop was iterative: design → implementation → test → fix."}
            </p>
          </>
        ),
      },
      {
        type: "imageGrid",
        images: [
          {
            src: `${IMG_BASE}/poc-sections.png`,
            alt: isPt
              ? "Coleção de seções com variações de layout, imagens e CTAs, usada para comparar padrões de páginas"
              : "Collection of sections with layout variations, images, and CTAs, used to compare page patterns",
          },
          {
            src: `${IMG_BASE}/poc-funds-table.png`,
            alt: isPt
              ? 'Tela "Mutual Funds" com filtros no topo e tabela de fundos listando retornos por período, datas e expense ratio'
              : '"Mutual Funds" screen with filters at the top and a fund table listing returns by period, dates, and expense ratio',
          },
        ],
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "consolidation",
        title: isPt
          ? "Consolidação e documentação"
          : "Consolidation & documentation",
        body: (
          <>
            <p>
              {isPt
                ? "Depois de prototipar os fluxos, o próximo passo foi consolidar o que funcionou e documentar as decisões de forma estruturada: quando e como cada componente deve ser usado, quais são as exceções, e quais são os comportamentos esperados em diferentes contextos."
                : "After prototyping the flows, the next step was to consolidate what worked and document the decisions in a structured way: when and how each component should be used, what the exceptions are, and what behaviors are expected in different contexts."}
            </p>
            <p>
              {isPt
                ? "A documentação foi escrita para dois públicos: designers e desenvolvedores. O objetivo era criar uma linguagem compartilhada que reduzisse a necessidade de conversas repetitivas sobre decisões já tomadas."
                : "The documentation was written for two audiences: designers and developers. The goal was to create a shared language that would reduce the need for repetitive conversations about decisions already made."}
            </p>
          </>
        ),
      },
      {
        type: "text",
        visibility: ["overview"],
        id: "handoff",
        title: "Handoff",
        body: (
          <>
            <p>
              {isPt
                ? "O handoff foi onde o investimento em documentação se pagou de forma mais clara."
                : "The handoff was where the investment in documentation paid off most clearly."}
            </p>
            <p>
              {isPt
                ? "Além da documentação tradicional — com apelo visual, pensada para leitura humana — criei uma camada adicional de documentação em formato AI-friendly: arquivos Markdown reescritos de forma mais verbosa, sem dependência de contexto visual para serem compreendidos. A lógica por trás disso é direta: LLMs performam melhor com texto denso e autocontido. Uma documentação que depende de prints ou contexto implícito não é útil para um coding agent."
                : "Beyond the traditional documentation — visually appealing, designed for human reading — I created an additional layer in AI-friendly format: Markdown files rewritten in a more verbose way, without depending on visual context to be understood. The logic behind this is straightforward: LLMs perform better with dense, self-contained text. Documentation that relies on screenshots or implicit context is not useful for a coding agent."}
            </p>
            <p>
              {isPt
                ? "A partir dessas documentações, os componentes foram construídos com tecnologias agnósticas a framework, prontos para serem integrados ao desenvolvimento."
                : "From this documentation, the components were built using framework-agnostic technologies, ready to be integrated into development."}
            </p>
          </>
        ),
      },
      {
        type: "imageGrid",
        images: [
          {
            src: `${IMG_BASE}/handoff-spacing.png`,
            alt: isPt
              ? "Diagrama de espaçamento do Card com medidas de padding e gaps entre título, subtítulo, descrição e links"
              : "Card spacing diagram with padding measurements and gaps between title, subtitle, description, and links",
          },
          {
            src: `${IMG_BASE}/handoff-anatomy.png`,
            alt: isPt
              ? 'Card com anatomia numerada e painel "Card title" listando propriedades de texto: família, peso, tamanho, line height e spacing'
              : 'Card with numbered anatomy and "Card title" panel listing text properties: family, weight, size, line height, and spacing',
          },
        ],
      },
      {
        type: "results",
        id: "outcomes",
        title: isPt ? "Resultados" : "Results",
        intro: isPt
          ? "Uma fundação funcional entregue em 4 semanas — utilizável desde o primeiro dia."
          : "A functional foundation delivered in 4 weeks — usable from day one.",
        items: [
          {
            variant: "positive",
            title: isPt ? "Entregue em 4 semanas" : "Delivered in 4 weeks",
            description: isPt
              ? "Fundação utilizável desde o dia 1. Componentes entraram no backlog de engenharia ainda dentro da janela do projeto."
              : "Foundation usable from day 1. Components entered the engineering backlog within the project window.",
          },
          {
            variant: "positive",
            title: isPt ? "Tarefa de 7 dias → 1 hora" : "7-day task → 1 hour",
            description: isPt
              ? "A automação do catálogo liberou tempo estratégico. O que seria uma semana de trabalho manual virou menos de 60 minutos."
              : "Catalogue automation freed strategic time. What would have been a week of manual work became less than 60 minutes.",
          },
          {
            variant: "positive",
            title: isPt
              ? "Documentação que agentes usam"
              : "Documentation agents can use",
            description: isPt
              ? "Componentes construídos a partir dos docs de handoff em formato AI-friendly — sem tradução extra, sem fricção de interpretação."
              : "Components built from AI-friendly handoff docs — no extra translation, no interpretation friction.",
          },
        ],
      },
      {
        type: "text",
        visibility: ["overview"],
        title: isPt ? "Aprendizados" : "Personal Takeaway",
        body: (
          <>
            <p>
              {isPt
                ? "Projetos de fundação de design system ensinam uma coisa de forma muito clara: micro decisões se acumulam. Cada escolha de nomenclatura, cada token, cada variante de componente — individualmente parecem detalhes, mas em conjunto formam a consistência (ou a falta dela) de todo o sistema."
                : "Design system foundation projects teach one thing very clearly: micro decisions accumulate. Each naming choice, each token, each component variant — individually they seem like details, but together they form the consistency (or lack thereof) of the entire system."}
            </p>
            <p>
              {isPt
                ? "O uso de IA ao longo do processo confirmou um princípio que vale para qualquer ferramenta: a qualidade do output depende diretamente da qualidade do input. Charles Babbage chamou isso de GIGO — garbage in, garbage out. Em termos práticos, isso significa que quanto mais claro você é sobre por que está pedindo algo para a IA, mais controle você tem sobre o resultado. A IA acelerou o processo; as decisões continuaram sendo minhas."
                : "Using AI throughout the process confirmed a principle that applies to any tool: the quality of output depends directly on the quality of input. Charles Babbage called this GIGO — garbage in, garbage out. In practical terms, this means the clearer you are about why you are asking AI for something, the more control you have over the result. AI accelerated the process; the decisions remained mine."}
            </p>
          </>
        ),
      },
    ],
  };
};

export default thriventStudy;
