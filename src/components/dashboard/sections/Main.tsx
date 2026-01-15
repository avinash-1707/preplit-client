import { SessionUser } from "@/types/SessionUser";
import React from "react";

function Overview({ user }: { user: SessionUser }) {
  return <div>Hi {user.name}</div>;
}

export default Overview;
