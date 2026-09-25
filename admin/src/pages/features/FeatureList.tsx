import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { MediaUrlField } from "../../cms/components/MediaUrlField";
import { featuresApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import SortableList from "../../components/SortableList";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { Feature, FeatureGroup } from "../../types";

/** Where each group appears on the home page. */
const GROUP_LABELS: Record<FeatureGroup, string> = {
  A: "Home, first block (after voice agents)",
  B: "Home, second block (after the steps)",
  A2: "Not shown on the site",
};

type FormData = Partial<Feature> & { apps?: string | string[] };
interface ModalState { item?: Feature }

function FeatureForm({ initial, onSubmit, loading, onClose }: { initial?: Feature; onSubmit: (d: FormData) => void; loading: boolean; onClose: () => void }) {
  const { register, handleSubmit, control } = useForm<FormData>({
    defaultValues: initial ? { ...initial, apps: initial.apps?.join(", ") } : { group: "A", isActive: true, order: 0 },
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div><label className="label">Title *</label><input className="input" {...register("title", { required: true })} /></div>
      <div><label className="label">Description *</label><textarea className="input resize-none" rows={3} {...register("description", { required: true })} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Shown in</label>
          <select className="input" {...register("group")}>
            {(["A", "B", "A2"] as FeatureGroup[]).map((g) => <option key={g} value={g}>{GROUP_LABELS[g]}</option>)}
          </select>
        </div>
        <div><label className="label">Order</label><input type="number" className="input" {...register("order", { valueAsNumber: true })} /></div>
      </div>
      <Controller name="videoUrl" control={control} render={({ field }) => (
        <MediaUrlField id="feature-video" label="Video" kind="video" value={field.value ?? ""} onChange={field.onChange} hint="MP4 or WebM up to 50 MB." />
      )} />
      <Controller name="thumbnail" control={control} render={({ field }) => (
        <MediaUrlField id="feature-thumbnail" label="Thumbnail image" kind="image" value={field.value ?? ""} onChange={field.onChange} hint="Shown before the video plays." />
      )} />
      <div><label className="label">Apps (comma separated)</label><input className="input" placeholder="Gmail, Slack" {...register("apps")} /></div>
      <div className="flex items-center gap-2"><input type="checkbox" id="isActiveF" {...register("isActive")} /><label htmlFor="isActiveF" className="text-sm text-gray-600">Active</label></div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

export default function FeatureList() {
  const [modal, setModal] = useState<ModalState | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["features"], queryFn: () => featuresApi.getAll().then((r) => r.data.features as Feature[]) });

  const saveMutation = useMutation({
    mutationFn: (data: FormData) => modal?.item ? featuresApi.update(modal.item.id, data) : featuresApi.create(data),
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["features"] }); setModal(null); },
    onError: () => toast.error("Save failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: featuresApi.remove,
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["features"] }); setDeleteId(null); },
    onError: () => toast.error("Delete failed"),
  });

  const reorderMutation = useMutation({
    mutationFn: (ids: string[]) => featuresApi.reorder(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["features"] }),
    onError: () => toast.error("Reorder failed"),
  });

  const columns = [
    { key: "title", label: "Title", render: (row: Feature) => <p className="font-medium">{row.title}</p> },
    { key: "group", label: "Group", render: (row: Feature) => <span className={`badge ${row.group === "A2" ? "bg-gray-100 text-gray-500" : "bg-purple-50 text-purple-600"}`}>{GROUP_LABELS[row.group]}</span> },
    { key: "apps", label: "Apps", render: (row: Feature) => <span className="text-xs text-gray-500">{row.apps?.join(", ") || "—"}</span> },
    { key: "isActive", label: "Status", render: (row: Feature) => <span className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{row.isActive ? "Active" : "Hidden"}</span> },
    { key: "actions", label: "", render: (row: Feature) => (
      <div className="flex gap-1">
        <button onClick={() => setModal({ item: row })} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-lg font-semibold">Features</h2><p className="text-sm text-gray-500">{data?.length ?? 0} features</p></div>
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
                <div><p className="font-medium text-sm">{row.title}</p><p className="text-xs text-gray-400">{GROUP_LABELS[row.group]}</p></div>
                <span className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{row.isActive ? "Active" : "Hidden"}</span>
              </div>
            )}
          />
        </div>
      ) : (
        <DataTable columns={columns} data={data} loading={isLoading} emptyMessage="No features yet" />
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.item ? "Edit Feature" : "Add Feature"}>
        <FeatureForm initial={modal?.item} onSubmit={(d) => saveMutation.mutate(d)} loading={saveMutation.isPending} onClose={() => setModal(null)} />
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} loading={deleteMutation.isPending} title="Delete Feature" message="Delete this feature?" />
    </div>
  );
}
