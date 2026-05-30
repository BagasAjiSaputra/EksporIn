"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "../global/url"
import { revalidatePath } from "next/cache"

export async function UpdateCompany(formData: FormData) {
  const company_name = formData.get("company_name") as string
  const phone = formData.get("phone") as string
  const address = formData.get("address") as string

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const res = await fetch(`${BASE_URL}/api/company`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${encodeURIComponent(token!)}`,
    },
    body: JSON.stringify({ company_name, phone, address }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    return { error: errorData?.message || "Gagal memperbarui perusahaan" }
  }

  const data = await res.json()
  revalidatePath("/dashboard")
  return { success: true, message: data.message, data }
}
