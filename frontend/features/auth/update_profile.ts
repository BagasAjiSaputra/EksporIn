"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "../global/url"

export async function UpdateProfile(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const cookieStore = await cookies()
  const token = cookieStore.get("token")?.value

  const res = await fetch(`${BASE_URL}/api/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${encodeURIComponent(token!)}`,
    },
    body: JSON.stringify({ name, email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    return { error: "Gagal Update Profile" }
  }
}