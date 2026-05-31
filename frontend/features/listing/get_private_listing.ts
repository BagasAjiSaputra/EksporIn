"use server"

import { cookies } from "next/headers"
import { BASE_URL } from "../global/url"

export type PrivateListing = {
  id: string
  user_id: string
  commodity_id: string
  company_id: string
  image_url: string
  title: string
  description: string
  min_volume: number
  current_volume: number
  quality: string
  price_buy: number
  location: string
  address: string
  created_at: string
  updated_at: string
  expired_at: string
  status: string
}

export async function GetPrivateListing(): Promise<PrivateListing[]> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("token")?.value

    const res = await fetch(`${BASE_URL}/api/manage-listing`, {
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
    return data || []
  } catch (err) {
    console.error(err)
    return []
  }
}
