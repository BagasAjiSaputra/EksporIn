import { redirect } from "next/navigation"
import { resetPassword } from "@/features/auth/reset_password"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams
  const token = params.token

  if (!token) {
    redirect("/login")
  }

  return (
    <form action={resetPassword}>
      <input type="hidden" name="token" value={token} />

      <input name="new_password" type="password" required />

      <button type="submit">Reset</button>
    </form>
  )
}