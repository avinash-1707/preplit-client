"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  EmailInput,
  emailSchema,
  ResetPasswordInput,
  resetPasswordSchema,
} from "@/schema/passwordResetSchemas";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

function PasswordResetPage() {
  const searchParams = useSearchParams();
  const token: string | undefined = searchParams.get("token") ?? undefined;
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

  // Email form
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors, isSubmitting: isSubmittingEmail },
  } = useForm<EmailInput>({
    resolver: zodResolver(emailSchema),
  });

  // Reset password form
  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    formState: { errors: resetErrors, isSubmitting: isSubmittingReset },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onEmailSubmit = async (data: EmailInput) => {
    const { error } = await authClient.requestPasswordReset({
      email: data.email,
      redirectTo: "http://localhost:5000/reset-password",
    });
    if (error) {
      toast.error(error.message);
    } else {
      setEmailSent(true);
    }
  };

  const onResetSubmit = async (data: ResetPasswordInput) => {
    const { error } = await authClient.resetPassword({
      token,
      newPassword: data.password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Password reset successfully!");
      router;
    }
  };

  const handleEmailFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitEmail(onEmailSubmit)();
  };

  const handleResetFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitReset(onResetSubmit)();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-zinc-800 rounded-lg shadow-2xl p-8 space-y-6 border border-zinc-700">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-zinc-700 mb-3 border border-zinc-600">
              {emailSent ? (
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              ) : (
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
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              )}
            </div>
            <h1 className="text-2xl font-semibold text-zinc-100">
              {emailSent
                ? "Check Your Email"
                : token
                ? "Reset Your Password"
                : "Forgot Password?"}
            </h1>
            <p className="text-zinc-400 text-sm">
              {emailSent
                ? "We've sent a password reset link to your email"
                : token
                ? "Enter your new password below"
                : "No worries, we'll send you reset instructions"}
            </p>
          </div>

          {/* Email Sent State */}
          {emailSent && !token && (
            <div className="space-y-4">
              <div className="bg-zinc-700 border border-zinc-600 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-green-400 mt-0.5 shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div className="space-y-1">
                    <p className="text-sm text-zinc-200 font-medium">
                      Email sent successfully
                    </p>
                    <p className="text-xs text-zinc-400">
                      Please check your inbox and click the link to reset your
                      password. The link will expire in 1 hour.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="w-full h-10 bg-zinc-700 border-zinc-600 text-zinc-200 hover:bg-zinc-600 hover:border-zinc-500 transition-colors"
              >
                Back to email entry
              </Button>
            </div>
          )}

          {/* Email Input Form */}
          {!emailSent && !token && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Email Address
                </label>
                <Input
                  {...registerEmail("email")}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="h-10 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                />
                {emailErrors.email && (
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
                    {emailErrors.email.message}
                  </p>
                )}
              </div>

              <Button
                onClick={handleEmailFormSubmit}
                disabled={isSubmittingEmail}
                className="w-full h-10 bg-zinc-600 hover:bg-zinc-500 text-zinc-100 font-medium shadow-lg transition-all border border-zinc-500"
              >
                {isSubmittingEmail ? (
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
                    Sending...
                  </span>
                ) : (
                  "Send Reset Link"
                )}
              </Button>
            </div>
          )}

          {/* Reset Password Form */}
          {token && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-zinc-300"
                >
                  New Password
                </label>
                <Input
                  {...registerReset("password")}
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                />
                {resetErrors.password && (
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
                    {resetErrors.password.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-zinc-300"
                >
                  Confirm New Password
                </label>
                <Input
                  {...registerReset("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="h-10 bg-zinc-700 border-zinc-600 text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-zinc-500"
                />
                {resetErrors.confirmPassword && (
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
                    {resetErrors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                onClick={handleResetFormSubmit}
                disabled={isSubmittingReset}
                className="w-full h-10 bg-zinc-600 hover:bg-zinc-500 text-zinc-100 font-medium shadow-lg transition-all border border-zinc-500"
              >
                {isSubmittingReset ? (
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
                    Resetting...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          )}

          {/* Back to Login Link */}
          <p className="text-center text-sm text-zinc-400">
            Remember your password?{" "}
            <a
              href="/login"
              className="text-zinc-300 hover:text-zinc-200 font-medium"
            >
              Back to login
            </a>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-500 mt-6">
          Protected by industry-standard encryption
        </p>
      </div>
    </div>
  );
}

export default PasswordResetPage;
