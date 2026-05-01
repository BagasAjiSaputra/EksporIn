import { GetProfile } from "@/features/auth/get_profile"

export default async function DashboardPage() {
  const profile = await GetProfile()

  return (
    <div>
      <h1>Halo, {profile.name}</h1>
      <p>{profile.email}</p>
      <p>{profile.role}</p>
    </div>
  )
}