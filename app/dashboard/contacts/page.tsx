"use client"

import * as React from "react"
import { Users, Search, Download, Plus, MessageCircle, Clock, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactItem {
  id: string
  instagramUserId: string
  username: string | null
  fullName: string | null
  status: string
  totalDmsReceived: number
  lastInteractionAt: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = React.useState<ContactItem[]>([])
  const [loading, setLoading] = React.useState(true)

  const fetchContacts = async () => {
    try {
      const res = await fetch("/api/contacts")
      if (res.ok) {
        const data = await res.json()
        setContacts(data.contacts || [])
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  React.useEffect(() => {
    fetchContacts()
  }, [])

  return (
    <div className="space-y-6 pb-12 select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-stone-900 sm:text-3xl">
            Contacts ({contacts.length})
          </h1>
          <p className="text-xs text-stone-500 mt-1">
            People who have interacted with your Instagram automations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchContacts}
            className="rounded-full text-xs gap-1"
          >
            <RefreshCw className="h-3 w-3" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="rounded-2xl border border-stone-200/80 bg-white p-12 shadow-2xs text-center flex flex-col items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-600 mb-3">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-bold text-stone-900">No contacts collected yet</h3>
          <p className="text-xs text-stone-400 max-w-sm mt-1">
            When people comment on your Instagram posts or trigger keyword automations, their contact handles will show up here automatically.
          </p>
        </div>
      ) : (
        <div className="rounded-2xl border border-stone-200/80 bg-white shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-stone-100 bg-stone-50/50 text-[10px] font-bold uppercase tracking-wider text-stone-400">
                <tr>
                  <th className="py-3.5 px-5">INSTAGRAM USER</th>
                  <th className="py-3.5 px-4 text-center">DMS SENT</th>
                  <th className="py-3.5 px-4">STATUS</th>
                  <th className="py-3.5 px-5 text-right">LAST INTERACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {contacts.map((c) => (
                  <tr key={c.id} className="hover:bg-stone-50/40 transition">
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-xs">
                          {(c.username || "U").slice(0, 1).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-stone-900">@{c.username || "instagram_user"}</p>
                          <p className="text-[10px] text-stone-400">ID: {c.instagramUserId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-center font-bold text-stone-900">
                      {c.totalDmsReceived}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/60">
                        {c.status || "ENGAGED"}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-right text-stone-500 text-[11px]">
                      {new Date(c.lastInteractionAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
