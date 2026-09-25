import { LucideIcon } from "lucide-react";

type Color = "primary" | "green" | "orange" | "purple" | "red";

interface StatCardProps {
  label: string;
  value: number | string | undefined | null;
  icon?: LucideIcon;
  color?: Color;
  sub?: string;
}

const colorMap: Record<Color, string> = {
  primary: "bg-primary-50 text-primary-600",
  green: "bg-green-50 text-green-600",
  orange: "bg-orange-50 text-orange-600",
  purple: "bg-purple-50 text-purple-600",
  red: "bg-red-50 text-red-600",
};

export default function StatCard({ label, value, icon: Icon, color = "primary", sub }: StatCardProps) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value ?? "—"}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
