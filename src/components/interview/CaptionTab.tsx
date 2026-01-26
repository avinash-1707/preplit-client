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
          bg-white/5 border border-white/10
          shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          transition-all duration-200
          ${className}
        `}
      >
        {/* Speaker label */}
        <div className="mb-1 text-[11px] uppercase tracking-wider text-white/40">
          {speaker === "ai" ? "Interviewer" : "You"}
        </div>

        {/* Caption text */}
        <div className="text-sm leading-relaxed text-white/90">{children}</div>
      </div>
    </div>
  );
}

export default CaptionTab;
