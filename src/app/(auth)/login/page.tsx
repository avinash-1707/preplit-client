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
import { Link } from "next-view-transitions";
import { AuthShell, AuthHeader } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { ButtonSpinner } from "@/components/auth/ButtonSpinner";
import {
  authInputClass,
  authPrimaryButtonClass,
  authLinkClass,
} from "@/components/auth/styles";

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

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged in successfully!");
    }
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <AuthShell asideCaption="Practice the conversation, not just the problem.">
      <AuthHeader
        eyebrow="Welcome back"
        title="Sign in"
        subtitle="Pick up where you left off."
      />

      <div className="landing-rise" style={{ animationDelay: "90ms" }}>
        <SocialButtons
          onGoogleClick={handleGoogleLogin}
          onGithubClick={handleGithubLogin}
        />

        <AuthDivider label="or with email" />

        <div className="space-y-4">
          <FormField
            label="Email"
            htmlFor="email"
            error={errors.email?.message}
          >
            <Input
              {...register("email")}
              id="email"
              type="email"
              placeholder="you@example.com"
              className={authInputClass}
            />
          </FormField>

          <FormField
            label="Password"
            htmlFor="password"
            error={errors.password?.message}
            action={
              <Link
                href="/reset-password"
                className="text-xs text-zinc-500 transition-colors duration-200 hover:text-[#E8A33D]"
              >
                Forgot password?
              </Link>
            }
          >
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              className={authInputClass}
            />
          </FormField>

          <Controller
            name="rememberMe"
            control={control}
            render={({ field }) => (
              <div className="flex items-center gap-2.5">
                <Checkbox
                  id="rememberMe"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(Boolean(checked))
                  }
                  className="border-zinc-700 data-[state=checked]:border-[#E8A33D] data-[state=checked]:bg-[#E8A33D] data-[state=checked]:text-black"
                />
                <label
                  htmlFor="rememberMe"
                  className="cursor-pointer text-sm text-zinc-500 select-none"
                >
                  Remember me for 30 days
                </label>
              </div>
            )}
          />

          <Button
            onClick={handleFormSubmit}
            disabled={isSubmitting}
            className={authPrimaryButtonClass}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <ButtonSpinner />
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </Button>
        </div>
      </div>

      <p
        className="landing-rise mt-8 text-center text-sm text-zinc-500"
        style={{ animationDelay: "160ms" }}
      >
        New here?{" "}
        <Link href="/signup" className={authLinkClass}>
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
export default LoginPage;
