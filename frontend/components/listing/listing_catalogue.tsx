"use client"

import { useState, useMemo } from "react"
import { Listing } from "@/features/listing/get_all_listing"

type Quality = "all" | string

const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ""

const resolveImageUrl = (path: string): string => {
  if (!path) return ""
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  return `${IMAGE_BASE_URL}/${path.replace(/^\//, "")}`
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })

function QualityBadge({ quality }: { quality: string }) {
  const map: Record<string, string> = {
    premium: "bg-emerald-50 text-emerald-700 border-emerald-200",
    standard: "bg-stone-100 text-stone-600 border-stone-200",
    export: "bg-blue-50 text-blue-700 border-blue-200",
  }
  const cls = map[quality.toLowerCase()] ?? "bg-stone-100 text-stone-600 border-stone-200"
  return (
    <span className={`inline-block text-[10px] font-medium uppercase tracking-wide px-2 py-0.5 rounded-full border ${cls}`}>
      {quality}
    </span>
  )
}

function PlaceholderImage() {
  return (
    <div className="w-full aspect-[4/3] bg-stone-100 flex items-center justify-content-center">
      <svg className="m-auto opacity-20" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    </div>
  )
}

function ListingCard({ listing, onClick }: { listing: Listing; onClick: () => void }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article
      onClick={onClick}
      className="group bg-white border border-stone-200 rounded-xl overflow-hidden cursor-pointer transition-all duration-150 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-sm"
    >
      {listing.image_url && !imgError ? (
        <img
          src={resolveImageUrl(listing.image_url)}
          alt={listing.title}
          className="w-full aspect-[4/3] object-cover block"
          onError={() => setImgError(true)}
        />
      ) : (
        <PlaceholderImage />
      )}

      <div className="p-3">
        <div className="flex items-center justify-between mb-1.5">
          <QualityBadge quality={listing.quality} />
          <span className="text-[10px] text-stone-400">{formatDate(listing.created_at)}</span>
        </div>

        <h3 className="text-[13px] font-medium text-stone-900 leading-snug mb-1.5 line-clamp-2">
          {listing.title}
        </h3>

        <p className="text-[11px] text-stone-400 flex items-center gap-1 mb-2.5">
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0a5 5 0 0 0-5 5c0 4.5 5 11 5 11s5-6.5 5-11a5 5 0 0 0-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
          </svg>
          {listing.address}
        </p>

        <div className="flex items-end justify-between border-t border-stone-100 pt-2.5">
          <div>
            <p className="font-mono text-[15px] font-semibold text-stone-900 leading-none">
              {formatPrice(listing.price_buy)}
            </p>
            <p className="text-[10px] text-stone-400 mt-0.5">per unit</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-stone-400">Min. order</p>
            <p className="font-mono text-[11px] font-medium text-stone-600">{listing.min_volume} units</p>
          </div>
        </div>
      </div>
    </article>
  )
}

function Modal({ listing, onClose }: { listing: Listing; onClose: () => void }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl border border-stone-200 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-xl">
        {listing.image_url && !imgError ? (
          <img
            src={resolveImageUrl(listing.image_url)}
            alt={listing.title}
            className="w-full aspect-video object-cover rounded-t-2xl block"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full aspect-video bg-stone-100 flex items-center justify-center rounded-t-2xl">
            <svg className="opacity-20" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h2 className="text-[16px] font-semibold text-stone-900 leading-snug">{listing.title}</h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors"
              aria-label="Close"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          </div>

          <p className="text-[13px] text-stone-500 leading-relaxed mb-4">{listing.description}</p>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: "Price", value: formatPrice(listing.price_buy) },
              { label: "Min. volume", value: `${listing.min_volume} units` },
              { label: "Quality", value: listing.quality },
            ].map(({ label, value }) => (
              <div key={label} className="bg-stone-50 rounded-lg p-3">
                <p className="text-[10px] text-stone-400 mb-1">{label}</p>
                <p className="text-[13px] font-medium text-stone-800 font-mono leading-tight">{value}</p>
              </div>
            ))}
          </div>

          <p className="text-[12px] text-stone-400 flex items-start gap-1.5 mb-5">
            <svg className="mt-0.5 flex-shrink-0" width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a5 5 0 0 0-5 5c0 4.5 5 11 5 11s5-6.5 5-11a5 5 0 0 0-5-5zm0 7.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            {listing.address}
          </p>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-stone-200 text-[13px] text-stone-600 hover:bg-stone-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button className="flex-1 py-2.5 rounded-lg bg-emerald-600 text-white text-[13px] font-semibold hover:bg-emerald-700 transition-colors">
              Contact seller
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ListingCatalogue({ listings }: { listings: Listing[] }) {
  const [search, setSearch] = useState("")
  const [quality, setQuality] = useState<Quality>("all")
  const [sort, setSort] = useState<"newest" | "price-asc" | "price-desc">("newest")
  const [selected, setSelected] = useState<Listing | null>(null)

  const qualities = useMemo(() => {
    const unique = Array.from(new Set(listings.map((l) => l.quality.toLowerCase())))
    return unique
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
      result = [...result].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sort === "price-asc") {
      result = [...result].sort((a, b) => a.price_buy - b.price_buy)
    } else {
      result = [...result].sort((a, b) => b.price_buy - a.price_buy)
    }

    return result
  }, [listings, search, quality, sort])

  return (
    <>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-stone-900 tracking-tight">Marketplace</h1>
          <p className="text-sm text-stone-400 mt-0.5">Browse wholesale listings from verified sellers</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-4 h-11 mb-4 focus-within:border-stone-400 transition-colors">
          <svg className="text-stone-300 flex-shrink-0" width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="7" cy="7" r="5" />
            <path d="M11 11l3 3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search listings, locations…"
            className="flex-1 bg-transparent text-sm text-stone-800 placeholder:text-stone-300 outline-none"
          />
          {search && (
            <button onClick={() => setSearch("")} className="text-stone-300 hover:text-stone-500 transition-colors">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 1l10 10M11 1L1 11" />
              </svg>
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {(["all", ...qualities] as Quality[]).map((q) => (
            <button
              key={q}
              onClick={() => setQuality(q)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
                quality === q
                  ? "bg-stone-900 text-white border-stone-900"
                  : "bg-white text-stone-500 border-stone-200 hover:border-stone-400"
              }`}
            >
              {q === "all" ? "All listings" : q.charAt(0).toUpperCase() + q.slice(1)}
            </button>
          ))}

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as typeof sort)}
            className="ml-auto text-xs font-medium px-3.5 py-1.5 rounded-full border border-stone-200 bg-white text-stone-500 outline-none cursor-pointer hover:border-stone-400 transition-colors"
          >
            <option value="newest">Newest first</option>
            <option value="price-asc">Price: low → high</option>
            <option value="price-desc">Price: high → low</option>
          </select>
        </div>

        {/* Count */}
        <p className="text-xs text-stone-400 mb-4">
          {filtered.length} {filtered.length === 1 ? "listing" : "listings"} found
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-stone-400">
            <svg className="mx-auto mb-3 opacity-30" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
            <p className="text-sm">No listings match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} onClick={() => setSelected(listing)} />
            ))}
          </div>
        )}
      </main>

      {selected && <Modal listing={selected} onClose={() => setSelected(null)} />}
    </>
  )
}