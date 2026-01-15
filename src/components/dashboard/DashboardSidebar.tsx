import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExitIcon } from "../svgs/Exit";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { DashboardSection } from "@/app/(dashboard)/dashboard/page";
import {
  AiIcon,
  CollapseLeftIcon,
  CollapseRightIcon,
  InsightsIcon,
  OverviewIcon,
  UserIcon,
} from "../svgs/DashboardIcons";
import { SettingsIcon } from "../svgs/SettingsIcon";

const VALID_TABS: DashboardSection[] = [
  "overview",
  "interviews",
  "insights",
  "profile",
  "settings",
];

export default function DashboardSidebar({
  activeTab,
}: {
  activeTab?: DashboardSection;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resolvedTab: DashboardSection =
    activeTab && VALID_TABS.includes(activeTab) ? activeTab : "overview";

  const changeTab = (tab: DashboardSection) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);

    router.push(`/dashboard?${params.toString()}`);
  };
  const [isOpen, setIsOpen] = useState(true);
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  const topOptions: {
    id: DashboardSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "overview", label: "Overview", icon: OverviewIcon },
    { id: "interviews", label: "Interviews", icon: AiIcon },
    { id: "insights", label: "Insights", icon: InsightsIcon },
  ];

  const bottomOptions: {
    id: DashboardSection;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "settings", label: "Settings", icon: SettingsIcon },
  ];

  const SidebarItem = ({ option }: { option: (typeof topOptions)[0] }) => {
    const content = (
      <Button
        variant={option.id === resolvedTab ? "secondary" : "ghost"}
        className={cn(
          "w-full justify-start gap-4 px-3 py-6 transition-all duration-300 hover:bg-accent group",
          !isOpen && "justify-center px-0"
        )}
        onClick={() => changeTab(option.id)}
      >
        <option.icon className="size-5 shrink-0 text-muted-foreground group-hover:text-foreground transition-colors" />
        {isOpen && (
          <span className="text-sm font-medium animate-in fade-in slide-in-from-left-2 duration-300">
            {option.label}
          </span>
        )}
      </Button>
    );

    if (isOpen) return content;

    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={10} className="font-medium">
          {option.label}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "relative flex flex-col border-r bg-background transition-all duration-300 ease-in-out",
          isOpen ? "w-64" : "w-20"
        )}
      >
        {/* Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-7 h-6 w-6 rounded-full border bg-white dark:bg-zinc-950 shadow-sm hover:bg-zinc-950/10 hover:dark:bg-white/10  z-40"
        >
          {isOpen ? (
            <CollapseLeftIcon className="h-4 w-4" />
          ) : (
            <CollapseRightIcon className="h-4 w-4" />
          )}
        </Button>

        {/* Navigation */}
        <div className="flex flex-1 flex-col gap-4 p-4">
          <nav className="flex flex-1 flex-col gap-2">
            {topOptions.map((option) => (
              <SidebarItem key={option.id} option={option} />
            ))}
          </nav>

          <nav className="flex flex-col gap-2 border-t pt-4">
            {bottomOptions.map((option) => (
              <SidebarItem key={option.id} option={option} />
            ))}
          </nav>
          {isOpen && (
            <Button variant="outline" onClick={handleLogout}>
              <ExitIcon />
              Logout
            </Button>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
