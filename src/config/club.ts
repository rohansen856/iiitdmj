import { ClubConfig } from "types"

export const clubConfig: ClubConfig = {
  mainNav: [
    {
      title: "All clubs",
      href: "/clubs",
    },
    {
      title: "Your clubs",
      href: "/clubs/myclubs",
    },
  ],
  sidebarNav: [
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: "billing",
    },
    {
      title: "Notifications",
      href: "/dashboard/notifications",
      icon: "post",
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: "settings",
    },
  ],
}
