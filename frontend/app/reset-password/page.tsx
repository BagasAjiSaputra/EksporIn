import { redirect } from "next/navigation"
import { resetPassword } from "@/features/auth/reset_password"
import ResetPasswordForm from "./form"

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

  return <ResetPasswordForm token={token} />
}