import { ChevronLeft, ChevronRight } from "lucide-react";
import { ReactNode } from "react";

interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data?: T[];
  loading?: boolean;
  page?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends { _id?: string; id?: string }>({
  columns, data, loading, page, totalPages, onPageChange, emptyMessage = "No data found",
}: DataTableProps<T>) {
  if (loading) return <div className="card"><div className="p-8 text-center text-gray-400">Loading...</div></div>;

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 font-medium text-gray-500 whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.length ? data.map((row, i) => (
              <tr key={row.id ?? row._id ?? i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            )) : (
              <tr><td colSpan={columns.length} className="px-4 py-8 text-center text-gray-400">{emptyMessage}</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {totalPages !== undefined && totalPages > 1 && (
        <div className="flex items-center justify-end gap-2 px-4 py-3 border-t border-gray-100">
          <button onClick={() => onPageChange?.((page ?? 1) - 1)} disabled={(page ?? 1) <= 1} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm text-gray-500">Page {page} of {totalPages}</span>
          <button onClick={() => onPageChange?.((page ?? 1) + 1)} disabled={(page ?? 1) >= totalPages} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 disabled:opacity-40">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
