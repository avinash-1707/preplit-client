"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { LoginInput, loginSchema } from "@/schema/loginSchema";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

function LoginPage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (loginData: LoginInput) => {
    const { error } = await authClient.signIn.email({
      email: loginData.email,
      password: loginData.password,
      rememberMe: loginData.rememberMe,
      callbackURL: "/dashboard",
    });

    if (error) toast.error(error.message);
  };

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    if (error) toast.error(error.message);
  };

  const handleGithubLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    if (error) toast.error(error.message);
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

          {/* Remember Me */}
          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(Boolean(checked))
                  }
                />
                <label
                  htmlFor="rememberMe"
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Remember me
                </label>
              </div>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
