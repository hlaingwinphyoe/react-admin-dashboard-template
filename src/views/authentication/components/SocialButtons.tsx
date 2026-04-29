import React from "react";
import Google from "@/assets/images/svgs/google-icon.svg";

import { Link } from "react-router";
import FB from "@/assets/images/svgs/icon-facebook.png";

interface MyAppProps {
  title?: string;
}

const SocialButtons: React.FC<MyAppProps> = ({ title }) => {
  return (
    <>
      <div className="my-6 flex gap-4">
        <Link
          to={"/"}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-4 text-center text-foreground transition-colors hover:bg-accent hover:text-accent-foreground dark:border-white/10 dark:bg-white/2 dark:text-slate-200 dark:hover:bg-white/6 dark:hover:text-white"
        >
          <img src={Google} alt="google" height={18} width={18} /> Google
        </Link>
        <Link
          to={"/"}
          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/60 px-4 text-center text-foreground transition-colors hover:bg-accent hover:text-accent-foreground dark:border-white/10 dark:bg-white/2 dark:text-slate-200 dark:hover:bg-white/6 dark:hover:text-white"
        >
          <img src={FB} alt="google" height={18} width={18} />
          Facebook
        </Link>
      </div>
      {/* Divider */}
      <div className="mb-2 flex items-center justify-center gap-3">
        <hr className="grow border-border dark:border-white/10" />
        <p className="text-sm font-medium text-foreground dark:text-slate-200">
          {title}
        </p>
        <hr className="grow border-border dark:border-white/10" />
      </div>
    </>
  );
};

export default SocialButtons;
