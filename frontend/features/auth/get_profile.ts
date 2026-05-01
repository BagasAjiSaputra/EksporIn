"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "../global/url"

export async function GetProfile() {
  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

//   if (!token) {
//     redirect("/login")
//   }

  const res = await fetch(`${BASE_URL}/api/profile`, {
    method: "GET",
    headers: {
      Cookie: `token=${encodeURIComponent(token!)}`,
    },
    cache: "no-store",
  })

  const data = await res.json()

//   if (!res.ok) {
//     redirect("/login")
//   }

  return data
}