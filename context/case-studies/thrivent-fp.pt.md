---
slug: thrivent-fp
title: Thrivent Design System Foundation
language: pt
role: Product Designer
goal: Criar a fundação do design system para o portal Thrivent FP, garantindo que os artefatos fossem gerassem valor desde o dia 1 e que fossem escaláveis para as demais marcas do ecossistema
source: src/data/case-studies/thrivent.tsx
---

# Thrivent Design System Foundation

Criei a fundação do design system para o portal financeiro da Thrivent, um canal com mais de uma década de crescimento sem diretrizes de design. O desafio era produzir artefatos com valor imediato e escaláveis para as demais marcas do ecossistema. Foram mais de 300 páginas catalogadas, design tokens definidos e componentes base construídos e documentados.

- Role: Product Designer
- Goal: Criar a fundação do design system para o portal Thrivent FP, garantindo que os artefatos fossem gerassem valor desde o dia 1 e que fossem escaláveis para as demais marcas do ecossistema
- Source: src/data/case-studies/thrivent.tsx

![Portal Thrivent FP redesenhado mostrando página de detalhes de fundo de investimento com navegação reestruturada e componentes do novo design system](/files/case-studies/thrivent/shot 0.png)

## Contexto

A Thrivent é uma organização financeira com mais de 120 anos de história, em processo de modernização dos seus canais digitais. O projeto focou no Thrivent FP, portal do braço Thrivent Asset Management voltado a profissionais do mercado financeiro, um canal crítico com anos de dívida técnica e de design acumuladas.

Durante as duas semanas de onboarding no projeto, naveguei as interfaces dos diferentes portais da Thrivent e conduzi uma análise de competidores do mercado financeiro. O diagnóstico foi claro: divergências entre páginas, componentes sem padronização, e decisões de design sendo tomadas repetidamente sem referência. Não havia pauta imediata no roadmap, mas identifiquei a janela de oportunidade e tomei a iniciativa. Estruturei um planejamento completo (motivações, etapas, entregáveis e prazos), apresentei formalmente ao time, e recebi aprovação para executar.

## Meu papel e contribuição

Atuei como único designer no projeto, com validações periódicas com a design lead. Também colaborei com desenvolvedores para garantir viabilidade técnica e qualidade dos entregáveis de código. O prazo foi de 4 semanas.

- Identifiquei a oportunidade e estruturei o planejamento do projeto, definindo motivações, etapas, entregáveis e prazos. Apresentei formalmente ao time e recebi aprovação para executar.
- Automatizei o catálogo de páginas, reduzindo uma etapa estimada em 7 dias para 1 hora. Mais de 300 páginas foram catalogadas nessa etapa.
- Criei toda a camada de design tokens, dos primitivos (cores, tipografia, espaçamentos) aos semânticos (atribuindo significado de uso a cada token). Após alinhamento com o time de desenvolvimento, adotei a convenção de nomenclatura do Tailwind CSS para diminuir a curva de aprendizado do sistema da equipe..
- Criei componentes base documentados priorizando o fluxo de análise de fundo (home, listagem, detalhe do ativo), o caminho mais crítico identificado na análise de competidores.
- Prototipei em código e construí Storybook documentado usando Figma Make e Claude Code, testando navegação por teclado, responsividade, filtros e interações em ambiente real.

Ferramentas: Figma, Claude Code, e Figma Make. | Prazo: 4 semanas

## Desafios

O Thrivent FP era um portal construído ao longo de mais de uma década sem diretrizes de design, sem sistema e sem linguagem compartilhada entre designers e desenvolvedores.

- Portal sem padronização visual: Anos de crescimento orgânico geraram variações desnecessárias em toda a interface: 6 tipos de card com 23 variações estruturais, múltiplas variações de hero banner, 5 tipos de botão. Designers e desenvolvedores tomavam as mesmas decisões repetidamente, sem referência.
- Artefatos precisavam funcionar desde o dia 1: Os componentes criados precisavam entrar em uso imediato e ser escaláveis para as demais interfaces e marcas da Thrivent no futuro.

![Estado anterior do portal Thrivent FP mostrando inconsistências visuais entre páginas](/files/case-studies/thrivent/shot 1.png)

## Processo

