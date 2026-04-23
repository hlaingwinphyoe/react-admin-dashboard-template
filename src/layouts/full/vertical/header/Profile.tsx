import { LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import profileimg from "@/assets/images/profile/user-1.jpg";
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

const profileItems: ProfileMenuItem[] = [
  {
    title: "My Profile",
    icon: User,
    url: "/user-profile",
  },
];

const Profile = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

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
            <span className="flex size-10 cursor-pointer items-center justify-center rounded-xl border border-border bg-white dark:bg-white/2 p-1 transition-colors hover:bg-muted group-hover/menu:bg-muted">
              <img
                src={profileimg}
                alt="logo"
                height="35"
                width="35"
                className="rounded-full"
              />
            </span>
          }
        />

        <DropdownMenuContent
          align="end"
          className="w-screen sm:w-[220px]"
        >
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

          <div className="pt-2">
            <Button
              variant="destructive"
              className="w-full h-10"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Profile;
