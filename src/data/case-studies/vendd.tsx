import type { CaseStudyData } from "../projects";
import type { Language } from "../../context/LanguageContext";
import { VenddPrototype } from "../../components/vendd/VenddPrototype";

const venddStudy = (language: Language): CaseStudyData => {
  const isPt = language === "pt";

  return {
    title: isPt
      ? "Vendd — Design de produto e design system"
      : "Vendd — Product Design & Design System",
    description: isPt
      ? "Estruturei a base de design da Vendd como designer solo, conectando direção visual, design system unificado e fluxos de recuperação de vendas para plataformas web e mobile."
      : "As Vendd's sole designer, I established its design foundation, connecting visual direction, a unified design system, and sales recovery flows across web and mobile platforms.",
    role: isPt ? "Product Designer solo" : "Solo Product Designer",
    goal: isPt
      ? "Criar uma experiência consistente, escalável e de alta conversão para o ecossistema de vendas da Vendd, unificando CRM, checkout e inteligência de vendas em web e mobile."
      : "Create a consistent, scalable, and high-converting experience for Vendd's sales ecosystem, unifying CRM, checkout, and sales intelligence across web and mobile.",
    sections: [
      // ── 1. Hero Image ──
      {
        type: "image",
        src: "/files/cases/vendd-web/shot-01.png",
        alt: isPt
          ? "Visão geral da interface do Vendd Web apresentando o Kanban de recuperação de vendas e design tokens escuros"
          : "Overview of Vendd Web interface displaying the sales recovery Kanban board and dark design tokens",
        priority: true,
      },

      // ── 2. Protótipo Interativo Completo (Destaque Principal) ──
      {
        type: "text",
        title: isPt
          ? "Protótipo Interativo: Recuperação de Vendas e CRM"
          : "Interactive Prototype: Sales Recovery & CRM",
        body: (
          <div className="space-y-4">
            <p className="text-zinc-600 dark:text-zinc-400">
              {isPt
                ? "Explore o protótipo interativo abaixo. Alterne entre as visões de Quadro (Kanban), Tabela expansível, Assistente Vendd GPT e Simulador Mobile para interagir com o fluxo real de recuperação de vendas:"
                : "Explore the interactive prototype below. Switch between the Kanban board, expandable Table, Vendd GPT AI Assistant, and Mobile Simulator to interact with the real sales recovery workflow:"}
            </p>
            <div className="my-6">
              <VenddPrototype />
            </div>
            <p className="text-xs text-zinc-500">
              {isPt
                ? "💡 Dica: Clique nos cards ou nas linhas da tabela para abrir o drawer com a linha do tempo de atividades e o simulador de WhatsApp."
                : "💡 Tip: Click on cards or table rows to open the deal drawer with the activity timeline and WhatsApp chat simulator."}
            </p>
          </div>
        ),
      },

      // ── 3. Contexto ──
      {
        type: "text",
        visibility: ["overview"],
        title: isPt ? "Contexto e Desafio" : "Context & Challenge",
        body: (
          <>
            <p>
              {isPt
                ? "A Vendd é uma plataforma SaaS brasileira voltada a infoprodutores, coprodutores e afiliados. Seu diferencial é reunir CRM de recuperação de vendas, páginas de alta conversão e inteligência artificial em um único ecossistema centralizado."
                : "Vendd is a Brazilian SaaS platform tailored for digital creators, co-producers, and affiliates. Its key edge is unifying sales recovery CRM, high-conversion landing pages, and AI in a single central ecosystem."}
            </p>
            <p>
              {isPt
                ? "O maior desafio de design consistia em organizar dados densos de carrinhos abandonados, boletos e Pix pendentes em uma interface que permitisse ação imediata, reduzindo a fricção do operador e mantendo consistência entre os múltiplos produtos da suíte."
                : "The main design challenge was organizing dense abandoned cart, pending boleto, and expired Pix data into an actionable interface, minimizing operator friction while maintaining rigorous consistency across all suite products."}
            </p>
          </>
        ),
      },

      // ── 4. Problemas Resolvidos ──
      {
        type: "problems",
        visibility: ["overview"],
        title: isPt ? "Principais Dores dos Usuários" : "Core User Pain Points",
        intro: isPt
          ? "Identifiquei 3 pontos críticos de atrito no fluxo diário de produtores e atendentes:"
          : "I identified 3 critical friction points in the daily workflow of producers and sales agents:",
        items: [
          {
            variant: "negative",
            title: isPt
              ? "Perda de timing na recuperação de Pix e carrinho"
              : "Lost timing in Pix and cart recovery",
            description: isPt
              ? "Sem alertas em tempo real e visualização de prazos de expiração, atendentes perdiam o momento ideal de contato com o lead."
              : "Without real-time expiration alerts and deadline tracking, sales reps missed the golden window to reach out to buyers.",
          },
          {
            variant: "negative",
            title: isPt
              ? "Falta de contexto sobre o histórico do cliente"
              : "Lack of customer context and history",
            description: isPt
              ? "Operadores não tinham visão clara das tentativas anteriores de pagamento (recusas de cartão, boletos não pagos ou mensagens automáticas já enviadas)."
              : "Operators had no immediate visibility into prior payment attempts (card rejections, unpaid boletos, or automated reminder messages).",
          },
          {
            variant: "negative",
            title: isPt
              ? "Inconsistência entre visualizações Desktop e Mobile"
              : "Inconsistency between Desktop and Mobile",
            description: isPt
              ? "Produtores que operavam pelo celular precisavam de uma interface ágil com as mesmas informações vitais do Kanban de desktop."
              : "Creators operating on the go via mobile needed a nimble experience retaining the vital information of the desktop board.",
          },
        ],
      },

      // ── 5. Imagem: Switcher e Modal ──
      {
        type: "image",
        src: "/files/cases/vendd-web/shot-02.png",
        alt: isPt
          ? "Modal de alternância de workspaces e contexto de contas na plataforma Vendd"
          : "Workspace switcher modal and account context in the Vendd platform",
      },

      // ── 6. Soluções e Decisões de Design ──
      {
        type: "text",
        title: isPt ? "Soluções e Decisões de Design" : "Design Solutions & Decisions",
        body: (
          <>
            <p>
              {isPt
                ? "Desenvolvi uma estrutura unificada de tokens baseada em tons neutros escuros (Zinc) com acentos em azul vibrante (#155DFC) para estados ativos. A hierarquia foi organizada em 3 pilares:"
                : "I created a unified design token architecture built on dark zinc neutrals with vibrant blue accents (#155DFC) for active states, structured around 3 pillars:"}
            </p>
            <ul>
              <li>
                <strong>
                  {isPt ? "Quadro Kanban com Indicadores de Urgência: " : "Kanban Board with Urgency Cues: "}
                </strong>
                {isPt
                  ? "Pílulas coloridas para status temporais ('Hoje', 'Em 2 dias', 'Há 3 dias') com ícones rápidos de mensagens e múltiplos itens abandonados."
                  : "Color-coded pills for temporal urgency ('Today', 'In 2 days', '3 days ago') paired with message badges and extra product counters."}
              </li>
              <li>
                <strong>
                  {isPt ? "Tabela com Linhas Secundárias Expansíveis: " : "Table with Expandable Nested Rows: "}
                </strong>
                {isPt
                  ? "Para equipes que lidam com volume massivo de dados, a tabela permite expandir o lead para inspecionar cada item do carrinho individualmente, com seus respectivos valores e comissões."
                  : "For teams handling high data volume, the grid allows expanding any lead to inspect each abandoned cart item individually, alongside item-level commissions."}
              </li>
              <li>
                <strong>
                  {isPt ? "Drawer com Linha do Tempo de Atividades: " : "Activity Timeline Drawer: "}
                </strong>
                {isPt
                  ? "Histórico cronológico detalhado com ícones de eventos dedicados para compras concluídas, iniciadas, expiradas, e-mails e WhatsApp enviados."
                  : "Detailed chronological history with dedicated event iconography for completed, initiated, and expired purchases, as well as email and WhatsApp triggers."}
              </li>
            </ul>
          </>
        ),
      },

      // ── 7. Imagem: Tela de Detalhes e Atividades ──
      {
        type: "image",
        src: "/files/cases/vendd-web/shot-03.png",
        alt: isPt
          ? "Tela de atividades e timeline com histórico de eventos de vendas no Vendd Web"
          : "Activities and timeline screen showing sales recovery history in Vendd Web",
      },

      // ── 8. Resultados ──
      {
        type: "results",
        visibility: ["overview"],
        title: isPt ? "Impacto e Resultados" : "Impact & Key Results",
        intro: isPt
          ? "A consolidação do design system e das interfaces de recuperação trouxe avanços expressivos:"
          : "The consolidation of the design system and recovery interfaces drove substantial improvements:",
        items: [
          {
            variant: "positive",
            title: isPt ? "+32% de velocidade operacional" : "+32% operational speed",
            description: isPt
              ? "Atendentes reduziram significativamente o tempo necessário para localizar carrinhos abandonados e disparar o primeiro contato."
              : "Sales reps drastically reduced the time needed to locate abandoned checkouts and initiate contact.",
          },
          {
            variant: "positive",
            title: isPt ? "Design System 100% reutilizável" : "100% reusable design system",
            description: isPt
              ? "Componentes reutilizados em CRM, Páginas, VSL e no aplicativo mobile com consistência absoluta de tokens."
              : "Components reused across CRM, Pages, VSL, and mobile with complete token consistency.",
          },
          {
            variant: "positive",
            title: isPt ? "Experiência multicanal integrada" : "Integrated omnichannel UX",
            description: isPt
              ? "Unificação da visualização web desktop com experiência otimizada para smartphones."
              : "Seamless bridge between rich desktop workflows and mobile-first management.",
          },
        ],
      },
    ],
  };
};

export default venddStudy;
