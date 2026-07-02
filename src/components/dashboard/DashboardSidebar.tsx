import { motion } from "motion/react";
import { Link } from "next-view-transitions";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LogoTile } from "@/components/brand/Logo";
import { DashboardSection } from "@/app/(dashboard)/dashboard/page";
import {
  Sidebar,
  SidebarBody,
  SidebarLink,
  useSidebar,
  type SidebarLinkData,
} from "./sidebar";
import { ExitIcon } from "../svgs/Exit";
import {
  AiIcon,
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

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  const topOptions: SidebarLinkData[] = [
    {
      label: "Overview",
      icon: <OverviewIcon className="size-5" />,
      onClick: () => changeTab("overview"),
      active: resolvedTab === "overview",
    },
    {
      label: "Interviews",
      icon: <AiIcon className="size-5" />,
      onClick: () => changeTab("interviews"),
      active: resolvedTab === "interviews",
    },
    {
      label: "Insights",
      icon: <InsightsIcon className="size-5" />,
      onClick: () => changeTab("insights"),
      active: resolvedTab === "insights",
    },
  ];

  const bottomOptions: SidebarLinkData[] = [
    {
      label: "Profile",
      icon: <UserIcon className="size-5" />,
      onClick: () => changeTab("profile"),
      active: resolvedTab === "profile",
    },
    {
      label: "Settings",
      icon: <SettingsIcon className="size-5" />,
      onClick: () => changeTab("settings"),
      active: resolvedTab === "settings",
    },
  ];

  const logoutOption: SidebarLinkData = {
    label: "Logout",
    icon: <ExitIcon className="size-5" />,
    onClick: handleLogout,
  };

  return (
    <Sidebar>
      <SidebarBody className="justify-between gap-6 py-5">
        <div className="flex flex-1 flex-col gap-8 overflow-x-hidden overflow-y-auto px-3">
          <SidebarBrand />
          <nav className="flex flex-col gap-1">
            {topOptions.map((option) => (
              <SidebarLink key={option.label} link={option} />
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-1 border-t border-border px-3 pt-4">
          {bottomOptions.map((option) => (
            <SidebarLink key={option.label} link={option} />
          ))}
          <SidebarLink link={logoutOption} />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

function SidebarBrand() {
  const { open, mobileOpen, reduceMotion } = useSidebar();
  const showWordmark = open || mobileOpen;

  return (
    <Link href="/" className="flex items-center gap-2.5 px-1">
      <LogoTile className="h-6 w-6 shrink-0" />
      <motion.span
        animate={{
          display: reduceMotion
            ? "inline-block"
            : showWordmark
              ? "inline-block"
              : "none",
          opacity: reduceMotion ? 1 : showWordmark ? 1 : 0,
        }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.15 }}
        className="whitespace-nowrap text-base font-bold tracking-tight text-foreground"
      >
        preplit<span className="text-[#E8A33D]">.</span>
      </motion.span>
    </Link>
  );
}