1. Planejar e apresentar a proposta — Após identificar a oportunidade durante o onboarding, estruturei um planejamento com motivações, etapas, entregáveis esperados e prazos para cada fase. Apresentei formalmente ao time e recebi aprovação para iniciar a execução.
1. Catalogar páginas do portal — Catalogar mais de 300 páginas manualmente levaria dias. Decidi automatizar: Usei Python para criar um bot que faz web crawl do portal, captura URLs e gera screenshots com parâmetros configuráveis. Uma etapa estimada em 7 dias foi concluída em 1 hora.
1. Inventariar padrões e inconsistências — Com o catálogo em mãos, analisei os padrões de design existentes e mapeei as inconsistências. O resultado confirmou o diagnóstico do onboarding: cards com 6 tipos e 23 variações estruturais, hero banners com múltiplas variações, 5 tipos de botões.
1. Priorizar com base em análise de competidores — A análise conduzida durante o onboarding mostrou um padrão claro: todos os portais financeiros analisados conduziam o usuário para a página de detalhes do ativo como fluxo central. Priorizei o fluxo de análise de um fundo (home, listagem de fundos, detalhe do ativo) por ser o mais crítico.
1. Criar os design tokens — Construí toda a camada de tokens do sistema: primitivos (cores, tipografia, espaçamentos) e semânticos (atribuindo significado de uso a cada valor). Adotei a convenção do Tailwind CSS como referência para nomenclatura, normalizando nomes proprietários. 'thrivent-navy-deep-blue' virou 'blue-900'.
1. Prototipar em código — Parti dos mockups para implementação direta em React. Um protótipo no Figma testa estética; um protótipo em código testa comportamento. Implementei as telas dos fluxos priorizados e testei navegação por teclado, responsividade, filtros e interações na tabela de ativos.
1. Consolidar, documentar e entregar — Documentei quando e como cada componente deve ser usado, para dois públicos: designers e desenvolvedores. Além da documentação visual, criei uma camada em formato AI-friendly: arquivos Markdown verbosos e autocontidos, sem dependência de contexto visual. Usei Claude Code para construir o Storybook final com componentes agnósticos a framework.

![Processo Thrivent: output do script de catálogo com URLs e screenshots gerados automaticamente](/files/case-studies/thrivent/shot 2.png)

![Processo Thrivent: inventário de componentes mostrando variações de cards, botões e hero banners](/files/case-studies/thrivent/shot 3.png)

![Processo Thrivent: tokens primitivos e semânticos com paleta de cores normalizada e tipografia](/files/case-studies/thrivent/shot 4.png)

![Componentes base do design system Thrivent: card, botão e elementos de formulário documentados](/files/case-studies/thrivent/shot 5.png)

![PoC em código do Thrivent FP: protótipo React mostrando fluxo de análise de fundo com filtros e tabela de ativos](/files/case-studies/thrivent/shot 6.png)

![Documentação do design system Thrivent: Markdown file](/files/case-studies/thrivent/shot 7.png)

![Documentação do design system Thrivent: Storybook com componentes documentados e handoff AI-friendly](/files/case-studies/thrivent/shot 8.png)

## Resultados

Em 4 semanas entreguei a fundação completa do design system, pronta para uso imediato.

- 300+ páginas catalogadas em 1 hora: Automação com Python + Playwright transformou a etapa mais demorada do processo em uma tarefa de minutos, liberando tempo para decisões estratégicas.
- Design tokens completos (primitivos + semânticos): Cores, tipografia e espaçamentos consolidados, com camada semântica atribuindo significado de uso. Prontos para extensão às demais marcas do ecossistema Thrivent.
- Componentes base documentados com dupla camada: Documentação visual para designers e desenvolvedores, mais documentação AI-friendly em Markdown para coding agents. Um desenvolvedor do time descreveu o código como 'fácil de ler, organizado e documentado'.
- PoC funcional em código: Protótipos feitos diretamento no código testando o fluxo completo de análise de fundo, com navegação por teclado, responsividade e interações reais validadas em ambiente funcional.

*Dados de adoção em produção não disponíveis. O design system foi entregue como fundação, antes da janela de implementação no roadmap.

## Aprendizados

Antes desse projeto, eu esperava que oportunidades de impacto viessem pelo roadmap. No onboarding da Thrivent, percebi que a dor do design system era real, a janela de calendário existia, e ninguém ia pautar isso a curto prazo. Decidi estruturar a proposta, apresentar formalmente e executar. O resultado validou algo que agora é parte do meu processo: quando identifico uma dor sistêmica com janela de execução, não espero que alguém transforme isso em tarefa.
