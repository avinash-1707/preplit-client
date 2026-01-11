"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { SignUpInput, signupSchema } from "@/schema/signupSchema";

function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (signupData: SignUpInput) => {
    const { error } = await authClient.signUp.email({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
    });
    toast.error(error?.message);
  };

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    toast.error(error?.message);
  };

  const handleGithubLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
    });
    toast.error(error?.message);
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="w-96 p-8 shadow-md rounded-2xl space-y-8">
        {/* Social Login */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" onClick={handleGoogleLogin}>
            Google
          </Button>
          <Button variant="outline" onClick={handleGithubLogin}>
            Github
          </Button>
        </div>

        {/* Divider */}
        <div className="text-center text-sm text-muted-foreground">
          or login with email
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <Input placeholder="Email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input placeholder="Name" type="name" {...register("name")} />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
