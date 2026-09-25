import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { MediaUrlField } from "../../cms/components/MediaUrlField";
import { scalingApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import SortableList from "../../components/SortableList";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { ScalingStep } from "../../types";

type FormData = Partial<ScalingStep>;
interface ModalState { item?: ScalingStep }

function ScalingForm({ initial, onSubmit, loading, onClose }: { initial?: ScalingStep; onSubmit: (d: FormData) => void; loading: boolean; onClose: () => void }) {
  const { register, handleSubmit, control } = useForm<FormData>({ defaultValues: initial ?? { isCard: false, order: 0, step: "01" } });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Step Label</label><input className="input" placeholder="01" {...register("step")} /></div>
        <div><label className="label">Order</label><input type="number" className="input" {...register("order", { valueAsNumber: true })} /></div>
      </div>
      <div><label className="label">Title *</label><input className="input" {...register("title", { required: true })} /></div>
      <div><label className="label">Body *</label><textarea className="input resize-none" rows={3} {...register("body", { required: true })} /></div>
      <Controller name="icon" control={control} render={({ field }) => (
        <MediaUrlField id="scaling-icon" label="Icon" kind="image" value={field.value ?? ""} onChange={field.onChange} hint="Small square image, shown at 32 × 32px." />
      )} />
      <div className="flex items-center gap-2"><input type="checkbox" id="isCard" {...register("isCard")} /><label htmlFor="isCard" className="text-sm text-gray-600">Bottom card (not a step)</label></div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

export default function ScalingList() {
  const [modal, setModal] = useState<ModalState | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["scaling"], queryFn: () => scalingApi.getAll().then((r) => r.data.items as ScalingStep[]) });

  const saveMutation = useMutation({
    mutationFn: (d: FormData) => modal?.item ? scalingApi.update(modal.item.id, d) : scalingApi.create(d),
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["scaling"] }); setModal(null); },
    onError: () => toast.error("Save failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: scalingApi.remove,
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["scaling"] }); setDeleteId(null); },
    onError: () => toast.error("Delete failed"),
  });

  const reorderMutation = useMutation({
    mutationFn: (ids: string[]) => scalingApi.reorder(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["scaling"] }),
    onError: () => toast.error("Reorder failed"),
  });

  const steps = data?.filter((i) => !i.isCard) ?? [];
  const cards = data?.filter((i) => i.isCard) ?? [];

  const columns = [
    { key: "step", label: "Step", render: (row: ScalingStep) => <span className={`badge ${row.isCard ? "bg-purple-50 text-purple-600" : "bg-blue-50 text-blue-600"}`}>{row.isCard ? "Card" : `Step ${row.step}`}</span> },
    { key: "title", label: "Title", render: (row: ScalingStep) => <p className="font-medium max-w-xs">{row.title}</p> },
    { key: "body", label: "Body", render: (row: ScalingStep) => <p className="text-sm text-gray-500 line-clamp-2 max-w-sm">{row.body}</p> },
    { key: "actions", label: "", render: (row: ScalingStep) => (
      <div className="flex gap-1">
        <button onClick={() => setModal({ item: row })} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold">Scaling Section</h2>
          <p className="text-sm text-gray-500">{steps.length} steps · {cards.length} bottom cards</p>
        </div>
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
                <div><p className="font-medium text-sm">{row.title}</p><p className="text-xs text-gray-400">{row.isCard ? "Bottom card" : `Step ${row.step}`}</p></div>
              </div>
            )}
          />
        </div>
      ) : (
        <DataTable columns={columns} data={data} loading={isLoading} emptyMessage="No scaling steps yet" />
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.item ? "Edit Step" : "Add Step"}>
        <ScalingForm initial={modal?.item} onSubmit={(d) => saveMutation.mutate(d)} loading={saveMutation.isPending} onClose={() => setModal(null)} />
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} loading={deleteMutation.isPending} title="Delete Step" message="Delete this item?" />
    </div>
  );
}
