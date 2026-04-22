import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";

const AuthRegister = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(); // Mock login after register
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-5">
          <div className="mb-2 block">
            <Label htmlFor="name">Name</Label>
          </div>
          <Input id="name" type="text" required className="custom-input" />
        </div>
        <div className="mb-5">
          <div className="mb-2 block">
            <Label htmlFor="Email">Email Address</Label>
          </div>
          <Input id="Email" type="email" required className="custom-input" />
        </div>
        <div className="mb-6">
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
        <Button
          type="submit"
          className="h-12 w-full text-base font-semibold dark:bg-emerald-400 dark:text-slate-950 dark:hover:bg-emerald-300"
        >
          Sign up
        </Button>
      </form>
    </>
  );
};

export default AuthRegister;
