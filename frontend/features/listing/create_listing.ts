"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "../global/url";

export async function CreateListingAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized: No token found" };
    }

    const res = await fetch(`${BASE_URL}/api/manage-listing`, {
      method: "POST",
      headers: {
        Cookie: `token=${encodeURIComponent(token)}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to create listing" };
    }

    return { success: true, message: data.message || "Berhasil Menambahkan Listing" };
  } catch (error) {
    console.error("CreateListing Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
