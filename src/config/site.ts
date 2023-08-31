import { SiteConfig } from "types"

export const siteConfig: Readonly<Partial<SiteConfig>> = {
  name: "IIITDMJ",
  description:
    "An open source application built using the new router, server components and everything new in Next.js 13.",
  url: "https://tx.shadcn.com",
  creator: "rcsen",
  authors: [
    {
      name: "rcsen",
      url: "https://shadcn.com",
    },
  ],
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  ogImage: "https://tx.shadcn.com/og.jpg",
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/taxonomy",
  },
}
