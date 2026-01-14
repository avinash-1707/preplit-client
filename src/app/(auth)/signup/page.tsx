"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { SignUpInput, signupSchema } from "@/schema/signupSchema";
import { authClient } from "@/lib/auth-client";
import { Link } from "next-view-transitions";
import GoogleIcon from "@/components/svgs/GoogleIcon";
import GithubIcon from "@/components/svgs/GithubIcon";

function SignUpPage() {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (signupData: SignUpInput) => {
    console.log("Form submitted:", signupData);
    const { error } = await authClient.signUp.email({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
    });
    if (error) {
      toast.error(error?.message);
    } else {
      setUserEmail(signupData.email);
      setIsVerificationSent(true);
      toast.success("Check your email for verification!");
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
    });
    if (error) toast.error(error?.message);
  };

  const handleGithubLogin = async () => {
    const { error } = await authClient.signIn.social({
      provider: "github",
    });
    if (error) toast.error(error?.message);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(onSubmit, (errors) => console.log("FORM ERRORS", errors))();
  };

  // Verification success view
  if (isVerificationSent) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-zinc-800 rounded-lg shadow-2xl p-8 space-y-6 border border-zinc-700">
            {/* Success Icon */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-900/30 mb-2 border border-green-700">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
                  />
                </svg>
              </div>

              <h1 className="text-2xl font-semibold text-zinc-100">
                Verify Your Email
              </h1>

              <div className="space-y-3 text-zinc-300">
                <p className="text-base">We've sent a verification link to:</p>
                <p className="text-lg font-medium text-zinc-100 bg-zinc-700/50 py-2 px-4 rounded border border-zinc-600">
                  {userEmail}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Please check your inbox and click the verification link to
                  activate your account. The link will expire in 24 hours.
                </p>
              </div>

              {/* Additional Info */}
              <div className="pt-4 space-y-3">
                <div className="bg-zinc-700/30 border border-zinc-600 rounded-lg p-4 text-left">
                  <p className="text-sm text-zinc-400">
                    <span className="font-medium text-zinc-300">
                      Didn't receive the email?
                    </span>
                    <br />
                    Check your spam folder or wait a few minutes for the email
                    to arrive.
                  </p>
                </div>

                <Button
                  onClick={() => setIsVerificationSent(false)}
                  variant="outline"
                  className="w-full h-10 bg-zinc-700 border-zinc-600 text-zinc-200 hover:bg-zinc-600 hover:border-zinc-500 transition-colors"
                >
                  Back to Sign Up
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-zinc-500 mt-6">
            Need help?{" "}
            <a href="/support" className="text-zinc-400 hover:text-zinc-300">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    );
  }

  // Original signup form view
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
          <div className="bg-zinc-800 rounded-lg shadow-2xl p-8 space-y-6 border border-zinc-700">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-semibold text-zinc-100">
                Create Account
              </h1>
              <p className="text-zinc-400 text-sm">Sign up to get started</p>
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
                  or sign up with email
                </span>
              </div>
            </div>

            {/* Sign Up Form */}
            <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Full Name
                </label>
                <Input
                  {...register("name")}
                  id="name"
                  placeholder="John Doe"
                  className="h-10 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                />
                {errors.name && (
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
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Password
                </label>
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

              {/* Terms and Conditions Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <input
                    {...register("termsAccepted")}
                    id="termsAccepted"
                    type="checkbox"
                    className="mt-1 w-4 h-4 text-zinc-500 bg-zinc-700 border-zinc-600 rounded focus:ring-zinc-500 cursor-pointer"
                  />
                  <label
                    htmlFor="termsAccepted"
                    className="text-sm text-zinc-400 cursor-pointer"
                  >
                    I agree to the{" "}
                    <a
                      href="/terms"
                      className="text-zinc-300 hover:text-zinc-200 font-medium underline"
                    >
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      className="text-zinc-300 hover:text-zinc-200 font-medium underline"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.termsAccepted && (
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
                    {errors.termsAccepted.message}
                  </p>
                )}
              </div>

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
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>

            {/* Sign In Link */}
            <p className="text-center text-sm text-zinc-400">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-zinc-300 hover:text-zinc-200 font-medium"
              >
                Log in
              </a>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-zinc-500 mt-6">
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
