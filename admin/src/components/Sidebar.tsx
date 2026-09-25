import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useUnsavedChanges } from "../contexts/UnsavedChangesContext";
import {
  LucideIcon, LayoutDashboard, FileText, Star, Puzzle, Zap, Briefcase,
  Mail, Users, BarChart2, MessageSquare, Activity, HeartPulse,
  Layers, TrendingUp,
  PanelsTopLeft, Images,
} from "lucide-react";

interface NavItem {
  to?: string;
  label: string;
  icon?: LucideIcon;
  divider?: boolean;
}

const links: NavItem[] = [
  { to: "/dashboard",   label: "Dashboard",      icon: LayoutDashboard },
  { to: "/analytics",   label: "Analytics",       icon: BarChart2 },

  { label: "Content", divider: true },
  { to: "/content",     label: "Pages & blocks",  icon: PanelsTopLeft },
  { to: "/media",       label: "Media library",   icon: Images },

  { label: "Collections", divider: true },
  { to: "/industry-roi",  label: "Industry ROI",   icon: TrendingUp },
  { to: "/integrations",  label: "Integrations",   icon: Puzzle },
  { to: "/features",      label: "Features",        icon: Zap },
  { to: "/scaling",       label: "Scaling Steps",   icon: Layers },
  { to: "/use-cases",     label: "Use Cases",       icon: Briefcase },
  { to: "/testimonials",  label: "Testimonials",    icon: Star },
  { to: "/blog",          label: "Blog Posts",      icon: FileText },

  { label: "Pages", divider: true },
  { to: "/content/home",         label: "Home Page",          icon: LayoutDashboard },
  { to: "/content/pricing",      label: "Pricing",            icon: FileText },
  { to: "/content/contact",      label: "Contact",            icon: FileText },
  { to: "/content/blog",         label: "Blog Page",          icon: FileText },
  { to: "/content/privacy",      label: "Privacy Policy",     icon: FileText },
  { to: "/content/terms",        label: "Terms & Conditions", icon: FileText },
  { to: "/content/not-found",    label: "404 Page",           icon: FileText },

  { label: "Leads", divider: true },
  { to: "/contacts",      label: "Contacts",        icon: MessageSquare },
  { to: "/newsletter",    label: "Newsletter",      icon: Mail },
  { to: "/health-checks", label: "Health Checks",   icon: HeartPulse },

  { label: "Admin", divider: true },
  { to: "/users",         label: "Users",           icon: Users },
  { to: "/audit-logs",    label: "Audit Logs",      icon: FileText },
];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { guard } = useUnsavedChanges();
  const { pathname } = useLocation();
  // When a link matches the page exactly, it alone is highlighted (not "Pages & blocks" as well).
  const exactMatch = links.some((l) => l.to === pathname);
  return (
    <aside className="flex flex-col h-full bg-white border-r border-gray-100 w-56 shrink-0">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-100">
        <div className="w-7 h-7 rounded-lg bg-primary-500 flex items-center justify-center">
          <Activity className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-gray-900">Mayray Admin</span>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        {links.map((item, i) =>
          item.divider ? (
            <p key={i} className="text-xs font-semibold uppercase text-gray-400 px-3 pt-4 pb-1 tracking-wider">
              {item.label}
            </p>
          ) : (
            <NavLink
              key={item.to}
              to={item.to!}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                guard(() => {
                  onClose?.();
                  navigate(item.to!);
                });
              }}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium mb-0.5 transition-colors ${
                  isActive && (!exactMatch || item.to === pathname) ? "bg-primary-50 text-primary-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              {item.icon && <item.icon className="w-4 h-4 shrink-0" />}
              {item.label}
            </NavLink>
          )
        )}
      </nav>
    </aside>
  );
}
