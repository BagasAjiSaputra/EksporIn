"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { UpdateListingAction } from "@/features/listing/update_listing";
import { PrivateListing } from "@/features/listing/get_private_listing";
import { BASE_URL } from "@/features/global/url";
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
  Pencil,
  X,
  BadgeInfo
} from "lucide-react";

interface CommodityData {
  id: string;
  name: string;
  category: string;
}

export function UpdateListingModal({
  listing,
  commodities,
}: {
  listing: PrivateListing;
  commodities: CommodityData[];
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    listing.image_url ? `${BASE_URL}${listing.image_url}` : null
  );

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
    setImagePreview(listing.image_url ? `${BASE_URL}${listing.image_url}` : null)
  }

  function handleBackdrop(e: React.MouseEvent) {
    if (e.target === e.currentTarget) handleClose()
  }

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
      setImagePreview(listing.image_url ? `${BASE_URL}${listing.image_url}` : null);
    }
  };

  async function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);

    formData.append("id", listing.id);
    // If no image is selected, don't send the empty file to prevent issues
    const imageFile = formData.get("image") as File;
    if (imageFile && imageFile.size === 0) {
      formData.delete("image");
    }

    startTransition(async () => {
      const res = await UpdateListingAction(formData);

      if (!res.success) {
        setError(res.message);
      } else {
        setSuccess(res.message);
        setTimeout(() => {
          handleClose();
        }, 1500);
      }
    });
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-indigo-600 transition-colors shadow-sm"
        title="Edit Listing"
      >
        <Pencil size={14} />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={handleBackdrop}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl border border-neutral-200 shadow-2xl transition-all duration-200 flex flex-col"
            style={{ animation: "modalIn .18s cubic-bezier(.16,1,.3,1) both" }}
          >
            <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-neutral-100 shrink-0">
              <div>
                <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
                  Edit Listing
                </h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Perbarui informasi listing Anda
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company ID */}
                  <Field label="Company ID" icon={<Building size={14} strokeWidth={2} />}>
                    <input
                      name="company_id"
                      type="text"
                      placeholder="UUID Perusahaan"
                      required
                      readOnly
                      defaultValue={listing.company_id}
                      disabled={isPending}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50 cursor-not-allowed"
                    />
                  </Field>

                  {/* Commodity */}
                  <Field label="Komoditas" icon={<Box size={14} strokeWidth={2} />}>
                    <select
                      name="commodity_id"
                      required
                      disabled={isPending}
                      defaultValue={listing.commodity_id}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50 cursor-pointer"
                    >
                      <option value="" disabled>-- Pilih Komoditas --</option>
                      {commodities.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.category})
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Status Listing" icon={<BadgeInfo size={14} strokeWidth={2} />}>
                    <select
                      name="status"
                      required
                      disabled={isPending}
                      defaultValue={listing.status}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50 cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="expired">Expired</option>
                    </select>
                  </Field>

                  {/* Title */}
                  <Field label="Judul Listing" icon={<Tag size={14} strokeWidth={2} />}>
                    <input
                      name="title"
                      type="text"
                      placeholder="Contoh: Jagung Manis Kualitas A"
                      required
                      defaultValue={listing.title}
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
                      defaultValue={listing.location}
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
                    defaultValue={listing.address}
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
                    defaultValue={listing.description}
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
                      defaultValue={listing.min_volume}
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
                      defaultValue={listing.price_buy}
                      disabled={isPending}
                      className="w-full h-11 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-900 placeholder:text-stone-300 outline-none transition-all focus:border-stone-400 focus:bg-white focus:ring-2 focus:ring-stone-100 disabled:opacity-50"
                    />
                  </Field>
                </div>

                {/* Image Upload */}
                <Field label="Foto Produk (Biarkan kosong jika tidak diubah)" icon={<ImageIcon size={14} strokeWidth={2} />}>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-200 border-dashed rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors relative group">
                    <div className="space-y-2 text-center flex flex-col items-center">
                      {imagePreview ? (
                        <div className="w-full max-w-[200px] mb-3 rounded-lg overflow-hidden border border-stone-200 shadow-sm relative">
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
                          htmlFor={`listing-image-${listing.id}`}
                          className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Unggah File</span>
                          <input
                            id={`listing-image-${listing.id}`}
                            name="image"
                            type="file"
                            accept="image/*"
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
                    className="h-11 px-6 text-sm font-semibold text-white bg-neutral-900 rounded-xl hover:bg-neutral-800 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 min-w-[140px]"
                  >
                    {isPending && <Loader2 size={15} className="animate-spin" />}
                    {isPending ? "Menyimpan..." : "Simpan Perubahan"}
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
