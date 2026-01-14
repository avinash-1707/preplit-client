import Profile from "./sections/Profile";
import Settings from "./sections/Settings";
import Main from "./sections/Main";
import Analytics from "./sections/Analytics";
import Interviews from "./sections/Interviews";
import Summary from "./sections/Summary";
import { SessionUser } from "@/types/SessionUser";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { LoaderOne } from "../ui/loader";

function DashboardContent({ activeSection }: { activeSection: string }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(false);

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
          main: <Main user={user} />,
          stats: <Analytics />,
          interviews: <Interviews />,
          summary: <Summary />,
        }[activeSection]
      }
    </main>
  );
}

export default DashboardContent;
