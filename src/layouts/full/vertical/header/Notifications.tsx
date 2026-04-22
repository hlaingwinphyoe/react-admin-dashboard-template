import { Bell } from "lucide-react";
import { Link } from "react-router";
import avatar1 from "@/assets/images/profile/user-2.jpg";
import avatar2 from "@/assets/images/profile/user-3.jpg";
import type { NotificationItem } from "@/types/header";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const notifications: NotificationItem[] = [
  {
    avatar: avatar1,
    title: "Deposit received",
    subtitle: "A deposit request has been completed successfully.",
  },
  {
    avatar: avatar2,
    title: "Withdrawal request pending",
    subtitle: "A withdrawal request is waiting for your review.",
  },
];

const Notifications = () => {
  return (
    <div className="relative group/menu px-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <div className="relative border-none outline-none">
              <button
                type="button"
                className="flex size-10 items-center justify-center rounded-xl border border-white/8 bg-white/2 text-foreground transition-colors hover:bg-white/6 hover:text-foreground group-hover/menu:bg-white/6 group-hover/menu:text-foreground dark:text-muted-foreground"
              >
                <Bell size={20} />
              </button>
              <span className="rounded-full absolute inset-end-[-2px] top-[-2px] text-[10px] h-2 w-2 bg-primary flex justify-center items-center"></span>
            </div>
          }
        />

        <DropdownMenuContent
          align="end"
          className="w-screen rounded-2xl border border-border py-4 shadow-md sm:w-[300px]"
        >
          <div className="flex items-center justify-between px-4">
            <h3 className="mb-0 text-lg font-semibold text-foreground">
              Notifications
            </h3>
            <Badge variant={"primary"}>2 new</Badge>
          </div>

          <div className="custom-scroll mt-3 max-h-80 overflow-auto">
            {notifications.map((notification, index) => (
              <DropdownMenuItem
                className="group/link flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-accent"
                key={index}
                render={<Link to="#" />}
              >
                <div className="flex items-start">
                  <span className="shrink-0 relative">
                    <img
                      src={notification.avatar}
                      width={36}
                      height={36}
                      alt="notification"
                      className="size-9 rounded-full object-cover"
                    />
                  </span>
                  <div className="ps-3">
                    <h5 className="mb-1 text-sm group-hover/link:text-accent-foreground">
                      {notification.title}
                    </h5>
                    <span className="line-clamp-2 block text-xs leading-5 text-muted-foreground">
                      {notification.subtitle}
                    </span>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>

          <div className="px-4 pt-4">
            <Button variant={"outline"} className="w-full">
              View all notifications
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Notifications;
