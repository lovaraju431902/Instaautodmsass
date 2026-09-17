"use client"

import * as React from "react"
import { Settings as SettingsIcon, Save, Key, Bell, User } from "lucide-react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AccountPage() {
  const [name, setName] = React.useState("John Doe")
  const [email, setEmail] = React.useState("john@example.com")

  return (
    <div className="space-y-6 max-w-3xl">
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
          <BreadcrumbPage>Account</BreadcrumbPage>
        </BreadcrumbItem>
      </Breadcrumb>

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-stone-900">Account Settings</h2>
        <p className="text-xs text-stone-500 mt-1">Manage your profile, login credentials, and notification preferences.</p>
      </div>

      <div className="rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-4 border-b border-stone-100 pb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-900 text-lg font-bold text-white shadow-xs">
            JD
          </div>
          <div>
            <h3 className="text-base font-bold text-stone-900">{name}</h3>
            <p className="text-xs text-stone-400">{email}</p>
            <span className="mt-1 inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 border border-emerald-200">
              Pro Plan Active
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">Display Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-stone-700">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 rounded-xl"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            onClick={() => alert("Settings updated successfully!")}
            className="rounded-xl bg-stone-900 text-xs font-semibold text-white hover:bg-stone-800"
          >
            <Save className="mr-1.5 h-3.5 w-3.5" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
