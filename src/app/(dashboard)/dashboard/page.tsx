"use client";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

function Dashboard() {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };
  return (
    <div>
      <DashboardNavbar />
    </div>
  );
}

export default Dashboard;
