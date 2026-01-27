import React from "react";
import ThemeToggle from "../ThemeToggle";

function Header() {
  return (
    <header className="w-full pb-3 mb-3 border-b">
      <div className="relative flex items-center justify-center">
        {/* Centered title */}
        <div className="text-lg font-semibold">Header</div>
      </div>
    </header>
  );
}

export default Header;
