import { CreateListingForm } from "@/components/form/create_listing_form";
import { GetCompany } from "@/features/company/get_company";
import { GetAllCommodity } from "@/features/commodity/get_all_commodity";

export const metadata = {
  title: "Buat Listing Baru | EksporIn",
};

export default async function CreateListingPage() {
  const [company, commodities] = await Promise.all([
    GetCompany(),
    GetAllCommodity(),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Buat Listing
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Tambahkan produk baru ke dalam marketplace Anda untuk dilihat oleh pembeli global.
        </p>
      </div>

      <CreateListingForm 
        companyId={company?.id || ""} 
        commodities={commodities || []}
      />
    </div>
  );
}
