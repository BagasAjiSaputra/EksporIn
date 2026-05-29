import { CreateListingForm } from "@/components/form/create_listing_form";

export const metadata = {
  title: "Buat Listing Baru | EksporIn",
};

export default function CreateListingPage() {
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

      <CreateListingForm />
    </div>
  );
}
