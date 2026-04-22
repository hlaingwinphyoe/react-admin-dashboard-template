import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";

const AuthLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Simple mock login
    navigate("/");
  };

  return (
    <>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="mb-5">
          <div className="mb-2 block">
            <Label
              htmlFor="username"
              className="text-foreground dark:text-slate-100"
            >
              Username
            </Label>
          </div>
          <Input
            id="username"
            type="text"
            required
            className="h-12 border-border/80 bg-background/80 px-4 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-emerald-400/60 dark:focus-visible:ring-emerald-400/20"
          />
        </div>
        <div className="mb-5">
          <div className="mb-2 block">
            <Label
              htmlFor="userpwd"
              className="text-foreground dark:text-slate-100"
            >
              Password
            </Label>
          </div>
          <Input
            id="userpwd"
            type="password"
            required
            className="h-12 border-border/80 bg-background/80 px-4 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus-visible:border-emerald-400/60 dark:focus-visible:ring-emerald-400/20"
          />
        </div>
        <div className="my-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" />
            <Label
              htmlFor="accept"
              className="cursor-pointer text-sm font-normal text-muted-foreground opacity-90 dark:text-slate-300"
            >
              Remember this Device
            </Label>
          </div>
          <Link
            to={"/auth/forgot-password"}
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Forgot Password ?
          </Link>
        </div>
        <Button
          type="submit"
          className="h-12 w-full text-base font-semibold dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300"
        >
          Sign in
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
