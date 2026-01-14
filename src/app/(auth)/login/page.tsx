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
import GoogleIcon from "@/components/svgs/GoogleIcon";
import GithubIcon from "@/components/svgs/GithubIcon";
import { Link } from "next-view-transitions";

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
      callbackURL: "http://localhost:3000/dashboard",
    });
    if (error) toast.error(error.message);
  };

  const handleGithubLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "http://localhost:3000/dashboard",
    });
    if (error) toast.error(error.message);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Navigation */}
      <nav className="w-full flex justify-between items-center py-5 px-6 md:px-12 border-b border-zinc-800">
        <Link href="/" className="text-2xl font-bold text-zinc-100">
          preplit
        </Link>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="shadow-2xl p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-700 mb-3 border border-zinc-600">
                <svg
                  className="w-7 h-7 text-zinc-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-zinc-100">
                Welcome Back
              </h1>
              <p className="text-zinc-400 text-sm">Sign in to your account</p>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <Button
                onClick={handleGoogleLogin}
                type="button"
                variant="outline"
                className="w-full h-11 bg-zinc-700 border-zinc-600 text-zinc-200 hover:bg-zinc-600 hover:border-zinc-500 transition-colors"
              >
                <GoogleIcon />
                Continue with Google
              </Button>

              <Button
                onClick={handleGithubLogin}
                type="button"
                variant="outline"
                className="w-full h-11 bg-zinc-700 border-zinc-600 text-zinc-200 hover:bg-zinc-600 hover:border-zinc-500 transition-colors"
              >
                <GithubIcon />
                Continue with GitHub
              </Button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-600"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-zinc-800 text-zinc-500 font-medium">
                  or login with email
                </span>
              </div>
            </div>

            {/* Login Form */}
            <div className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Email Address
                </label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-10 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                />
                {errors.email && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-zinc-300"
                  >
                    Password
                  </label>
                  <a
                    href="/reset-password"
                    className="text-xs text-zinc-400 hover:text-zinc-300 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                />
                {errors.password && (
                  <p className="text-sm text-red-400 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Remember Me Checkbox */}
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
                      className="border-zinc-600 data-[state=checked]:bg-zinc-600 data-[state=checked]:border-zinc-500"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-zinc-400 cursor-pointer select-none"
                    >
                      Remember me for 30 days
                    </label>
                  </div>
                )}
              />

              {/* Submit Button */}
              <Button
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className="w-full h-10 bg-zinc-600 hover:bg-zinc-500 text-zinc-100 font-medium shadow-lg transition-all border border-zinc-500"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-zinc-400">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-zinc-300 hover:text-zinc-200 font-medium transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-zinc-500 mt-6">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
