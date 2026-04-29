import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, UserCog } from "lucide-react";

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

  // user settings
  {
    section: "User Settings",
    title: "Profile",
    url: "/profile",
    icon: UserCog,
  },
];

export default sidebarItems;
