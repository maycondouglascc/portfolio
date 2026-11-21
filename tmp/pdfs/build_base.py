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
'body':ParagraphStyle('body',fontName='Lato',fontSize=10,leading=12,spaceAfter=3),
'heading':ParagraphStyle('heading',fontName='LatoBold',fontSize=10.5,leading=14,spaceBefore=6,spaceAfter=3,textColor=HexColor('#245a70')),
'job':ParagraphStyle('job',fontName='LatoBold',fontSize=10.5,leading=14,spaceBefore=5,spaceAfter=3),
'bullet':ParagraphStyle('bullet',fontName='Lato',fontSize=10,leading=12,leftIndent=10,firstLineIndent=-8,spaceAfter=3)}
blocks=[
('name','Maycon Douglas'),
('role','PRODUCT DESIGNER | UX/UI'),
('contact','<link href="mailto:hi@maycondouglas.work">hi@maycondouglas.work</link> | <link href="https://www.maycondouglas.work">maycondouglas.work</link><br/><link href="https://www.linkedin.com/in/maycondouglascc">linkedin.com/in/maycondouglascc</link>'),
('heading','RESUMO'),
('body','Product Designer com mais de cinco anos de experiência em soluções financeiras B2B e plataformas de saúde e conteúdo. Atuo do discovery ao handoff, conectando pesquisa, arquitetura de informação, UX/UI e design systems. Colaboro com desenvolvedores e stakeholders para equilibrar usabilidade, negócio e viabilidade técnica, com IA e prototipação em código.'),
('heading','HABILIDADES'),
('body','<b>Product Design e UX/UI:</b> discovery, entrevistas com stakeholders, benchmark, arquitetura de informação, jornadas, fluxos de navegação e protótipos de alta fidelidade.'),
('body','<b>Design Systems e Qualidade:</b> bibliotecas de componentes, design tokens, documentação, revisão heurística, acessibilidade, responsividade e QA de interfaces.'),
('body','<b>Colaboração e Delivery:</b> definição de escopo e prioridades, alinhamento com stakeholders, comunicação de decisões de design e handoff para desenvolvimento.'),
('body','<b>IA aplicada ao Design:</b> agentes para estruturação de conteúdo, automação de inventários e prototipação funcional com Figma Make, Claude Code e WPP Imagine.'),
('body','<b>Ferramentas e Tecnologia:</b> Figma, FigJam, Storybook, Webflow, HTML, CSS, JavaScript e React.'),
('heading','EXPERIÊNCIA PROFISSIONAL'),
('job','dti digital | Product Designer | setembro de 2024 - atual'),
('body','Atuo do discovery ao handoff em plataformas internacionais, conduzindo iniciativas de UX/UI e design systems em parceria com Design e desenvolvimento.<br/><b>Clientes:</b> Thrivent Asset Management e GSK.'),
('bullet','- <b>Design systems e visão sistêmica:</b> propus e entreguei a fundação do design system de um portal financeiro em quatro semanas, com tokens, componentes e Storybook. Validei interações em protótipos React e automatizei o inventário de 300+ páginas, de sete dias estimados para uma hora.'),
('bullet','- <b>Pesquisa e arquitetura de informação:</b> conectei entrevistas com stakeholders, benchmark e diagnóstico de conteúdo a propostas de navegação e protótipos. Contribuí para sete jornadas e 10+ templates no GSK Pro México.'),
('bullet','- <b>IA e eficiência operacional:</b> desenvolvi agentes para estruturar conteúdo científico, adotados pelo time, com redução de 80% no tempo de produção de conteúdo.'),
('job','VML | Product Designer | janeiro de 2022 - setembro de 2024'),
('body','Projetei interfaces para clientes internacionais, da concepção visual à documentação e revisão de qualidade, considerando públicos e restrições técnicas.<br/><b>Clientes:</b> Danone North America e DLL / AGCO Finance.'),
('bullet','- <b>Produtos financeiros B2B:</b> desenhei um aplicativo offline-first para simulações financeiras em campo, dando autonomia à força de vendas e eliminando a dependência dos formalizadores nas negociações.'),
('bullet','- <b>Escalabilidade e usabilidade:</b> criei 20+ componentes e templates responsivos para AEM, com revisão heurística, QA e especificações de interação. O redesign da Danone foi acompanhado por aumento de tráfego superior a 150% ante o ano anterior.'),
('job','BASE Digital | Product Designer | dezembro de 2020 - janeiro de 2022'),
('body','Desenhei interfaces para plataformas de relacionamento e serviços digitais, conectando necessidades de negócio e experiência do usuário.<br/><b>Clientes:</b> Duratex e Oncoclínicas.'),
('bullet','- Criei a interface de fidelidade e gamificação do Clube Duratex. Participei da concepção e entrega do portal Oncoclínicas em cinco meses, integrando conteúdo, telemedicina e agendamento.'),
('heading','CURSOS E CERTIFICAÇÕES'),
('body','Design Circuit - Product Design | Meiuca - Design System Specialist<br/>Design Boost - Design de Interação | Webflow Practitioner Certification'),
('heading','IDIOMAS'),
('body','Português nativo | Inglês profissional (B2).')]
out=Path('output/pdf')
doc=SimpleDocTemplate(str(out/'maycon-douglas-product-designer.pdf'),pagesize=(595.28,841.89),leftMargin=36,rightMargin=36,topMargin=25,bottomMargin=25,title='Maycon Douglas - Product Designer',author='Maycon Douglas')
doc.build([Paragraph(text,styles[k]) for k,text in blocks])
import re
md=[]
for k,t in blocks:
 t=re.sub(r'<link href="([^"]+)">([^<]+)</link>',r'[\2](\1)',t)
 t=t.replace('<b>','**').replace('</b>','**').replace('<br/>','\n')
 md.append(('# ' if k=='name' else '## ' if k=='heading' else '### ' if k=='job' else '')+t)
(out/'maycon-douglas-product-designer.md').write_text('\n\n'.join(md),encoding='utf-8')
