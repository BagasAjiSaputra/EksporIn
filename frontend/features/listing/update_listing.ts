"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "../global/url";
import { revalidatePath } from "next/cache";

export async function UpdateListingAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized: No token found" };
    }

    const res = await fetch(`${BASE_URL}/api/manage-listing`, {
      method: "PUT",
      headers: {
        Cookie: `token=${encodeURIComponent(token)}`,
      },
      body: formData,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to update listing" };
    }

    revalidatePath("/dashboard/listing");
    return { success: true, message: data.message || "Berhasil Mengupdate Listing" };
  } catch (error) {
    console.error("UpdateListing Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
