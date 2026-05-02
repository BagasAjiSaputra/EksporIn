import { VerifyRole } from "@/features/auth/role_verified"
import { ShieldCheck, Clock, ShieldQuestion, ShieldAlert } from "lucide-react"
// ── Status types ─────────────────────────────────────────────────────────
export type VerifyStatus = "verified" | "pending" | "unverified"
 
// ── Verify Role button — adapts to status ────────────────────────────────
export function RoleVerifyButton({ status }: { status: VerifyStatus }) {
  // verified → render nothing
  if (status === "verified") return null
 
  // pending → disabled "Menunggu" state
  if (status === "pending") {
    return (
      <div className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-400 cursor-not-allowed select-none">
        <Clock size={12} strokeWidth={2} className="animate-pulse" />
        Menunggu...
      </div>
    )
  }
 
  // unverified → active submit button
  return (
    <form action={VerifyRole}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 hover:border-indigo-300 active:scale-95 transition-all duration-150 cursor-pointer whitespace-nowrap"
      >
        <ShieldCheck size={12} strokeWidth={2} />
        Verifikasi Role
      </button>
    </form>
  )
}


// ── Status badge ──────────────────────────────────────────────────────────
export function StatusBadge({ status }: { status: VerifyStatus }) {
  if (status === "verified") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
        <ShieldCheck size={11} strokeWidth={2.2} />
        Terverifikasi
      </span>
    )
  }
 
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200">
        <ShieldQuestion size={11} strokeWidth={2.2} />
        Pending
      </span>
    )
  }
 
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
      <ShieldAlert size={11} strokeWidth={2.2} />
      Belum Diverifikasi
    </span>
  )
}

export function StatusIcon({ status }: { status: VerifyStatus }) {
  if (status === "verified") return <ShieldCheck size={12} />
  if (status === "pending")  return <Clock size={12} />
  return <ShieldAlert size={12} />
}
