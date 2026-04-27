import { Card } from "@/components/ui/card";

import AuthLogin from "../components/AuthLogin";
import SocialButtons from "../components/SocialButtons";

import FullLogo from "@/layouts/full/shared/logo/FullLogo";

const Login = () => {
  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <div className="flex h-full items-center justify-center px-4 py-6">
          <Card className="w-full md:w-[460px] md:p-8">
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
