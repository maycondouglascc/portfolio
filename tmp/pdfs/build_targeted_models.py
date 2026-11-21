from pathlib import Path
src=Path('tmp/pdfs/build_base.py').read_text()
# Reuse the approved base layout and content; specialize only the positioning.
prefix=src[:src.index("out=Path('output/pdf')")]
ns={}
exec(prefix,ns)
base=ns['blocks']
for k in ['body','bullet']:
 ns['styles'][k].leading=11.5
 ns['styles'][k].spaceAfter=2
ns['styles']['heading'].spaceBefore=5
ns['styles']['job'].spaceBefore=4
variants={
'bling':{
'summary':'Product Designer com mais de cinco anos de experiência em produtos digitais, incluindo soluções financeiras B2B e jornadas para múltiplos perfis de usuário. Atuo do discovery ao handoff, com autonomia para identificar oportunidades, propor soluções e executar interfaces de alta fidelidade. Combino visão sistêmica, design systems e colaboração com Engenharia para simplificar experiências complexas. Uso IA e vibecoding com Figma Make e Claude Code para acelerar prototipação, iteração e entrega.',
'skills':[
'<b>Product Design e UX/UI:</b> design de ponta a ponta, discovery, pesquisa exploratória, arquitetura de informação, jornadas para múltiplos perfis e protótipos de alta fidelidade.',
'<b>Design Systems e Visão Sistêmica:</b> tokens, componentes reutilizáveis, documentação, consistência entre fluxos, revisão crítica de interfaces, acessibilidade e QA.',
'<b>Autonomia e Colaboração:</b> identificação de oportunidades, definição de escopo e prioridades, alinhamento com stakeholders, viabilidade técnica e handoff para Engenharia.',
'<b>IA e Vibecoding:</b> prototipação funcional e iteração com Figma Make, Claude Code e React; agentes na WPP Imagine; automação de inventários com Python e Playwright.',
'<b>Ferramentas e Tecnologia:</b> Figma, FigJam, Storybook, HTML, CSS, JavaScript e Webflow.'
],
'dti':'Conduzo iniciativas de UX/UI e design systems em plataformas internacionais, do discovery ao handoff, conectando necessidades dos usuários, objetivos de negócio e restrições técnicas.',
'dti_bullets':[
'- <b>Autonomia e consistência do ecossistema:</b> identifiquei uma necessidade fora do roadmap e entreguei a fundação do design system de um portal financeiro em quatro semanas, com escopo, tokens e componentes alinhados à liderança de Design e aos desenvolvedores.',
'- <b>Execução com IA e prototipação:</b> usei Figma Make, Claude Code e React para iterar fluxos de análise de fundos, verificando filtros, responsividade e teclado. Entreguei Storybook e automatizei o inventário de 300+ páginas, de sete dias estimados para uma hora.',
'- <b>Pesquisa aplicada e eficiência:</b> conectei entrevistas, benchmark e diagnóstico de conteúdo à arquitetura de sete jornadas e 10+ templates no GSK Pro México. Criei agentes de IA adotados pelo time, reduzindo em 80% o tempo de produção de conteúdo.'
],
'vml':'Projetei interfaces para operações comerciais e portais internacionais, equilibrando diferentes contextos de uso, consistência visual e viabilidade de implementação.',
'vml_bullets':[
'- <b>Produtos financeiros B2B:</b> desenhei um aplicativo de simulação financeira offline-first para vendedores em campo, dando autonomia à força de vendas, eliminando a dependência dos formalizadores e acelerando o ciclo de negociação.',
'- <b>Escalabilidade e qualidade:</b> criei 20+ componentes e templates responsivos para AEM, com revisão heurística, QA e especificações. O redesign da Danone foi acompanhado por aumento de tráfego superior a 150% ante o ano anterior.'
]},
'product-designer-pleno':{
'summary':'Product Designer (UX/UI) com mais de cinco anos de experiência em produtos digitais, incluindo soluções financeiras e plataformas de saúde. Atuo da pesquisa exploratória e discovery à prototipação, validação com stakeholders e handoff. Conecto evidências qualitativas e indicadores de uso a decisões de arquitetura, interação e interface. Com domínio de Figma, pensamento analítico e colaboração com Engenharia, equilibro necessidades dos usuários, objetivos de negócio e viabilidade técnica.',
'skills':[
'<b>Pesquisa e Análise:</b> pesquisa qualitativa exploratória, entrevistas com stakeholders, benchmark, diagnóstico de conteúdo e interpretação de indicadores de uso.',
'<b>UX/UI e Prototipação:</b> design centrado no usuário, arquitetura de informação, jornadas, fluxos, protótipos de alta fidelidade, usabilidade e validação com stakeholders.',
'<b>Consistência e Qualidade:</b> design systems, componentes, tokens, revisão heurística, acessibilidade, responsividade e QA de interfaces.',
'<b>Colaboração e Delivery:</b> planejamento de escopo e prazos, comunicação fundamentada de decisões, alinhamento com desenvolvedores, especificações e handoff.',
'<b>Ferramentas e Tecnologia:</b> Figma, FigJam, Figma Make, Claude Code, HTML, CSS, JavaScript, React e Webflow.'
],
'dti':'Atuo no ciclo de design de plataformas internacionais, estruturando problemas, fundamentando propostas e documentando soluções em parceria com Design, stakeholders e desenvolvimento.',
'dti_bullets':[
'- <b>Pesquisa e decisões fundamentadas:</b> realizei entrevistas com stakeholders, benchmark e diagnóstico de conteúdo no GSK Pro México. Conectei achados a indicadores do discovery, incluindo 62% de dificuldade para localizar informações, para orientar propostas de navegação.',
'- <b>Arquitetura e prototipação:</b> contribuí para sete jornadas por especialidade e 10+ templates, criando protótipos de alta fidelidade no Figma, validando propostas com stakeholders e preparando documentação para handoff.',
'- <b>Autonomia e entrega técnica:</b> planejei e entreguei a fundação de um design system financeiro em quatro semanas, com tokens, componentes e Storybook alinhados a desenvolvedores. Verifiquei filtros, responsividade e navegação por teclado em protótipos React.'
],
'vml':'Projetei interfaces para clientes internacionais, traduzindo necessidades de negócio em fluxos e componentes claros, com documentação e revisão de qualidade para desenvolvimento.',
'vml_bullets':[
'- <b>Experiência financeira:</b> desenhei interfaces de simulação financeira em um aplicativo B2B offline-first, considerando o contexto de uso em campo para dar autonomia aos vendedores e reduzir fricções na negociação.',
'- <b>Usabilidade e consistência:</b> criei 20+ componentes e templates responsivos no Figma para AEM, com revisão heurística, QA de acessibilidade e especificações de interação. O redesign da Danone foi acompanhado por aumento de tráfego superior a 150% ante o ano anterior.'
]}}
from reportlab.platypus import SimpleDocTemplate,Paragraph
import re
for key,v in variants.items():
 blocks=[];section='';job='';bi=0;si=0
 for kind,text in base:
  if kind=='heading': section=text
  if kind=='job':
   job='dti' if text.startswith('dti') else 'vml' if text.startswith('VML') else 'base';bi=0
  if section=='RESUMO' and kind=='body': text=v['summary']
  if section=='HABILIDADES' and kind=='body': text=v['skills'][si];si+=1
  if section=='EXPERIÊNCIA PROFISSIONAL' and job in ['dti','vml']:
   if kind=='body': text=v[job]+'<br/>'+text.split('<br/>')[1]
   if kind=='bullet':
    if bi>=len(v[job+'_bullets']): continue
    text=v[job+'_bullets'][bi];bi+=1
  blocks.append((kind,text))
 out=Path('output/pdf');path=out/f'maycon-douglas-{key}.pdf'
 doc=SimpleDocTemplate(str(path),pagesize=(595.28,841.89),leftMargin=36,rightMargin=36,topMargin=25,bottomMargin=25,title='Maycon Douglas - Product Designer'+(' - Bling' if key=='bling' else ' - UX/UI Pleno'),author='Maycon Douglas')
 doc.build([Paragraph(t,ns['styles'][k]) for k,t in blocks])
 md=[]
 for k,t in blocks:
  t=re.sub(r'<link href="([^"]+)">([^<]+)</link>',r'[\2](\1)',t)
  t=t.replace('<b>','**').replace('</b>','**').replace('<br/>','\n')
  md.append(('# ' if k=='name' else '## ' if k=='heading' else '### ' if k=='job' else '')+t)
 (out/f'maycon-douglas-{key}.md').write_text('\n\n'.join(md))
