import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { contactsApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import Modal from "../../components/Modal";
import toast from "react-hot-toast";
import { Eye } from "lucide-react";
import { Contact, ContactStatus, ContactType } from "../../types";

const statusColors: Record<ContactStatus, string> = { new: "bg-red-100 text-red-700", read: "bg-blue-100 text-blue-700", replied: "bg-green-100 text-green-700", archived: "bg-gray-100 text-gray-500" };
const typeColors: Record<ContactType, string> = { contact: "bg-gray-100 text-gray-600", health_check: "bg-purple-100 text-purple-600", support: "bg-orange-100 text-orange-600" };

export default function ContactList() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);
  const qc = useQueryClient();
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["contacts", page, statusFilter],
    queryFn: () => contactsApi.getAll({ page, limit, status: statusFilter || undefined }).then((r) => r.data as { total: number; items: Contact[] }),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => contactsApi.updateStatus(id, status),
    onSuccess: () => { toast.success("Status updated"); qc.invalidateQueries({ queryKey: ["contacts"] }); },
    onError: () => toast.error("Update failed"),
  });

  const columns = [
    { key: "name", label: "Name", render: (row: Contact) => (<div><p className="font-medium">{row.name}</p><p className="text-xs text-gray-400">{row.email}</p></div>) },
    { key: "type", label: "Type", render: (row: Contact) => <span className={`badge ${typeColors[row.type] ?? "bg-gray-100 text-gray-600"} capitalize`}>{row.type?.replace("_", " ")}</span> },
    { key: "status", label: "Status", render: (row: Contact) => <span className={`badge ${statusColors[row.status]}`}>{row.status}</span> },
    { key: "createdAt", label: "Date", render: (row: Contact) => new Date(row.createdAt).toLocaleDateString() },
    { key: "actions", label: "", render: (row: Contact) => (<button onClick={() => setSelected(row)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100"><Eye className="w-4 h-4" /></button>) },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-lg font-semibold">Contacts</h2><p className="text-sm text-gray-500">{data?.total ?? 0} submissions</p></div>
        <select className="input w-40" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      <DataTable columns={columns} data={data?.items} loading={isLoading} page={page} totalPages={Math.ceil((data?.total ?? 0) / limit)} onPageChange={setPage} emptyMessage="No contact submissions" />
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Contact Details">
        {selected && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div><p className="text-gray-400">Name</p><p className="font-medium">{selected.name}</p></div>
              <div><p className="text-gray-400">Email</p><p className="font-medium">{selected.email}</p></div>
              <div><p className="text-gray-400">Type</p><p className="capitalize">{selected.type?.replace("_", " ")}</p></div>
              <div><p className="text-gray-400">Date</p><p>{new Date(selected.createdAt).toLocaleString()}</p></div>
            </div>
            {selected.message && <div><p className="text-xs text-gray-400 mb-1">Message</p><p className="text-sm bg-gray-50 rounded-lg p-3">{selected.message}</p></div>}
            <div>
              <label className="label">Update Status</label>
              <div className="flex gap-2">
                {(["new", "read", "replied", "archived"] as ContactStatus[]).map((s) => (
                  <button key={s} onClick={() => statusMutation.mutate({ id: selected.id, status: s })} className={`badge cursor-pointer ${statusColors[s]} ${selected.status === s ? "ring-2 ring-offset-1 ring-current" : ""}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="flex justify-end"><button onClick={() => setSelected(null)} className="btn-secondary">Close</button></div>
          </div>
        )}
      </Modal>
    </div>
  );
}
