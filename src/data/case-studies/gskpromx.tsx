import type { CaseStudyData } from '../projects'
import type { Language } from '../../context/LanguageContext'

const IMG_BASE = '/files/case-studies/gskpromx'

const gskpromxStudy = (language: Language): CaseStudyData => {
  const isPt = language === 'pt'

  return {
    title: isPt ? 'GSK Pro Mexico - Revamp do Portal' : 'GSK Pro Mexico - Portal Revamp',
    description: isPt
      ? 'Redesign do portal da GSK Mexico com um sistema de templates escalável e arquitetura de conteúdo personalizada para especialidades médicas.'
      : "Redesigning GSK Mexico's portal with a scalable template system and personalized content architecture tailored to medical specialties.",
    role: 'Product Designer',
    goal: isPt
      ? 'Redesenhar a experiência digital do GSK Pro Mexico por meio de arquitetura de informação estratégica, melhor descoberta de conteúdo e jornadas personalizadas para profissionais de saúde'
      : "Redesigning GSK Pro Mexico's digital experience through strategic information architecture, enhanced content discoverability, and personalized user journeys to better serve healthcare professionals in their clinical practice",
    hideOtherProjects: false,
    sections: [
      {
        type: 'metrics',
        id: 'overview',
        label: isPt ? 'Métricas' : 'Metrics',
        layout: 'horizontal',
        items: [
          {
            variant: 'positive',
            title: '10+',
            description: isPt
              ? 'Templates de página escaláveis para experiência consistente'
              : 'Scalable page templates for consistent experience',
          },
          {
            variant: 'positive',
            title: '7',
            description: isPt
              ? 'Jornadas personalizadas para o portal'
              : 'Personalized journeys for the portal',
          },
        ],
        disclaimer: isPt
          ? '*Por confidencialidade, os valores reais foram omitidos.'
          : '*For confidentiality reasons, I have omitted the actual values for these metrics.',
      },
      {
        type: 'image',
        src: `${IMG_BASE}/hero.png`,
        alt: isPt
          ? 'Interface principal do portal GSK Pro Mexico com navegação por área terapêutica'
          : 'GSK Pro Mexico portal main interface with therapeutic area navigation',
        priority: true,
        rounded: false,
      },
      {
        type: 'text',
        title: 'TL;DR',
        body: (
          <>
            <p>
              {isPt ? (
                <>
                  O projeto evoluiu além do redesign visual, com foco em uma transformação estratégica
                  de organização de conteúdo <strong>centrada no produto para centrada na doença</strong>,
                  abordando pontos críticos como navegação precária (62% dos HCPs relataram dificuldades),
                  funcionalidades de busca não operacionais e barreiras de acesso.
                </>
              ) : (
                <>
                  The project evolved beyond visual redesign, focusing on a strategic transformation
                  from <strong>product-centric to disease-centric</strong> content organization,
                  addressing critical pain points including poor navigation (62% of HCPs reported
                  difficulties), non-functional search features, and barriers to access.
                </>
              )}
            </p>
            <p>
              {isPt
                ? 'Ao implementar uma arquitetura de informação reestruturada com templates padronizados, um hub centralizado de recursos e organização aprimorada por área terapêutica, a solução estabeleceu uma base para melhor engajamento de HCPs e suporte à tomada de decisão clínica.'
                : 'By implementing a restructured information architecture with standardized templates, centralized resources hub, and enhanced therapeutic area organization, the solution established a foundation for improved HCP engagement and clinical decision-making support.'}
            </p>
          </>
        ),
      },
      {
        type: 'image',
        src: `${IMG_BASE}/research.png`,
        alt: isPt
          ? 'Análise de auditoria de conteúdo do portal GSK Pro Mexico'
          : 'GSK Pro Mexico portal content audit analysis',
      },
      {
        type: 'problems',
        id: 'the-problem',
        title: isPt ? 'O problema' : 'The problem',
        intro: isPt
          ? 'O portal é um ponto de contato digital crítico para profissionais de saúde que buscam informações baseadas em evidências. No entanto, a plataforma existente apresentava barreiras significativas ao engajamento eficaz.'
          : 'The portal serves as a critical digital touchpoint for healthcare professionals seeking evidence-based information. However, the existing platform presented significant barriers to effective engagement.',
        items: [
          {
            variant: 'negative',
            title: isPt ? 'Fluxo de acesso complexo' : 'Complex access flow',
            description: isPt
              ? 'Conteúdo restrito por login impedia que HCPs percebessem valor imediato, com processos de registro que chegavam a 48 horas. Isso resultou em uma taxa de rejeição de 46,2% nas páginas de login.'
              : 'Login-required content prevented HCPs from perceiving immediate value, with registration processes taking up to 48 hours to complete. This resulted in 46.2% bounce rate on login pages.',
          },
          {
            variant: 'negative',
            title: isPt ? 'Navegação precária e inconsistente' : 'Poor navigation and inconsistency',
            description: isPt
              ? 'A ausência de estrutura padronizada entre áreas terapêuticas e páginas de produto gerava sobrecarga cognitiva. O menu principal não representava o portfólio completo de conteúdo, com 300+ páginas recebendo menos de 10 visitas em 6 meses.'
              : 'Lack of standardized structure across therapeutic areas and product pages created cognitive overload. The main menu failed to represent the full content portfolio, with 300+ pages receiving fewer than 10 visits in 6 months.',
          },
          {
            variant: 'negative',
            title: isPt
              ? 'Centrado no produto em vez de no tratamento'
              : 'Product-centric instead of treatment-centric',
            description: isPt
              ? 'A organização do conteúdo focava em produtos individuais em vez de condições clínicas, desalinhada com o modelo mental dos HCPs que "pensam primeiro no paciente e depois nas marcas".'
              : 'Content organization focused on individual products rather than clinical conditions, misaligning with HCPs\' mental models who "think first in the patient, and then in the brands".',
          },
        ],
      },
      {
        type: 'text',
        id: 'design-process',
        title: isPt ? 'Processo de Design' : 'Design Process',
        body: (
          <>
            <p>
              {isPt
                ? 'O projeto seguiu uma metodologia Triple Diamond para garantir uma descoberta abrangente e uma implementação estratégica:'
                : 'The project followed a Triple Diamond methodology to ensure comprehensive discovery and strategic implementation:'}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>
                  {isPt ? 'Discovery e Pesquisa:' : 'Discovery & Research:'}
                </strong>{' '}
                {isPt
                  ? 'Realizamos pesquisa multimétodo, incluindo avaliação heurística com base nos 10 princípios de usabilidade de Nielsen, auditoria de 120 páginas web em 12 produtos e análise competitiva de portais GSK, além de benchmarks externos.'
                  : "Conducted multi-method research including heuristic evaluation against Nielsen's 10 usability principles, content audit of 120 web pages across 12 products, and competitive analysis of GSK portals, plus external benchmarks."}
              </li>
              <li>
                <strong>
                  {isPt ? 'Mapeamento de jornada do usuário:' : 'User journey mapping:'}
                </strong>{' '}
                {isPt
                  ? 'Mapeamos três proto-personas distintas de HCPs. Identificamos pontos de atrito críticos, incluindo barreiras ao acesso inicial, falta de profundidade clínica e ausência de personalização.'
                  : 'Mapped three distinct HCP proto-personas. Identified critical friction points including barriers to early access, lack of clinical depth, and absence of personalization.'}
              </li>
              <li>
                <strong>
                  {isPt
                    ? 'Análise SWOT e síntese estratégica:'
                    : 'SWOT analysis & strategic synthesis:'}
                </strong>{' '}
                {isPt
                  ? 'Cruzamos fraquezas e oportunidades para gerar recomendações acionáveis. Insights-chave revelaram que 55% dos usuários são Clínicos Gerais que precisam de navegação por doença, não por produto específico.'
                  : 'Cross-analyzed weaknesses and opportunities to generate actionable recommendations. Key insights revealed that 55% of users are General Practitioners who need disease-based navigation rather than product-specific information.'}
              </li>
              <li>
                <strong>
                  {isPt
                    ? 'Redesign da arquitetura de informação:'
                    : 'Information architecture redesign:'}
                </strong>{' '}
                {isPt
                  ? 'Desenvolvemos um sitemap abrangente, reestruturando o conteúdo em seções claras. Definimos escopo e objetivo final para cada área principal, garantindo alinhamento estratégico.'
                  : 'Developed comprehensive sitemap restructuring content into clear sections. Defined scope and ultimate objective for each major area to ensure strategic alignment.'}
              </li>
            </ul>
          </>
        ),
      },
      {
        type: 'imageStack',
        id: 'approach',
        images: [
          {
            src: `${IMG_BASE}/process-1.png`,
            alt: isPt
              ? 'Auditoria de conteúdo do GSK Pro Mexico: análise de alinhamento da homepage por produto'
              : 'GSK Pro Mexico content audit: homepage alignment analysis by product',
          },
          {
            src: `${IMG_BASE}/process-2.png`,
            alt: isPt
              ? 'Pesquisa com usuários: sessões de entrevista com profissionais de saúde'
              : 'User research: interview sessions with healthcare professionals',
          },
          {
            src: `${IMG_BASE}/process-3.png`,
            alt: isPt
              ? 'Proposta de valor do Horizons: da venda de produto à solução de problemas do paciente'
              : 'Horizons value proposition: from selling product to solving patient problems',
          },
        ],
      },
      {
        type: 'text',
        id: 'deliverables',
        title: isPt ? 'Entregáveis-chave e Racional' : 'Key Deliverables & Rationale',
        body: (
          <div className="space-y-2">
            <h3>
              {isPt
                ? 'Sitemap Reestruturado e Arquitetura de Informação'
                : 'Restructured Sitemap & Information Architecture'}
            </h3>
            <div>
              <p>
                {isPt
                  ? 'Evolução de organização centrada no produto para centrada na doença, com templates de página padronizados em todas as áreas terapêuticas.'
                  : 'Evolved from product-centric to disease-centric organization with standardized page templates across therapeutic areas.'}
              </p>
              <p>
                {isPt
                  ? 'Alinha-se ao modelo mental dos HCPs, que priorizam condições do paciente em vez de nomes de marca. Cria hierarquia lógica que reduz a carga cognitiva e permite descoberta de informação mais rápida para 55% dos usuários que são Clínicos Gerais atendendo condições diversas.'
                  : "Aligns with HCPs' mental models who prioritize patient conditions over brand names. Creates logical hierarchy that reduces cognitive load and enables faster information discovery for 55% of users who are General Practitioners treating diverse conditions."}
              </p>
            </div>
          </div>
        ),
      },
      {
        type: 'image',
        src: `${IMG_BASE}/sitemap.png`,
        alt: isPt
          ? 'Sitemap reestruturado do GSK Pro Mexico com hierarquia centrada em áreas terapêuticas'
          : 'GSK Pro Mexico restructured sitemap with disease-centric therapeutic area hierarchy',
      },
      {
        type: 'text',
        body: (
          <div className="space-y-8">
            <div className="space-y-2">
              <h3>{isPt ? 'Hub Centralizado de Recursos' : 'Centralized Resources Hub'}</h3>
              <div>
                <p>
                  {isPt
                    ? 'Consolidamos conteúdo educacional disperso, guias práticos, artigos científicos e materiais de educação para pacientes em uma única biblioteca de fácil acesso, organizada por área terapêutica e tipo de conteúdo.'
                    : 'Consolidated scattered educational content, practical guides, scientific articles, and patient education materials into a single, easily accessible library organized by therapeutic area and content type.'}
                </p>
                <p>
                  {isPt
                    ? 'Atende à necessidade dos HCPs de acesso rápido a diversos formatos de conteúdo (vídeos, podcasts, cursos). Posiciona a GSK como parceira de conhecimento confiável além da promoção de produtos, apoiando a transição de "repositório para destino".'
                    : 'Addresses HCPs\' need for quick access to diverse content formats (videos, podcasts, courses). Positions GSK as a trusted knowledge partner beyond product promotion, supporting the shift from "repository to destination".'}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <h3>
                {isPt
                  ? 'Sistema de Templates e Padrões de Design'
                  : 'Template System & Design Standards'}
              </h3>
              <div>
                <p>
                  {isPt
                    ? 'Desenvolvemos 10+ templates de página escaláveis com componentes consistentes e hierarquia de informação.'
                    : 'Developed 10+ scalable page templates with consistent components and information hierarchy.'}
                </p>
                <p>
                  {isPt
                    ? 'Elimina inconsistências visuais que geravam confusão e desorientação. Garante consistência de marca enquanto permite atualizações eficientes de conteúdo em 700+ páginas indexadas.'
                    : 'Eliminates visual inconsistencies that were creating confusion and disorientation. Ensures brand consistency while enabling efficient content updates across 700+ indexed pages.'}
                </p>
              </div>
            </div>
          </div>
        ),
      },
      {
        type: 'image',
        src: `${IMG_BASE}/templates.png`,
        alt: isPt
          ? 'Sistema de templates do GSK Pro Mexico: exemplos de páginas padronizadas por área terapêutica'
          : 'GSK Pro Mexico template system: standardized page examples by therapeutic area',
      },
      {
        type: 'text',
        id: 'outcomes',
        title: isPt ? 'Aprendizado Pessoal' : 'Personal Takeaway',
        body: (
          <>
            <p>
              {isPt
                ? 'Este projeto reforçou a importância crítica de uma descoberta abrangente antes das soluções. A tentação de redesenhar telas diretamente teria ignorado a mudança estratégica mais profunda necessária: de um pensamento centrado no produto para um centrado no tratamento.'
                : 'This project reinforced the critical importance of comprehensive discovery before solutions. The temptation to jump directly into redesigning screens would have missed the deeper strategic shift needed from product-centric to treatment-centric thinking.'}
            </p>
            <p>
              {isPt
                ? 'O insight mais valioso veio ao reconhecer que 55% dos usuários são Clínicos Gerais que precisam navegar por condições de doença em múltiplas áreas terapêuticas, não especialistas buscando informações sobre produtos específicos. Essa única descoberta reformulou fundamentalmente nossa abordagem de arquitetura de informação.'
                : 'The most valuable insight came from recognizing that 55% of users are General Practitioners who need to navigate by disease conditions across multiple therapeutic areas, not specialists looking for specific product information. This single finding fundamentally reshaped our information architecture approach.'}
            </p>
            <p>
              {isPt
                ? 'Este projeto demonstrou que estratégia de conteúdo e arquitetura de informação são tão críticas quanto o design visual em portais de saúde. As limitações funcionais impediam ativamente os HCPs de acessar o valioso conteúdo educacional da GSK, provando que até o melhor conteúdo é inútil se os usuários não conseguem encontrá-lo.'
                : "This project demonstrated that content strategy and information architecture are as critical as visual design in healthcare portals. The functional limitations were actively preventing HCPs from accessing GSK's valuable educational content proving that even the best content is worthless if users can't find it."}
            </p>
          </>
        ),
      },
    ],
  }
}

export default gskpromxStudy
