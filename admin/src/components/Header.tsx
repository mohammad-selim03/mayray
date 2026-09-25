import { useState } from "react";
import { Menu, LogOut, KeyRound } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { authApi } from "../services/api";
import Modal from "./Modal";
import toast from "react-hot-toast";

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function Header({ onMenuClick, title }: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [pwModal, setPwModal] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm<PasswordForm>();

  const changePw = useMutation({
    mutationFn: ({ currentPassword, newPassword }: PasswordForm) =>
      authApi.changePassword(currentPassword, newPassword),
    onSuccess: () => {
      toast.success("Password changed");
      setPwModal(false);
      reset();
    },
    onError: (err: unknown) => {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      toast.error(msg ?? "Failed to change password");
    },
  });

  const handleLogout = () => { logout(); navigate("/login"); };

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="font-semibold text-gray-900">{title}</h1>
      </div>

      <div className="flex items-center gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-600 px-2">
          <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-xs font-semibold text-primary-700">
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <span className="hidden sm:block font-medium">{user?.name}</span>
          <span className="hidden sm:block text-xs text-gray-400 capitalize">({user?.role})</span>
        </div>

        <button
          onClick={() => { reset(); setPwModal(true); }}
          title="Change password"
          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <KeyRound className="w-4 h-4" />
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-500 transition-colors px-2 py-1.5 rounded-lg hover:bg-red-50"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>

      <Modal open={pwModal} onClose={() => setPwModal(false)} title="Change Password" size="sm">
        <form
          onSubmit={handleSubmit((d) => changePw.mutate(d))}
          className="space-y-4"
        >
          <div>
            <label className="label">Current Password</label>
            <input
              {...register("currentPassword", { required: "Required" })}
              type="password"
              className="input"
              placeholder="Current password"
            />
            {errors.currentPassword && <p className="text-xs text-red-500 mt-1">{errors.currentPassword.message}</p>}
          </div>
          <div>
            <label className="label">New Password</label>
            <input
              {...register("newPassword", { required: "Required", minLength: { value: 8, message: "Min 8 characters" } })}
              type="password"
              className="input"
              placeholder="Min 8 characters"
            />
            {errors.newPassword && <p className="text-xs text-red-500 mt-1">{errors.newPassword.message}</p>}
          </div>
          <div>
            <label className="label">Confirm New Password</label>
            <input
              {...register("confirmPassword", {
                required: "Required",
                validate: (v) => v === watch("newPassword") || "Passwords do not match",
              })}
              type="password"
              className="input"
              placeholder="Repeat new password"
            />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setPwModal(false)} className="btn btn-secondary flex-1">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="btn btn-primary flex-1">
              {isSubmitting ? "Saving..." : "Change Password"}
            </button>
          </div>
        </form>
      </Modal>
    </header>
  );
}
