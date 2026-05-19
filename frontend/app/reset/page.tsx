import { resetToken } from "@/features/auth/reset_token"

export default function ResetPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">Reset Password</h1>
          <p className="text-sm text-stone-400 mt-1">Masukkan email untuk link reset password</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <form action={resetToken} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-stone-500 uppercase tracking-wide">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@gmail.com"
                required
                className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150"
            >
              Reset Password
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-stone-400 mt-5">
          Belum Punya Akun?{" "}
          <a href="/register" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
            Daftar
          </a>
        </p>

      </div>
    </main>
  )
}