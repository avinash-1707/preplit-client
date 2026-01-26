import Image from "next/image";
import React from "react";
import CaptionTab from "./CaptionTab";
import { useLLMStore } from "@/store/llmStore";
import { useMicCameraStore } from "@/store/MicCameraStore";

function AIInterviewer() {
  const { answer, isThinking } = useLLMStore();
  const { captionsEnabled, interviewerCaptionsEnabled } = useMicCameraStore();
  return (
    <div className="h-full w-full">
      {captionsEnabled || interviewerCaptionsEnabled ? (
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
        <CaptionTab speaker="ai" className="h-full">
          <Image
            src="/robot.png"
            alt="Interviewer"
            height={100}
            width={100}
            className="size-8 rounded-full"
          />
          <div className="w-full h-full">
            <h1>Random ass text is here</h1>
            {isThinking && <span>Thinking…</span>}
            <p>{answer}</p>
          </div>
        </CaptionTab>
      )}
    </div>
  );
}

export default AIInterviewer;
