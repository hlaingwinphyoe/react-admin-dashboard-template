import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AuthForgotPassword = () => {
  return (
    <>
      <form className="mt-8">
        <div className="mb-6">
          <div className="mb-2 block">
            <Label
              htmlFor="emadd"
              className="text-foreground dark:text-slate-100"
            >
              Email Address
            </Label>
          </div>
          <Input
            id="emadd"
            type="text"
            className="h-12 border-border/80 bg-background/80 px-4 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-emerald-400/60 dark:focus-visible:ring-emerald-400/20"
          />
        </div>
        <Button className="h-12 w-full text-base font-semibold dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300">
          Forgot Password
        </Button>
      </form>
    </>
  );
};

export default AuthForgotPassword;
