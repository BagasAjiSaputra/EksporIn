"use client";

import { useRef, useState, useTransition } from "react";
import { CreateListingAction } from "@/features/listing/create_listing";
import {
  MapPin,
  Building,
  Box,
  Image as ImageIcon,
  DollarSign,
  Tag,
  AlignLeft,
  Briefcase,
  Loader2,
  CheckCircle2,
  UploadCloud,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function CreateListingForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Ukuran gambar maksimal 10MB");
        e.target.value = "";
        return;
      }
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    } else {
      setImagePreview(null);
    }
  };

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      const res = await CreateListingAction(formData);

      if (!res.success) {
        setError(res.message);
      } else {
        setSuccess(res.message);
        formRef.current?.reset();
        setImagePreview(null);
        setTimeout(() => {
          router.push("/dashboard");
          router.refresh();
        }, 1500);
      }
    });
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-neutral-100">
        <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
          Informasi Listing
        </h2>
        <p className="text-sm text-neutral-500 mt-1">
          Lengkapi data di bawah untuk mempublikasikan listing baru.
        </p>
      </div>

      <form ref={formRef} action={handleSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company ID */}
          <Field label="Company ID" icon={<Building size={14} strokeWidth={2} />}>
            <input
              name="company_id"
              type="text"
              placeholder="UUID Perusahaan"
              required
              disabled={isPending}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
            />
          </Field>

          {/* Commodity ID */}
          <Field label="Commodity ID" icon={<Box size={14} strokeWidth={2} />}>
            <input
              name="commodity_id"
              type="text"
              placeholder="UUID Komoditas (opsional)"
              disabled={isPending}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
            />
          </Field>

          {/* Title */}
          <Field label="Judul Listing" icon={<Tag size={14} strokeWidth={2} />}>
            <input
              name="title"
              type="text"
              placeholder="Contoh: Jagung Manis Kualitas A"
              required
              disabled={isPending}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
            />
          </Field>

          {/* Location */}
          <Field label="Kota/Lokasi" icon={<MapPin size={14} strokeWidth={2} />}>
            <input
              name="location"
              type="text"
              placeholder="Contoh: Sidoarjo"
              required
              disabled={isPending}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
            />
          </Field>
        </div>

        {/* Address */}
        <Field label="Alamat Lengkap" icon={<Briefcase size={14} strokeWidth={2} />}>
          <textarea
            name="address"
            placeholder="Jalan Patimura Sidoarjo Blok 4A Harum Indah"
            rows={3}
            required
            disabled={isPending}
            className="w-full py-2.5 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50 resize-none"
          />
        </Field>

        {/* Description */}
        <Field label="Deskripsi" icon={<AlignLeft size={14} strokeWidth={2} />}>
          <textarea
            name="description"
            placeholder="Keterangan lebih detail mengenai produk ini..."
            rows={4}
            required
            disabled={isPending}
            className="w-full py-2.5 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50 resize-none"
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Min Volume */}
          <Field label="Minimal Pembelian (Volume)" icon={<Box size={14} strokeWidth={2} />}>
            <input
              name="min_volume"
              type="number"
              min="0"
              placeholder="Contoh: 100"
              required
              disabled={isPending}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
            />
          </Field>

          {/* Price Buy */}
          <Field label="Harga Beli (Rp)" icon={<DollarSign size={14} strokeWidth={2} />}>
            <input
              name="price_buy"
              type="number"
              min="0"
              placeholder="Contoh: 15000"
              required
              disabled={isPending}
              className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
            />
          </Field>
        </div>

        {/* Image Upload */}
        <Field label="Foto Produk" icon={<ImageIcon size={14} strokeWidth={2} />}>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-200 border-dashed rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors relative group">
            <div className="space-y-2 text-center flex flex-col items-center">
              {imagePreview ? (
                <div className="w-full max-w-[200px] mb-3 rounded-lg overflow-hidden border border-stone-200 shadow-sm relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">Ganti Gambar</span>
                  </div>
                </div>
              ) : (
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-stone-200 mb-2">
                  <UploadCloud className="h-6 w-6 text-stone-400" />
                </div>
              )}
              <div className="flex text-sm text-stone-600">
                <label
                  htmlFor="listing-image"
                  className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                >
                  <span>Unggah File</span>
                  <input
                    id="listing-image"
                    name="image"
                    type="file"
                    accept="image/*"
                    required
                    className="sr-only"
                    onChange={handleImageChange}
                    disabled={isPending}
                  />
                </label>
                <p className="pl-1">atau seret dan lepas</p>
              </div>
              <p className="text-xs text-stone-500">PNG, JPG, GIF hingga 10MB</p>
            </div>
          </div>
        </Field>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <span className="mt-[2px] shrink-0">⚠</span>
            <span>{error}</span>
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
            <CheckCircle2 size={14} className="shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4 border-t border-neutral-100 flex justify-end">
          <button
            type="submit"
            disabled={isPending || success !== null}
            className="h-11 px-6 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 min-w-[140px]"
          >
            {isPending && <Loader2 size={15} className="animate-spin" />}
            {isPending ? "Menyimpan..." : "Buat Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Reusable field wrapper ────────────────────────────────────────────────
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
