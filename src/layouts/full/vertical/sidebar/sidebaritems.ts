import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, UserRound } from "lucide-react";

export type SidebarItem = {
  section: string;
  title: string;
  url: string;
  icon: LucideIcon;
};

const sidebarItems: SidebarItem[] = [
  {
    section: "Home",
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    section: "User Settings",
    title: "Profile",
    url: "/user-profile",
    icon: UserRound,
  },
];

export default sidebarItems;
