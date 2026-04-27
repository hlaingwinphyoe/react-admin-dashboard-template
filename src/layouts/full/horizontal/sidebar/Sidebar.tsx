import { Link, useLocation } from "react-router";

import LogoMark from "@/assets/images/logos/light-logo.png";
import { cn } from "@/lib/utils";
import FullLogo from "../../shared/logo/FullLogo";
import {
  Sidebar as AppSidebarShell,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import sidebarItems from "./sidebaritems";

function SidebarBrand() {
  const { open, isMobile } = useSidebar();
  const showFullBrand = open || isMobile;

  return (
    <Link
      to="/"
      className={cn(
        "flex w-full items-center overflow-hidden rounded-2xl px-4 py-1 transition-colors",
        showFullBrand ? "justify-start gap-4" : "justify-center px-0",
      )}
    >
      <div
        className={cn(
          "flex min-w-0 items-center overflow-hidden",
          showFullBrand ? "gap-3" : "justify-center",
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center justify-center bg-white/3 ring-1 ring-white/8",
            showFullBrand ? "size-14 rounded-2xl" : "size-12 rounded-xl",
          )}
        >
          {showFullBrand ? (
            <FullLogo />
          ) : (
            <img
              src={LogoMark}
              alt="logo"
              className="h-7 w-7 rounded-lg object-cover object-left"
            />
          )}
        </div>
        {showFullBrand && (
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-sidebar-foreground">
              Admin Dashboard
            </p>
            <p className="truncate text-xs text-sidebar-foreground/50">
              Workspace
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

const Sidebar = () => {
  const location = useLocation();
  const { open, isMobile } = useSidebar();
  const showContent = open || isMobile;
  const sidebarSections = sidebarItems.reduce<
    Array<{ label: string; items: typeof sidebarItems }>
  >((sections, item) => {
    const currentSection = sections.find(
      (section) => section.label === item.section,
    );

    if (currentSection) {
      currentSection.items.push(item);
      return sections;
    }

    sections.push({ label: item.section, items: [item] });
    return sections;
  }, []);

  return (
    <AppSidebarShell collapsible="icon">
      <SidebarHeader className="gap-6">
        <SidebarBrand />
      </SidebarHeader>

      <SidebarContent>
        {sidebarSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive =
                    location.pathname === item.url ||
                    (item.url !== "/" &&
                      location.pathname.startsWith(item.url + "/"));
                  const Icon = item.icon;

                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton
                        render={<Link to={item.url} />}
                        isActive={isActive}
                        tooltip={item.title}
                      >
                        <Icon className="size-5 shrink-0" />
                        <div
                          className={cn(
                            "min-w-0 flex-1 truncate",
                            !showContent && "hidden",
                          )}
                        >
                          {item.title}
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </AppSidebarShell>
  );
};

export default Sidebar;
