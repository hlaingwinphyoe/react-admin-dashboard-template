import { Moon, Sun } from "lucide-react";
import { useMemo } from "react";
import { useLocation } from "react-router";

import { useTheme } from "@/components/provider/theme-provider";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import Notifications from "./Notifications";
import Profile from "./Profile";
import sidebarItems from "../sidebar/sidebaritems";

const Header = () => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const currentPage = useMemo(
    () => sidebarItems.find((item) => item.url === location.pathname),
    [location.pathname],
  );

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-background/92 backdrop-blur-xl dark:border-white/8">
      <div className="flex min-h-16 items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <SidebarTrigger className="size-10 shrink-0 rounded-xl border border-border bg-white dark:bg-white/2 text-foreground hover:bg-muted" />
          <div className="h-6 w-px shrink-0 bg-border/80" />
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold tracking-tight sm:text-xl">
              {currentPage?.title ?? "Dashboard"}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-10 rounded-xl border border-border bg-white dark:bg-white/2 text-foreground hover:bg-muted"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="size-4" />
            ) : (
              <Sun className="size-4" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <Notifications />
          <Profile />
        </div>
      </div>
    </header>
  );
};

export default Header;
