import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { UnsavedChangesProvider } from "../contexts/UnsavedChangesContext";

const titleMap: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analytics": "Analytics",
  "/content": "Content",
  "/media": "Media Library",
  "/blog": "Blog Posts",
  "/testimonials": "Testimonials",
  "/integrations": "Integrations",
  "/features": "Features",
  "/use-cases": "Use Cases",
  "/contacts": "Contacts",
  "/newsletter": "Newsletter",
  "/health-checks": "Health Checks",
  "/users": "Users",
  "/industry-roi": "Industry ROI",
};

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = Object.entries(titleMap).find(([path]) => location.pathname.startsWith(path))?.[1] ?? "Admin";

  return (
    <UnsavedChangesProvider>
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {sidebarOpen && (
        <div className="fixed inset-0 z-20 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>
      <div className={`fixed inset-y-0 left-0 z-30 lg:hidden transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
    </UnsavedChangesProvider>
  );
}
