import { useNavigate } from "react-router";
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
    login();
    navigate("/");
  };

  return (
    <>
      <form className="mt-8" onSubmit={handleSubmit}>
        <div className="mb-5">
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <Input id="email" type="email" required className="custom-input" />
        </div>
        <div className="mb-5">
          <div className="mb-2 block">
            <Label htmlFor="userpwd">Password</Label>
          </div>
          <Input
            id="userpwd"
            type="password"
            required
            className="custom-input"
          />
        </div>
        <div className="my-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Checkbox id="accept" />
            <Label
              htmlFor="accept"
              className="cursor-pointer text-sm font-normal text-muted-foreground opacity-90 dark:text-slate-300"
            >
              Remember Me
            </Label>
          </div>
          {/* <Link
            to={"/auth/forgot-password"}
            className="text-sm font-medium text-primary transition-colors hover:text-primary/80 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            Forgot Password ?
          </Link> */}
        </div>
        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
