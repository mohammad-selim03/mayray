import { useQuery } from "@tanstack/react-query";
import { analyticsApi } from "../services/api";
import StatCard from "../components/StatCard";
import { FileText, MessageSquare, Mail, HeartPulse, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { AnalyticsStats } from "../types";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics-overview"],
    queryFn: () => analyticsApi.getOverview().then((r) => r.data.stats as AnalyticsStats),
  });

  if (isLoading) return <div className="text-gray-400 p-4">Loading dashboard...</div>;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Overview</h2>
        <p className="text-sm text-gray-500">Summary of your Mayray AI platform</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Link to="/blog"><StatCard label="Published Posts" value={data?.blogs.published} sub={`${data?.blogs.total ?? 0} total`} icon={FileText} color="primary" /></Link>
        <StatCard label="Blog Views" value={data?.totalBlogViews} icon={Eye} color="green" />
        <Link to="/contacts"><StatCard label="New Contacts" value={data?.contacts.new} sub={`${data?.contacts.total ?? 0} total`} icon={MessageSquare} color="orange" /></Link>
        <Link to="/newsletter"><StatCard label="Subscribers" value={data?.newsletter.active} sub={`${data?.newsletter.total ?? 0} total`} icon={Mail} color="purple" /></Link>
        <Link to="/health-checks"><StatCard label="Health Checks" value={data?.healthChecks.pending} sub={`${data?.healthChecks.total ?? 0} total`} icon={HeartPulse} color="red" /></Link>
        <Link to="/testimonials"><StatCard label="Testimonials" value={data?.testimonials.total} icon={Star} color="green" /></Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <h3 className="font-medium text-gray-900 mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/blog/new" className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"><FileText className="w-4 h-4" /> Write new blog post</Link>
            <Link to="/testimonials" className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"><Star className="w-4 h-4" /> Manage testimonials</Link>
            <Link to="/contacts" className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"><MessageSquare className="w-4 h-4" /> Review contact submissions</Link>
            <Link to="/health-checks" className="flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700 font-medium"><HeartPulse className="w-4 h-4" /> Process health check assessments</Link>
          </div>
        </div>
        <div className="card p-5">
          <h3 className="font-medium text-gray-900 mb-3">Content Status</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-500">Published blogs</span><span className="font-medium">{data?.blogs.published}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Draft blogs</span><span className="font-medium">{(data?.blogs.total ?? 0) - (data?.blogs.published ?? 0)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Active subscribers</span><span className="font-medium">{data?.newsletter.active}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Pending assessments</span><span className="font-medium text-orange-500">{data?.healthChecks.pending}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Unread contacts</span><span className="font-medium text-red-500">{data?.contacts.new}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
