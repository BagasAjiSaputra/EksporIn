import { GetPrivateListing } from "@/features/listing/get_private_listing";
import { GetAllCommodity } from "@/features/commodity/get_all_commodity";
import { Package, MapPin, Scale, Banknote, Calendar, BadgeInfo, Pencil, Trash2, Plus } from "lucide-react";
import { BASE_URL } from "@/features/global/url";
import { UpdateListingModal } from "@/components/form/update_listing_modal";
import { CreateListingModal } from "@/components/form/create_listing_modal";
import { GetCompany } from "@/features/company/get_company";

export default async function ManageListingPage() {
  const [listings, commodities, company] = await Promise.all([
    GetPrivateListing(),
    GetAllCommodity(),
    GetCompany()
  ]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "pending":
        return "bg-amber-50 text-amber-600 border-amber-200";
      case "completed":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "expired":
        return "bg-red-50 text-red-600 border-red-200";
      default:
        return "bg-neutral-50 text-neutral-600 border-neutral-200";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Kelola Listing
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Lihat dan kelola semua listing yang telah Anda buat.
          </p>
        </div>
        <CreateListingModal companyId={company?.id || ""} commodities={commodities || []} />
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        {listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-4">
              <Package size={28} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Belum ada listing</h3>
            <p className="text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
              Anda belum membuat listing apapun. Silakan buat listing baru untuk mulai mencari supplier.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Listing</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Harga/Kebutuhan</th>
                  <th className="px-6 py-4 font-medium">Lokasi</th>
                  <th className="px-6 py-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {listings.map((listing) => (
                  <tr key={listing.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0 relative">
                          {listing.image_url ? (
                            <img
                              src={`${BASE_URL}${listing.image_url}`}
                              alt={listing.title}
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <Package className="absolute inset-0 m-auto text-neutral-400" size={20} />
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-neutral-900 line-clamp-1 max-w-[200px] truncate whitespace-normal">
                            {listing.title}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5 font-mono">
                            ID: {listing.id.substring(0, 8)}...
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border uppercase tracking-wider ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className="flex items-center gap-1.5 text-neutral-900 font-medium">
                          <Banknote size={14} className="text-emerald-500" />
                          Rp {listing.price_buy.toLocaleString("id-ID")}
                        </span>
                        <span className="flex items-center gap-1.5 text-neutral-500 text-xs">
                          <Scale size={13} />
                          Min: {listing.min_volume} / Curr: {listing.current_volume}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-neutral-600">
                        <MapPin size={14} className="text-neutral-400 shrink-0" />
                        <span className="truncate max-w-[150px]">{listing.location}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <UpdateListingModal listing={listing} commodities={commodities} />
                      <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50 hover:text-red-600 transition-colors shadow-sm">
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
