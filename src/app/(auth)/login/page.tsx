"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

function LoginPage() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({ provider: "google" });
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Button onClick={handleGoogleLogin}>Login</Button>
    </div>
  );
}

export default LoginPage;
