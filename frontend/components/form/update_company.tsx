"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { UpdateCompany } from "@/features/company/update_company"
import { X, Building2, Phone, MapPin, Loader2, Pencil, CheckCircle2 } from "lucide-react"

interface UpdateCompanyModalProps {
  defaultName?: string
  defaultPhone?: string
  defaultAddress?: string
  triggerLabel?: string
}

export function UpdateCompanyModal({
  defaultName = "",
  defaultPhone = "",
  defaultAddress = "",
  triggerLabel = "Edit Perusahaan",
}: UpdateCompanyModalProps) {
  const [open, setOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()
  const firstInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (open) setTimeout(() => firstInputRef.current?.focus(), 60)
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  function handleClose() {
    if (isPending) return
    setOpen(false)
    setError(null)
    setSuccess(false)
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) handleClose()
  }

  async function handleSubmit(formData: FormData) {
    setError(null)
    setSuccess(false)
    startTransition(async () => {
      try {
        const res = await UpdateCompany(formData)
        if (res?.error) {
          setError(res.error)
        } else {
          setSuccess(true)
          formRef.current?.reset()
          setTimeout(() => handleClose(), 1500)
        }
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan, coba lagi.")
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-600 hover:bg-neutral-50 hover:border-neutral-300 active:scale-95 transition-all duration-150 shadow-sm whitespace-nowrap"
      >
        <Pencil size={12} strokeWidth={2} />
        {triggerLabel}
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={handleBackdrop}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl transition-all duration-200"
            style={{ animation: "modalIn .18s cubic-bezier(.16,1,.3,1) both" }}
          >
            <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-sm font-semibold text-neutral-900 tracking-tight">
                  Edit Perusahaan
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Perbarui informasi perusahaan Anda
                </p>
              </div>
              <button
                onClick={handleClose}
                disabled={isPending}
                className="mt-0.5 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors disabled:opacity-40"
              >
                <X size={15} />
              </button>
            </div>

            <form ref={formRef} action={handleSubmit} className="px-6 py-5 space-y-4">
              <Field label="Nama Perusahaan" icon={<Building2 size={11} strokeWidth={2} />}>
                <input
                  ref={firstInputRef}
                  name="company_name"
                  type="text"
                  placeholder="Nama perusahaan"
                  defaultValue={defaultName}
                  required
                  disabled={isPending}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
                />
              </Field>

              <Field label="No. Telepon" icon={<Phone size={11} strokeWidth={2} />}>
                <input
                  name="phone"
                  type="text"
                  placeholder="0812xxxxxx"
                  defaultValue={defaultPhone}
                  required
                  disabled={isPending}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
                />
              </Field>

              <Field label="Alamat" icon={<MapPin size={11} strokeWidth={2} />}>
                <input
                  name="address"
                  type="text"
                  placeholder="Alamat perusahaan"
                  defaultValue={defaultAddress}
                  required
                  disabled={isPending}
                  className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
                />
              </Field>

              {error && (
                <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                  <span className="mt-px shrink-0">⚠</span>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2.5">
                  <CheckCircle2 size={13} className="shrink-0" />
                  <span>Perusahaan berhasil diperbarui</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="h-9 px-4 text-sm font-medium text-neutral-500 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:text-neutral-700 active:scale-95 transition-all disabled:opacity-40"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending || success}
                  className="h-9 px-5 text-sm font-medium text-white bg-neutral-900 rounded-xl hover:bg-neutral-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
                >
                  {isPending && <Loader2 size={13} className="animate-spin" />}
                  {isPending ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
        {icon}
        {label}
      </label>
      {children}
    </div>
  )
}
