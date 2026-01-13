"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SessionUser } from "@/types/SessionUser";

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
              <Button variant="ghost" className="size-8 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage src={user?.image || "/default-avatar.png"} />
                  <AvatarFallback>{user?.name.charAt(0) || ""}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="bg-zinc-800 text-zinc-100"
              forceMount
              align="end"
            >
              <DropdownMenuItem className="flex flex-col items-start">
                <div className="text-sm font-medium">{user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user?.email}
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={"/dashboard"}>
                  <span>Dashboard</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/dashboard/settings"}>
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
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
