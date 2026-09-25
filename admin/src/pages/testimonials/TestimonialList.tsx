import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { MediaUrlField } from "../../cms/components/MediaUrlField";
import { testimonialsApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import SortableList from "../../components/SortableList";
import Modal from "../../components/Modal";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Star, GripVertical as _Grip, ArrowUpDown } from "lucide-react";
import { Testimonial } from "../../types";

type TestimonialFormData = Partial<Testimonial>;

function TestimonialForm({ initial, onSubmit, loading, onClose }: { initial?: Testimonial; onSubmit: (d: TestimonialFormData) => void; loading: boolean; onClose: () => void }) {
  const { register, handleSubmit, control } = useForm<TestimonialFormData>({ defaultValues: initial ?? { isActive: true, rating: 5 } });
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div><label className="label">Quote *</label><textarea className="input resize-none" rows={3} {...register("quote", { required: true })} /></div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Name *</label><input className="input" {...register("name", { required: true })} /></div>
        <div><label className="label">Role *</label><input className="input" {...register("role", { required: true })} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="label">Company</label><input className="input" {...register("company")} /></div>
        <div><label className="label">Rating</label>
          <select className="input" {...register("rating", { valueAsNumber: true })}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}
          </select>
        </div>
      </div>
      <Controller name="avatar" control={control} render={({ field }) => (
        <MediaUrlField id="testimonial-avatar" label="Photo" kind="image" value={field.value ?? ""} onChange={field.onChange} hint="A square headshot works best." />
      )} />
      <div className="flex items-center gap-2"><input type="checkbox" id="ta" {...register("isActive")} /><label htmlFor="ta" className="text-sm text-gray-600">Active</label></div>
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
        <button type="submit" disabled={loading} className="btn-primary">{loading ? "Saving..." : "Save"}</button>
      </div>
    </form>
  );
}

interface ModalState { item?: Testimonial }

export default function TestimonialList() {
  const [modal, setModal] = useState<ModalState | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [reordering, setReordering] = useState(false);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["testimonials"], queryFn: () => testimonialsApi.getAll().then((r) => r.data.testimonials as Testimonial[]) });

  const saveMutation = useMutation({
    mutationFn: (data: TestimonialFormData) => modal?.item ? testimonialsApi.update(modal.item.id, data) : testimonialsApi.create(data),
    onSuccess: () => { toast.success("Saved"); qc.invalidateQueries({ queryKey: ["testimonials"] }); setModal(null); },
    onError: () => toast.error("Save failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: testimonialsApi.remove,
    onSuccess: () => { toast.success("Deleted"); qc.invalidateQueries({ queryKey: ["testimonials"] }); setDeleteId(null); },
    onError: () => toast.error("Delete failed"),
  });

  const reorderMutation = useMutation({
    mutationFn: (ids: string[]) => testimonialsApi.reorder(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["testimonials"] }),
    onError: () => toast.error("Reorder failed"),
  });

  const columns = [
    { key: "name", label: "Name", render: (row: Testimonial) => (<div><p className="font-medium">{row.name}</p><p className="text-xs text-gray-400">{row.role}{row.company ? ` · ${row.company}` : ""}</p></div>) },
    { key: "quote", label: "Quote", render: (row: Testimonial) => <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">{row.quote}</p> },
    { key: "rating", label: "Rating", render: (row: Testimonial) => <div className="flex gap-0.5">{Array.from({ length: row.rating }).map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}</div> },
    { key: "isActive", label: "Status", render: (row: Testimonial) => <span className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{row.isActive ? "Active" : "Hidden"}</span> },
    { key: "actions", label: "", render: (row: Testimonial) => (
      <div className="flex gap-1">
        <button onClick={() => setModal({ item: row })} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="w-4 h-4" /></button>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-lg font-semibold">Testimonials</h2><p className="text-sm text-gray-500">{data?.length ?? 0} items</p></div>
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
                <div><p className="font-medium text-sm">{row.name}</p><p className="text-xs text-gray-400">{row.role}</p></div>
                <span className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{row.isActive ? "Active" : "Hidden"}</span>
              </div>
            )}
          />
        </div>
      ) : (
        <DataTable columns={columns} data={data} loading={isLoading} emptyMessage="No testimonials yet" />
      )}
      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.item ? "Edit Testimonial" : "Add Testimonial"}>
        <TestimonialForm initial={modal?.item} onSubmit={(d) => saveMutation.mutate(d)} loading={saveMutation.isPending} onClose={() => setModal(null)} />
      </Modal>
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} loading={deleteMutation.isPending} title="Delete Testimonial" message="Delete this testimonial?" />
    </div>
  );
}
