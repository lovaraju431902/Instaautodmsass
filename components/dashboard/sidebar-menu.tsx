"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { getMenuList } from "@/lib/menu-list"
import { Tooltip } from "@/components/ui/tooltip"

interface SidebarMenuProps {
  isOpen: boolean
}

export function SidebarMenu({ isOpen }: SidebarMenuProps) {
  const pathname = usePathname()
  const menuList = getMenuList(pathname)

  // Track open submenus by label
  const [openSubmenus, setOpenSubmenus] = React.useState<Record<string, boolean>>({
    "My Content": true,
    Analytics: true,
  })

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <nav className="w-full space-y-1 px-2 select-none">
      {menuList.map(({ groupLabel, menus }, groupIndex) => (
        <div key={groupIndex} className="w-full space-y-0.5">
          {menus.map((item, menuIndex) => {
            const Icon = item.icon
            const hasSubmenus = item.submenus && item.submenus.length > 0
            const isSubmenuOpen = openSubmenus[item.label] ?? true

            // Item with Submenus (e.g. "My Content" -> Posts & Reels, Stories or "Analytics" -> Overview, Audience Insights)
            if (hasSubmenus) {
              if (!isOpen) {
                // Mini Sidebar: Center icon with Tooltip
                return (
                  <div key={menuIndex} className="flex justify-center py-0.5">
                    <Tooltip content={item.label} side="right">
                      <Link
                        href={item.href}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900",
                          item.active && "bg-stone-100 font-semibold text-stone-900"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                      </Link>
                    </Tooltip>
                  </div>
                )
              }

              // Wide Sidebar: Collapsible Parent Group
              return (
                <div key={menuIndex} className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => toggleSubmenu(item.label)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 cursor-pointer",
                      item.active && "text-stone-900 font-semibold"
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0 text-stone-500" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-3.5 w-3.5 text-stone-400 transition-transform duration-200",
                        isSubmenuOpen && "rotate-180 text-stone-700"
                      )}
                    />
                  </button>

                  {/* Submenu Links */}
                  {isSubmenuOpen && (
                    <div className="space-y-0.5 pl-6 pt-0.5">
                      {item.submenus!.map((sub, subIndex) => (
                        <Link
                          key={subIndex}
                          href={sub.href}
                          className={cn(
                            "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-stone-500 transition-colors hover:bg-stone-50 hover:text-stone-900",
                            sub.active && "font-bold text-stone-950 bg-stone-100/80"
                          )}
                        >
                          <span
                            className={cn(
                              "h-1.5 w-1.5 rounded-full bg-stone-300",
                              sub.active && "bg-stone-950"
                            )}
                          />
                          <span>{sub.label}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            }

            // Standard Single Menu Item (Home, Automations, Templates, Contacts, Rewind, Support)
            if (!isOpen) {
              return (
                <div key={menuIndex} className="flex justify-center py-0.5">
                  <Tooltip content={item.label} side="right">
                    <Link
                      href={item.href}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-xl text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900",
                        item.active && "bg-stone-100 font-semibold text-stone-900"
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                    </Link>
                  </Tooltip>
                </div>
              )
            }

            return (
              <Link
                key={menuIndex}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900",
                  item.active && "bg-stone-100 font-bold text-stone-950"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 text-stone-500",
                    item.active && "text-stone-950"
                  )}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
