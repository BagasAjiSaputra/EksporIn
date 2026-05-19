"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react"
import { Logout } from "@/features/auth/logout"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Users,           label: "Users",     href: "/dashboard/users" },
  { icon: FileText,        label: "Reports",   href: "/dashboard/reports" },
  { icon: Bell,            label: "Notifications", href: "/dashboard/notifications" },
  { icon: Settings,        label: "Settings",  href: "/dashboard/settings" },
]

export function DashboardSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change (mobile)
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when sidebar open on mobile
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      {/* ── Mobile menu toggle (topbar) ─────────────────────────── */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-0 left-0 z-[200] flex items-center justify-center w-14 h-14 text-neutral-400 hover:text-white transition-colors"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* ── Overlay ─────────────────────────────────────────────── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[199] bg-black/50 backdrop-blur-sm md:hidden"
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ─────────────────────────────────────────────── */}
      <aside
        className={[
          "fixed inset-y-0 left-0 z-[201] flex flex-col bg-[#0f0f0f] transition-transform duration-250 ease-in-out",
          "w-[240px] lg:w-[240px] md:w-[200px]",
          // Desktop: always visible
          "md:translate-x-0",
          // Mobile: slide in/out
          open ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <span className="text-indigo-400 text-lg leading-none">▲</span>
            <span className="text-white text-[15px] font-semibold tracking-tight">EksporIn</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-neutral-500 hover:text-white transition-colors p-1 rounded-md"
            aria-label="Close sidebar"
          >
            <X size={17} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-3">
          <ul className="flex flex-col gap-0.5">
            {navItems.map(({ icon: Icon, label, href }) => {
              const active = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-[450] transition-all duration-150 no-underline",
                      active
                        ? "bg-white/[0.08] text-white"
                        : "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-100",
                    ].join(" ")}
                  >
                    <Icon size={17} strokeWidth={1.8} className="shrink-0" />
                    <span className="flex-1">{label}</span>
                    {active && (
                      <ChevronRight size={13} className="opacity-40 shrink-0" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-3 py-3 border-t border-white/[0.06]">
          <button onClick={Logout} className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13.5px] text-neutral-400 hover:bg-white/[0.05] hover:text-red-400 transition-all duration-150 cursor-pointer">
            <LogOut size={16} strokeWidth={1.8} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export function TopBar() {
  const pathname = usePathname()
  const currentLabel = navItems.find((n) => n.href === pathname)?.label ?? "Dashboard"

  return (
    <header className="sticky top-0 z-[100] h-14 bg-white border-b border-neutral-200 flex items-center px-6 gap-4">
      {/* Spacer for mobile menu button */}
      <div className="w-8 md:hidden" />

      <p className="flex-1 text-[14px] font-medium text-neutral-800 tracking-tight">
        {currentLabel}
      </p>

      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button className="relative p-2 rounded-lg text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 transition-colors">
          <Bell size={17} strokeWidth={1.8} />
          <span className="absolute top-[7px] right-[7px] w-[7px] h-[7px] bg-indigo-500 rounded-full border-2 border-white" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-semibold cursor-pointer hover:opacity-85 transition-opacity select-none">
          U
        </div>
      </div>
    </header>
  )
}