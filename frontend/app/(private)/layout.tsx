// app/(private)/dashboard/layout.tsx
// Server Component — no "use client", no styled-jsx

import {
  DashboardSidebar,
  TopBar,
} from "@/components/sidebar/dashboard_sidebar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen bg-neutral-100 antialiased">
      {/* Sidebar — Client Component (handles all interactivity) */}
      <DashboardSidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-h-screen md:ml-[200px] lg:ml-[240px]">
        {/* Topbar */}
        <TopBar />

        {/* Page slot */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
