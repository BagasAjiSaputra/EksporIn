import { GetAllUsers } from "@/features/admin/get_all_users";
import { UserTable } from "@/components/admin/user_table";

export const metadata = {
  title: "Kelola User | Admin EksporIn",
};

export default async function AdminUsersPage() {
  const users = await GetAllUsers();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900">
          Kelola Pengguna
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Lihat dan filter seluruh pengguna berdasarkan role.
        </p>
      </div>

      <UserTable initialUsers={users} fetchUsers={GetAllUsers} />
    </div>
  );
}
