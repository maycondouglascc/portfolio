import { parseMDX } from "@tinacms/mdx"
import type { RichTextType } from "@tinacms/schema-tools"
import { client } from "../../tina/__generated__/client"
import type { Language } from "../context/LanguageContext"

export type Project = {
  slug: string
  title: string
  description: string
  thumbnail: string
  hoverLottie?: string | null
  hasCaseStudy: boolean
  sortOrder?: number | null
}

export type Experience = {
  company: string
  role: string
  period: string
  sortOrder?: number | null
}

export type CaseStudy = {
  title: string
  description: string
  role: string
  goal: string
  slug: string
  externalHref?: string | null
  hideOtherProjects?: boolean | null
  body: unknown
}

export type HomeContent = {
  greeting: string
  bioHtml: string
  resumeLabel: string
  profilePic: string
  resumePdf: string
}

type Sortable = { sortOrder?: number | null }

const caseStudyBodyField: RichTextType = {
  name: "body",
  label: "Body",
  type: "rich-text",
  isBody: true,
  templates: [
    {
      name: "Metrics",
      label: "Metrics",
      fields: [
        { name: "id", label: "Anchor ID", type: "string" },
        { name: "label", label: "Label", type: "string" },
        {
          name: "layout",
          label: "Layout",
          type: "string",
          options: [
            { label: "Horizontal", value: "horizontal" },
            { label: "Vertical", value: "vertical" },
          ],
        },
        { name: "disclaimer", label: "Disclaimer", type: "string" },
        {
          name: "items",
          label: "Items",
          type: "object",
          list: true,
          fields: [
            {
              name: "variant",
              label: "Variant",
              type: "string",
              options: [
                { label: "Positive", value: "positive" },
                { label: "Negative", value: "negative" },
                { label: "Neutral", value: "neutral" },
              ],
            },
            { name: "title", label: "Title", type: "string" },
            {
              name: "description",
              label: "Description",
              type: "string",
              ui: { component: "textarea" },
            },
          ],
        },
      ],
    },
    {
      name: "Problems",
      label: "Problems",
      fields: [
        { name: "id", label: "Anchor ID", type: "string" },
        { name: "title", label: "Title", type: "string", required: true },
        {
          name: "intro",
          label: "Intro",
          type: "string",
          ui: { component: "textarea" },
        },
        {
          name: "items",
          label: "Items",
          type: "object",
          list: true,
          fields: [
            {
              name: "variant",
              label: "Variant",
              type: "string",
              options: [
                { label: "Positive", value: "positive" },
                { label: "Negative", value: "negative" },
                { label: "Neutral", value: "neutral" },
              ],
            },
            { name: "title", label: "Title", type: "string" },
            {
              name: "description",
              label: "Description",
              type: "string",
              ui: { component: "textarea" },
            },
          ],
        },
      ],
    },
    {
      name: "Results",
      label: "Results",
      fields: [
        { name: "id", label: "Anchor ID", type: "string" },
        { name: "title", label: "Title", type: "string", required: true },
        {
          name: "intro",
          label: "Intro",
          type: "string",
          ui: { component: "textarea" },
        },
        { name: "disclaimer", label: "Disclaimer", type: "string" },
        {
          name: "items",
          label: "Items",
          type: "object",
          list: true,
          fields: [
            {
              name: "variant",
              label: "Variant",
              type: "string",
              options: [
                { label: "Positive", value: "positive" },
                { label: "Negative", value: "negative" },
                { label: "Neutral", value: "neutral" },
              ],
            },
            { name: "title", label: "Title", type: "string" },
            {
              name: "description",
              label: "Description",
              type: "string",
              ui: { component: "textarea" },
            },
          ],
        },
      ],
    },
    {
      name: "CaseImage",
      label: "Case Image",
      fields: [
        { name: "id", label: "Anchor ID", type: "string" },
        { name: "src", label: "Image", type: "image", required: true },
        { name: "alt", label: "Alt text", type: "string", required: true },
        { name: "priority", label: "Priority", type: "boolean" },
        { name: "rounded", label: "Rounded", type: "boolean" },
      ],
    },
    {
      name: "ImageStack",
      label: "Image Stack",
      fields: [
        { name: "id", label: "Anchor ID", type: "string" },
        {
          name: "images",
          label: "Images",
          type: "object",
          list: true,
          fields: [
            { name: "src", label: "Image", type: "image", required: true },
            { name: "alt", label: "Alt text", type: "string", required: true },
          ],
        },
      ],
    },
    {
      name: "ImageGrid",
      label: "Image Grid",
      fields: [
        { name: "id", label: "Anchor ID", type: "string" },
        {
          name: "images",
          label: "Images",
          type: "object",
          list: true,
          fields: [
            { name: "src", label: "Image", type: "image", required: true },
            { name: "alt", label: "Alt text", type: "string", required: true },
          ],
        },
      ],
    },
  ],
}

