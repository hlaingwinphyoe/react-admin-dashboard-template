import { Link } from "react-router";
import { Card } from "@/components/ui/card";

import AuthLogin from "../authforms/AuthLogin";
import SocialButtons from "../authforms/SocialButtons";

import FullLogo from "@/layouts/full/shared/logo/FullLogo";

const Login = () => {
  return (
    <>
      <div className="relative h-screen overflow-hidden bg-background dark:bg-slate-950">
        <div className="flex h-full items-center justify-center px-4 py-6">
          <Card className="w-full rounded-2xl border border-border/70 bg-card/95 p-6 shadow-xl shadow-black/10 backdrop-blur md:w-[460px] md:p-8 dark:border-white/10 dark:bg-slate-900/85 dark:shadow-black/25">
            <div className="mx-auto mb-8 flex justify-center">
              <FullLogo />
            </div>
            <SocialButtons title="or sign in with" />
            <AuthLogin />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-sm font-medium text-muted-foreground dark:text-slate-300">
              <p>New to React Admin Dashboard Template?</p>
              <Link
                to={"/auth/register"}
                className="text-primary transition-colors hover:text-primary/80 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Create an account
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
