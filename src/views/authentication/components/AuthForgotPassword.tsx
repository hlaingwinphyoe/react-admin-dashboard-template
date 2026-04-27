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
          <Input id="emadd" type="text" />
        </div>
        <Button className="w-full h-10">Forgot Password</Button>
      </form>
    </>
  );
};

export default AuthForgotPassword;
