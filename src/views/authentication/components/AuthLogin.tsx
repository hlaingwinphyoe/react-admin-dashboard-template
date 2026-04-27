import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { useAuthStore } from "@/store/auth-store";
import { loginSchema, type LoginFormValues } from "@/validations/auth-schema";

const AuthLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const apiError = useAuthStore((state) => state.error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await login(data);
      navigate("/");
    } catch (err) {}
  };

  return (
    <>
      <form
        className="mt-8 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        {apiError && (
          <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded border border-red-200">
            {apiError}
          </div>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          <FieldError errors={errors.email ? [errors.email] : undefined} />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          <FieldError
            errors={errors.password ? [errors.password] : undefined}
          />
        </Field>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Checkbox id="remember" />
            <Label htmlFor="remember">Remember Me</Label>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </>
  );
};

export default AuthLogin;
