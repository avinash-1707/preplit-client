import React from "react";

interface ChevronIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

/* Chevron Up */
export const ChevronUpIcon: React.FC<ChevronIconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 15L12 9L18 15"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/* Chevron Down */
export const ChevronDownIcon: React.FC<ChevronIconProps> = ({
  size = 24,
  color = "currentColor",
  strokeWidth = 2,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6 9L12 15L18 9"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
