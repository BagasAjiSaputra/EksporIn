import { GetProfile } from "@/features/auth/get_profile";
import {
  User,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Briefcase,
  TrendingUp,
  Users,
  Activity,
  Building2,
} from "lucide-react";
import {
  RoleVerifyButton,
  StatusBadge,
  StatusIcon,
  VerifyStatus,
} from "@/components/form/role_verify";
import { GetCompany } from "@/features/company/get_company";
import { UpdateProfileModal } from "@/components/form/update_account";
import { UpdateCompanyModal } from "@/components/form/update_company";

export default async function DashboardPage() {
  const profile = await GetProfile();
  const company = await GetCompany();

  const status: VerifyStatus =
    profile.is_verified === "verified"
      ? "verified"
      : profile.is_verified === "pending"
        ? "pending"
        : "unverified";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* ── Welcome ── */}
      <div>
        <p className="text-sm text-neutral-400 mb-1">Good day 👋</p>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          {profile.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ── Profile card ── */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 flex flex-col h-full gap-5">
          <div className="flex items-center gap-3">
            <div className="shrink-0 w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
              <User size={20} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-800">Profil Saya</h2>
            </div>
          </div>

          <div className="flex-1 divide-y divide-neutral-100">
            {/* Email */}
            <div className="flex items-center justify-between py-3.5 gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                <Mail size={14} strokeWidth={2.5}/> Email
              </span>
              <span className="text-sm text-neutral-800 font-medium">
                {profile.email}
              </span>
            </div>

            {/* Role */}
            <div className="flex items-center justify-between py-3.5 gap-4 flex-wrap">
              <span className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
                <Briefcase size={14} strokeWidth={2.5}/> Role
              </span>
              <span className="text-xs font-mono bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded-md text-neutral-700 capitalize">
                {profile.role}
              </span>
            </div>

            {/* Status + Verify button */}
            <div className="flex items-center justify-between py-3.5 gap-3 flex-wrap">
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
          {/* Action */}
          <div className="pt-2 border-t border-neutral-100 flex justify-end">
            <UpdateProfileModal
              defaultName={profile.name}
              defaultEmail={profile.email}
            />
          </div>
        </div>

        {/* ── Company Card ── */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 flex flex-col h-full gap-5">
          <div className="flex items-center gap-3">
            <div className="shrink-0 w-11 h-11 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-400">
              <Building2 size={20} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-neutral-800">Perusahaan</h2>
            </div>
          </div>
          
          <div className="flex-1">
            {company ? (
            <>
              <div className="divide-y divide-neutral-100">
                <div className="flex justify-between py-3.5 gap-4">
                  <span className="text-xs text-neutral-400 font-medium">Nama</span>
                  <span className="text-sm text-neutral-800 font-bold max-w-[65%] text-right truncate">
                    {company.company_name}
                  </span>
                </div>
                <div className="flex justify-between py-3.5 gap-4">
                  <span className="text-xs text-neutral-400 font-medium">No. Telp</span>
                  <span className="text-sm text-neutral-800 font-medium max-w-[65%] text-right font-mono">
                    {company.phone}
                  </span>
                </div>
                <div className="flex justify-between py-3.5 gap-4">
                  <span className="text-xs text-neutral-400 font-medium">Alamat</span>
                  <span className="text-sm text-neutral-800 font-medium max-w-[65%] text-right line-clamp-2">
                    {company.address}
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-neutral-100 flex justify-end mt-4">
                <UpdateCompanyModal
                  defaultName={company.company_name}
                  defaultPhone={company.phone}
                  defaultAddress={company.address}
                />
              </div>
            </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-6">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-full flex items-center justify-center border border-indigo-100">
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-neutral-800">Belum Ada Perusahaan</h3>
                  <p className="text-xs text-neutral-500 mt-1 max-w-[250px] mx-auto">
                    Anda belum mendaftarkan perusahaan. Daftarkan sekarang untuk mulai berjualan.
                  </p>
                </div>
                <a
                  href="/company/register"
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-xs font-semibold rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Daftarkan Perusahaan
                </a>
              </div>
            )}
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
  );
}
