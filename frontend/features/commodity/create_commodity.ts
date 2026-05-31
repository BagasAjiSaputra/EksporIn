"use server";

import { cookies } from "next/headers";
import { BASE_URL } from "../global/url";
import { revalidatePath } from "next/cache";

export async function CreateCommodityAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return { success: false, message: "Unauthorized: No token found" };
    }

    const payload = {
      name: formData.get("name"),
      category: formData.get("category"),
    };

    const res = await fetch(`${BASE_URL}/api/commodity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${encodeURIComponent(token)}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to create commodity" };
    }

    revalidatePath("/admin/commodity");
    return { success: true, message: data.message || "Komoditas berhasil ditambahkan" };
  } catch (error) {
    console.error("CreateCommodity Error:", error);
    return { success: false, message: "Internal Server Error" };
  }
}
