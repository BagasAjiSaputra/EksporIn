import { GetAllCommodity } from "@/features/commodity/get_all_commodity";
import { CreateCommodityModal } from "@/components/form/create_commodity_modal";
import { UpdateCommodityModal } from "@/components/form/update_commodity_modal";
import { DeleteCommodityModal } from "@/components/form/delete_commodity_modal";
import { Box, Tag, Package } from "lucide-react";

export const metadata = {
  title: "Kelola Komoditas | Admin EksporIn",
};

export default async function AdminCommodityPage() {
  const commodities = await GetAllCommodity();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
            Kelola Komoditas
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Tambah dan kelola daftar kategori komoditas yang tersedia di sistem.
          </p>
        </div>
        <CreateCommodityModal />
      </div>

      <div className="bg-white border border-neutral-200 rounded-xl shadow-sm overflow-hidden">
        {commodities.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-400 mb-4">
              <Package size={28} />
            </div>
            <h3 className="text-lg font-bold text-neutral-900">Belum ada komoditas</h3>
            <p className="text-sm text-neutral-500 mt-1 max-w-sm mx-auto">
              Sistem belum memiliki data komoditas. Silakan tambahkan komoditas baru.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-medium">Nama Komoditas</th>
                  <th className="px-6 py-4 font-medium">Kategori</th>
                  <th className="px-6 py-4 font-medium">ID Komoditas</th>
                  <th className="px-6 py-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {commodities.map((c: any) => (
                  <tr key={c.id} className="hover:bg-neutral-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                          <Box size={16} />
                        </div>
                        <span className="font-semibold text-neutral-900">
                          {c.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[12px] font-medium bg-neutral-100 text-neutral-700">
                        <Tag size={13} className="text-neutral-500" />
                        {c.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-neutral-400 font-mono text-xs">
                      {c.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <UpdateCommodityModal commodity={c} />
                        <DeleteCommodityModal commodityId={c.id} commodityName={c.name} />
                      </div>
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
