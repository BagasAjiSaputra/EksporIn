"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Building2, Phone, MapPin, Loader2, ArrowLeft } from "lucide-react"
import { RegisterCompany } from "@/features/company/register_company"

export default function RegisterCompanyPage() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setIsPending(true)
    setError(null)
    
    try {
      const res = await RegisterCompany(formData)
      if (res?.error) {
        setError(res.error)
        alert(res.error)
      } else {
        alert("Berhasil mendaftarkan perusahaan!")
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      setError("Terjadi kesalahan, coba lagi.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 pt-4 pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors shadow-sm"
          aria-label="Kembali"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
            Daftarkan Perusahaan
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Lengkapi data perusahaan Anda untuk mulai sebagai seller.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <form action={handleSubmit} className="space-y-5">
          
          {/* Company Name */}
          <div className="space-y-1.5">
            <label htmlFor="company_name" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
              <Building2 size={13} strokeWidth={2.5} />
              Nama Perusahaan
            </label>
            <input
              id="company_name"
              name="company_name"
              type="text"
              placeholder="Contoh: PT. RyuPort Sejahtera"
              required
              disabled={isPending}
              className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-50"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label htmlFor="phone" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
              <Phone size={13} strokeWidth={2.5} />
              Nomor Telepon
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Contoh: +6285736957264"
              required
              disabled={isPending}
              className="w-full h-11 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-50"
            />
          </div>

          {/* Address */}
          <div className="space-y-1.5">
            <label htmlFor="address" className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
              <MapPin size={13} strokeWidth={2.5} />
              Alamat Perusahaan
            </label>
            <textarea
              id="address"
              name="address"
              rows={4}
              placeholder="Masukkan alamat lengkap perusahaan"
              required
              disabled={isPending}
              className="w-full py-3 px-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-100 disabled:opacity-50 resize-y"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <span className="shrink-0 font-bold">⚠</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto h-11 px-8 rounded-xl bg-neutral-900 text-white text-sm font-semibold hover:bg-neutral-800 active:scale-95 transition-all duration-150 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 size={16} className="animate-spin" />}
              {isPending ? "Mendaftarkan..." : "Daftarkan Perusahaan"}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
