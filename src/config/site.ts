import { SiteConfig } from "types"

export const siteConfig: Readonly<Partial<SiteConfig>> = {
  name: "Taxonomy",
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
  url: "https://tx.shadcn.com",
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
  },
}
