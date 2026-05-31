"use client";

import { useEffect, useState, useTransition } from "react";
import { DeleteCommodityAction } from "@/features/commodity/delete_commodity";
import {
  Trash2,
  Loader2,
  CheckCircle2,
  X,
  AlertTriangle
} from "lucide-react";
import { useRouter } from "next/navigation";

export function DeleteCommodityModal({ commodityId, commodityName }: { commodityId: string, commodityName: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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

  async function handleDelete() {
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("id", commodityId);

    startTransition(async () => {
      const res = await DeleteCommodityAction(formData);

      if (!res.success) {
        setError(res.message);
      } else {
        setSuccess(res.message);
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
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
        title="Hapus Komoditas"
      >
        <Trash2 size={14} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={handleBackdrop}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <div
            className="relative w-full max-w-sm bg-white rounded-2xl border border-neutral-200 shadow-2xl transition-all duration-200 flex flex-col p-6"
            style={{ animation: "modalIn .18s cubic-bezier(.16,1,.3,1) both" }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-4">
                <AlertTriangle size={24} />
              </div>
              <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                Hapus Komoditas
              </h2>
              <p className="text-sm text-neutral-500 mt-2">
                Apakah Anda yakin ingin menghapus komoditas <strong>{commodityName}</strong>? Tindakan ini tidak dapat dibatalkan.
              </p>
            </div>

            {error && (
              <div className="mt-4 flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <span className="mt-[2px] shrink-0">⚠</span>
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                <CheckCircle2 size={14} className="shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <div className="flex justify-center gap-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                disabled={isPending}
                className="flex-1 h-11 px-4 text-sm font-medium text-neutral-600 bg-neutral-100 border border-transparent rounded-xl hover:bg-neutral-200 active:scale-95 transition-all disabled:opacity-40"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isPending || success !== null}
                className="flex-1 h-11 px-4 text-sm font-semibold text-white bg-red-600 rounded-xl hover:bg-red-700 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {isPending && <Loader2 size={15} className="animate-spin" />}
                {isPending ? "Menghapus..." : "Ya, Hapus"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
