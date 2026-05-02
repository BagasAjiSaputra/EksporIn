// app/(private)/dashboard/layout.tsx
// ✅ Server Component — no "use client", no styled-jsx

import { DashboardSidebar, TopBar } from "@/components/sidebar/dashboard_sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-neutral-100 antialiased">
      {/* Sidebar — Client Component (handles all interactivity) */}
      <DashboardSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen md:ml-[200px] lg:ml-[240px]">
        {/* Topbar */}
        <TopBar />

        {/* Page slot */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7">
          {children}
        </main>
      </div>
    </div>
  )
}