import { MediaUrlField } from "../cms/components/MediaUrlField";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { industryROIApi } from "../services/api";
import toast from "react-hot-toast";

interface IndustryROI {
  id: string;
  industry: string;
  cvr: string;
  showUp: string;
  image: string | null;
  useCases: string[];
  isActive: boolean;
  order: number;
}

const emptyForm = { industry: "", cvr: "", showUp: "", image: "", useCases: [] as string[], isActive: true };

export default function IndustryROIPage() {
  const qc = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["industryROI"],
    queryFn: () => industryROIApi.getAll().then((r) => r.data.items as IndustryROI[]),
  });

  const createMutation = useMutation({
    mutationFn: () => industryROIApi.create(form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["industryROI"] }); setForm({ ...emptyForm }); setIsCreating(false); toast.success("Created"); },
    onError: () => toast.error("Create failed"),
  });

  const updateMutation = useMutation({
    mutationFn: () => industryROIApi.update(editingId!, form),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["industryROI"] }); setEditingId(null); setForm({ ...emptyForm }); toast.success("Updated"); },
    onError: () => toast.error("Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => industryROIApi.remove(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["industryROI"] }); toast.success("Deleted"); },
    onError: () => toast.error("Delete failed"),
  });

  const handleEdit = (item: IndustryROI) => {
    setEditingId(item.id);
    setForm({ industry: item.industry, cvr: item.cvr, showUp: item.showUp, image: item.image || "", useCases: item.useCases, isActive: item.isActive });
  };

  const handleSubmit = () => {
    if (!form.industry || !form.cvr || !form.showUp) { toast.error("Fill all required fields"); return; }
    editingId ? updateMutation.mutate() : createMutation.mutate();
  };

  const handleCancel = () => { setEditingId(null); setIsCreating(false); setForm({ ...emptyForm }); };

  if (isLoading) return <div className="text-sm text-gray-400">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Industry ROI</h2>
          <p className="text-sm text-gray-500">Manage industry-specific ROI insights</p>
        </div>
        {!isCreating && !editingId && (
          <button onClick={() => setIsCreating(true)} className="btn-primary">+ Add Entry</button>
        )}
      </div>

      {(isCreating || editingId) && (
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-100">
            {editingId ? "Edit Entry" : "New Entry"}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="label">Industry Name *</label>
              <input className="input" value={form.industry} onChange={(e) => setForm({ ...form, industry: e.target.value })} placeholder="e.g., Car, Real estate" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">CVR *</label>
                <input className="input" value={form.cvr} onChange={(e) => setForm({ ...form, cvr: e.target.value })} placeholder="e.g., 400%" />
              </div>
              <div>
                <label className="label">Show Up Rate *</label>
                <input className="input" value={form.showUp} onChange={(e) => setForm({ ...form, showUp: e.target.value })} placeholder="e.g., 20-40%" />
              </div>
            </div>
            <MediaUrlField id="roi-image" label="Image" kind="image" value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
            <div>
              <label className="label">Use Cases (comma separated)</label>
              <textarea
                className="input resize-none"
                rows={3}
                value={form.useCases.join(", ")}
                onChange={(e) => setForm({ ...form, useCases: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                placeholder="e.g., Lead Qualification, Support, Appointment Confirmation"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                <span className="label mb-0">Active</span>
              </label>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button onClick={handleCancel} className="btn-secondary">Cancel</button>
              <button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending} className="btn-primary">
                {editingId ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="card p-5">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{item.industry}</h3>
                <p className="text-sm text-gray-500 mt-1">CVR: {item.cvr} | Show Up: {item.showUp}</p>
                <p className="text-sm text-gray-500">Use Cases: {item.useCases.join(", ")}</p>
                <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full font-medium ${item.isActive ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(item)} className="btn-secondary text-sm px-3 py-1.5">Edit</button>
                <button onClick={() => deleteMutation.mutate(item.id)} disabled={deleteMutation.isPending} className="text-sm px-3 py-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="card p-8 text-center text-gray-400 text-sm">No entries yet. Add your first industry ROI entry.</div>
        )}
      </div>
    </div>
  );
}
