from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_LEFT
from xml.sax.saxutils import escape
out=Path('output/pdf')
pdfmetrics.registerFont(TTFont('Lato','/usr/share/fonts/truetype/lato/Lato-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LatoBold','/usr/share/fonts/truetype/lato/Lato-Bold.ttf'))
styles={
'name':ParagraphStyle('name',fontName='LatoBold',fontSize=23,leading=27,textColor=HexColor('#152b3a'),spaceAfter=3),
'role':ParagraphStyle('role',fontName='LatoBold',fontSize=11,leading=14,spaceAfter=7),
'contact':ParagraphStyle('contact',fontName='Lato',fontSize=9,leading=12,spaceAfter=10),
'body':ParagraphStyle('body',fontName='Lato',fontSize=10,leading=13,spaceAfter=5),
'heading':ParagraphStyle('heading',fontName='LatoBold',fontSize=10,leading=13,textColor=HexColor('#245a70'),spaceBefore=10,spaceAfter=5),
'job':ParagraphStyle('job',fontName='LatoBold',fontSize=10,leading=13,spaceBefore=5,spaceAfter=4),
'bullet':ParagraphStyle('bullet',fontName='Lato',fontSize=9.6,leading=12.5,leftIndent=10,firstLineIndent=-8,spaceAfter=4),
}
common_jobs=[
('VML (anteriormente Wunderman Thompson Technology) | Product Designer | jan. 2022 - set. 2024',[
'DLL / AGCO Finance: projetei a interface de um aplicativo offline-first para simulações financeiras em campo, dando autonomia à força de vendas e reduzindo a dependência do back-office nas negociações.',
'Danone North America: criei mais de 20 componentes reutilizáveis e templates responsivos para AEM, com documentação de interação, revisão heurística e QA de acessibilidade. O redesign foi acompanhado por aumento superior a 150% no tráfego em relação ao ano anterior.'
]),
('BASE Digital | Product Designer | dez. 2020 - jan. 2022',[
'Duratex: desenhei a interface do programa de fidelidade Clube Duratex, com gamificação do relacionamento com marceneiros e suporte à segmentação de marketing.',
'Oncoclínicas: participei da concepção e entrega do portal em cinco meses, integrando conteúdo especializado e jornadas de telemedicina e agendamento.'
])]
variants={
'bling':{
'role':'PRODUCT DESIGNER | IA, PROTOTIPAÇÃO E DESIGN SYSTEMS',
'summary':'Product Designer com experiência em produtos digitais desde 2020, incluindo soluções financeiras e portais para diferentes perfis de usuário. Atuo do discovery ao handoff, conectando arquitetura de informação, interfaces de alta fidelidade e viabilidade técnica. Uso IA e prototipação em código para acelerar a execução, explorar interações reais e criar padrões escaláveis em colaboração com desenvolvimento.',
'current':[
'Thrivent Asset Management: propus e executei, como único designer e com validações da design lead, a fundação do design system de um portal financeiro em quatro semanas. Defini tokens e componentes documentados para expansão no ecossistema.',
'Automatizei o inventário de mais de 300 páginas com Python e Playwright, concluindo em uma hora uma etapa estimada em sete dias. Criei protótipos React e Storybook com Figma Make e Claude Code, verificando teclado, filtros e responsividade.',
'GSK Pro México: contribuí do discovery ao handoff para a reorganização do portal por condição clínica, com sete jornadas por especialidade. Conduzi entrevistas com stakeholders e co-criei arquitetura de informação e templates de alta fidelidade.',
'Criei agentes de IA na WPP Imagine para estruturar conteúdo científico; a solução foi adotada pelo time e reduziu em 80% o tempo de produção de conteúdo, conforme registrado no currículo.'
],
'skills':'Figma avançado, Figma Make, Claude Code, WPP Imagine, prototipação em código, React, HTML, CSS, JavaScript, Git/GitHub, Webflow, design systems, tokens, arquitetura de informação, revisão heurística e handoff.',
},
'product-designer-pleno':{
'role':'PRODUCT DESIGNER (UX/UI)',
'summary':'Product Designer com experiência em produtos digitais desde 2020 e atuação em soluções financeiras, saúde e portais corporativos. Transformo problemas de navegação e conteúdo em fluxos, interfaces e componentes consistentes. Combino discovery, entrevistas com stakeholders, análise de indicadores de uso e prototipação no Figma, com documentação clara e colaboração com desenvolvimento.',
'current':[
'GSK Pro México: participei do discovery ao handoff em um time de cinco designers. Conduzi duas entrevistas com stakeholders e acompanhei outras duas, além de realizar benchmarks e diagnóstico de conteúdo para orientar decisões de design.',
'Contribuí para a arquitetura de informação e protótipos de alta fidelidade de um portal com sete jornadas por especialidade e mais de dez templates. O diagnóstico apontava 62% de dificuldade para encontrar informações e mais de 300 páginas com menos de dez visitas em seis meses.',
'Thrivent Asset Management: identifiquei inconsistências em um portal financeiro e propus um plano com etapas, entregáveis e prazos. Entreguei a fundação do design system em quatro semanas, com tokens, componentes e documentação para designers e desenvolvedores.',
'Criei protótipos funcionais em React com Figma Make e Claude Code para verificar navegação por teclado, responsividade e filtros no fluxo de análise de fundos. Automatizei o catálogo de mais de 300 páginas em uma hora.'
],
'skills':'Figma avançado, FigJam, arquitetura de informação, fluxos e jornadas, prototipação de alta fidelidade, entrevistas com stakeholders, benchmark, análise de indicadores de uso, revisão heurística, acessibilidade, design systems e handoff. HTML, CSS, JavaScript, React e Webflow.',
}}
variants['bling'].update({
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
variants['bling'].update({
'role':'PRODUCT DESIGNER | UX/UI',
'summary':'Product Designer com mais de cinco anos de experiência em produtos digitais. Atuação em design de ponta a ponta, do discovery ao handoff, com experiência em produtos financeiros, arquitetura de informação e jornadas para múltiplos perfis de usuário. Combino visão sistêmica, autonomia e colaboração com Engenharia para transformar problemas complexos de negócio em interfaces claras e consistentes. Uso ativo de IA, prototipação de alta fidelidade e vibecoding para acelerar exploração, execução e validação funcional.',
'current':[
'Thrivent Asset Management: conduzi uma iniciativa estratégica de design system para um portal financeiro, do diagnóstico e planejamento à entrega em quatro semanas. Identifiquei uma necessidade fora do roadmap, defini escopo e prioridades e alinhei decisões com a liderança de Design e Engenharia.',
'Garanti consistência entre fluxos de consulta e análise de fundos por meio de design tokens, componentes reutilizáveis e documentação de uso. Prototipei e iterei em React com Figma Make e Claude Code (IA e vibecoding), verificando filtros, tabelas, responsividade e navegação por teclado.',
'Acelerei o discovery automatizando a análise inicial de mais de 300 páginas com Python e Playwright: o inventário previsto para sete dias foi concluído em uma hora, permitindo priorizar inconsistências e oportunidades de melhoria.',
'GSK Pro México: apliquei pesquisa exploratória, entrevistas com stakeholders e benchmark à definição de arquitetura de informação, jornadas e protótipos de alta fidelidade. Contribuí para sete jornadas por especialidade e mais de dez templates, equilibrando necessidades dos usuários e objetivos do negócio.',
'Aumentei a capacidade de execução do time com agentes de IA na WPP Imagine para estruturar conteúdo científico. A solução foi adotada pela equipe e reduziu em 80% o tempo de produção de conteúdo.'
],
'skills':'Product Design; UX/UI; discovery e delivery; design centrado no usuário; pesquisa exploratória; arquitetura de informação; mapeamento de jornadas; prototipação e iteração; design systems; visão sistêmica; revisão crítica de interfaces; acessibilidade; handoff e colaboração com Engenharia. Figma avançado, Figma Make, Claude Code, WPP Imagine, vibecoding, React, HTML, CSS, JavaScript, Storybook e Webflow.'
})
variants['bling']['jobs'][0][1][:]=[
'DLL / AGCO Finance: traduzi uma operação comercial B2B em interfaces para simulação financeira offline-first. Considerei as necessidades de vendedores em campo e a dependência dos formalizadores para desenhar uma solução que deu autonomia à força de vendas e acelerou a negociação.',
'Danone North America: projetei interfaces de alta fidelidade, mais de 20 componentes e templates responsivos para diferentes públicos. Equilibrei usabilidade e restrições do AEM, realizando revisão heurística, QA de interfaces e documentação para desenvolvimento. O redesign foi acompanhado por crescimento de tráfego superior a 150% ante o ano anterior.'
]
variants['product-designer-pleno'].update({
'role':'PRODUCT DESIGNER (UX/UI)',
'summary':'Product Designer (UX/UI) com experiência no ciclo completo de design, da pesquisa exploratória e discovery à prototipação, validação com stakeholders e handoff. Atuação em produtos financeiros e plataformas digitais, transformando problemas complexos de negócio em experiências intuitivas, claras e consistentes. Perfil analítico, organizado e autônomo, com domínio de Figma e colaboração com Engenharia para equilibrar necessidades dos usuários, objetivos do negócio e viabilidade técnica.',
'current':[
'GSK Pro México: realizei pesquisa qualitativa exploratória por meio de entrevistas com stakeholders, benchmark e análise de conteúdo. Conectei os achados aos indicadores de uso do discovery para identificar fricções de navegação e oportunidades de melhoria na experiência.',
'Fundamentei propostas de arquitetura de informação e jornadas em evidências: 62% dos profissionais relatavam dificuldade para localizar informações e mais de 300 páginas tinham menos de dez visitas em seis meses. Contribuí para sete jornadas por especialidade e mais de dez templates escaláveis.',
'Criei protótipos de alta fidelidade no Figma, validei soluções com stakeholders e traduzi decisões em documentação e handoff. Organizei padrões de conteúdo e interface para garantir clareza, usabilidade e consistência entre áreas terapêuticas.',
'Thrivent Asset Management: conduzi com autonomia o planejamento e a execução da fundação de um design system financeiro em quatro semanas. Defini etapas, entregáveis e prazos, comuniquei o racional à liderança de Design e alinhei componentes e tokens com desenvolvedores.',
'Prototipei fluxos de análise de fundos em React com Figma Make e Claude Code, verificando comportamento de filtros, tabelas, responsividade e navegação por teclado. Documentei componentes e especificações para facilitar a implementação e a evolução consistente da plataforma.'
],
'skills':'Product Design; UX/UI; design centrado no usuário; pesquisa qualitativa exploratória; entrevistas com stakeholders; análise de dados de uso; pensamento analítico; resolução de problemas; arquitetura de informação; mapeamento de jornadas e fluxos; design de interação; protótipos de alta fidelidade; validação com stakeholders; revisão heurística; usabilidade; acessibilidade; design systems; especificações e handoff. Figma avançado, FigJam, HTML, CSS, JavaScript e React.'
})
variants['product-designer-pleno']['jobs'][0][1][:]=[
'DLL / AGCO Finance: transformei necessidades da operação comercial em interfaces para simulações financeiras offline-first. Considerei o contexto de uso dos vendedores em campo para simplificar a jornada, ampliar a autonomia e reduzir a dependência do back-office.',
'Danone North America: desenhei interfaces e mais de 20 componentes reutilizáveis no Figma para jornadas de consumidores, investidores e imprensa. Realizei revisão heurística e QA de acessibilidade e responsividade; documentei padrões de interação e especificações para desenvolvimento. O redesign foi acompanhado por crescimento de tráfego superior a 150% ante o ano anterior.'
]
for key,v in variants.items():
    blocks=[('name','Maycon Douglas'),('role',v['role']),('contact','Portfólio: maycondouglas.work | LinkedIn: linkedin.com/in/maycondouglascc<br/>E-mail: hi@maycondouglas.work'),('body',v['summary']),('heading','EXPERIÊNCIA PROFISSIONAL'),('job','dti digital | Product Designer | set. 2024 - atual')]
    blocks += [('bullet','- '+s.replace(', conforme registrado no currículo','')) for s in v['current']]
    for title,bullets in v['jobs']:
        blocks += [('job',title)]+[('bullet','- '+s) for s in bullets]
    blocks += [('heading','COMPETÊNCIAS E FERRAMENTAS'),('body',v['skills']),('heading','CURSOS E CERTIFICAÇÕES'),('body','Design Circuit - Product Design | Meiuca - Design System Specialist<br/>Design Boost - Design de Interação | Webflow Practitioner Certification'),('body','Idiomas: português nativo | inglês profissional (B2).')]
    story=[Paragraph(s,styles[t]) for t,s in blocks]
    doc=SimpleDocTemplate(str(out/f'maycon-douglas-{key}.pdf'),pagesize=(595.28,841.89),leftMargin=39,rightMargin=39,topMargin=30,bottomMargin=28,title=f'Maycon Douglas - {v["role"]}',author='Maycon Douglas')
    doc.build(story)
    md=['# Maycon Douglas',v['role'],'Portfólio: https://www.maycondouglas.work | LinkedIn: https://www.linkedin.com/in/maycondouglascc | E-mail: hi@maycondouglas.work']
    md += [('## '+s if t=='heading' else '### '+s if t=='job' else s.replace('<br/>','\n')) for t,s in blocks[3:]]
    (out/f'maycon-douglas-{key}.md').write_text('\n\n'.join(md),encoding='utf-8')
