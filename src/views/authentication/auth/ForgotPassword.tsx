import { Link } from "react-router";
import AuthForgotPassword from "../components/AuthForgotPassword";
import FullLogo from "@/layouts/full/shared/logo/FullLogo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const ForgotPassword = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-background dark:bg-slate-950">
      <div className="flex h-full items-center justify-center px-4 py-6">
        <Card className="w-full rounded-2xl border border-border/70 bg-card/95 p-6 shadow-xl shadow-black/10 backdrop-blur md:w-[460px] md:p-8 dark:border-white/10 dark:bg-slate-900/85 dark:shadow-black/25">
          <div className="mx-auto mb-8 flex justify-center">
            <FullLogo />
          </div>
          <p className="mb-2 text-center text-sm leading-6 text-muted-foreground dark:text-slate-300">
            Please enter the email address associated with your account and We
            will email you a link to reset your password.
          </p>
          <AuthForgotPassword />
          <Button
            variant="outline"
            className="mt-4 h-11 w-full dark:border-white/10 dark:bg-white/2 dark:text-slate-100 dark:hover:bg-white/6"
          >
            <Link to={"/"}>Back to Login</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
