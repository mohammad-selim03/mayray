import Modal from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  loading?: boolean;
  confirmLabel?: string;
  loadingLabel?: string;
  tone?: "danger" | "primary";
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  loading,
  confirmLabel = "Delete",
  loadingLabel = "Deleting...",
  tone = "danger",
}: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title ?? "Confirm"} size="sm">
      <p className="text-gray-600 mb-5">{message ?? "Are you sure?"}</p>
      <div className="flex justify-end gap-2">
        <button onClick={onClose} className="btn-secondary">Cancel</button>
        <button onClick={onConfirm} disabled={loading} className={tone === "danger" ? "btn-danger" : "btn-primary"}>
          {loading ? loadingLabel : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}
