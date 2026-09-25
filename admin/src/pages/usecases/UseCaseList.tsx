import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { MediaUrlField } from "../../cms/components/MediaUrlField";
import { useCasesApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import SortableList from "../../components/SortableList";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { UseCase } from "../../types";

const CATEGORIES = ["marketing","sales","operations","customer_experience","finance","it","hr","productivity"];
type FormData = Partial<UseCase>;
interface ModalState { item?: UseCase }

function UseCaseForm({ initial, onSubmit, loading, onClose }: { initial?: UseCase; onSubmit: (d: FormData) => void; loading: boolean; onClose: () => void }) {
  const { register, handleSubmit, control } = useForm<FormData>({ defaultValues: initial ?? { isActive: true, order: 0 } });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div><label className="label">Title *</label><input className="input" {...register("title", { required: true })} /></div>
      <div><label className="label">Description *</label><textarea className="input resize-none" rows={2} {...register("description", { required: true })} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Category *</label>
          <select className="input" {...register("category", { required: true })}>
            <option value="">Select...</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c.replace("_", " ")}</option>)}
          </select>
        </div>
        <div><label className="label">Order</label><input type="number" className="input" {...register("order", { valueAsNumber: true })} /></div>
      </div>
      <Controller name="icon" control={control} render={({ field }) => (
        <MediaUrlField id="usecase-icon" label="Icon" kind="image" value={field.value ?? ""} onChange={field.onChange} hint="Small square image." />
      )} />
      <div className="flex items-center gap-2"><input type="checkbox" id="isActiveUC" {...register("isActive")} /><label htmlFor="isActiveUC" className="text-sm text-gray-600">Active</label></div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

export default function UseCaseList() {
  const [modal, setModal] = useState<ModalState | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["use-cases"], queryFn: () => useCasesApi.getAll().then((r) => r.data.useCases as UseCase[]) });

  const saveMutation = useMutation({
    mutationFn: (data: FormData) => modal?.item ? useCasesApi.update(modal.item.id, data) : useCasesApi.create(data),
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["use-cases"] }); setModal(null); },
    onError: () => toast.error("Save failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: useCasesApi.remove,
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["use-cases"] }); setDeleteId(null); },
    onError: () => toast.error("Delete failed"),
  });

  const reorderMutation = useMutation({
    mutationFn: (ids: string[]) => useCasesApi.reorder(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["use-cases"] }),
    onError: () => toast.error("Reorder failed"),
  });

  const columns = [
    { key: "title", label: "Title", render: (row: UseCase) => <p className="font-medium">{row.title}</p> },
    { key: "description", label: "Description", render: (row: UseCase) => <p className="text-sm text-gray-500 line-clamp-1">{row.description}</p> },
    { key: "category", label: "Category", render: (row: UseCase) => <span className="badge bg-orange-50 text-orange-600 capitalize">{row.category?.replace("_", " ")}</span> },
    { key: "isActive", label: "Status", render: (row: UseCase) => <span className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{row.isActive ? "Active" : "Hidden"}</span> },
    { key: "actions", label: "", render: (row: UseCase) => (
      <div className="flex gap-1">
        <button onClick={() => setModal({ item: row })} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-lg font-semibold">Use Cases</h2><p className="text-sm text-gray-500">{data?.length ?? 0} use cases</p></div>
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
                <div><p className="font-medium text-sm">{row.title}</p><p className="text-xs text-gray-400 capitalize">{row.category?.replace("_", " ")}</p></div>
                <span className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{row.isActive ? "Active" : "Hidden"}</span>
              </div>
            )}
          />
        </div>
      ) : (
        <DataTable columns={columns} data={data} loading={isLoading} emptyMessage="No use cases yet" />
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.item ? "Edit Use Case" : "Add Use Case"}>
        <UseCaseForm initial={modal?.item} onSubmit={(d) => saveMutation.mutate(d)} loading={saveMutation.isPending} onClose={() => setModal(null)} />
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} loading={deleteMutation.isPending} title="Delete Use Case" message="Delete this use case?" />
    </div>
  );
}
