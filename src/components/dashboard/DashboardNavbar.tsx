import React from "react";
import ThemeToggle from "../ThemeToggle";
import { Link } from "next-view-transitions";

function DashboardNavbar() {
  return (
    <nav className="top-0 w-full flex justify-between items-center py-5 px-12 border-b backdrop-blur-lg z-40">
      <Link href="/">
        <h1 className="text-2xl font-bold">preplit</h1>
      </Link>
      <ThemeToggle />
    </nav>
  );
}

export default DashboardNavbar;
