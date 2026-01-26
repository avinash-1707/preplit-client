import { useLLMStore } from "@/store/llmStore";
import Image from "next/image";
import React from "react";

function AIInterviewer() {
  const { answer, isThinking } = useLLMStore();

  return (
    <div className="h-full w-full bg-zinc-100 dark:bg-zinc-900 rounded-lg flex justify-center items-center">
      <Image
        src="/robot.png"
        alt="Interviewer"
        height={100}
        width={100}
        className="size-36 rounded-full"
      />
      <div>
        {isThinking && <span>Thinking…</span>}
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default AIInterviewer;
