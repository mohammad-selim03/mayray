import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { MediaUrlField } from "../../cms/components/MediaUrlField";
import { integrationsApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import SortableList from "../../components/SortableList";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Integration } from "../../types";

const CATEGORIES = ["productivity", "communication", "crm", "storage", "analytics", "other"];
type FormData = Partial<Integration>;
interface ModalState { item?: Integration }

function IntegrationForm({ initial, onSubmit, loading, onClose }: { initial?: Integration; onSubmit: (d: FormData) => void; loading: boolean; onClose: () => void }) {
  const { register, handleSubmit, control } = useForm<FormData>({ defaultValues: initial ?? { isActive: true, order: 0 } });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Name *</label><input className="input" {...register("name", { required: true })} /></div>
        <div><label className="label">Category</label>
          <select className="input" {...register("category")}>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
        </div>
      </div>
      <Controller name="logo" control={control} render={({ field }) => (
        <MediaUrlField id="integration-logo" label="Logo" kind="image" value={field.value ?? ""} onChange={field.onChange} hint="Square PNG, SVG or WebP works best." />
      )} />
      <div><label className="label">Description</label><input className="input" {...register("description")} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Order</label><input type="number" className="input" {...register("order", { valueAsNumber: true })} /></div>
        <div className="flex items-end pb-2"><label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"><input type="checkbox" {...register("isActive")} />Active</label></div>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

export default function IntegrationList() {
  const [modal, setModal] = useState<ModalState | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["integrations"], queryFn: () => integrationsApi.getAll().then((r) => r.data.integrations as Integration[]) });

  const saveMutation = useMutation({
    mutationFn: (data: FormData) => modal?.item ? integrationsApi.update(modal.item.id, data) : integrationsApi.create(data),
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["integrations"] }); setModal(null); },
    onError: (err: unknown) => { const msg = (err as { response?: { data?: { message?: string } } }).response?.data?.message; toast.error(msg ?? "Save failed"); },
  });

  const deleteMutation = useMutation({
    mutationFn: integrationsApi.remove,
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["integrations"] }); setDeleteId(null); },
    onError: () => toast.error("Delete failed"),
  });

  const reorderMutation = useMutation({
    mutationFn: (ids: string[]) => integrationsApi.reorder(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["integrations"] }),
    onError: () => toast.error("Reorder failed"),
  });

  const columns = [
    { key: "name", label: "Name", render: (row: Integration) => (<div className="flex items-center gap-2">{row.logo && <img src={row.logo} alt={row.name} className="w-6 h-6 object-contain" />}<span className="font-medium">{row.name}</span></div>) },
    { key: "category", label: "Category", render: (row: Integration) => <span className="badge bg-blue-50 text-blue-600 capitalize">{row.category}</span> },
    { key: "order", label: "Order" },
    { key: "isActive", label: "Status", render: (row: Integration) => <span className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{row.isActive ? "Active" : "Hidden"}</span> },
    { key: "actions", label: "", render: (row: Integration) => (
      <div className="flex gap-1">
        <button onClick={() => setModal({ item: row })} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-lg font-semibold">Integrations</h2><p className="text-sm text-gray-500">{data?.length ?? 0} integrations</p></div>
        <div className="flex gap-2">
          <button onClick={() => setReordering((v) => !v)} className={`btn ${reordering ? "btn-primary" : "btn-secondary"} flex items-center gap-1.5`}>
            <ArrowUpDown size={15} />{reordering ? "Done" : "Reorder"}
          </button>
          {!reordering && <button onClick={() => setModal({})} className="btn btn-primary flex items-center gap-1.5"><Plus className="w-4 h-4" /> Add</button>}
        </div>
      </div>
      {reordering && data ? (
        <div className="card p-4">
          <SortableList
            items={data}
            onReorder={(ids) => reorderMutation.mutate(ids)}
            renderItem={(row) => (
              <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  {row.logo && <img src={row.logo} alt={row.name} className="w-5 h-5 object-contain" />}
                  <span className="font-medium text-sm">{row.name}</span>
                </div>
                <span className="badge bg-blue-50 text-blue-600 capitalize">{row.category}</span>
              </div>
            )}
          />
        </div>
      ) : (
        <DataTable columns={columns} data={data} loading={isLoading} emptyMessage="No integrations yet" />
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.item ? "Edit Integration" : "Add Integration"}>
        <IntegrationForm initial={modal?.item} onSubmit={(d) => saveMutation.mutate(d)} loading={saveMutation.isPending} onClose={() => setModal(null)} />
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} loading={deleteMutation.isPending} title="Delete Integration" message="Delete this integration?" />
    </div>
  );
}
