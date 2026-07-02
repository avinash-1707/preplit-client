"use client";

import React, { Suspense, useState } from "react";
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
import { Link } from "next-view-transitions";
import { AuthShell, AuthHeader } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { ButtonSpinner } from "@/components/auth/ButtonSpinner";
import {
  authInputClass,
  authOutlineButtonClass,
  authPrimaryButtonClass,
  authLinkClass,
} from "@/components/auth/styles";

function ResetPasswordContent() {
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
      // Absolute URL for the email link; derive from the current origin so it
      // works in any environment instead of a hardcoded localhost.
      redirectTo: `${window.location.origin}/reset-password`,
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
      router.push("/login");
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

  const heading = emailSent
    ? "Check your email"
    : token
    ? "Set a new password"
    : "Reset your password";

  const subtitle = emailSent
    ? "We sent a reset link to your inbox."
    : token
    ? "Choose something strong you'll remember."
    : "We'll email you a link to get back in.";

  return (
    <AuthShell asideCaption="Two minutes, then you're back to practicing.">
      <AuthHeader eyebrow="Password" title={heading} subtitle={subtitle} />

      {/* Email sent confirmation */}
      {emailSent && !token && (
        <div className="landing-rise space-y-4" style={{ animationDelay: "90ms" }}>
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-500">
            Click the link in that email within the hour to choose a new
            password.
          </div>

          <Button
            onClick={() => setEmailSent(false)}
            variant="outline"
            className={authOutlineButtonClass}
          >
            Try a different email
          </Button>
        </div>
      )}

      {/* Request reset link */}
      {!emailSent && !token && (
        <div className="landing-rise space-y-4" style={{ animationDelay: "90ms" }}>
          <FormField
            label="Email"
            htmlFor="email"
            error={emailErrors.email?.message}
          >
            <Input
              {...registerEmail("email")}
              id="email"
              type="email"
              placeholder="you@example.com"
              className={authInputClass}
            />
          </FormField>

          <Button
            onClick={handleEmailFormSubmit}
            disabled={isSubmittingEmail}
            className={authPrimaryButtonClass}
          >
            {isSubmittingEmail ? (
              <span className="flex items-center gap-2">
                <ButtonSpinner />
                Sending...
              </span>
            ) : (
              "Send reset link"
            )}
          </Button>
        </div>
      )}

      {/* Set new password */}
      {token && (
        <div className="landing-rise space-y-4" style={{ animationDelay: "90ms" }}>
          <FormField
            label="New password"
            htmlFor="password"
            error={resetErrors.password?.message}
          >
            <Input
              {...registerReset("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              className={authInputClass}
            />
          </FormField>

          <FormField
            label="Confirm new password"
            htmlFor="confirmPassword"
            error={resetErrors.confirmPassword?.message}
          >
            <Input
              {...registerReset("confirmPassword")}
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className={authInputClass}
            />
          </FormField>

          <Button
            onClick={handleResetFormSubmit}
            disabled={isSubmittingReset}
            className={authPrimaryButtonClass}
          >
            {isSubmittingReset ? (
              <span className="flex items-center gap-2">
                <ButtonSpinner />
                Resetting...
              </span>
            ) : (
              "Reset password"
            )}
          </Button>
        </div>
      )}

      <p
        className="landing-rise mt-8 text-center text-sm text-zinc-500"
        style={{ animationDelay: "160ms" }}
      >
        Remember your password?{" "}
        <Link href="/login" className={authLinkClass}>
          Back to login
        </Link>
      </p>
    </AuthShell>
  );
}

// useSearchParams() requires a Suspense boundary for static prerendering.
export default function PasswordResetPage() {
  return (
    <Suspense fallback={null}>
      <ResetPasswordContent />
    </Suspense>
  );
}
