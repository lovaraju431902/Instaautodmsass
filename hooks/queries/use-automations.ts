"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { DASHBOARD_STATS_KEY, DashboardStats } from "./use-dashboard-stats"

export interface AutomationItem {
  id: string
  name: string
  status: "LIVE" | "PAUSED"
  triggerType: string
  dmsSentCount: number
  clicksCount: number
  keywords: Array<{ id: string; keyword: string }>
  finalMessage: string
  destinationUrl?: string
}

export const AUTOMATIONS_KEY = ["automations"] as const

async function fetchAutomations(): Promise<AutomationItem[]> {
  const res = await fetch("/api/automations")
  if (!res.ok) {
    throw new Error("Failed to load automations")
  }
  const data = await res.json()
  return data.automations || []
}

export function useAutomations() {
  return useQuery<AutomationItem[]>({
    queryKey: AUTOMATIONS_KEY,
    queryFn: fetchAutomations,
    staleTime: 60 * 1000,
  })
}

export function useToggleAutomation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: "LIVE" | "PAUSED" }) => {
      const res = await fetch("/api/automations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) {
        throw new Error("Failed to update automation status")
      }
      return res.json()
    },
    // Optimistic Update
    onMutate: async ({ id, status }) => {
      await queryClient.cancelQueries({ queryKey: AUTOMATIONS_KEY })
      await queryClient.cancelQueries({ queryKey: DASHBOARD_STATS_KEY })

      const previousAutomations = queryClient.getQueryData<AutomationItem[]>(AUTOMATIONS_KEY)
      const previousStats = queryClient.getQueryData<DashboardStats>(DASHBOARD_STATS_KEY)

      if (previousAutomations) {
        queryClient.setQueryData<AutomationItem[]>(
          AUTOMATIONS_KEY,
          previousAutomations.map((a) => (a.id === id ? { ...a, status } : a))
        )
      }

      if (previousStats) {
        queryClient.setQueryData<DashboardStats>(DASHBOARD_STATS_KEY, {
          ...previousStats,
          automations: previousStats.automations.map((a) =>
            a.id === id ? { ...a, status } : a
          ),
        })
      }

      return { previousAutomations, previousStats }
    },
    onError: (_err, _variables, context) => {
      if (context?.previousAutomations) {
        queryClient.setQueryData(AUTOMATIONS_KEY, context.previousAutomations)
      }
      if (context?.previousStats) {
        queryClient.setQueryData(DASHBOARD_STATS_KEY, context.previousStats)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: AUTOMATIONS_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_STATS_KEY })
    },
  })
}

export function useDeleteAutomation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/automations?id=${id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        throw new Error("Failed to delete automation")
      }
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AUTOMATIONS_KEY })
      queryClient.invalidateQueries({ queryKey: DASHBOARD_STATS_KEY })
    },
  })
}
