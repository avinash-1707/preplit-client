import React from "react";
import ThemeToggle from "../ThemeToggle";

function DashboardNavbar() {
  return (
    <nav className="top-0 fixed w-full flex justify-between items-center py-5 px-12 border-b backdrop-blur-lg z-40">
      <h1 className="text-2xl font-bold">preplit</h1>
      <ThemeToggle />
    </nav>
  );
}

export default DashboardNavbar;
