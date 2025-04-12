import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getUserById } from "@/lib/actions/user.actions";
import { requireAdmin } from "@/lib/auth-guard";
import EditUserForm from "./user-edit-form";

export const metadata: Metadata = {
  title: "Admin Edit User",
};

const AdminUserEditPage = async (props: {
  params: Promise<{ id: string }>;
}) => {
  await requireAdmin();
  const { id } = await props.params;

  const user = await getUserById(id);

  if (!user) notFound();

  return (
    <div className='space-y-8 max-w-lg mx-auto'>
      <h1 className='h2-bold'>Edit User</h1>
      <EditUserForm user={user} />
    </div>
  );
};

export default AdminUserEditPage;
