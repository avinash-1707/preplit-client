import Profile from "./sections/Profile";
import Settings from "./sections/Settings";
import Overview from "./sections/Main";
import Interviews from "./sections/Interviews";
import { SessionUser } from "@/types/SessionUser";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LoaderOne } from "../ui/loader";
import Insights from "./sections/Insights";
import { DashboardSection } from "@/app/(dashboard)/dashboard/page";

const VALID_SECTIONS: DashboardSection[] = [
  "overview",
  "profile",
  "settings",
  "insights",
  "interviews",
];

function DashboardContent({
  activeSection,
}: {
  activeSection?: DashboardSection;
}) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  const section: DashboardSection =
    activeSection && VALID_SECTIONS.includes(activeSection)
      ? activeSection
      : "overview";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await authClient.getSession();
        setUser(session.data?.user ?? null);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <LoaderOne />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-600 dark:text-zinc-400">No user data found</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {
        {
          profile: <Profile user={user} />,
          settings: <Settings />,
          overview: <Overview user={user} />,
          insights: <Insights />,
          interviews: <Interviews />,
        }[section]
      }
    </main>
  );
}

export default DashboardContent;
