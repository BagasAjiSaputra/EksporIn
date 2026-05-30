"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "../global/url";
import { revalidatePath } from "next/cache";

export async function DeleteCommodityAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized: No token found" };
    }

    const payload = {
      id: formData.get("id"),
    };

    const res = await fetch(`${BASE_URL}/api/commodity`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${encodeURIComponent(token)}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to delete commodity" };
    }

    revalidatePath("/admin/commodity");
    return { success: true, message: data.message || "Komoditas berhasil dihapus" };
  } catch (error) {
    console.error("DeleteCommodity Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
