"use server"

import { BASE_URL } from "../global/url"

export type Listing = {
  id: string
  title: string
  description: string
  image_url: string
  price_buy: number
  min_volume: number
  quality: string
  address: string
  created_at: string
}

export async function getListings(): Promise<Listing[]> {
  try {
    const res = await fetch(`${BASE_URL}/listing`, {
      method: "GET",
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed fetch listing")
    }

    const data = await res.json()

    return data
  } catch (err) {
    console.error(err)
    return []
  }
}