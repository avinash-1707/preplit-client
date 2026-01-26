import React, { useEffect, useState } from "react";
import AIInterviewer from "./AIInterviewer";
import UserCamera from "./UserCamera";
import { SessionUser } from "@/types/SessionUser";
import { authClient } from "@/lib/auth-client";
import { LoaderOne } from "../ui/loader";

function LeftPanel() {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="grid h-full grid-rows-2 gap-3">
      <AIInterviewer />
      <UserCamera user={user!} />
    </div>
  );
}

export default LeftPanel;
