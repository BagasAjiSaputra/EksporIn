"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "../global/url"

export async function GetAllCommodity() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const res = await fetch(`${BASE_URL}/api/commodity`, {
    method: "GET",
    headers: {
      Cookie: `token=${encodeURIComponent(token!)}`,
    },
    cache: "no-store",
  })
  
  if (!res.ok) {
    return []
  }

  const data = await res.json()
  return data
}
