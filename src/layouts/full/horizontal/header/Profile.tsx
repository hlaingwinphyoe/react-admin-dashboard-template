import { ChevronDown, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import type { ProfileMenuItem } from "@/types/header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileItems: ProfileMenuItem[] = [
  {
    title: "My Profile",
    icon: User,
    url: "/user-profile",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <div className="relative group/menu shrink-0 ps-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton={false}
          render={
            <div className="group cursor-pointer flex w-full items-center gap-3 rounded-xl border border-border bg-white dark:bg-white/5 px-2 py-px shadow-sm transition-all duration-200 hover:bg-muted hover:shadow-md">
              {/* Avatar */}
              <Avatar className="h-8 w-8 ring-1 ring-border">
                <AvatarImage
                  src={user?.profile_image || undefined}
                  alt={user?.name ?? "User avatar"}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>

              {/* User Info */}
              <div className="flex flex-col leading-tight">
                <h4 className="text-sm font-medium text-foreground">
                  {user?.name || "Guest"}
                </h4>
                <span className="text-xs text-muted-foreground truncate max-w-[140px]">
                  {user?.email}
                </span>
              </div>

              {/* Icon */}
              <ChevronDown
                size={16}
                className="ml-auto text-muted-foreground transition-transform duration-200 group-hover:rotate-180"
              />
            </div>
          }
        />

        <DropdownMenuContent align="end" className="w-screen sm:w-[220px]">
          <div className="custom-scroll max-h-[300px] overflow-auto">
            {profileItems.map((items, index) => (
              <DropdownMenuItem
                key={index}
                render={
                  <Link
                    to={items.url}
                    className="group/link flex w-full items-center justify-between px-3 py-2.5 cursor-pointer transition-colors hover:bg-accent hover:text-accent-foreground hover:outline-none rounded-xl"
                  />
                }
              >
                <div className="w-full">
                  <div className="ps-0 flex items-center gap-3 w-full">
                    <items.icon size={18} />
                    <div className="w-3/4">
                      <h5 className="mb-0 text-sm text-muted-foreground group-hover/link:text-accent-foreground">
                        {items.title}
                      </h5>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>

          <DropdownMenuSeparator className="my-2" />

          <Button
            variant="destructive"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
