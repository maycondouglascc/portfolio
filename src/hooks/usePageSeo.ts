import { useEffect } from "react"
import { useLanguage } from "../context/LanguageContext"

interface PageSeoProps {
  title?: string
  description?: string
  ogImage?: string
  canonicalUrl?: string
}

export function usePageSeo({ title, description, ogImage, canonicalUrl }: PageSeoProps = {}) {
  const { language } = useLanguage()

  useEffect(() => {
    const baseTitle = "Maycon Douglas"
    const fullTitle = title ? `${title} — ${baseTitle}` : `${baseTitle} — Product Designer`
    document.title = fullTitle

    const defaultDesc =
      language === "pt"
        ? "Portfolio de Maycon Douglas, Product Designer com 8 anos de experiência em websites, aplicativos, SaaS e design systems."
        : "Portfolio of Maycon Douglas, Product Designer with 8 years of experience building scalable design systems, SaaS, and web applications."
    const metaDesc = description || defaultDesc

    let descTag = document.querySelector('meta[name="description"]')
    if (!descTag) {
      descTag = document.createElement("meta")
      descTag.setAttribute("name", "description")
      document.head.appendChild(descTag)
    }
    descTag.setAttribute("content", metaDesc)

    // OpenGraph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute("content", fullTitle)

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) ogDesc.setAttribute("content", metaDesc)

    // Twitter Title & Description
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute("content", fullTitle)

    const twitterDesc = document.querySelector('meta[name="twitter:description"]')
    if (twitterDesc) twitterDesc.setAttribute("content", metaDesc)

    if (ogImage) {
      const ogImg = document.querySelector('meta[property="og:image"]')
      if (ogImg) ogImg.setAttribute("content", ogImage)
      const twImg = document.querySelector('meta[name="twitter:image"]')
      if (twImg) twImg.setAttribute("content", ogImage)
    }

    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]')
      if (!canonical) {
        canonical = document.createElement("link")
        canonical.setAttribute("rel", "canonical")
        document.head.appendChild(canonical)
      }
      canonical.setAttribute("href", canonicalUrl)
    }
  }, [title, description, ogImage, canonicalUrl, language])
}
