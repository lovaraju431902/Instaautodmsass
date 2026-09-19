"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

export interface DashboardStats {
  account: {
    id: string
    username: string
    name?: string
    followersCount: number
    profilePictureUrl?: string
  } | null
  stats: {
    dmsSent: number
    linkClicks: number
    leadsCollected: number
    totalFollowers: number
    dmsSentThisMonth?: number
    monthlyDmLimit?: number
  }
  automations: Array<{
    id: string
    name: string
    status: "LIVE" | "PAUSED"
    triggerType: string
    dmsSentCount: number
    clicksCount: number
    keywords: string[]
    finalMessage: string
    destinationUrl?: string
    useAiAssistant?: boolean
  }>
  recentPost: {
    id?: string
    caption?: string
    mediaType?: string
    likesCount?: number
    commentsCount?: number
    mediaUrl?: string
    thumbnailUrl?: string
    permalink?: string
    postedAt?: string
    hasAutomation?: boolean
    automations?: any[]
  } | null
  posts?: Array<{
    id: string
    mediaId: string
    mediaType: string
    caption: string
    mediaUrl?: string
    thumbnailUrl?: string
    permalink?: string
    likesCount: number
    commentsCount: number
    postedAt: string
    hasAutomation?: boolean
    automations?: any[]
  }>
}

export const DASHBOARD_STATS_KEY = ["dashboard-stats"] as const

async function fetchStats(forceRefresh = false): Promise<DashboardStats> {
  const url = forceRefresh ? "/api/dashboard/stats?refresh=true" : "/api/dashboard/stats"
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch dashboard stats: ${res.statusText}`)
  }
  return res.json()
}

export function useDashboardStats() {
  return useQuery<DashboardStats>({
    queryKey: DASHBOARD_STATS_KEY,
    queryFn: () => fetchStats(false),
    staleTime: 60 * 1000,
  })
}

export function useRefreshDashboardStats() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => fetchStats(true),
    onSuccess: (freshData) => {
      queryClient.setQueryData(DASHBOARD_STATS_KEY, freshData)
    },
  })
}
