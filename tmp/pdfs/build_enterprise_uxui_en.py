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
blocks=[
('name','Maycon Douglas'),
('role','UX/UI DESIGNER'),
('contact','Brazil | <link href="mailto:hi@maycondouglas.work">hi@maycondouglas.work</link><br/><link href="https://www.maycondouglas.work">Portfolio: maycondouglas.work</link> | <link href="https://www.linkedin.com/in/maycondouglascc">linkedin.com/in/maycondouglascc</link>'),
('heading','SUMMARY'),
('body','UX/UI Designer with 5+ years of experience in responsive websites and digital products for international clients. Advanced Figma proficiency, with experience in design systems, reusable components and enterprise CMS environments. Translate user needs and business objectives into high-fidelity interfaces, interactive prototypes and developer specifications, balancing usability, accessibility and technical feasibility.'),
('heading','SKILLS'),
('body','<b>UX/UI and Visual Design:</b> information architecture, user flows, wireframing, interaction design, interactive prototypes, high-fidelity mockups, responsive design and visual hierarchy.'),
('body','<b>Design Systems and Quality:</b> component libraries, design tokens, reusable patterns, accessibility reviews, heuristic evaluation, interface QA and usage documentation.'),
('body','<b>Enterprise Web and Delivery:</b> component-based design for Adobe Experience Manager (AEM), scalable page templates, developer handoff, interaction specifications and stakeholder alignment.'),
('body','<b>Tools and Technology:</b> Figma, FigJam, Storybook, Webflow, HTML, CSS, JavaScript and React. AI-assisted prototyping with Figma Make and Claude Code.'),
('heading','PROFESSIONAL EXPERIENCE'),
('job','dti digital | Product Designer | September 2024 - Present'),
('body','Design enterprise web experiences from discovery to handoff, collaborating with developers and stakeholders in financial services and healthcare.'),
('bullet','- <b>Design systems:</b> proposed and built the foundation of a financial portal design system, defining primitive and semantic tokens, reusable components and usage guidelines. Aligned naming conventions with developers and created a documented Storybook to support implementation and future expansion across brands.'),
('bullet','- <b>Prototyping and interaction:</b> built functional React prototypes with Figma Make and Claude Code to evaluate keyboard navigation, responsive layouts, filters and investment-fund tables. Automated page inventory to support analysis of existing patterns and inconsistencies.'),
('bullet','- <b>Information architecture:</b> used stakeholder interviews, benchmarking and content audits to inform healthcare portal navigation, audience-specific journeys and scalable templates. Produced high-fidelity Figma prototypes, validated proposals with stakeholders and documented content structures for authoring teams.'),
('job','VML (formerly Wunderman Thompson Technology)<br/>Product Designer | January 2022 - September 2024'),
('body','Translated visual direction and business requirements into technically feasible interfaces for international clients.<br/><b>Clients:</b> Danone North America and DLL / AGCO Finance.'),
('bullet','- <b>Enterprise CMS and responsive web:</b> created 20+ reusable components and responsive page templates for Danone North America in Figma, working within AEM constraints. Defined visual, interaction and accessibility guidelines, performed heuristic reviews and interface QA, and prepared developer specifications.'),
('bullet','- <b>Visual communication:</b> prepared moodboards and visual references for stakeholder workshops and translated an evolving brand identity into consistent digital interfaces. The overall redesign was associated with a year-over-year traffic increase of more than 150%.'),
('bullet','- <b>Digital products:</b> designed an offline-first financial simulation app for field sales teams, enabling independent simulations and reducing reliance on back-office staff during negotiations.'),
('job','BASE Digital | Product Designer | December 2020 - January 2022'),
('body','Designed interfaces for loyalty platforms and digital services, connecting business requirements and usability.<br/><b>Clients:</b> Duratex and Oncoclínicas.'),
('bullet','- Designed the Clube Duratex loyalty and gamification interface. Contributed to the conception and delivery of the Oncoclínicas portal in five months, bringing together specialist content, telemedicine and appointment-booking journeys.'),
('heading','COURSES AND CERTIFICATIONS'),
('body','Product Design - Design Circuit | Design System Specialist - Meiuca<br/>Interaction Design - Design Boost | Webflow Practitioner Certification'),
('heading','LANGUAGES'),
('body','Portuguese: Native | English: Professional working proficiency (B2).')]
out=Path('output/pdf');stem='maycon-douglas-ux-ui-designer-enterprise-en'
doc=SimpleDocTemplate(str(out/f'{stem}.pdf'),pagesize=(595.28,841.89),leftMargin=36,rightMargin=36,topMargin=25,bottomMargin=25,title='Maycon Douglas - UX/UI Designer',author='Maycon Douglas')
doc.build([Paragraph(t,styles[k]) for k,t in blocks])
md=[]
for k,t in blocks:
 t=re.sub(r'<link href="([^"]+)">([^<]+)</link>',r'[\2](\1)',t)
 t=t.replace('<b>','**').replace('</b>','**').replace('<br/>','\n')
 md.append(('# ' if k=='name' else '## ' if k=='heading' else '### ' if k=='job' else '')+t)
(out/f'{stem}.md').write_text('\n\n'.join(md),encoding='utf-8')
