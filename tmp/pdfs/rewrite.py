from pathlib import Path
p=Path('tmp/pdfs/build_resumes.py')
s=p.read_text()
start=s.index('for key,v in variants.items():')
s=s[:start]+'''variants['bling'].update({
'role':'PRODUCT DESIGNER | EXPERIÊNCIAS COMPLEXAS, IA E PROTOTIPAÇÃO',
'summary':'Product Designer com mais de cinco anos de experiência em produtos digitais, com atuação em serviços financeiros e plataformas para públicos especializados. Conecto descoberta, arquitetura de informação e execução de alta fidelidade para simplificar jornadas complexas. Tenho autonomia para propor e conduzir iniciativas, uso IA e vibecoding para acelerar protótipos funcionais e construo padrões que dão consistência à experiência entre diferentes fluxos e equipes.',
'current':[
'Thrivent Asset Management: identifiquei uma oportunidade fora do roadmap e conduzi a fundação do design system de um portal financeiro em quatro semanas, do diagnóstico à entrega. Como único designer, alinhei decisões com a design lead e desenvolvedores para equilibrar experiência, prazo e viabilidade técnica.',
'Combinei Figma Make, Claude Code e React em um fluxo de prototipação com IA (vibecoding), explorando filtros, tabelas de ativos, responsividade e navegação por teclado. Entreguei tokens, componentes e Storybook documentado para apoiar consistência e evolução do ecossistema.',
'Automatizei com Python e Playwright o inventário de mais de 300 páginas: uma etapa estimada em sete dias foi concluída em uma hora, liberando tempo para análise de padrões e decisões de design.',
'GSK Pro México: traduzi entrevistas com stakeholders e diagnóstico de conteúdo em arquitetura e templates para sete jornadas por especialidade. Criei agentes de IA adotados pelo time, reduzindo em 80% o tempo de produção de conteúdo.'
],
'skills':'Design de ponta a ponta até o handoff; arquitetura de informação; jornadas com múltiplos perfis; interfaces de alta fidelidade; design systems e tokens; revisão heurística e QA de interfaces. Figma, Figma Make, Claude Code, WPP Imagine, React, HTML, CSS, JavaScript, Storybook e Webflow.'
})
variants['product-designer-pleno'].update({
'summary':'Product Designer (UX/UI) com experiência em soluções financeiras e plataformas digitais, da investigação do problema à prototipação e entrega para desenvolvimento. Combino entrevistas com stakeholders, indicadores de uso e análise de jornadas para fundamentar decisões de design. Trabalho com Figma, interfaces de alta fidelidade e documentação técnica, equilibrando necessidades dos usuários, objetivos de negócio e restrições de implementação.',
'current':[
'GSK Pro México: contribuí para o ciclo de design do discovery ao handoff em um time de cinco designers. Conduzi entrevistas com stakeholders, realizei benchmarks e diagnóstico de conteúdo para compreender dificuldades de navegação e necessidades do negócio.',
'Transformei evidências do discovery em propostas de arquitetura de informação e protótipos de alta fidelidade no Figma. O diagnóstico incluía 62% de dificuldade para localizar informações e mais de 300 páginas com menos de dez visitas em seis meses; contribuí para sete jornadas por especialidade e mais de dez templates.',
'Validei propostas com stakeholders e preparei documentação para os times de autoria, estruturando conteúdo e padrões de interface para tornar as entregas claras e consistentes.',
'Thrivent Asset Management: planejei e entreguei a fundação de um design system financeiro em quatro semanas, com etapas, prazos e validações com a design lead. Colaborei com desenvolvedores na definição de tokens, componentes e documentação; usei protótipos React para verificar filtros, responsividade e navegação por teclado.'
],
'skills':'Figma avançado e FigJam; discovery; entrevistas com stakeholders; benchmark; interpretação de indicadores de uso; arquitetura de informação; mapeamento de fluxos e jornadas; prototipação de alta fidelidade; validação com stakeholders; revisão heurística; acessibilidade; documentação e handoff. HTML, CSS, JavaScript, React e Webflow.'
})
variants['bling']['jobs']=[
(common_jobs[0][0],[
'DLL / AGCO Finance: desenhei uma ferramenta de simulação financeira para a força de vendas, considerando o trabalho em campo e a operação offline. A solução deu autonomia aos vendedores, eliminou a dependência dos formalizadores e acelerou o ciclo de negociação.',
'Danone North America: equilibrei necessidades de consumidores, investidores e imprensa com as restrições do AEM. Criei mais de 20 componentes e templates responsivos, com revisão heurística, QA e documentação para desenvolvimento; o redesign foi acompanhado por aumento superior a 150% no tráfego anual.'
]),
(common_jobs[1][0],[
'Duratex: projetei a interface de uma plataforma de fidelidade para marceneiros, conectando engajamento dos participantes a necessidades de segmentação de marketing e inteligência de vendas.',
'Oncoclínicas: participei da concepção e entrega, em cinco meses, de um portal com jornadas de telemedicina e agendamento, integrando serviços e conteúdo especializado.'
])]
variants['product-designer-pleno']['jobs']=[
(common_jobs[0][0],[
'DLL / AGCO Finance: projetei interfaces para simulações financeiras em um aplicativo offline-first. Considerei o contexto de uso em campo para dar autonomia à força de vendas e reduzir a dependência do back-office na jornada de negociação.',
'Danone North America: criei mais de 20 componentes reutilizáveis e templates de alta fidelidade no Figma, diferenciando jornadas por público. Documentei interações e realizei revisão heurística e QA de acessibilidade e responsividade, respeitando as restrições do AEM. O redesign foi acompanhado por aumento superior a 150% no tráfego anual.'
]),
(common_jobs[1][0],[
'Duratex: desenhei interfaces para o Clube Duratex, traduzindo objetivos de relacionamento e segmentação de marketing em uma experiência de fidelidade para marceneiros.',
'Oncoclínicas: participei da concepção e entrega do portal em cinco meses, organizando interfaces para acesso a conteúdo especializado e serviços de telemedicina e agendamento.'
])]
''' + s[start:].replace('for title,bullets in common_jobs:',"for title,bullets in v['jobs']:")
p.write_text(s)
