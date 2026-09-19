"use client"

import { useDashboardStats } from "./use-dashboard-stats"

export function useInstagramAccount() {
  const { data, isLoading, isError, error, refetch } = useDashboardStats()

  return {
    account: data?.account || null,
    hasInstagramAccount: Boolean(data?.account),
    username: data?.account?.username || "creator",
    name: data?.account?.name || "Instagram Creator",
    followersCount: data?.account?.followersCount || 0,
    profilePictureUrl: data?.account?.profilePictureUrl || null,
    isLoading,
    isError,
    error,
    refetch,
  }
}
