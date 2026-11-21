from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph
import re
ns={}
src=Path('tmp/pdfs/build_base.py').read_text()
exec(src[:src.index('blocks=[')],ns)
styles=ns['styles']
for k in ['body','bullet']:
 styles[k].leading=11.5
 styles[k].spaceAfter=2.5
contact='<link href="mailto:hi@maycondouglas.work">hi@maycondouglas.work</link> | <link href="https://www.maycondouglas.work">Portfolio: maycondouglas.work</link><br/>Brazil | <link href="https://www.linkedin.com/in/maycondouglascc">linkedin.com/in/maycondouglascc</link>'
tripwai=[
('name','Maycon Douglas'),('role','PRODUCT DESIGNER | UX/UI'),('contact',contact.replace('Portfolio:','Portfólio:').replace('Brazil','Brasil')),
('heading','RESUMO'),
('body','Product Designer com mais de cinco anos de experiência em produtos web e aplicativos. Transformo problemas de navegação e operação em jornadas claras, interfaces de alta fidelidade e protótipos funcionais. Combino pesquisa exploratória, indicadores de uso e UI para fundamentar decisões, com autonomia para identificar oportunidades e conduzir soluções. Uso IA no trabalho diário para prototipar em código e acelerar a execução, conectando design, negócio e desenvolvimento.'),
('heading','HABILIDADES'),
('body','<b>UX/UI e Jornadas:</b> discovery, arquitetura de informação, fluxos, hierarquia visual, prototipação de alta fidelidade, design responsivo, revisão heurística e acessibilidade.'),
('body','<b>Pesquisa e Dados:</b> entrevistas com stakeholders, benchmark, diagnóstico de conteúdo e interpretação de indicadores de uso para identificar fricções e orientar propostas.'),
('body','<b>IA e Prototipação Funcional:</b> Figma Make, Claude Code e React para explorar navegação e interações reais; agentes para estruturação de conteúdo e automação de inventários.'),
('body','<b>Consistência e Delivery:</b> design systems, componentes reutilizáveis, tokens, especificações de interação, QA de interfaces e handoff para desenvolvimento.'),
('body','<b>Ferramentas e Tecnologia:</b> Figma avançado, FigJam, Storybook, Webflow, HTML, CSS e JavaScript.'),
('heading','EXPERIÊNCIA PROFISSIONAL'),
('job','dti digital | Product Designer | setembro de 2024 - atual'),
('body','Atuo do discovery ao handoff em plataformas financeiras e de saúde, alinhando necessidades dos usuários, objetivos de negócio e viabilidade técnica com stakeholders e desenvolvedores.'),
('bullet','- <b>Autonomia e resolução de problemas:</b> identifiquei inconsistências em um portal financeiro fora do roadmap e propus uma iniciativa de design system. Defini escopo, prioridades e entregáveis e executei a fundação como único designer, com validações da liderança e alinhamento técnico.'),
('bullet','- <b>Da interface ao protótipo navegável:</b> usei Figma Make, Claude Code e React para explorar fluxos de análise de fundos, filtros e tabelas. Verifiquei responsividade e navegação por teclado e documentei componentes e interações em Storybook.'),
('bullet','- <b>Decisões apoiadas em evidências:</b> conectei entrevistas, benchmark e indicadores do discovery a propostas de arquitetura e jornadas por perfil em um portal de saúde. Transformei os achados em protótipos de alta fidelidade, validei com stakeholders e preparei o handoff.'),
('bullet','- <b>IA aplicada à execução:</b> criei agentes para estruturar conteúdo científico, adotados pela equipe, e automatizei o inventário de páginas para acelerar a análise de padrões e inconsistências.'),
('job','VML | Product Designer | janeiro de 2022 - setembro de 2024'),
('body','Projetei interfaces para clientes internacionais, traduzindo necessidades de negócio em soluções visuais e especificações para desenvolvimento.<br/><b>Clientes:</b> Danone North America e DLL / AGCO Finance.'),
('bullet','- <b>Jornadas e autonomia do usuário:</b> desenhei um aplicativo offline-first de simulação financeira para vendedores em campo, eliminando a dependência dos formalizadores e acelerando o ciclo de negociação.'),
('bullet','- <b>UI, consistência e resultado:</b> criei 20+ componentes e templates responsivos para AEM, com revisão heurística, QA e especificações. O redesign da Danone foi acompanhado por aumento de tráfego superior a 150% em relação ao ano anterior.'),
('job','BASE Digital | Product Designer | dezembro de 2020 - janeiro de 2022'),
('body','Desenhei interfaces para plataformas de relacionamento e serviços digitais.<br/><b>Clientes:</b> Duratex e Oncoclínicas.'),
('bullet','- Criei a interface de fidelidade e gamificação do Clube Duratex. Participei da concepção e entrega do portal Oncoclínicas em cinco meses, integrando conteúdo, telemedicina e agendamento.'),
('heading','CURSOS E CERTIFICAÇÕES'),
('body','Design Circuit - Product Design | Meiuca - Design System Specialist<br/>Design Boost - Design de Interação | Webflow Practitioner Certification'),
('heading','IDIOMAS'),('body','Português nativo | Inglês profissional (B2).')]
health=[
('name','Maycon Douglas'),('role','UX DESIGNER | UX/UI & DESIGN SYSTEMS'),('contact',contact),
('heading','SUMMARY'),
('body','UX/UI Designer with 5+ years of experience across healthcare, financial services and enterprise web platforms. Translate complex requirements into clear user flows, high-fidelity Figma designs and developer-ready specifications. Experienced in reusable components, design systems and functional React prototypes, with a focus on usability, accessibility and implementation feasibility. Work independently while aligning decisions with design leads, developers and stakeholders.'),
('heading','SKILLS'),
('body','<b>UX/UI Design:</b> information architecture, user flows, wireframing, interaction design, responsive layouts, interactive prototypes and high-fidelity Figma mockups.'),
('body','<b>Design Systems:</b> reusable components, primitive and semantic tokens, interaction patterns, library documentation and extending shared foundations across interfaces.'),
('body','<b>Developer Handoff and Quality:</b> implementation specifications, usage guidelines, heuristic reviews, accessibility reviews, responsive QA and keyboard-navigation checks.'),
('body','<b>Research and Collaboration:</b> stakeholder interviews, benchmarking, content audits, design rationale, scope definition, prioritization and alignment with front-end developers.'),
('body','<b>Tools and Technology:</b> advanced Figma, FigJam, React.js, Storybook, HTML, CSS, JavaScript, Figma Make and Claude Code.'),
('heading','PROFESSIONAL EXPERIENCE'),
('job','dti digital | Product Designer | September 2024 - Present'),
('body','Design healthcare and financial web experiences from discovery to handoff, collaborating with design leads, developers and stakeholders to deliver consistent, technically feasible interfaces.'),
('bullet','- <b>Reusable foundations:</b> audited an existing financial portal, identified inconsistencies and proposed a design system initiative. As the sole designer, defined scope and priorities with design-lead reviews, created tokens and base components, aligned naming with developers and delivered a documented Storybook.'),
('bullet','- <b>React-based prototyping:</b> built functional prototypes for investment-fund workflows using React, Figma Make and Claude Code. Evaluated filters, tables, responsive behavior and keyboard navigation to clarify interactions beyond static mockups.'),
('bullet','- <b>Healthcare UX:</b> used stakeholder interviews, benchmarking and content audits to inform navigation and specialty-specific journeys for healthcare professionals. Created scalable page templates and high-fidelity Figma prototypes, validated proposals with stakeholders and documented structures for authoring teams.'),
('job','VML (formerly Wunderman Thompson Technology)<br/>Product Designer | January 2022 - September 2024'),
('body','Designed interfaces for international clients, balancing business requirements, visual consistency and platform constraints.<br/><b>Clients:</b> Danone North America and DLL / AGCO Finance.'),
('bullet','- <b>Component-based delivery:</b> created 20+ reusable components and responsive templates in Figma for an AEM website. Defined interaction and accessibility guidelines, performed heuristic reviews and interface QA, and prepared implementation specifications with developers.'),
('bullet','- <b>Complex workflows:</b> designed an offline-first financial simulation app for field sales teams, enabling independent simulations and removing reliance on back-office staff during negotiations.'),
('job','BASE Digital | Product Designer | December 2020 - January 2022'),
('body','Designed digital-service and loyalty interfaces for Oncoclínicas and Duratex.'),
('bullet','- <b>Healthcare services:</b> contributed to the conception and delivery of the Oncoclínicas portal in five months, bringing together specialist content, telemedicine and appointment-booking journeys. Designed the Clube Duratex loyalty and gamification interface.'),
('heading','COURSES AND CERTIFICATIONS'),
('body','Product Design - Design Circuit | Design System Specialist - Meiuca<br/>Interaction Design - Design Boost | Webflow Practitioner Certification'),
('heading','LANGUAGES'),('body','Portuguese: Native | English: Professional working proficiency (B2).')]
out=Path('output/pdf')
for stem,blocks,title in [
('maycon-douglas-tripwai-product-designer',tripwai,'Maycon Douglas - Product Designer - Tripwai'),
('maycon-douglas-healthcare-ux-designer-en',health,'Maycon Douglas - UX Designer - Healthcare')]:
 doc=SimpleDocTemplate(str(out/f'{stem}.pdf'),pagesize=(595.28,841.89),leftMargin=36,rightMargin=36,topMargin=25,bottomMargin=25,title=title,author='Maycon Douglas')
 doc.build([Paragraph(t,styles[k]) for k,t in blocks])
 md=[]
 for k,t in blocks:
  t=re.sub(r'<link href="([^"]+)">([^<]+)</link>',r'[\2](\1)',t)
  t=t.replace('<b>','**').replace('</b>','**').replace('<br/>','\n')
  md.append(('# ' if k=='name' else '## ' if k=='heading' else '### ' if k=='job' else '')+t)
 (out/f'{stem}.md').write_text('\n\n'.join(md),encoding='utf-8')
