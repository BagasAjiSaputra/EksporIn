import {
  AdminSidebar,
  AdminTopBar,
} from "@/components/sidebar/admin_sidebar";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { GetProfile } from "@/features/auth/get_profile";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  // Verify user is admin
  const profile = await GetProfile();
  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-neutral-100 antialiased">
      <AdminSidebar />

      <div className="flex flex-col flex-1 min-h-screen md:ml-[200px] lg:ml-[240px]">
        <AdminTopBar />

        <main className="flex-1 p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
