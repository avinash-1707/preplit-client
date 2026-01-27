import React from "react";

type CaptionTabProps = {
  children: React.ReactNode;
  speaker?: "ai" | "user";
  listening?: boolean;
  className?: string;
};

function CaptionTab({
  children,
  speaker = "user",
  className = "",
}: CaptionTabProps) {
  return (
    <div className="pointer-events-none select-none">
      <div
        className={`
          mx-auto mt-3 w-full
          rounded-2xl px-5 py-3
          backdrop-blur-md
          bg-zinc-100 dark:bg-zinc-900
          transition-all duration-200
          ${className}
        `}
      >
        {/* Speaker label */}
        <div className="mb-1 text-[11px] uppercase tracking-wider text-white/40">
          {speaker === "ai" ? "Interviewer" : "You"}
        </div>

        {/* Caption text */}
        <div className="h-full text-sm leading-relaxed text-white/90">
          {children}
        </div>
      </div>
    </div>
  );
}

export default CaptionTab;
