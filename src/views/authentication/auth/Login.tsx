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
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
