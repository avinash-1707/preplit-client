"use client";

import { useEffect } from "react";
import ControlBar from "@/components/interview/ControlBar";
import LeftPanel from "@/components/interview/LeftPanel";
import Header from "@/components/interview/Header";
import CodePanel from "@/components/interview/CodePanel";
import Captions from "@/components/interview/Captions";
import { useLLMStore } from "@/store/llmStore";
import { useMicCameraStore } from "@/store/MicCameraStore";

type InterviewShellProps = {
  sessionId: string;
};

export default function InterviewShell({ sessionId }: InterviewShellProps) {
  const { captionsEnabled, userCaptionsEnabled } = useMicCameraStore();

  // 🔒 Navigation lock (basic version)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <div className="h-screen w-screen p-3 flex flex-col overflow-hidden">
      <Header />
      {/* Main Interview Area */}
      <div className="flex flex-1 gap-3 overflow-hidden">
        {/* Left: AI + Camera */}
        <div className="w-[32%] min-w-90">
          <LeftPanel />
        </div>

        {/* Right: Coding Interface */}
        <div className="flex-1">
          <CodePanel />
        </div>
      </div>

      {!userCaptionsEnabled && <Captions />}

      {/* Bottom Controls */}
      <div className="h-20">
        <ControlBar />
      </div>
    </div>
  );
}
