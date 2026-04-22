import { FC } from "react";
import { Outlet } from "react-router";

import ScrollToTop from "@/components/shared/ScrollToTop";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import Header from "./vertical/header/Header";
import Sidebar from "./vertical/sidebar/Sidebar";

const FullLayout: FC = () => {
  return (
    <SidebarProvider defaultOpen>
      <Sidebar />
      <SidebarInset>
        <Header />
        <ScrollToTop>
          <main className="flex-1 overflow-auto bg-background px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </ScrollToTop>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default FullLayout;
