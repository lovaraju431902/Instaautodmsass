"use client"

import * as React from "react"
import { Users as UsersIcon, UserPlus, Shield, Mail } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"

export default function UsersPage() {
  const teamMembers = [
    { name: "John Doe", email: "john@example.com", role: "Owner", avatar: "JD" },
    { name: "Sarah Jenkins", email: "sarah@example.com", role: "Manager", avatar: "SJ" },
    { name: "Alex Rivera", email: "alex@example.com", role: "Editor", avatar: "AR" },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Users</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-stone-900">Team Members</h2>
          <p className="text-xs text-stone-500 mt-1">Manage collaborators who have access to manage your Instagram automations.</p>
        </div>

        <Button className="h-10 rounded-xl bg-stone-900 px-4 text-xs font-semibold text-white hover:bg-stone-800 shadow-sm">
          <UserPlus className="mr-1.5 h-3.5 w-3.5" />
          <span>Invite Member</span>
        </Button>
      </div>

      <div className="rounded-2xl border border-stone-200/80 bg-white shadow-xs overflow-hidden">
        <div className="divide-y divide-stone-100">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 sm:p-5 hover:bg-stone-50/50 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 font-bold text-xs text-stone-800">
                  {member.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-stone-900">{member.name}</p>
                  <p className="text-xs text-stone-400 flex items-center gap-1 mt-0.5">
                    <Mail className="h-3 w-3" />
                    <span>{member.email}</span>
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-1 text-[11px] font-semibold text-stone-700">
                <Shield className="h-3 w-3 text-stone-400" />
                <span>{member.role}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
