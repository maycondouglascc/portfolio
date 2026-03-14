// tina/config.ts
import { defineConfig } from "tinacms";
var contentRoot = "content";
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.TINA_CLIENT_ID || "local",
  token: process.env.TINA_TOKEN || "local",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "files",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "projects",
        label: "Projects",
        path: `${contentRoot}/projects`,
        format: "md",
        fields: [
          { name: "title_en", label: "Title (EN)", type: "string", required: true },
          { name: "title_pt", label: "Title (PT)", type: "string", required: true },
          {
            name: "description_en",
            label: "Description (EN)",
            type: "string",
            ui: { component: "textarea" },
            required: true
          },
          {
            name: "description_pt",
            label: "Description (PT)",
            type: "string",
            ui: { component: "textarea" },
            required: true
          },
          { name: "slug", label: "Slug", type: "string", required: true },
          { name: "thumbnail", label: "Thumbnail", type: "image", required: true },
          { name: "hoverLottie", label: "Hover Lottie", type: "string" },
          { name: "hasCaseStudy", label: "Has case study", type: "boolean" },
          { name: "sortOrder", label: "Sort order", type: "number" },
          { name: "draft", label: "Draft", type: "boolean" }
        ]
      },
      {
        name: "experience",
        label: "Experience",
        path: `${contentRoot}/experience`,
        format: "md",
        fields: [
          { name: "company", label: "Company", type: "string", required: true },
          { name: "role_en", label: "Role (EN)", type: "string", required: true },
          { name: "role_pt", label: "Role (PT)", type: "string", required: true },
          { name: "period_en", label: "Period (EN)", type: "string", required: true },
          { name: "period_pt", label: "Period (PT)", type: "string", required: true },
          { name: "sortOrder", label: "Sort order", type: "number" }
        ]
      },
      {
        name: "caseStudies",
        label: "Case Studies",
        path: `${contentRoot}/case-studies`,
        format: "mdx",
        fields: [
          { name: "title", label: "Title", type: "string", required: true },
          {
            name: "description",
            label: "Description",
            type: "string",
            ui: { component: "textarea" },
            required: true
          },
          { name: "role", label: "Role", type: "string", required: true },
          { name: "goal", label: "Goal", type: "string", required: true },
          { name: "slug", label: "Slug", type: "string", required: true },
          { name: "externalHref", label: "External link", type: "string" },
          { name: "hideOtherProjects", label: "Hide other projects", type: "boolean" },
          { name: "draft", label: "Draft", type: "boolean" },
          {
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
                      { label: "Vertical", value: "vertical" }
                    ]
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
                          { label: "Neutral", value: "neutral" }
                        ]
                      },
                      { name: "title", label: "Title", type: "string" },
                      {
                        name: "description",
                        label: "Description",
                        type: "string",
                        ui: { component: "textarea" }
                      }
                    ]
                  }
                ]
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
                    ui: { component: "textarea" }
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
                          { label: "Neutral", value: "neutral" }
                        ]
                      },
                      { name: "title", label: "Title", type: "string" },
                      {
                        name: "description",
                        label: "Description",
                        type: "string",
                        ui: { component: "textarea" }
                      }
                    ]
                  }
                ]
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
                    ui: { component: "textarea" }
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
                          { label: "Neutral", value: "neutral" }
                        ]
                      },
                      { name: "title", label: "Title", type: "string" },
                      {
                        name: "description",
                        label: "Description",
                        type: "string",
                        ui: { component: "textarea" }
                      }
                    ]
                  }
                ]
              },
              {
                name: "CaseImage",
                label: "Case Image",
                fields: [
                  { name: "id", label: "Anchor ID", type: "string" },
                  { name: "src", label: "Image", type: "image", required: true },
                  { name: "alt", label: "Alt text", type: "string", required: true },
                  { name: "priority", label: "Priority", type: "boolean" },
                  { name: "rounded", label: "Rounded", type: "boolean" }
                ]
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
                      { name: "alt", label: "Alt text", type: "string", required: true }
                    ]
                  }
                ]
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
                      { name: "alt", label: "Alt text", type: "string", required: true }
                    ]
                  }
                ]
              }
            ]
          }
        ],
        ui: {
          router: ({ document }) => {
            const slug = document?._sys?.filename;
            return slug ? `/projects/${slug}` : "/";
          }
        }
      },
      {
        name: "pages",
        label: "Pages",
        path: `${contentRoot}/pages`,
        format: "md",
        fields: [
          { name: "greeting_en", label: "Greeting (EN)", type: "string", required: true },
          { name: "greeting_pt", label: "Greeting (PT)", type: "string", required: true },
          {
            name: "bio_en",
            label: "Bio (EN)",
            type: "string",
            ui: { component: "textarea" }
          },
          {
            name: "bio_pt",
            label: "Bio (PT)",
            type: "string",
            ui: { component: "textarea" }
          },
          { name: "resumeLabel_en", label: "Resume label (EN)", type: "string" },
          { name: "resumeLabel_pt", label: "Resume label (PT)", type: "string" },
          { name: "profilePic", label: "Profile picture", type: "image" },
          { name: "resumePdf_en", label: "Resume PDF (EN)", type: "string" },
          { name: "resumePdf_pt", label: "Resume PDF (PT)", type: "string" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
