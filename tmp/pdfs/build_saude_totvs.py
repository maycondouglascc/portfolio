from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph
import re
ns={};src=Path('tmp/pdfs/build_base.py').read_text();exec(src[:src.index('blocks=[')],ns)
styles=ns['styles']
for k in ['body','bullet']:styles[k].leading=11.5;styles[k].spaceAfter=2.5
styles['heading'].spaceBefore=5
styles['job'].spaceBefore=4
contact='<link href="mailto:hi@maycondouglas.work">hi@maycondouglas.work</link> | <link href="https://www.maycondouglas.work">Portfólio: maycondouglas.work</link><br/>Brasil | <link href="https://www.linkedin.com/in/maycondouglascc">linkedin.com/in/maycondouglascc</link>'
common_end=[('heading','CURSOS E CERTIFICAÇÕES'),('body','Design Circuit - Product Design | Meiuca - Design System Specialist<br/>Design Boost - Design de Interação | Webflow Practitioner Certification'),('heading','IDIOMAS'),('body','Português nativo | Inglês profissional (B2).')]
saude=[
('name','Maycon Douglas'),('role','UX/UI DESIGNER | PLENO'),('contact',contact),
('heading','RESUMO'),
('body','UX/UI Designer com mais de cinco anos de experiência em produtos digitais, incluindo plataformas de saúde. Traduzo demandas de negócio em briefings acionáveis e organizo backlog de design com Jira e Azure DevOps. Combino priorização, acompanhamento de entregas e comunicação com stakeholders em rotinas Scrum e Kanban para apoiar qualidade e consistência. Tenho domínio prático de Figma e design systems e uso IA para estruturar solicitações, esclarecer problemas e acelerar a colaboração com desenvolvimento.'),
('heading','HABILIDADES'),
('body','<b>Demandas e Briefings:</b> refinamento de requisitos, esclarecimento de pendências, briefings estruturados e tradução de necessidades de negócio em direcionamentos de UX/UI.'),
('body','<b>Backlog e Métodos Ágeis:</b> Jira, Azure DevOps, Scrum e Kanban; organização e priorização de demandas, acompanhamento de prazos e entregas e alinhamento com stakeholders e designers.'),
('body','<b>Qualidade de UX/UI:</b> design systems, componentes, tokens, consistência visual, revisão heurística, acessibilidade, responsividade, QA e registro estruturado de problemas.'),
('body','<b>Design e Tecnologia:</b> Figma avançado, FigJam, arquitetura de informação, jornadas, prototipação de alta fidelidade, especificações e handoff.'),
('body','<b>IA aplicada ao Design:</b> Claude, Claude Code, Codex e Figma Make para interpretação de briefings, prototipação, documentação e apoio à validação.'),
('heading','EXPERIÊNCIA PROFISSIONAL'),
('job','dti digital | Product Designer | setembro de 2024 - atual'),
('body','Atuo em plataformas financeiras, de saúde e de processos regulatórios, conectando entendimento do problema, propostas de design e documentação em parceria com stakeholders e desenvolvimento.'),
('bullet','- <b>Briefings e backlog:</b> organizo e priorizo demandas, estruturo briefings e acompanho entregas em Jira/Azure DevOps, em rotinas Scrum/Kanban. Criei uma ferramenta com Claude para transformar tickets, e-mails e reuniões em direcionamentos de design e protótipos Figma.'),
('bullet','- <b>Planejamento e autonomia:</b> identifiquei a necessidade de um design system em um portal financeiro, defini motivações, etapas, entregáveis e prazos e apresentei a proposta ao time. Executei a fundação com validações da liderança de Design e alinhamento com desenvolvedores.'),
('bullet','- <b>Qualidade e pendências:</b> no SiGA, estruturei cenários de teste e relatos de bugs, documentando problemas de upload e estados de filtros. Apoiei a validação de interfaces e a clareza de conteúdo em jornadas de onboarding e formulários.'),
('bullet','- <b>Experiência em saúde:</b> conectei entrevistas com stakeholders, benchmark e diagnóstico de conteúdo à arquitetura de jornadas e templates de um portal para profissionais de saúde, com protótipos, validação de propostas e handoff.'),
('job','VML | Product Designer | janeiro de 2022 - setembro de 2024'),
('body','Traduzi necessidades de negócio e diretrizes visuais em interfaces e documentação para clientes internacionais.<br/><b>Clientes:</b> Danone North America e DLL / AGCO Finance.'),
('bullet','- <b>Consistência e execução:</b> criei 20+ componentes e templates responsivos para AEM, documentando uso e interações. Realizei revisão heurística e QA de acessibilidade, apoiando a qualidade das entregas e o alinhamento com desenvolvimento.'),
('bullet','- <b>Entendimento da operação:</b> desenhei um aplicativo B2B offline-first de simulação financeira, dando autonomia aos vendedores em campo e reduzindo a dependência do back-office nas negociações.'),
('job','BASE Digital | Product Designer | dezembro de 2020 - janeiro de 2022'),
('bullet','- Participei da concepção e entrega do portal Oncoclínicas em cinco meses, integrando conteúdo, telemedicina e agendamento. Criei a interface de fidelidade e gamificação do Clube Duratex.')]+common_end
research=[
('name','Maycon Douglas'),('role','UX DESIGNER | DISCOVERY E PESQUISA DE PRODUTO'),('contact',contact),
('heading','RESUMO'),
('body','Product Designer com mais de cinco anos de experiência em produtos digitais, incluindo soluções B2B e plataformas corporativas. Atuo em product discovery com entrevistas, surveys, testes de usabilidade e benchmark competitivo. Analiso dados qualitativos e quantitativos no Google Planilhas para identificar padrões e orientar recomendações de modernização, fluxos e jornadas. Tenho perfil investigativo e autonomia para documentar achados e comunicar recomendações a stakeholders e times técnicos.'),
('heading','HABILIDADES'),
('body','<b>Discovery e Pesquisa:</b> entrevistas qualitativas, surveys, testes de usabilidade com usuários, investigação de problemas, benchmark competitivo e diagnóstico de conteúdo.'),
('body','<b>Análise e Síntese:</b> organização e análise de resultados no Google Planilhas, síntese de relatos qualitativos, identificação de padrões, interpretação de indicadores e recomendações de evolução.'),
('body','<b>Modernização de Produtos:</b> arquitetura de informação, jornadas por perfil, fluxos de navegação, padrões de interação, revisão heurística e usabilidade.'),
('body','<b>Comunicação e Documentação:</b> síntese de aprendizados, apresentação de recomendações, registro de decisões e alinhamento com stakeholders e desenvolvimento.'),
('body','<b>Ferramentas e Processo:</b> Figma, FigJam, Google Planilhas, Jira e Azure DevOps; Scrum/Kanban; IA para exploração e documentação; Python/Playwright para inventários.'),
('heading','EXPERIÊNCIA PROFISSIONAL'),
('job','dti digital | Product Designer | setembro de 2024 - atual'),
('body','Investigo problemas em plataformas de saúde e serviços financeiros, aplicando surveys e testes com usuários e analisando resultados no Google Planilhas para apoiar decisões de produto.'),
('bullet','- <b>Pesquisa exploratória:</b> em um portal para profissionais de saúde, conduzi duas entrevistas com stakeholders e acompanhei outras duas. Investiguei processos de produção de conteúdo, desafios operacionais e expectativas para fundamentar decisões de design.'),
('bullet','- <b>Benchmark e síntese:</b> comparei portais internos e concorrentes e analisei conteúdo e navegação. Conectei os achados aos indicadores de uso do discovery para orientar organização por necessidade clínica, jornadas por especialidade e templates escaláveis.'),
('bullet','- <b>Oportunidades de modernização:</b> diagnostiquei inconsistências em um portal financeiro, inventariei padrões e automatizei o catálogo de páginas com Python e Playwright. Usei análise de competidores para priorizar o fluxo de consulta e análise de fundos.'),
('bullet','- <b>Recomendações e comunicação:</b> transformei diagnósticos em proposta com etapas e entregáveis, arquitetura, componentes e protótipos para discutir soluções. Documentei diretrizes e validei decisões com liderança de Design, stakeholders e desenvolvedores.'),
('job','VML | Product Designer | janeiro de 2022 - setembro de 2024'),
('body','Projetei experiências para clientes internacionais, considerando diferentes públicos, contextos de uso e restrições técnicas.<br/><b>Clientes:</b> DLL / AGCO Finance e Danone North America.'),
('bullet','- <b>Produtos B2B:</b> desenhei um aplicativo offline-first de simulação financeira para vendedores em campo, traduzindo necessidades da operação em fluxos que deram autonomia à força de vendas e reduziram dependências do back-office.'),
('bullet','- <b>Diagnóstico e qualidade:</b> contribuí para jornadas por público e criei 20+ componentes e templates para AEM. Realizei revisão heurística e QA; preparei referências para workshops e documentei padrões e decisões para implementação.'),
('job','BASE Digital | Product Designer | dezembro de 2020 - janeiro de 2022'),
('bullet','- Traduzi objetivos de fidelidade e segmentação de marketing na interface do Clube Duratex. Participei da concepção e entrega do portal Oncoclínicas, com jornadas de conteúdo, telemedicina e agendamento.')]+common_end
out=Path('output/pdf')
for stem,blocks,title in [('maycon-douglas-ux-ui-pleno-saude',saude,'Maycon Douglas - UX/UI Designer Pleno - Saúde'),('maycon-douglas-totvs-ux-research-pleno',research,'Maycon Douglas - UX Designer - Discovery e Pesquisa')]:
 doc=SimpleDocTemplate(str(out/f'{stem}.pdf'),pagesize=(595.28,841.89),leftMargin=36,rightMargin=36,topMargin=25,bottomMargin=25,title=title,author='Maycon Douglas')
 doc.build([Paragraph(t,styles[k]) for k,t in blocks])
 md=[]
 for k,t in blocks:
  t=re.sub(r'<link href="([^"]+)">([^<]+)</link>',r'[\2](\1)',t).replace('<b>','**').replace('</b>','**').replace('<br/>','\n')
  md.append(('# ' if k=='name' else '## ' if k=='heading' else '### ' if k=='job' else '')+t)
 (out/f'{stem}.md').write_text('\n\n'.join(md),encoding='utf-8')
