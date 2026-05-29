"use client";

import { useState } from "react";
import {
  Users,
  Search,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  Filter,
  Mail,
  Calendar,
  Check,
  X,
  Loader2,
} from "lucide-react";
import { ApproveUser } from "@/features/admin/approve_user";
import { GetAllUsers } from "@/features/admin/get_all_users";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  is_verified: string;
  is_rejected: boolean;
  created_at: string;
}

const roleOptions = [
  { value: "",           label: "Semua Role",  icon: Users },
  { value: "user",       label: "User",        icon: ShieldAlert },
  { value: "agregator",  label: "Agregator",   icon: UserCheck },
  { value: "admin",      label: "Admin",       icon: ShieldCheck },
];

function getStatusColor(status: string) {
  switch (status) {
    case "verified":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "pending":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-neutral-50 text-neutral-600 border-neutral-200";
  }
}

function getRoleBadge(role: string) {
  switch (role) {
    case "admin":
      return "bg-red-50 text-red-700 border-red-200";
    case "agregator":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    default:
      return "bg-neutral-100 text-neutral-600 border-neutral-200";
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function UserTable({
  initialUsers,
  fetchUsers,
}: {
  initialUsers: UserData[];
  fetchUsers: (role?: string) => Promise<UserData[]>;
}) {
  const [users, setUsers] = useState<UserData[]>(initialUsers);
  const [activeRole, setActiveRole] = useState("");
  const [search, setSearch] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  function handleRoleFilter(role: string) {
    setActiveRole(role);
  }

  function showToast(message: string, type: "success" | "error") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleApprove(userId: string, approve: boolean) {
    setLoadingId(userId);
    try {
      const result = await ApproveUser(userId, approve);

      if (result.success) {
        showToast(result.message, "success");
        // Refresh user list
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
      } else {
        showToast(result.message, "error");
      }
    } catch {
      showToast("Terjadi kesalahan", "error");
    } finally {
      setLoadingId(null);
    }
  }

  const filteredUsers = users.filter((u) => {
    const matchesRole = activeRole ? u.role === activeRole : true;
    const matchesSearch = search
      ? u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase())
      : true;

    return matchesRole && matchesSearch;
  });

  return (
    <div className="space-y-5">
      {/* ── Toast ── */}
      {toast && (
        <div
          className={[
            "fixed top-6 right-6 z-50 px-4 py-3 rounded-xl border shadow-lg text-sm font-medium transition-all duration-300 animate-[slideIn_0.3s_ease-out]",
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200",
          ].join(" ")}
        >
          {toast.message}
        </div>
      )}

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {roleOptions.map(({ value, label, icon: Icon }) => {
          const count = value
            ? users.filter((u) => u.role === value).length
            : users.length;
          const isActive = activeRole === value;
          return (
            <button
              key={value}
              onClick={() => handleRoleFilter(value)}
              className={[
                "flex items-center gap-3 p-4 rounded-xl border transition-all duration-200 text-left cursor-pointer",
                isActive
                  ? "bg-neutral-900 text-white border-neutral-900 shadow-lg shadow-neutral-900/20"
                  : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-300 hover:shadow-sm",
              ].join(" ")}
            >
              <div
                className={[
                  "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                  isActive ? "bg-white/15" : "bg-neutral-100",
                ].join(" ")}
              >
                <Icon
                  size={18}
                  strokeWidth={1.8}
                  className={isActive ? "text-white" : "text-neutral-500"}
                />
              </div>
              <div>
                <p
                  className={[
                    "text-2xl font-bold tracking-tight leading-none",
                    isActive ? "text-white" : "text-neutral-900",
                  ].join(" ")}
                >
                  {count}
                </p>
                <p
                  className={[
                    "text-xs font-medium mt-0.5",
                    isActive ? "text-white/70" : "text-neutral-400",
                  ].join(" ")}
                >
                  {label}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Table Card ── */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-neutral-400" />
            <h2 className="text-sm font-semibold text-neutral-800">
              {activeRole
                ? `Filter: ${roleOptions.find((r) => r.value === activeRole)?.label}`
                : "Semua Pengguna"}
            </h2>
          </div>

          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-9 pl-8 pr-3 rounded-lg border border-neutral-200 bg-neutral-50 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-100 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/60">
                <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden sm:table-cell">
                  Email
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden md:table-cell">
                  Status
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider hidden lg:table-cell">
                  Terdaftar
                </th>
                <th className="px-5 py-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider text-center">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-neutral-400"
                  >
                    Tidak ada user ditemukan.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-neutral-50/80 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-xs font-bold text-neutral-600 shrink-0 uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-neutral-900 truncate max-w-[180px]">
                            {user.name}
                          </p>
                          <p className="text-xs text-neutral-400 sm:hidden truncate max-w-[160px]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-3.5 hidden sm:table-cell">
                      <div className="flex items-center gap-1.5 text-sm text-neutral-600 truncate max-w-[220px]">
                        <Mail size={12} className="text-neutral-400 shrink-0" />
                        {user.email}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-3.5">
                      <span
                        className={[
                          "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border capitalize",
                          getRoleBadge(user.role),
                        ].join(" ")}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-3.5 hidden md:table-cell">
                      <span
                        className={[
                          "inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border capitalize",
                          getStatusColor(user.is_verified),
                        ].join(" ")}
                      >
                        {user.is_verified}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-3.5 hidden lg:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <Calendar size={11} className="text-neutral-400" />
                        {formatDate(user.created_at)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-center gap-2">
                        {user.is_verified === "pending" ? (
                          loadingId === user.id ? (
                            <Loader2
                              size={16}
                              className="animate-spin text-neutral-400"
                            />
                          ) : (
                            <>
                              <button
                                onClick={() => handleApprove(user.id, true)}
                                title="Approve"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300 transition-all duration-200 cursor-pointer"
                              >
                                <Check size={13} strokeWidth={2.5} />
                                <span className="hidden sm:inline">Approve</span>
                              </button>
                              <button
                                onClick={() => handleApprove(user.id, false)}
                                title="Reject"
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all duration-200 cursor-pointer"
                              >
                                <X size={13} strokeWidth={2.5} />
                                <span className="hidden sm:inline">Reject</span>
                              </button>
                            </>
                          )
                        ) : (
                          <span className="text-xs text-neutral-300">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-neutral-100 bg-neutral-50/40">
          <p className="text-xs text-neutral-400">
            Menampilkan {filteredUsers.length} dari {users.length} pengguna
          </p>
        </div>
      </div>
    </div>
  );
}
