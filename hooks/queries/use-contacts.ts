"use client"

import { useQuery } from "@tanstack/react-query"

export interface ContactItem {
  id: string
  instagramUserId: string
  username: string | null
  fullName: string | null
  status: string
  totalDmsReceived: number
  lastInteractionAt: string
}

export const CONTACTS_KEY = ["contacts"] as const

async function fetchContacts(): Promise<ContactItem[]> {
  const res = await fetch("/api/contacts")
  if (!res.ok) {
    throw new Error("Failed to load contacts")
  }
  const data = await res.json()
  return data.contacts || []
}

export function useContacts() {
  return useQuery<ContactItem[]>({
    queryKey: CONTACTS_KEY,
    queryFn: fetchContacts,
    staleTime: 60 * 1000,
  })
}
