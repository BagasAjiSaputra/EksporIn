"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { CreateCommodityAction } from "@/features/commodity/create_commodity";
import {
  Tag,
  Box,
  Loader2,
  CheckCircle2,
  X,
  Plus
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateCommodityModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

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
    setSuccess(null)
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) handleClose()
  }

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const res = await CreateCommodityAction(formData);

      if (!res.success) {
        setError(res.message);
      } else {
        setSuccess(res.message);
        formRef.current?.reset();
        setTimeout(() => {
          handleClose();
          router.refresh();
        }, 1500);
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors shadow-sm whitespace-nowrap"
      >
        <Plus size={16} />
        Tambah Komoditas
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={handleBackdrop}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <div
            className="relative w-full max-w-md bg-white rounded-2xl border border-neutral-200 shadow-2xl transition-all duration-200 flex flex-col"
            style={{ animation: "modalIn .18s cubic-bezier(.16,1,.3,1) both" }}
          >
            <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-neutral-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                  Tambah Komoditas
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Tambahkan kategori komoditas baru ke dalam sistem
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="mt-0.5 p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors disabled:opacity-40"
              >
                <X size={15} />
              </button>
            </div>

            <div className="overflow-y-auto p-6 flex-1">
              <form ref={formRef} action={handleSubmit} className="space-y-6">
                
                <Field label="Nama Komoditas" icon={<Box size={14} strokeWidth={2} />}>
                  <input
                    name="name"
                    type="text"
                    placeholder="Contoh: Jagung Manis"
                    required
                    disabled={isPending}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
                  />
                </Field>

                <Field label="Kategori" icon={<Tag size={14} strokeWidth={2} />}>
                  <input
                    name="category"
                    type="text"
                    placeholder="Contoh: Pertanian"
                    required
                    disabled={isPending}
                    className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
                  />
                </Field>

                {error && (
                  <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <span className="mt-[2px] shrink-0">⚠</span>
                    <span>{error}</span>
                  </div>
                )}

                {success && (
                  <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                    <CheckCircle2 size={14} className="shrink-0" />
                    <span>{success}</span>
                  </div>
                )}

                <div className="pt-4 border-t border-neutral-100 flex justify-end gap-2 mt-6">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={isPending}
                    className="h-11 px-4 text-sm font-medium text-neutral-500 bg-white border border-neutral-200 rounded-xl hover:bg-neutral-50 hover:text-neutral-700 active:scale-95 transition-all disabled:opacity-40"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isPending || success !== null}
                    className="h-11 px-6 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 min-w-[140px]"
                  >
                    {isPending && <Loader2 size={15} className="animate-spin" />}
                    {isPending ? "Menyimpan..." : "Tambah Komoditas"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-neutral-600 uppercase tracking-wider">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
