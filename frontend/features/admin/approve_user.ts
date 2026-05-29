"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "../global/url"

export async function ApproveUser(userId: string, approve: boolean) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const res = await fetch(`${BASE_URL}/api/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${encodeURIComponent(token!)}`,
    },
    body: JSON.stringify({
      user_id: userId,
      approve: approve,
    }),
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => null)
    return {
      success: false,
      message: errorData?.message || "Gagal memproses permintaan",
    }
  }

  const data = await res.json()
  return {
    success: true,
    message: data.message || (approve ? "User berhasil diverifikasi" : "User ditolak"),
    data,
  }
}
