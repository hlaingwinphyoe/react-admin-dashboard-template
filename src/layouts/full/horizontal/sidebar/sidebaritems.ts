import type { LucideIcon } from "lucide-react";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  CreditCard,
  LayoutDashboard,
  UserRound,
} from "lucide-react";

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
  // Payment
  {
    section: "Payment",
    title: "Deposits",
    url: "/deposits",
    icon: BanknoteArrowDown,
  },
  {
    section: "Payment",
    title: "Withdrawals",
    url: "/withdrawals",
    icon: BanknoteArrowUp,
  },
  {
    section: "Payment",
    title: "Payment Accounts",
    url: "/payment-accounts",
    icon: CreditCard,
  },

  // user settings
  {
    section: "User Settings",
    title: "Profile",
    url: "/profile",
    icon: UserRound,
  },
];

export default sidebarItems;
