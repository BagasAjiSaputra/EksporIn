"use server"

import { redirect } from "next/navigation"
import { BASE_URL } from "../global/url"

export async function resetPassword(formData: FormData) {
  const token = formData.get("token") as string
  const new_password = formData.get("new_password") as string

  console.log(token)

  if (!token) {
    return { error: "Token tidak ditemukan" }
  }

  const res = await fetch(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
      new_password,
    }),
  })

  if (!res.ok) {
    return { error: "Reset password gagal" }
  }

  redirect("/login")
}