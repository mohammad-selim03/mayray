import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../services/api";
import { AnalyticsStats } from "../types";
import StatCard from "../components/StatCard";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";
import { Users, FileText, Mail, Activity, Eye, MessageSquare } from "lucide-react";

interface BlogStats {
  topPosts: { id: string; title: string; views: number; publishedAt: string | null }[];
  byStatus: { _id: string; count: number }[];
}

interface ContactStats {
  byType: { _id: string; count: number }[];
  byStatus: { _id: string; count: number }[];
}

const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export default function Analytics() {
  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ["analytics", "overview"],
    queryFn: () => analyticsApi.getOverview().then((r) => (r.data as { stats: AnalyticsStats }).stats),
  });

  const { data: blogStats } = useQuery({
    queryKey: ["analytics", "blogs"],
    queryFn: () => analyticsApi.getBlogStats().then((r) => r.data as BlogStats),
  });

  const { data: contactStats } = useQuery({
    queryKey: ["analytics", "contacts"],
    queryFn: () => analyticsApi.getContactStats().then((r) => r.data as ContactStats),
  });

  if (loadingOverview) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="h-28 bg-gray-200 rounded-xl" />)}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-72 bg-gray-200 rounded-xl" />
          <div className="h-72 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Blog Posts" value={overview?.blogs.published ?? 0} icon={FileText} color="purple" sub={`${overview?.blogs.total ?? 0} total`} />
        <StatCard label="Blog Views" value={overview?.totalBlogViews ?? 0} icon={Eye} color="primary" />
        <StatCard label="New Contacts" value={overview?.contacts.new ?? 0} icon={MessageSquare} color="orange" sub={`${overview?.contacts.total ?? 0} total`} />
        <StatCard label="Active Subscribers" value={overview?.newsletter.active ?? 0} icon={Mail} color="green" sub={`${overview?.newsletter.total ?? 0} total`} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Health Checks" value={overview?.healthChecks.pending ?? 0} icon={Activity} color="orange" sub="pending" />
        <StatCard label="Total Checks" value={overview?.healthChecks.total ?? 0} icon={Users} color="primary" />
        <StatCard label="Testimonials" value={overview?.testimonials.total ?? 0} icon={Users} color="purple" />
        <StatCard label="Newsletter Total" value={overview?.newsletter.total ?? 0} icon={Mail} color="green" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top blog posts by views */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Top Blog Posts by Views</h3>
          {blogStats?.topPosts.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={blogStats.topPosts} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="title"
                  tick={{ fontSize: 10 }}
                  tickFormatter={(v: string) => (v.length > 16 ? v.slice(0, 16) + "…" : v)}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(val) => [val, "Views"]} labelFormatter={(l: string) => l} />
                <Bar dataKey="views" fill="#6366f1" radius={[4, 4, 0, 0]} name="Views" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-sm text-gray-400">No data yet</div>
          )}
        </div>

        {/* Blog posts by status */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Blog Posts by Status</h3>
          {blogStats?.byStatus.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={blogStats.byStatus} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={80} label={({ _id, count }) => `${_id}: ${count}`}>
                  {blogStats.byStatus.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(val, name) => [val, name]} />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-sm text-gray-400">No data yet</div>
          )}
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contacts by type */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Contacts by Type</h3>
          {contactStats?.byType.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={contactStats.byType} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-sm text-gray-400">No data yet</div>
          )}
        </div>

        {/* Contacts by status */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Contacts by Status</h3>
          {contactStats?.byStatus.length ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={contactStats.byStatus} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="_id" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#f59e0b" radius={[4, 4, 0, 0]} name="Count" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[220px] flex items-center justify-center text-sm text-gray-400">No data yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
