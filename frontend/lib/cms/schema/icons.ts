/** Icons editors can pick. Each name must exist in lucide-react for both the site and the admin. */
export const ICON_NAMES = [
  "Activity", "ArrowUpRight", "Award", "BadgeCheck", "Bell", "Bolt", "BookOpen", "Bot", "Brain", "Briefcase",
  "Building2", "Calculator", "Calendar", "CalendarCheck", "CalendarDays", "CalendarX", "Car", "ChartColumn",
  "ChartLine", "ChartPie", "Check", "CircleCheck", "ClipboardCheck", "ClipboardList", "Clock", "Cloud",
  "Coins", "Cpu", "CreditCard", "Database", "DollarSign", "Droplet", "Ear", "Eye", "FileCheck", "FileSearch",
  "FileText", "Filter", "Fingerprint", "FlaskConical", "Gauge", "Gavel", "GitBranch", "Globe", "GraduationCap",
  "Handshake", "Headphones", "Heart", "HeartPulse", "Hourglass", "House", "Image", "Inbox", "Key", "KeyRound",
  "Landmark", "Languages", "Layers", "Lightbulb", "Link", "ListChecks", "Lock", "Mail", "Map", "MapPin",
  "Megaphone", "Merge", "MessageSquare", "MessageSquareOff", "Mic", "Newspaper", "Package", "PenLine", "Phone",
  "PhoneCall", "PhoneForwarded", "PhoneOff", "PiggyBank", "Plug", "Puzzle", "Radio", "Receipt", "RefreshCw",
  "Repeat", "Rocket", "Route", "Scale", "Search", "Send", "Server", "Settings", "Share2", "ShieldAlert",
  "ShieldCheck", "ShoppingBag", "ShoppingCart", "Shuffle", "Smile", "Sparkles", "Split", "Star", "Stethoscope",
  "Store", "Tag", "Target", "ThumbsUp", "Timer", "TrendingDown", "TrendingUp", "TriangleAlert", "Truck",
  "Umbrella", "User", "UserCheck", "Users", "Video", "Volume2", "Wallet", "Workflow", "Wrench", "Zap",
] as const;

export type IconName = (typeof ICON_NAMES)[number];

export const isIconName = (value: string): value is IconName => (ICON_NAMES as readonly string[]).includes(value);
