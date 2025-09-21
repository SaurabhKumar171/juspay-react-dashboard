import {
  BookOpen,
  Briefcase,
  FileText,
  Home,
  ShoppingBag,
  User,
  Users,
  Folder,
  File,
  UserCheck,
  User2,
  Layers,
  PenSquare,
  MessageSquare,
} from "lucide-react";

// Dashboards section
export const dashboards = [
  { label: "Default", icon: Home, to: "/" },
  { label: "eCommerce", icon: ShoppingBag, to: "/orders" },
  { label: "Projects", icon: Briefcase, to: "/projects" },
  { label: "Online Courses", icon: BookOpen, to: "/courses" },
];

// Pages section
export const pages = [
  {
    label: "User Profile",
    icon: User,
    children: [
      { label: "Overview", icon: FileText, to: "/profile/overview" },
      { label: "Projects", icon: Folder, to: "/profile/projects" },
      { label: "Campaigns", icon: Layers, to: "/profile/campaigns" },
      { label: "Documents", icon: File, to: "/profile/documents" },
      { label: "Followers", icon: Users, to: "/profile/followers" },
    ],
  },
  {
    label: "Account",
    icon: UserCheck,
    to: "/account",
  },
  {
    label: "Corporate",
    icon: User2,
    to: "/corporate",
  },
  {
    label: "Blog",
    icon: PenSquare,
    to: "/blog",
  },
  {
    label: "Social",
    icon: MessageSquare,
    to: "/social",
  },
];
