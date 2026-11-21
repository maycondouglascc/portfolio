from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
pdfmetrics.registerFont(TTFont('Lato','/usr/share/fonts/truetype/lato/Lato-Regular.ttf'))
pdfmetrics.registerFont(TTFont('LatoBold','/usr/share/fonts/truetype/lato/Lato-Bold.ttf'))
pdfmetrics.registerFontFamily('Lato',normal='Lato',bold='LatoBold')
styles={
'name':ParagraphStyle('name',fontName='LatoBold',fontSize=25,leading=29,spaceAfter=3,textColor=HexColor('#142b39')),
'role':ParagraphStyle('role',fontName='LatoBold',fontSize=11,leading=14,spaceAfter=7),
'contact':ParagraphStyle('contact',fontName='Lato',fontSize=9.5,leading=13,spaceAfter=10),
'body':ParagraphStyle('body',fontName='Lato',fontSize=10.5,leading=14,spaceAfter=5),
'heading':ParagraphStyle('heading',fontName='LatoBold',fontSize=10.5,leading=14,spaceBefore=10,spaceAfter=5,textColor=HexColor('#245a70')),
'job':ParagraphStyle('job',fontName='LatoBold',fontSize=10.5,leading=14,spaceBefore=5,spaceAfter=4),
'bullet':ParagraphStyle('bullet',fontName='Lato',fontSize=10.2,leading=13.5,leftIndent=10,firstLineIndent=-8,spaceAfter=5)}
blocks=[
('name','Maycon Douglas'),
('role','PRODUCT DESIGNER | UX/UI'),
('contact','<link href="https://www.maycondouglas.work">Portfólio: maycondouglas.work</link> | <link href="https://www.linkedin.com/in/maycondouglascc">linkedin.com/in/maycondouglascc</link><br/><link href="mailto:hi@maycondouglas.work">hi@maycondouglas.work</link>'),
('heading','RESUMO PROFISSIONAL'),
('body','Product Designer com mais de cinco anos de experiência em produtos digitais para serviços financeiros, saúde e marcas globais. Atuo do discovery ao handoff, conectando pesquisa exploratória, arquitetura de informação e interfaces de alta fidelidade. Combino design systems, colaboração com Engenharia e prototipação em código com IA para simplificar experiências complexas e acelerar a execução.'),
('heading','EXPERIÊNCIA PROFISSIONAL'),
('job','dti digital | Product Designer | setembro de 2024 - atual'),
('bullet','- <b>Thrivent Asset Management:</b> identifiquei uma necessidade fora do roadmap e conduzi a fundação do design system de um portal financeiro em quatro semanas. Defini escopo, tokens e componentes com validações da liderança de Design e alinhamento com desenvolvedores.'),
('bullet','- Automatizei o inventário de mais de 300 páginas com Python e Playwright, concluindo em uma hora uma etapa estimada em sete dias. Prototipei fluxos de análise de fundos em React com Figma Make e Claude Code, verificando filtros, responsividade e navegação por teclado; entreguei Storybook e documentação de uso.'),
('bullet','- <b>GSK Pro México:</b> apliquei entrevistas com stakeholders, benchmark e diagnóstico de conteúdo à arquitetura de informação e protótipos no Figma. Contribuí para sete jornadas por especialidade e mais de dez templates, com validação de propostas e handoff.'),
('bullet','- Criei agentes de IA na WPP Imagine para estruturar conteúdo científico. A solução foi adotada pelo time e reduziu em 80% o tempo de produção de conteúdo.'),
('job','VML (anteriormente Wunderman Thompson Technology)<br/>Product Designer | janeiro de 2022 - setembro de 2024'),
('bullet','- <b>DLL / AGCO Finance:</b> projetei interfaces para simulações financeiras em um aplicativo B2B offline-first. A solução deu autonomia à força de vendas em campo, eliminou a dependência dos formalizadores e acelerou o ciclo de negociação.'),
('bullet','- <b>Danone North America:</b> criei mais de 20 componentes e templates responsivos no Figma para AEM, com revisão heurística, QA de acessibilidade e especificações para desenvolvimento. O redesign foi acompanhado por aumento de tráfego superior a 150% em relação ao ano anterior.'),
('job','BASE Digital | Product Designer | dezembro de 2020 - janeiro de 2022'),
('bullet','- <b>Duratex:</b> desenhei a interface do Clube Duratex, conectando uma experiência de fidelidade e gamificação para marceneiros a necessidades de segmentação de marketing.'),
('bullet','- <b>Oncoclínicas:</b> participei da concepção e entrega do portal em cinco meses, integrando conteúdo especializado e jornadas de telemedicina e agendamento.'),
('heading','COMPETÊNCIAS E FERRAMENTAS'),
('body','<b>UX/UI:</b> discovery, pesquisa exploratória, arquitetura de informação, jornadas, prototipação de alta fidelidade, design systems, revisão heurística e handoff.<br/><b>Ferramentas e tecnologia:</b> Figma, FigJam, Figma Make, Claude Code, HTML, CSS, JavaScript, React e Webflow.'),
('heading','CURSOS E CERTIFICAÇÕES'),
('body','Design Circuit - Product Design | Meiuca - Design System Specialist<br/>Design Boost - Design de Interação | Webflow Practitioner Certification'),
('heading','IDIOMAS'),
('body','Português nativo | Inglês profissional (B2).')]
out=Path('output/pdf')
doc=SimpleDocTemplate(str(out/'maycon-douglas-product-designer.pdf'),pagesize=(595.28,841.89),leftMargin=40,rightMargin=40,topMargin=30,bottomMargin=30,title='Maycon Douglas - Product Designer',author='Maycon Douglas')
doc.build([Paragraph(text,styles[k]) for k,text in blocks])
import re
md=[]
for k,t in blocks:
 t=re.sub(r'<link href="([^"]+)">([^<]+)</link>',r'[\2](\1)',t)
 t=t.replace('<b>','**').replace('</b>','**').replace('<br/>','\n')
 md.append(('# ' if k=='name' else '## ' if k=='heading' else '### ' if k=='job' else '')+t)
(out/'maycon-douglas-product-designer.md').write_text('\n\n'.join(md),encoding='utf-8')
