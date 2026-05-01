"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { BASE_URL } from "../global/url"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error("Email / password salah")
  }

  const cookieStore = await cookies()

  cookieStore.set("token", data.token, {
    httpOnly: true,
    path: "/",
  })

  redirect("/dashboard")
}