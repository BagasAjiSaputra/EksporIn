"use client"
import { resetPassword } from "@/features/auth/reset_password"

export default function ResetPasswordForm({ token }: { token: string }) {
  async function action(formData: FormData) {
    const res = await resetPassword(formData)
    if (res?.error) {
      alert(res.error)
    }
  }

  return (
    <form action={action}>
      <input type="hidden" name="token" value={token} />
      <input name="new_password" type="password" required />
      <button type="submit">Reset</button>
    </form>
  )
}
