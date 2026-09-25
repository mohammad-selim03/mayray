import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import { AdminUser, UserRole } from "../../types";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";
import { UserPlus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export default function UserList() {
  const [modal, setModal] = useState<{ mode: "create" | "delete"; item?: AdminUser } | null>(null);
  const qc = useQueryClient();
  const { user: currentUser } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () => usersApi.getAll().then((r) => r.data as { users: AdminUser[] }),
  });

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<UserFormData>({
    defaultValues: { role: "editor" },
  });

  const createMutation = useMutation({
    mutationFn: (d: UserFormData) => usersApi.create(d),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("User created"); setModal(null); reset(); },
    onError: () => toast.error("Failed to create user"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => usersApi.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("User deleted"); setModal(null); },
    onError: () => toast.error("Failed to delete user"),
  });

  const toggleActive = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) => usersApi.update(id, { isActive }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); toast.success("User updated"); },
    onError: () => toast.error("Failed to update user"),
  });

  const roleBadge: Record<UserRole, string> = {
    admin: "bg-purple-100 text-purple-700",
    editor: "bg-blue-100 text-blue-700",
    viewer: "bg-gray-100 text-gray-600",
  };

  const columns = [
    {
      key: "name",
      label: "User",
      render: (row: AdminUser) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold">
            {row.name[0].toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{row.name}</p>
            <p className="text-xs text-gray-500">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (row: AdminUser) => (
        <span className={`badge ${roleBadge[row.role]} capitalize`}>{row.role}</span>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (row: AdminUser) => (
        <button
          onClick={() => row.id !== currentUser?.id && toggleActive.mutate({ id: row.id, isActive: !row.isActive })}
          disabled={row.id === currentUser?.id}
          className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"} ${row.id !== currentUser?.id ? "cursor-pointer hover:opacity-80" : ""}`}
        >
          {row.isActive ? "Active" : "Inactive"}
        </button>
      ),
    },
    {
      key: "lastLogin",
      label: "Last Login",
      render: (row: AdminUser) => row.lastLogin ? new Date(row.lastLogin).toLocaleDateString() : "Never",
    },
    {
      key: "actions",
      label: "",
      render: (row: AdminUser) =>
        row.id !== currentUser?.id ? (
          <button onClick={() => setModal({ mode: "delete", item: row })} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded">
            <Trash2 size={15} />
          </button>
        ) : null,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-sm text-gray-500">{data?.users.length ?? 0} users</p>
        </div>
        <button onClick={() => { reset(); setModal({ mode: "create" }); }} className="btn btn-primary flex items-center gap-2">
          <UserPlus size={16} /> Add User
        </button>
      </div>

      <DataTable columns={columns} data={data?.users} loading={isLoading} emptyMessage="No users found" />

      {/* Create modal */}
      <Modal open={modal?.mode === "create"} onClose={() => setModal(null)} title="Add User" size="sm">
        <form onSubmit={handleSubmit((d) => createMutation.mutate(d))} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input {...register("name", { required: "Required" })} className="input" placeholder="Full name" />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label">Email</label>
            <input {...register("email", { required: "Required" })} type="email" className="input" placeholder="email@example.com" />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="label">Password</label>
            <input {...register("password", { required: "Required", minLength: { value: 8, message: "Min 8 characters" } })} type="password" className="input" placeholder="Min 8 characters" />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
          </div>
          <div>
            <label className="label">Role</label>
            <select {...register("role")} className="input">
              <option value="viewer">Viewer</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setModal(null)} className="btn btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-1">
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm modal */}
      <Modal open={modal?.mode === "delete"} onClose={() => setModal(null)} title="Delete User" size="sm">
        <p className="text-sm text-gray-600 mb-6">
          Delete <span className="font-semibold">{modal?.item?.name}</span>? This cannot be undone.
        </p>
        <div className="flex gap-3">
          <button onClick={() => setModal(null)} className="btn btn-secondary flex-1">Cancel</button>
          <button onClick={() => modal?.item && deleteMutation.mutate(modal.item.id)} disabled={deleteMutation.isPending} className="btn bg-red-600 text-white hover:bg-red-700 flex-1">
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
