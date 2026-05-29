"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "../global/url"

export async function GetAllUsers(role?: string) {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const url = role
    ? `${BASE_URL}/api/users?role=${encodeURIComponent(role)}`
    : `${BASE_URL}/api/users`

  const res = await fetch(url, {
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
  return data ?? []
}
