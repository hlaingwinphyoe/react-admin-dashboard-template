import { Link } from "react-router";
import { Card } from "@/components/ui/card";

import AuthRegister from "../authforms/AuthRegister";
import SocialButtons from "../authforms/SocialButtons";

import FullLogo from "@/layouts/full/shared/logo/FullLogo";

const Register = () => {
  return (
    <>
      <div className="relative h-screen overflow-hidden bg-background dark:bg-slate-950">
        <div className="flex h-full items-center justify-center px-4 py-6">
          <Card className="w-full rounded-2xl border border-border/70 bg-card/95 p-6 shadow-xl shadow-black/10 backdrop-blur md:w-[460px] md:p-8 dark:border-white/10 dark:bg-slate-900/85 dark:shadow-black/25">
            <div className="mx-auto mb-8 flex justify-center">
              <FullLogo />
            </div>
            <SocialButtons title="or sign up with" />
            <AuthRegister />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-2 text-sm font-medium text-muted-foreground dark:text-slate-300">
              <p>Already have an Account?</p>
              <Link
                to={"/auth/login"}
                className="text-primary transition-colors hover:text-primary/80 dark:text-emerald-400 dark:hover:text-emerald-300"
              >
                Sign in
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Register;