function normalizeCaseStudyBody(body: unknown) {
  if (typeof body !== "string") {
    return body
  }

  try {
    return parseMDX(body, caseStudyBodyField, (src) => src)
  } catch (e) {
    console.error("parseMDX error:", e)
    return body
  }
}

function sortByOrder<T extends Sortable>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const aOrder = typeof a.sortOrder === "number" ? a.sortOrder : Number.MAX_SAFE_INTEGER
    const bOrder = typeof b.sortOrder === "number" ? b.sortOrder : Number.MAX_SAFE_INTEGER
    return aOrder - bOrder
  })
}

function pickLocalizedText(language: Language, en?: string | null, pt?: string | null) {
  return language === "pt" ? pt ?? "" : en ?? ""
}

export async function getProjects(language: Language): Promise<Project[]> {
  const response = await client.queries.projectsConnection()
  const nodes =
    response.data.projectsConnection.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean) ?? []

  const mapped = nodes
    .filter((item) => !item?.draft)
    .map((item) => ({
      slug: item?.slug ?? "",
      title: pickLocalizedText(language, item?.title_en, item?.title_pt),
      description: pickLocalizedText(language, item?.description_en, item?.description_pt),
      thumbnail: item?.thumbnail ?? "",
      hoverLottie: item?.hoverLottie ?? null,
      hasCaseStudy: Boolean(item?.hasCaseStudy),
      sortOrder: item?.sortOrder ?? null,
    }))

  return sortByOrder(mapped)
}

export async function getExperience(language: Language): Promise<Experience[]> {
  const response = await client.queries.experienceConnection()
  const nodes =
    response.data.experienceConnection.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean) ?? []

  const mapped = nodes.map((item) => ({
    company: item?.company ?? "",
    role: pickLocalizedText(language, item?.role_en, item?.role_pt),
    period: pickLocalizedText(language, item?.period_en, item?.period_pt),
    sortOrder: item?.sortOrder ?? null,
  }))

  return sortByOrder(mapped)
}

export async function getCaseStudy(
  slug: string,
  language: Language
): Promise<CaseStudy | null> {
  const relativePath = `${language}/${slug}.mdx`
  const response = await client.queries.caseStudies({ relativePath })
  const data = response.data.caseStudies

  if (!data || data.draft) {
    return null
  }

  return {
    title: data.title ?? "",
    description: data.description ?? "",
    role: data.role ?? "",
    goal: data.goal ?? "",
    slug: data.slug ?? slug,
    externalHref: data.externalHref ?? null,
    hideOtherProjects: data.hideOtherProjects ?? null,
    body: normalizeCaseStudyBody(data.body),
  }
}

export async function getHomeContent(language: Language): Promise<HomeContent | null> {
  const response = await client.queries.pages({ relativePath: "home.md" })
  const data = response.data.pages

  if (!data) {
    return null
  }

  return {
    greeting: pickLocalizedText(language, data.greeting_en, data.greeting_pt),
    bioHtml: pickLocalizedText(language, data.bio_en, data.bio_pt),
    resumeLabel: pickLocalizedText(language, data.resumeLabel_en, data.resumeLabel_pt),
    profilePic: data.profilePic ?? "",
    resumePdf: pickLocalizedText(language, data.resumePdf_en, data.resumePdf_pt),
  }
}
