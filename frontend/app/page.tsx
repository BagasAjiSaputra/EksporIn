import { getListings, Listing } from "@/features/listing/get_all_listing"
import ListingCatalogue from "@/components/listing/listing_catalogue"

export const metadata = {
  title: "EksporIn Aja",
  description: "Web Platform Ekspor Komoditas",
}

export default async function CataloguePage() {
  const listings = await getListings()

  return <ListingCatalogue listings={listings} />
}