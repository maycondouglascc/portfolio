import type { Language } from '../context/LanguageContext'

export interface Experience {
  company: string
  role: string
  period: string
}

type LocalizedText = Record<Language, string>

type LocalizedExperience = {
  company: string
  role: LocalizedText
  period: LocalizedText
}

const experienceCatalog: LocalizedExperience[] = [
  {
    company: 'dti digital',
    role: {
      en: 'Product Designer',
      pt: 'Product Designer',
    },
    period: {
      en: 'Current',
      pt: 'Atual',
    },
  },
  {
    company: 'Wunderman Thompson',
    role: {
      en: 'Product Designer',
      pt: 'Product Designer',
    },
    period: {
      en: '2022-23',
      pt: '2022-23',
    },
  },
  {
    company: 'BASE',
    role: {
      en: 'UI Designer',
      pt: 'UI Designer',
    },
    period: {
      en: '2020-22',
      pt: '2020-22',
    },
  },
  {
    company: 'Ôpa!',
    role: {
      en: 'Art Director',
      pt: 'Diretor de Arte',
    },
    period: {
      en: '2018-20',
      pt: '2018-20',
    },
  },
]

export function getExperience(language: Language): Experience[] {
  return experienceCatalog.map((item) => ({
    company: item.company,
    role: item.role[language],
    period: item.period[language],
  }))
}
