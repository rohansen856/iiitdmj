import { Student } from "@prisma/client"
import type { Icon } from "lucide-react"

import { Icons } from "@/components/icons"

export type StudentnfoProps = {
    name: string | null;
    email: string;
    image: string | null;
    year: number | null;
    programme: "B" | "M" | "P" | null;
    semester: number | null;
    branch:   "CS" | "EC" | "ME" | "SM" | "DS" | null;
    group: "A" | "B" | null;
    roll: number | null;
}

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
    | {
      href: string
      items?: never
    }
    | {
      href?: string
      items: NavLink[]
    }
  )

export type SiteConfig = {
  name: string
  description: string
  url: string
  creator: string
  authors: {
    name: string
    url: string
  }[]
  keywords: string[]
  ogImage: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type ClubConfig = DashboardConfig
