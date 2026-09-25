import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { newsletterApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import { NewsletterSub } from "../../types";

export default function NewsletterList() {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("");
  const limit = 30;

  const { data, isLoading } = useQuery({
    queryKey: ["newsletter", page, activeFilter],
    queryFn: () => newsletterApi.getAll({ page, limit, active: activeFilter || undefined }).then((r) => r.data as { total: number; items: NewsletterSub[] }),
  });

  const columns = [
    { key: "email", label: "Email", render: (row: NewsletterSub) => <span className="font-medium">{row.email}</span> },
    { key: "isActive", label: "Status", render: (row: NewsletterSub) => <span className={`badge ${row.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{row.isActive ? "Subscribed" : "Unsubscribed"}</span> },
    { key: "source", label: "Source", render: (row: NewsletterSub) => <span className="text-sm text-gray-500 capitalize">{row.source}</span> },
    { key: "subscribedAt", label: "Subscribed", render: (row: NewsletterSub) => new Date(row.subscribedAt).toLocaleDateString() },
    { key: "unsubscribedAt", label: "Unsubscribed", render: (row: NewsletterSub) => row.unsubscribedAt ? new Date(row.unsubscribedAt).toLocaleDateString() : "—" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div><h2 className="text-lg font-semibold">Newsletter</h2><p className="text-sm text-gray-500">{data?.total ?? 0} subscribers</p></div>
        <select className="input w-44" value={activeFilter} onChange={(e) => { setActiveFilter(e.target.value); setPage(1); }}>
          <option value="">All</option>
          <option value="true">Subscribed</option>
          <option value="false">Unsubscribed</option>
        </select>
      </div>
      <DataTable columns={columns} data={data?.items} loading={isLoading} page={page} totalPages={Math.ceil((data?.total ?? 0) / limit)} onPageChange={setPage} emptyMessage="No subscribers yet" />
    </div>
  );
}
