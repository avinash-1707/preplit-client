"use client";

import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export type DashboardSection = "main" | "profile" | "settings";

export default function Dashboard() {
  const searchParams = useSearchParams();

  const activeTab = (searchParams.get("tab") as DashboardSection) ?? "main";
  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar */}
      <DashboardNavbar />

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <DashboardSidebar activeTab={activeTab} />

        {/* Content */}
        <DashboardContent activeSection={activeTab} />
      </div>
    </div>
  );
}
