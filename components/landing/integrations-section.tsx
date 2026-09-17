import * as React from "react"
import {
  Compass,
  Database,
  FileSpreadsheet,
  Globe,
  Mail,
  MessageSquare,
  Share2,
  Workflow,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function IntegrationsSection() {
  const integrations = [
    {
      name: "Instagram",
      desc: "Direct integration via supported platform messaging and graph APIs.",
      status: "Available",
      statusVariant: "success" as const,
      icon: MessageSquare,
    },
    {
      name: "Custom Webhooks",
      desc: "Send and receive real-time JSON payloads for every message and trigger event.",
      status: "Available",
      statusVariant: "success" as const,
      icon: Share2,
    },
    {
      name: "Google Sheets",
      desc: "Automatically sync captured leads, follower usernames, and tags into spreadsheets.",
      status: "Available",
      statusVariant: "success" as const,
      icon: FileSpreadsheet,
    },
    {
      name: "HubSpot & CRM",
      desc: "Push qualified prospects and conversational context directly to sales pipelines.",
      status: "Connect via webhook",
      statusVariant: "subtle" as const,
      icon: Database,
    },
    {
      name: "Email Services",
      desc: "Trigger email follow-ups when an Instagram contact shares their address in DM.",
      status: "Connect via webhook",
      statusVariant: "subtle" as const,
      icon: Mail,
    },
    {
      name: "Slack Notifications",
      desc: "Get instant channel alerts whenever high-priority leads request personal calls.",
      status: "Coming soon",
      statusVariant: "coral" as const,
      icon: Globe,
    },
    {
      name: "Zapier & Make",
      desc: "Connect your InstaDM events to 5,000+ business productivity tools.",
      status: "Coming soon",
      statusVariant: "coral" as const,
      icon: Zap,
    },
  ]

  return (
    <section id="integrations" className="bg-stone-50/50 py-20 md:py-28 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-stone-100 px-3 py-1 text-xs font-semibold tracking-wider text-stone-600 uppercase">
            <Compass className="h-3 w-3 text-[hsl(340_82%_55%)]" />
            <span>Fits into your workflow</span>
          </div>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
            Connect the tools you already use.
          </h2>

          <p className="mt-4 text-base leading-relaxed text-stone-600">
            Keep your messaging workflows connected to the tools that help your
            business move—from spreadsheets to custom webhooks and CRMs.
          </p>
        </div>

        {/* Integration Cards Grid */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {integrations.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.name}
                className="group flex flex-col justify-between rounded-xl border border-border/80 bg-white p-5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-border hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-100 text-stone-700 transition-colors group-hover:bg-stone-900 group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <Badge variant={item.statusVariant} className="text-[10px]">
                      {item.status}
                    </Badge>
                  </div>

                  <h3 className="mt-4 text-sm font-bold text-stone-900">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-stone-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-medium text-stone-400">
                  <span>Standard REST / Webhook protocol</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
