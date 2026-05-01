"use client"

import { useState, useMemo, useEffect } from "react"
import { Listing } from "@/features/listing/get_all_listing"

type Quality = "all" | string
type Theme = "light" | "dark"

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ""

const resolveImageUrl = (path: string): string => {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${IMAGE_BASE_URL}/${path.replace(/^\//, "")}`
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })

/* ── Quality badge ────────────────────────────────────────────────── */

function QualityBadge({ quality, theme }: { quality: string; theme: Theme }) {
  const light: Record<string, string> = {
    premium: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    standard: "bg-amber-50 text-amber-700 ring-amber-200",
    export: "bg-sky-50 text-sky-700 ring-sky-200",
  }
  const dark: Record<string, string> = {
    premium: "bg-emerald-900/40 text-emerald-300 ring-emerald-700",
    standard: "bg-amber-900/40 text-amber-300 ring-amber-700",
    export: "bg-sky-900/40 text-sky-300 ring-sky-700",
  }
  const map = theme === "dark" ? dark : light
  const cls =
    map[quality.toLowerCase()] ??
    (theme === "dark"
      ? "bg-zinc-800 text-zinc-400 ring-zinc-700"
      : "bg-zinc-100 text-zinc-500 ring-zinc-200")

  return (
    <span
      className={`inline-flex items-center text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full ring-1 ${cls}`}
    >
      {quality}
    </span>
  )
}

/* ── Placeholder image ────────────────────────────────────────────── */

function PlaceholderImage({ theme }: { theme: Theme }) {
  return (
    <div
      className={`w-full aspect-[4/3] flex items-center justify-center ${
        theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
      }`}
    >
      <svg
        className={`opacity-20 ${theme === "dark" ? "text-zinc-400" : "text-zinc-400"}`}
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  )
}

/* ── Listing card ─────────────────────────────────────────────────── */

function ListingCard({
  listing,
  theme,
  onClick,
}: {
  listing: Listing
  theme: Theme
  onClick: () => void
}) {
  const [imgError, setImgError] = useState(false)

  const card =
    theme === "dark"
      ? "bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:shadow-zinc-900"
      : "bg-white border-zinc-200 hover:border-zinc-300 hover:shadow-zinc-100"

  const titleCls = theme === "dark" ? "text-zinc-100" : "text-zinc-900"
  const metaCls = theme === "dark" ? "text-zinc-500" : "text-zinc-400"
  const dividerCls = theme === "dark" ? "border-zinc-800" : "border-zinc-100"
  const priceCls = theme === "dark" ? "text-zinc-100" : "text-zinc-900"
  const subCls = theme === "dark" ? "text-zinc-500" : "text-zinc-400"

  return (
    <article
      onClick={onClick}
      className={`group border rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${card}`}
    >
      <div className="relative overflow-hidden">
        {listing.image_url && !imgError ? (
          <img
            src={resolveImageUrl(listing.image_url)}
            alt={listing.title}
            className="w-full aspect-[4/3] object-cover block transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
          />
        ) : (
          <PlaceholderImage theme={theme} />
        )}
        <div className="absolute top-2.5 left-2.5">
          <QualityBadge quality={listing.quality} theme={theme} />
        </div>
      </div>

      <div className="p-4">
        <div className={`flex items-center gap-1 mb-2 ${metaCls}`}>
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" className="shrink-0">
            <path d="M8 0a5 5 0 0 0-5 5c0 4.5 5 11 5 11s5-6.5 5-11a5 5 0 0 0-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
          <span className="text-[11px] truncate">{listing.address}</span>
        </div>

        <h3 className={`text-[13px] font-semibold leading-snug line-clamp-2 mb-3 ${titleCls}`}>
          {listing.title}
        </h3>

        <div className={`flex items-end justify-between border-t pt-3 ${dividerCls}`}>
          <div>
            <p className={`font-mono text-[15px] font-bold leading-none ${priceCls}`}>
              {formatPrice(listing.price_buy)}
            </p>
            <p className={`text-[10px] mt-0.5 ${subCls}`}>per kg</p>
          </div>
          <div className="text-right">
            <p className={`text-[10px] ${subCls}`}>Min. order</p>
            <p className={`font-mono text-[12px] font-semibold ${subCls}`}>
              {listing.min_volume} kg
            </p>
          </div>
        </div>

        <div className={`flex items-center justify-between mt-3 ${subCls}`}>
          <span className="text-[10px]">{formatDate(listing.created_at)}</span>
          <span className="text-[11px] font-medium text-emerald-500 group-hover:underline">
            View →
          </span>
        </div>
      </div>
    </article>
  )
}

/* ── Detail modal ─────────────────────────────────────────────────── */

function Modal({
  listing,
  theme,
  onClose,
}: {
  listing: Listing
  theme: Theme
  onClose: () => void
}) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onClose])

  const bg = theme === "dark" ? "bg-zinc-900 border-zinc-800" : "bg-white border-zinc-200"
  const titleCls = theme === "dark" ? "text-zinc-100" : "text-zinc-900"
  const descCls = theme === "dark" ? "text-zinc-400" : "text-zinc-500"
  const statBg = theme === "dark" ? "bg-zinc-800" : "bg-zinc-50"
  const statLabel = theme === "dark" ? "text-zinc-500" : "text-zinc-400"
  const statValue = theme === "dark" ? "text-zinc-200" : "text-zinc-800"
  const closeBg =
    theme === "dark"
      ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
      : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
  const cancelBtn =
    theme === "dark"
      ? "border-zinc-700 text-zinc-400 hover:bg-zinc-800"
      : "border-zinc-200 text-zinc-600 hover:bg-zinc-50"

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`border w-full sm:max-w-lg max-h-[95dvh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-2xl shadow-2xl ${bg}`}
      >
        {/* drag handle for mobile */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div
            className={`w-10 h-1 rounded-full ${
              theme === "dark" ? "bg-zinc-700" : "bg-zinc-200"
            }`}
          />
        </div>

        {listing.image_url && !imgError ? (
          <img
            src={resolveImageUrl(listing.image_url)}
            alt={listing.title}
            className="w-full aspect-video object-cover block sm:rounded-t-2xl"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full aspect-video flex items-center justify-center sm:rounded-t-2xl ${
              theme === "dark" ? "bg-zinc-800" : "bg-zinc-100"
            }`}
          >
            <svg
              className="opacity-20"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-1">
            <QualityBadge quality={listing.quality} theme={theme} />
            <button
              onClick={onClose}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${closeBg}`}
              aria-label="Close"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>

          <h2 className={`text-[18px] font-bold leading-snug mt-3 mb-2 ${titleCls}`}>
            {listing.title}
          </h2>

          <p className={`text-[12px] flex items-center gap-1.5 mb-4 ${descCls}`}>
            <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" className="shrink-0">
              <path d="M8 0a5 5 0 0 0-5 5c0 4.5 5 11 5 11s5-6.5 5-11a5 5 0 0 0-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            {listing.address}
          </p>

          <p className={`text-[13px] leading-relaxed mb-5 ${descCls}`}>
            {listing.description}
          </p>

          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {[
              { label: "Harga / kg", value: formatPrice(listing.price_buy) },
              { label: "Min. order", value: `${listing.min_volume} kg` },
              { label: "Update", value: formatDate(listing.created_at) },
            ].map(({ label, value }) => (
              <div key={label} className={`rounded-xl p-3 ${statBg}`}>
                <p className={`text-[10px] uppercase tracking-wide mb-1 ${statLabel}`}>{label}</p>
                <p className={`text-[13px] font-semibold font-mono leading-tight ${statValue}`}>
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-2.5">
            <button
              onClick={onClose}
              className={`px-5 py-3 rounded-xl border text-[13px] font-semibold transition-colors ${cancelBtn}`}
            >
              Kembali
            </button>
            <button className="flex-1 py-3 rounded-xl bg-emerald-600 text-white text-[13px] font-bold hover:bg-emerald-500 active:scale-[.99] transition-all">
              Kontak Distributor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Theme toggle ─────────────────────────────────────────────────── */

function ThemeToggle({ theme, onToggle }: { theme: Theme; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
        theme === "dark"
          ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-200"
          : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"
      }`}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  )
}

/* ── Main catalogue ───────────────────────────────────────────────── */

export default function ListingCatalogue({ listings }: { listings: Listing[] }) {
  const [theme, setTheme] = useState<Theme>("light")
  const [search, setSearch] = useState("")
  const [quality, setQuality] = useState<Quality>("all")
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest")
  const [selected, setSelected] = useState<Listing | null>(null)

  const qualities = useMemo(() => {
    return Array.from(new Set(listings.map((l) => l.quality.toLowerCase())))
  }, [listings])

  const filtered = useMemo(() => {
    let result = listings

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q) ||
          l.address.toLowerCase().includes(q)
      )
    }

    if (quality !== "all") {
      result = result.filter((l) => l.quality.toLowerCase() === quality)
    }

    if (sort === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    } else if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price_buy - b.price_buy)
    } else {
      result = [...result].sort((a, b) => b.price_buy - a.price_buy)
    }

    return result
  }, [listings, search, quality, sort])

  /* derived classes */
  const pageBg = theme === "dark" ? "bg-zinc-950" : "bg-zinc-50"
  const headingCls = theme === "dark" ? "text-zinc-100" : "text-zinc-900"
  const subheadCls = theme === "dark" ? "text-zinc-500" : "text-zinc-400"
  const searchBg =
    theme === "dark"
      ? "bg-zinc-900 border-zinc-800 focus-within:border-zinc-600"
      : "bg-white border-zinc-200 focus-within:border-zinc-400"
  const searchText = theme === "dark" ? "text-zinc-200 placeholder:text-zinc-600" : "text-zinc-800 placeholder:text-zinc-300"
  const searchIcon = theme === "dark" ? "text-zinc-600" : "text-zinc-300"
  const filterActive = theme === "dark" ? "bg-zinc-100 text-zinc-900 border-zinc-100" : "bg-zinc-900 text-white border-zinc-900"
  const filterInactive =
    theme === "dark"
      ? "bg-transparent text-zinc-400 border-zinc-700 hover:border-zinc-500"
      : "bg-white text-zinc-500 border-zinc-200 hover:border-zinc-400"
  const sortCls =
    theme === "dark"
      ? "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500"
      : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400"
  const countCls = theme === "dark" ? "text-zinc-600" : "text-zinc-400"
  const emptyIconCls = theme === "dark" ? "text-zinc-700" : "text-zinc-300"
  const emptyTextCls = theme === "dark" ? "text-zinc-600" : "text-zinc-400"

  return (
    <div className={`min-h-screen transition-colors duration-300 ${pageBg}`}>
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">

        {/* Header */}
        <div className="flex items-start justify-between mb-8 sm:mb-10">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold tracking-tight ${headingCls}`}>
              EksporIn
            </h1>
            <p className={`text-sm mt-1 ${subheadCls}`}>
              Komoditas Go Ekspor
            </p>
          </div>
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
        </div>

        {/* Search */}
        <div
          className={`flex items-center gap-3 border rounded-2xl px-4 h-12 sm:h-13 mb-4 transition-colors ${searchBg}`}
        >
          <svg
            className={`flex-shrink-0 ${searchIcon}`}
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3 3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari Produk, Lokasi"
            className={`flex-1 bg-transparent text-sm outline-none ${searchText}`}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className={`${searchIcon} hover:opacity-70 transition-opacity`}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          )}
        </div>

        {/* Filters + Sort */}
        <div className="flex items-center gap-2 flex-wrap mb-2">
          {(["all", ...qualities] as Quality[]).map((q) => (
            <button
              key={q}
              onClick={() => setQuality(q)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all ${
                quality === q ? filterActive : filterInactive
              }`}
            >
              {q === "all" ? "All" : q.charAt(0).toUpperCase() + q.slice(1)}
            </button>
          ))}

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className={`ml-auto text-xs font-semibold px-4 py-2 rounded-full border outline-none cursor-pointer transition-colors ${sortCls}`}
          >
            <option value="newest">Terbaru</option>
            <option value="price-asc">Harga: murah → mahal</option>
            <option value="price-desc">Harga: mahal → murah</option>
          </select>
        </div>

        {/* Count */}
        <p className={`text-xs mb-5 ${countCls}`}>
          {filtered.length} {filtered.length === 1 ? "listing" : "listings"} found
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className={`flex flex-col items-center justify-center py-24 gap-3 ${emptyTextCls}`}>
            <svg
              className={emptyIconCls}
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <p className="text-sm font-medium">Listing tidak ditemukan</p>
            <button
              onClick={() => { setSearch(""); setQuality("all") }}
              className="text-xs text-emerald-500 hover:underline mt-1"
            >
              Bersihkan
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filtered.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                theme={theme}
                onClick={() => setSelected(listing)}
              />
            ))}
          </div>
        )}
      </main>

      {selected && (
        <Modal listing={selected} theme={theme} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}