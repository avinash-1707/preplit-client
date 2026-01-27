import Image from "next/image";
import React from "react";
import CaptionTab from "./CaptionTab";
import { useLLMStore } from "@/store/llmStore";
import { useMicCameraStore } from "@/store/MicCameraStore";

function AIInterviewer() {
  const { answer, isThinking } = useLLMStore();
  const { interviewerCaptionsEnabled } = useMicCameraStore();
  return (
    <div className="h-full w-full">
      {interviewerCaptionsEnabled ? (
        <div className="h-full w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg flex justify-center items-center">
          <Image
            src="/robot.png"
            alt="Interviewer"
            height={100}
            width={100}
            className="size-36 rounded-full"
          />
        </div>
      ) : (
        <div
          className={`mx-auto w-full h-full rounded-2xl p-2 backdrop-blur-md bg-zinc-100 dark:bg-zinc-900 transition-all duration-200 flex flex-col`}
        >
          {/* Header: image + speaker */}
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/robot.png"
              alt="Interviewer"
              height={100}
              width={100}
              className="size-7 rounded-full"
            />

            <span className="text-[11px] uppercase tracking-wider text-white/40">
              Interviewer
            </span>
          </div>

          {/* Caption body */}
          <div className="bg-zinc-200 dark:bg-zinc-800 flex-1 text-sm leading-relaxed text-white/90 rounded-lg overflow-y-auto">
            {isThinking && (
              <span className="block mb-1 animate-pulse text-white/50">
                Thinking…
              </span>
            )}

            <p>{answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIInterviewer;
