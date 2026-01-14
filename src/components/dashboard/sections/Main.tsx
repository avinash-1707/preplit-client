import { SessionUser } from "@/types/SessionUser";
import React from "react";

function Main({ user }: { user: SessionUser }) {
  return <div>Hi {user.name}</div>;
}

export default Main;
