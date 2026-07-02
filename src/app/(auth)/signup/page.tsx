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
import { AuthShell, AuthHeader } from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { SocialButtons } from "@/components/auth/SocialButtons";
import { ButtonSpinner } from "@/components/auth/ButtonSpinner";
import {
  authInputClass,
  authOutlineButtonClass,
  authPrimaryButtonClass,
  authLinkClass,
} from "@/components/auth/styles";

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
      <AuthShell asideCaption="One click and you're in. Then straight to practicing.">
        <AuthHeader
          eyebrow="Almost there"
          title="Check your email"
          subtitle="We sent a verification link to"
        />

        <div
          className="landing-rise -mt-4 mb-6 text-center"
          style={{ animationDelay: "90ms" }}
        >
          <p className="truncate text-sm font-medium text-zinc-100">
            {userEmail}
          </p>
        </div>

        <div
          className="landing-rise space-y-4"
          style={{ animationDelay: "150ms" }}
        >
          <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 text-sm text-zinc-500">
            Didn&apos;t get it? Check your spam folder, or wait a minute and
            try again.
          </div>

          <Button
            onClick={() => setIsVerificationSent(false)}
            variant="outline"
            className={authOutlineButtonClass}
          >
            Use a different email
          </Button>
        </div>

        <p
          className="landing-rise mt-8 text-center text-sm text-zinc-500"
          style={{ animationDelay: "210ms" }}
        >
          Need help?{" "}
          <Link href="/support" className={authLinkClass}>
            Contact support
          </Link>
        </p>
      </AuthShell>
    );
  }

  // Sign up form
  return (
    <AuthShell asideCaption="A real mock interview, out loud. It listens, pushes back, and scores you at the end.">
      <AuthHeader
        eyebrow="Get started"
        title="Create your account"
        subtitle="Start practicing in minutes."
      />

      <div className="landing-rise" style={{ animationDelay: "90ms" }}>
        <SocialButtons
          onGoogleClick={handleGoogleLogin}
          onGithubClick={handleGithubLogin}
        />

        <AuthDivider label="or with email" />

        <div className="space-y-4">
          <FormField label="Name" htmlFor="name" error={errors.name?.message}>
            <Input
              {...register("name")}
              id="name"
              placeholder="Jane Doe"
              className={authInputClass}
            />
          </FormField>

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
          >
            <Input
              {...register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              className={authInputClass}
            />
          </FormField>

          <div className="space-y-1.5">
            <div className="flex items-start gap-2.5">
              <input
                {...register("termsAccepted")}
                id="termsAccepted"
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-zinc-700 bg-zinc-950 accent-[#E8A33D] focus-visible:ring-2 focus-visible:ring-[#E8A33D]/40"
              />
              <label
                htmlFor="termsAccepted"
                className="cursor-pointer text-sm text-zinc-500"
              >
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors duration-200 hover:text-zinc-100 hover:decoration-[#E8A33D]"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-zinc-300 underline decoration-zinc-700 underline-offset-4 transition-colors duration-200 hover:text-zinc-100 hover:decoration-[#E8A33D]"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.termsAccepted && (
              <p className="flex items-center gap-1.5 text-xs text-red-400/90">
                <span className="h-1 w-1 shrink-0 rounded-full bg-red-400" />
                {errors.termsAccepted.message}
              </p>
            )}
          </div>

          <Button
            onClick={handleFormSubmit}
            disabled={isSubmitting}
            className={authPrimaryButtonClass}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <ButtonSpinner />
                Creating account...
              </span>
            ) : (
              "Create account"
            )}
          </Button>
        </div>
      </div>

      <p
        className="landing-rise mt-8 text-center text-sm text-zinc-500"
        style={{ animationDelay: "160ms" }}
      >
        Already have an account?{" "}
        <Link href="/login" className={authLinkClass}>
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}

export default SignUpPage;
