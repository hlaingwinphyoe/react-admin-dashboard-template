import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AuthForgotPassword = () => {
  return (
    <>
      <form className="mt-8">
        <div className="mb-6">
          <div className="mb-2 block">
            <Label htmlFor="emadd">Email Address</Label>
          </div>
          <Input id="emadd" type="text" className="custom-input" />
        </div>
        <Button className="h-12 w-full text-base font-semibold dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300">
          Forgot Password
        </Button>
      </form>
    </>
  );
};

export default AuthForgotPassword;
