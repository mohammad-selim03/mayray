import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import DataTable from "../../components/DataTable";
import { FileText, User, Calendar } from "lucide-react";

interface AuditLog {
  id: string;
  userId: string | null;
  action: string;
  resource: string;
  resourceId: string | null;
  details: Record<string, unknown> | null;
  ipAddress: string | null;
  createdAt: string;
}

const actionColors: Record<string, string> = {
  create: "bg-green-100 text-green-700",
  update: "bg-blue-100 text-blue-700",
  upsert: "bg-blue-100 text-blue-700",
  bulk_upsert: "bg-blue-100 text-blue-700",
  delete: "bg-red-100 text-red-700",
};

const resourceColors: Record<string, string> = {
  blog: "bg-purple-100 text-purple-700",
  page_content: "bg-indigo-100 text-indigo-700",
  user: "bg-amber-100 text-amber-700",
  testimonial: "bg-cyan-100 text-cyan-700",
  integration: "bg-teal-100 text-teal-700",
  feature: "bg-orange-100 text-orange-700",
};

export default function AuditLogList() {
  const [page, setPage] = useState(1);
  const [resource, setResource] = useState("");
  const limit = 20;

  const { data, isLoading } = useQuery({
    queryKey: ["audit-logs", page, resource],
    queryFn: () => api.get("/audit-logs", { params: { page, limit, resource: resource || undefined } }).then((r) => r.data as { total: number; logs: AuditLog[] }),
  });

  const columns = [
    { key: "action", label: "Action", render: (row: AuditLog) => (
      <span className={`badge ${actionColors[row.action] || "bg-gray-100 text-gray-600"}`}>{row.action}</span>
    )},
    { key: "resource", label: "Resource", render: (row: AuditLog) => (
      <span className={`badge ${resourceColors[row.resource] || "bg-gray-100 text-gray-600"}`}>{row.resource}</span>
    )},
    { key: "resourceId", label: "Resource ID", render: (row: AuditLog) => (
      <span className="text-xs font-mono text-gray-500">{row.resourceId ? row.resourceId.slice(0, 8) + "..." : "—"}</span>
    )},
    { key: "userId", label: "User", render: (row: AuditLog) => (
      <span className="flex items-center gap-1 text-gray-500 text-xs">
        <User className="w-3 h-3" />
        {row.userId ? row.userId.slice(0, 8) + "..." : "System"}
      </span>
    )},
    { key: "ipAddress", label: "IP", render: (row: AuditLog) => (
      <span className="text-xs text-gray-400">{row.ipAddress || "—"}</span>
    )},
    { key: "createdAt", label: "Time", render: (row: AuditLog) => (
      <span className="flex items-center gap-1 text-xs text-gray-500">
        <Calendar className="w-3 h-3" />
        {new Date(row.createdAt).toLocaleString()}
      </span>
    )},
    { key: "details", label: "Details", render: (row: AuditLog) => (
      <span className="text-xs text-gray-400 max-w-[200px] truncate block">
        {row.details ? JSON.stringify(row.details) : "—"}
      </span>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Audit Logs
          </h2>
          <p className="text-sm text-gray-500">{data?.total ?? 0} entries</p>
        </div>
      </div>
      <div className="mb-4">
        <select
          className="input max-w-xs"
          value={resource}
          onChange={(e) => { setResource(e.target.value); setPage(1); }}
        >
          <option value="">All Resources</option>
          <option value="blog">Blog</option>
          <option value="page_content">Page Content</option>
          <option value="user">User</option>
          <option value="testimonial">Testimonial</option>
          <option value="integration">Integration</option>
          <option value="feature">Feature</option>
        </select>
      </div>
      <DataTable
        columns={columns}
        data={data?.logs}
        loading={isLoading}
        page={page}
        totalPages={Math.ceil((data?.total ?? 0) / limit)}
        onPageChange={setPage}
        emptyMessage="No audit logs yet"
      />
    </div>
  );
}
