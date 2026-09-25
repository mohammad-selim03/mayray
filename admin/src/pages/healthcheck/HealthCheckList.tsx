import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { healthCheckApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import { HealthCheck, HealthCheckStatus } from "../../types";
import toast from "react-hot-toast";

const statusColors: Record<HealthCheckStatus, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  reviewed: "bg-blue-100 text-blue-700",
  completed: "bg-green-100 text-green-700",
};

export default function HealthCheckList() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const limit = 30;
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["healthchecks", page, statusFilter],
    queryFn: () =>
      healthCheckApi.getAll({ page, limit, status: statusFilter || undefined }).then((r) => r.data as { total: number; items: HealthCheck[] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => healthCheckApi.update(id, { status }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["healthchecks"] }); toast.success("Status updated"); },
    onError: () => toast.error("Failed to update"),
  });

  const columns = [
    {
      key: "company",
      label: "Company",
      render: (row: HealthCheck) => (
        <div>
          <p className="font-medium">{row.company}</p>
          <p className="text-xs text-gray-500">{row.email}</p>
        </div>
      ),
    },
    { key: "industry", label: "Industry", render: (row: HealthCheck) => <span className="text-sm text-gray-600 capitalize">{row.industry ?? "—"}</span> },
    { key: "savings", label: "Est. Savings", render: (row: HealthCheck) => row.estimatedSavings ? `$${row.estimatedSavings.toLocaleString()}` : "—" },
    {
      key: "status",
      label: "Status",
      render: (row: HealthCheck) => (
        <select
          value={row.status}
          onChange={(e) => updateMutation.mutate({ id: row.id, status: e.target.value })}
          className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${statusColors[row.status]}`}
        >
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="completed">Completed</option>
        </select>
      ),
    },
    {
      key: "createdAt",
      label: "Submitted",
      render: (row: HealthCheck) => new Date(row.createdAt).toLocaleDateString(),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold">Health Checks</h2>
          <p className="text-sm text-gray-500">{data?.total ?? 0} submissions</p>
        </div>
        <select className="input w-44" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="reviewed">Reviewed</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <DataTable
        columns={columns}
        data={data?.items}
        loading={isLoading}
        page={page}
        totalPages={Math.ceil((data?.total ?? 0) / limit)}
        onPageChange={setPage}
        emptyMessage="No health check submissions yet"
      />
    </div>
  );
}
