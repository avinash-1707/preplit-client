"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "@/lib/auth-client";
import { Link } from "next-view-transitions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SessionUser } from "@/types/SessionUser";
import { ExitIcon } from "../svgs/ExitIcon";
import { SettingsIcon } from "../svgs/SettingsIcon";
import { DashboardIcon } from "../svgs/DashboardIcon";

export function UserButton() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const session = await authClient.getSession();
      setUser(session.data?.user ?? null);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    window.location.reload();
    setInterval(() => router.push("/"), 1000);
  };

  return (
    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
      {user ? (
        <>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="size-8 rounded-full cursor-pointer"
              >
                <Avatar className="size-8">
                  <AvatarImage src={user?.image || "/default-avatar.png"} />
                  <AvatarFallback>{user?.name.charAt(0) || ""}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="dark:bg-zinc-800 dark:text-zinc-100 bg-zinc-100 text-zinc-800"
              align="end"
            >
              <DropdownMenuLabel className="flex flex-col items-start">
                <div className="text-sm font-medium">{user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
                asChild
              >
                <Link href={"/dashboard"}>
                  <DashboardIcon />
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
                asChild
              >
                <Link href={"/dashboard/settings"}>
                  <SettingsIcon />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-zinc-300 dark:hover:bg-zinc-700 cursor-pointer"
                onClick={handleLogout}
              >
                <ExitIcon />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button onClick={() => router.push("/login")}>Log in</Button>
        </>
      )}
    </div>
  );
}
