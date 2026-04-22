import * as React from "react";
import { PanelLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
const SIDEBAR_WIDTH = "17rem";
const SIDEBAR_WIDTH_ICON = "4.5rem";
const MOBILE_BREAKPOINT = 1024;

type SidebarContextValue = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openMobile: boolean;
  setOpenMobile: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  state: "expanded" | "collapsed";
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextValue | null>(null);

function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(
      `(max-width: ${MOBILE_BREAKPOINT - 1}px)`,
    );
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function SidebarProvider({
  defaultOpen = true,
  children,
  className,
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
}) {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const [open, setOpen] = React.useState(defaultOpen);

  React.useEffect(() => {
    const storedValue = document.cookie
      .split("; ")
      .find((entry) => entry.startsWith(`${SIDEBAR_COOKIE_NAME}=`))
      ?.split("=")[1];

    if (storedValue) {
      setOpen(storedValue === "true");
    }
  }, []);

  const setOpenWithPersistence = React.useCallback<
    React.Dispatch<React.SetStateAction<boolean>>
  >((value) => {
    setOpen((currentValue) => {
      const nextValue =
        typeof value === "function" ? value(currentValue) : value;
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${nextValue}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      return nextValue;
    });
  }, []);

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((currentValue) => !currentValue);
      return;
    }

    setOpenWithPersistence((currentValue) => !currentValue);
  }, [isMobile, setOpenWithPersistence]);

  const value = React.useMemo<SidebarContextValue>(
    () => ({
      open,
      setOpen: setOpenWithPersistence,
      openMobile,
      setOpenMobile,
      isMobile,
      state: open ? "expanded" : "collapsed",
      toggleSidebar,
    }),
    [isMobile, open, openMobile, setOpenWithPersistence, toggleSidebar],
  );

  return (
    <TooltipProvider delay={150}>
      <SidebarContext.Provider value={value}>
        <div
          data-slot="sidebar-wrapper"
          data-state={value.state}
          className={cn(
            "flex min-h-screen w-full bg-slate-950 p-2 text-foreground lg:gap-3 lg:p-3",
            className,
          )}
        >
          {children}
        </div>
      </SidebarContext.Provider>
    </TooltipProvider>
  );
}

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

function Sidebar({
  className,
  children,
  ...props
}: React.ComponentProps<"aside">) {
  const { isMobile, open, openMobile, setOpenMobile, state } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[17rem] border border-sidebar-border bg-sidebar p-0 text-sidebar-foreground shadow-2xl"
        >
          <SheetTitle className="sr-only">Application navigation</SheetTitle>
          <div className="flex h-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      data-slot="sidebar"
      data-state={state}
      className={cn(
        "hidden overflow-hidden rounded-[28px] border border-sidebar-border/80 bg-sidebar/95 text-sidebar-foreground shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-[width] duration-200 lg:flex lg:min-h-[calc(100svh-1.5rem)] lg:flex-col",
        open ? "w-[17rem]" : "w-[4.5rem]",
        className,
      )}
      style={
        {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </aside>
  );
}

function SidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-9 rounded-full", className)}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeftIcon className="size-4" />
      <span className="sr-only">Toggle navigation</span>
    </Button>
  );
}

function SidebarInset({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-inset"
      className={cn(
        "flex min-h-[calc(100svh-1rem)] min-w-0 flex-1 flex-col overflow-hidden rounded-[28px] border border-white/8 bg-background shadow-[0_24px_60px_-28px_rgba(0,0,0,0.75)] lg:min-h-[calc(100svh-1.5rem)]",
        className,
      )}
      {...props}
    />
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "flex flex-col gap-3 border-b border-sidebar-border/80 px-4 py-3",
        className,
      )}
      {...props}
    />
  );
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-3 py-4",
        className,
      )}
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn("border-t border-sidebar-border/80 p-3", className)}
      {...props}
    />
  );
}

function SidebarGroup({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      data-slot="sidebar-group"
      className={cn("flex flex-col gap-1.5 mb-2", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { open, isMobile } = useSidebar();

  return (
    <div
      data-slot="sidebar-group-label"
      className={cn(
        "px-3 text-[0.7rem] font-semibold uppercase tracking-widest text-sidebar-foreground/45 transition-opacity",
        !open && !isMobile && "hidden",
        className,
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      className={cn("flex list-none flex-col gap-1", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      className={cn("list-none", className)}
      {...props}
    />
  );
}

type SidebarMenuButtonProps = React.ComponentProps<"button"> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: React.ReactNode;
};

function SidebarMenuButton({
  asChild = false,
  className,
  children,
  isActive = false,
  tooltip,
  ...props
}: SidebarMenuButtonProps) {
  const { open, isMobile } = useSidebar();

  const sharedClassName = cn(
    "flex w-full items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-left text-sm font-medium text-sidebar-foreground/75 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
    isActive &&
      "bg-sidebar-primary text-sidebar-primary-foreground shadow-[0_16px_30px_-18px_rgba(52,211,153,0.9)] hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
    !open && !isMobile && "justify-center px-0",
    className,
  );

  const content =
    asChild && React.isValidElement(children) ? (
      React.cloneElement(
        children as React.ReactElement<{ className?: string }>,
        {
          className: cn(
            sharedClassName,
            (children as React.ReactElement<{ className?: string }>).props
              .className,
          ),
        },
      )
    ) : (
      <button className={sharedClassName} {...props}>
        {children}
      </button>
    );

  if (!tooltip || open || isMobile) {
    return content;
  }

  return (
    <Tooltip>
      <TooltipTrigger render={content} />
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  );
}

function SidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  const { open, isMobile } = useSidebar();

  if (!open && !isMobile) {
    return null;
  }

  return (
    <span
      data-slot="sidebar-menu-badge"
      className={cn(
        "ml-auto rounded-full bg-sidebar-accent px-2 py-0.5 text-[0.7rem] font-semibold text-sidebar-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
};
