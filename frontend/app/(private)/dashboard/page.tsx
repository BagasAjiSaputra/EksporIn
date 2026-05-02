import { GetProfile } from "@/features/auth/get_profile"
import {
  User,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Briefcase,
  TrendingUp,
  Users,
  Activity,
} from "lucide-react"
import {RoleVerifyButton, StatusBadge, StatusIcon, VerifyStatus} from "@/components/form/role_verify"

const stats = [
  { label: "Total Users",  value: "4,291", change: "+12% this month", up: true,  Icon: Users },
  { label: "Active Now",   value: "138",   change: "+5% this month",  up: true,  Icon: Activity },
  { label: "Reports",      value: "23",    change: "-2% this month",  up: false, Icon: Briefcase },
  { label: "Growth",       value: "18.4%", change: "+3% this month",  up: true,  Icon: TrendingUp },
]

const activity = [
  { label: "Profile updated",       time: "2 min ago",  color: "bg-indigo-500" },
  { label: "New report generated",  time: "1 hr ago",   color: "bg-emerald-500" },
  { label: "User role changed",     time: "3 hr ago",   color: "bg-amber-400" },
  { label: "Login from new device", time: "Yesterday",  color: "bg-red-400" },
]

export default async function DashboardPage() {
  const profile = await GetProfile()

    const status: VerifyStatus =
    profile.is_verified === "verified" ? "verified"
    : profile.is_verified === "pending" ? "pending"
    : "unverified"


  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* ── Welcome ── */}
      <div>
        <p className="text-sm text-neutral-400 mb-1">Good day 👋</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          {profile.name}
        </h1>
      </div>

      {/* ── Profile card ── */}
      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-5 flex items-start gap-4">
        <div className="shrink-0 w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
          <User size={20} strokeWidth={1.6} />
        </div>

        <div className="flex-1 divide-y divide-neutral-100">
          {/* Email */}
          <div className="flex items-center justify-between py-2.5 gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
              <Mail size={12} /> Email
            </span>
            <span className="text-sm text-neutral-800 font-medium">{profile.email}</span>
          </div>

          {/* Role */}
          <div className="flex items-center justify-between py-2.5 gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
              <Briefcase size={12} /> Role
            </span>
            <span className="text-xs font-mono bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-md text-neutral-700 capitalize">
              {profile.role}
            </span>
          </div>

                    {/* Status + Verify button */}
          <div className="flex items-center justify-between py-2.5 gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
              <StatusIcon status={status} />
              Status
            </span>
 
            <div className="flex items-center gap-2 flex-wrap">
              <StatusBadge status={status} />
              <RoleVerifyButton status={status} />
            </div>

          </div>


        </div>
      </div>

      {/* ── Stats grid ── */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map(({ label, value, change, up, Icon }) => (
          <div key={label} className="bg-white border border-neutral-200 rounded-xl shadow-sm p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-neutral-400 font-medium">{label}</span>
              <Icon size={15} strokeWidth={1.8} className="text-neutral-300" />
            </div>
            <p className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 mb-1">{value}</p>
            <p className={`text-[11.5px] font-medium ${up ? "text-emerald-600" : "text-red-500"}`}>{change}</p>
          </div>
        ))}
      </div> */}

      {/* ── Recent activity ── */}
      {/* <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-800">Recent Activity</h2>
          <button className="text-[12.5px] font-medium text-indigo-500 hover:text-indigo-700 transition-colors">
            View all
          </button>
        </div>
        <ul className="divide-y divide-neutral-100">
          {activity.map((item, i) => (
            <li key={i} className="flex items-center gap-3 px-5 py-3.5 hover:bg-neutral-50 transition-colors">
              <span className={`w-2 h-2 rounded-full shrink-0 ${item.color}`} />
              <span className="flex-1 text-sm text-neutral-700">{item.label}</span>
              <span className="text-xs text-neutral-400 whitespace-nowrap">{item.time}</span>
            </li>
          ))}
        </ul>
      </div> */}

    </div>
  )
}