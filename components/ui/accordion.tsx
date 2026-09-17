"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextType {
  openItems: string[]
  toggleItem: (value: string) => void
}

const AccordionContext = React.createContext<AccordionContextType | undefined>(undefined)

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  collapsible?: boolean
}

function Accordion({
  children,
  className,
  type = "single",
  defaultValue,
  collapsible = true,
  ...props
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(() => {
    if (!defaultValue) return []
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  })

  const toggleItem = React.useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === "single") {
          if (prev.includes(value)) {
            return collapsible ? [] : prev
          }
          return [value]
        } else {
          return prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        }
      })
    },
    [type, collapsible]
  )

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={cn("divide-y divide-border", className)} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

const AccordionItemContext = React.createContext<{ value: string } | undefined>(undefined)

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

function AccordionItem({ value, className, children, ...props }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={{ value }}>
      <div className={cn("border-b border-border py-2", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const context = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)
  if (!context || !itemContext) {
    throw new Error("AccordionTrigger must be used within AccordionItem")
  }

  const isOpen = context.openItems.includes(itemContext.value)

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => context.toggleItem(itemContext.value)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-left text-base font-medium text-foreground transition-all hover:text-[hsl(340_82%_55%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180 text-foreground"
        )}
      />
    </button>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const context = React.useContext(AccordionContext)
  const itemContext = React.useContext(AccordionItemContext)
  if (!context || !itemContext) {
    throw new Error("AccordionContent must be used within AccordionItem")
  }

  const isOpen = context.openItems.includes(itemContext.value)

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "overflow-hidden pb-4 pt-1 text-sm text-muted-foreground leading-relaxed transition-all",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
