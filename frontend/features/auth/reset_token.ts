"use server"

import { redirect } from "next/navigation"
import { BASE_URL } from "../global/url"

export async function resetToken(formData: FormData) {
  const email = formData.get("email") as string

  const res = await fetch(`${BASE_URL}/token-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })

  const data = await res.json()

  if (!res.ok) {
    return { error: "Email Invalid" }
  }

  redirect("/register")
}