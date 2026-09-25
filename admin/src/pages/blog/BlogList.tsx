import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { blogApi } from "../../services/api";
import DataTable from "../../components/DataTable";
import ConfirmDialog from "../../components/ConfirmDialog";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Blog, BlogStatus } from "../../types";

const statusColors: Record<BlogStatus, string> = {
  published: "bg-green-100 text-green-700",
  draft: "bg-gray-100 text-gray-600",
  scheduled: "bg-blue-100 text-blue-700",
};

export default function BlogList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const qc = useQueryClient();
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["blogs", page, search],
    queryFn: () => blogApi.getAll({ page, limit, search }).then((r) => r.data as { total: number; posts: Blog[] }),
  });

  const deleteMutation = useMutation({
    mutationFn: blogApi.remove,
    onSuccess: () => { toast.success("Post deleted"); qc.invalidateQueries({ queryKey: ["blogs"] }); setDeleteId(null); },
    onError: () => toast.error("Delete failed"),
  });

  const columns = [
    { key: "title", label: "Title", render: (row: Blog) => (
      <div>
        <p className="font-medium text-gray-900 line-clamp-1">{row.title}</p>
        <p className="text-xs text-gray-400">{row.author}</p>
      </div>
    )},
    { key: "category", label: "Category", render: (row: Blog) => (
      <span className="badge bg-purple-100 text-purple-700">{row.category}</span>
    )},
    { key: "status", label: "Status", render: (row: Blog) => (
      <span className={`badge ${statusColors[row.status]}`}>{row.status}</span>
    )},
    { key: "views", label: "Views", render: (row: Blog) => (
      <span className="flex items-center gap-1 text-gray-500"><Eye className="w-3.5 h-3.5" />{row.views}</span>
    )},
    { key: "createdAt", label: "Created", render: (row: Blog) => new Date(row.createdAt).toLocaleDateString() },
    { key: "actions", label: "", render: (row: Blog) => (
      <div className="flex items-center gap-1">
        <Link to={`/blog/${row.id}/edit`} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600"><Pencil className="w-4 h-4" /></Link>
        <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Blog Posts</h2>
          <p className="text-sm text-gray-500">{data?.total ?? 0} posts</p>
        </div>
        <Link to="/blog/new" className="btn-primary"><Plus className="w-4 h-4" /> New Post</Link>
      </div>
      <div className="mb-4">
        <input className="input max-w-xs" placeholder="Search posts..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} />
      </div>
      <DataTable
        columns={columns}
        data={data?.posts}
        loading={isLoading}
        page={page}
        totalPages={Math.ceil((data?.total ?? 0) / limit)}
        onPageChange={setPage}
        emptyMessage="No blog posts yet"
      />
      <ConfirmDialog open={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={() => deleteId && deleteMutation.mutate(deleteId)} loading={deleteMutation.isPending} title="Delete Post" message="This action cannot be undone." />
    </div>
  );
}
