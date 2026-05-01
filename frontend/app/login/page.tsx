import { login } from "@/features/auth/login"

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">

        {/* Logo / Brand */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-600 mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <h1 className="text-[22px] font-semibold text-stone-900 tracking-tight">Welcome back</h1>
          <p className="text-sm text-stone-400 mt-1">Sign in to your marketplace account</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
          <form action={login} className="space-y-4">

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-stone-500 uppercase tracking-wide">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-medium text-stone-500 uppercase tracking-wide">
                  Password
                </label>
                <a href="/forgot-password" className="text-xs text-emerald-600 hover:text-emerald-700 transition-colors">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-11 mt-2 rounded-xl bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 active:scale-[0.98] transition-all duration-150"
            >
              Sign in
            </button>

          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-stone-400 mt-5">
          Don't have an account?{" "}
          <a href="/register" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
            Register
          </a>
        </p>

      </div>
    </main>
  )
}