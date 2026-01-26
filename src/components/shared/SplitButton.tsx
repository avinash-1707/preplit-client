import React from "react";
import { ChevronUpIcon } from "../svgs/ChevronIcon";
import { ComponentType, SVGProps } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Types
interface DropdownItem {
  type?: "label" | "separator";
  label?: string;
  onClick?: () => void;
}

interface SplitButtonProps {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  isActive: boolean;
  label: string;
  onClick: () => void;
  dropdownItems?: DropdownItem[];
  className?: string;
}

// Split Button Component
export const SplitButton: React.FC<SplitButtonProps> = ({
  icon: Icon,
  label,
  onClick,
  isActive = false,
  dropdownItems = [],
  className = "",
}) => {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          hidden sm:flex items-center
          h-11 sm:h-12
          ${isActive ? "bg-linear-to-r from-neutral-200 to-neutral-300 dark:from-neutral-600 dark:to-neutral-700" : "bg-linear-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900"}
          rounded-full
          overflow-hidden
          text-neutral-700 dark:text-neutral-300
          hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50
          hover:scale-105
          transition-all duration-300 ease-out
          border border-neutral-200/60 dark:border-neutral-700/60
          backdrop-blur-sm
        `}
      >
        {/* Left: Main Action */}
        <button
          title={label}
          onClick={onClick}
          className="
            h-full px-3.5
            flex items-center justify-center
            transition-all duration-200
            hover:text-neutral-900 dark:hover:text-white
            active:scale-95
            group
          "
        >
          <Icon className="size-6 group-hover:scale-110 transition-transform duration-200" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-linear-to-b from-transparent via-neutral-300 dark:via-neutral-600 to-transparent" />

        {/* Right: Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="
                h-full pl-1.5 pr-2.5
                flex items-center justify-center
                transition-all duration-200
                hover:text-neutral-900 dark:hover:text-white
                active:scale-95
                group
              "
            >
              <ChevronUpIcon
                size={16}
                className="group-hover:translate-y-[-2px] transition-all duration-200 group-data-[state=open]:rotate-180"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {dropdownItems.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === "separator" ? (
                  <DropdownMenuSeparator />
                ) : item.type === "label" ? (
                  <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
                ) : item.type === "clickable" ? (
                  <DropdownMenuItem onClick={item.onClick}>
                    {item.label}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuCheckboxItem>
                    Status Bar
                  </DropdownMenuCheckboxItem>
                )}
              </React.Fragment>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
