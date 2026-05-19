"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "../global/url"

export async function VerifyRole() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const res = await fetch(`${BASE_URL}/api/verified`, {
    method: "POST",
    headers: {
      Cookie : `token=${token}`
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error("Gagal Registrasi Akun")
  }

  return data
}