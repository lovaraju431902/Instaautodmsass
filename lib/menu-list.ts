import {
  BarChart3,
  CircleDot,
  Film,
  HelpCircle,
  Home,
  Layers,
  LayoutTemplate,
  LucideIcon,
  RotateCcw,
  Sparkles,
  Users,
  Users2,
} from "lucide-react"

export interface Submenu {
  href: string
  label: string
  active?: boolean
}

export interface MenuItem {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

export interface Group {
  groupLabel: string
  menus: MenuItem[]
}

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Home",
          icon: Home,
          active: pathname === "/dashboard",
        },
        {
          href: "/dashboard/automations",
          label: "Automations",
          icon: Layers,
          active: pathname.startsWith("/dashboard/automations"),
        },
        {
          href: "/dashboard/templates",
          label: "Templates",
          icon: LayoutTemplate,
          active: pathname.startsWith("/dashboard/templates"),
        },
      ],
    },
    {
      groupLabel: "My Content",
      menus: [
        {
          href: "/dashboard/content",
          label: "My Content",
          icon: Film,
          active: pathname.startsWith("/dashboard/content") || pathname.startsWith("/dashboard/stories"),
          submenus: [
            {
              href: "/dashboard/content",
              label: "Posts & Reels",
              active: pathname === "/dashboard/content",
            },
            {
              href: "/dashboard/stories",
              label: "Stories",
              active: pathname === "/dashboard/stories",
            },
          ],
        },
        {
          href: "/dashboard/contacts",
          label: "Contacts",
          icon: Users,
          active: pathname.startsWith("/dashboard/contacts"),
        },
        {
          href: "/dashboard/rewind",
          label: "Rewind",
          icon: RotateCcw,
          active: pathname.startsWith("/dashboard/rewind"),
        },
      ],
    },
    {
      groupLabel: "Analytics",
      menus: [
        {
          href: "/dashboard/insights",
          label: "Analytics",
          icon: BarChart3,
          active: pathname.startsWith("/dashboard/insights"),
          submenus: [
            {
              href: "/dashboard/insights",
              label: "Overview",
              active: pathname === "/dashboard/insights",
            },
            {
              href: "/dashboard/insights/audience",
              label: "Audience Insights",
              active: pathname === "/dashboard/insights/audience",
            },
          ],
        },
        {
          href: "/dashboard/support",
          label: "Support",
          icon: HelpCircle,
          active: pathname.startsWith("/dashboard/support"),
        },
      ],
    },
  ]
}
