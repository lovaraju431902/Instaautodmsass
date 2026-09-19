"use client"

import * as React from "react"
import Link from "next/link"
import { MoreVertical, Pause, Play, Plus, RefreshCw, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewAutomationModal } from "@/components/dashboard/new-automation-modal"
import { useAutomations, useToggleAutomation, useDeleteAutomation } from "@/hooks/queries/use-automations"

export default function AutomationsPage() {
  const { data: automations = [], isLoading: loading, refetch } = useAutomations()
  const toggleMutation = useToggleAutomation()
  const deleteMutation = useDeleteAutomation()
  const [modalOpen, setModalOpen] = React.useState(false)

  const handleToggle = (id: string, currentStatus: "LIVE" | "PAUSED") => {
    const nextStatus = currentStatus === "LIVE" ? "PAUSED" : "LIVE"
    toggleMutation.mutate({ id, status: nextStatus })
  }

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this automation?")) return
    deleteMutation.mutate(id)
  }

  return (
    <div className="space-y-6 pb-12 select-none">
      <NewAutomationModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Automations
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            Turn your Instagram engagement into leads, automatically.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex h-9 items-center gap-2 rounded-full bg-[hsl(340_82%_62%)] px-4 text-xs font-bold text-white shadow-xs hover:bg-[hsl(340_82%_55%)] transition self-start sm:self-auto cursor-pointer"
        >
          <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>New Automation</span>
        </button>
      </div>

      {/* Your Automations Section */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Your Automations ({automations.length})</h2>
            <p className="text-xs text-stone-500">
              Manage your automations and track their performance below.
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="text-xs text-stone-500 gap-1"
          >
            <RefreshCw className={`h-3 w-3 ${loading ? "animate-spin" : ""}`} />
            <span>Reload</span>
          </Button>
        </div>

        {/* Automations Table */}
        <div className="rounded-2xl border border-stone-200/80 bg-white shadow-2xs overflow-hidden">
          {automations.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <Plus className="h-6 w-6" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">No automations created yet</h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Set up a comment trigger or DM workflow to start converting Instagram views into clicks and leads.
              </p>
              <div>
                <Button
                  onClick={() => setModalOpen(true)}
                  className="rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-5"
                >
                  Create New Automation
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-stone-100 bg-stone-50/50 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  <tr>
                    <th className="py-3.5 px-5">NAME</th>
                    <th className="py-3.5 px-4 text-center">DMS</th>
                    <th className="py-3.5 px-4 text-center">CLICKS</th>
                    <th className="py-3.5 px-4 text-center">CTR</th>
                    <th className="py-3.5 px-4">STATUS</th>
                    <th className="py-3.5 px-5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {automations.map((auto) => {
                    const isLive = auto.status === "LIVE"
                    const ctr =
                      auto.dmsSentCount > 0
                        ? `${Math.round((auto.clicksCount / auto.dmsSentCount) * 100)}%`
                        : "—"
                    const kwDisplay = auto.keywords.map((k) => k.keyword).join(", ")

                    return (
                      <tr key={auto.id} className="hover:bg-stone-50/40 transition">
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gradient-to-tr from-sky-800 to-indigo-950 flex items-center justify-center text-white">
                              <Play className="h-3.5 w-3.5 fill-white" />
                            </div>
                            <div className="space-y-0.5">
                              <p className="font-bold text-stone-900">{auto.name}</p>
                              <p className="text-[11px] text-stone-500 max-w-md line-clamp-1">
                                Keywords: {kwDisplay || "any"} · Message: {auto.finalMessage}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-stone-900">
                          {auto.dmsSentCount}
                        </td>
                        <td className="py-4 px-4 text-center font-bold text-stone-900">
                          {auto.clicksCount}
                        </td>
                        <td className="py-4 px-4 text-center text-stone-400 font-medium">
                          {ctr}
                        </td>
                        <td className="py-4 px-4">
                          {isLive ? (
                            <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
                              Live
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-bold text-stone-600 border border-stone-200">
                              Paused
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggle(auto.id, auto.status)}
                              className="h-7 rounded-lg text-xs font-semibold px-2.5 border-stone-200 text-stone-700 hover:bg-stone-100 cursor-pointer"
                            >
                              {isLive ? (
                                <>
                                  <Pause className="mr-1 h-3 w-3" />
                                  <span>Pause</span>
                                </>
                              ) : (
                                <>
                                  <Play className="mr-1 h-3 w-3 fill-stone-700" />
                                  <span>Resume</span>
                                </>
                              )}
                            </Button>
                            <button
                              type="button"
                              onClick={() => handleDelete(auto.id)}
                              aria-label="Delete automation"
                              className="rounded-lg p-1 text-stone-400 hover:text-red-600 transition cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
