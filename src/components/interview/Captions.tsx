"use client";

import React, { useEffect, useRef } from "react";
import { useScribe } from "@elevenlabs/react";
import fetchTokenFromServer from "@/utils/fetchTokenFromServer";
import { useLLMSocket } from "@/hooks/useLLMSocket";

function Captions() {
    const lastPartialRef = useRef("");
    const {sendTranscript} = useLLMSocket()

  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    onPartialTranscript: (d) => console.log("Partial:", d.text),
    onCommittedTranscript: (d) => console.log("Committed:", d.text),
  });

  const isTalkingRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      if (isTalkingRef.current || scribe.isConnected) return;

      e.preventDefault();
      isTalkingRef.current = true;

      const token = await fetchTokenFromServer();
      await scribe.connect({
        token,
        microphone: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code !== "Space") return;
      
        e.preventDefault();
        isTalkingRef.current = false;
      
        setTimeout(() => {
            const finalText = lastPartialRef.current.trim();
          
            if (finalText) {
              sendTranscript(finalText);
            }
          
            lastPartialRef.current = "";
            scribe.disconnect();
          }, 150);
      };
      

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      scribe.disconnect();
    };
  }, []);

  return (
    <div>
      <p className="text-sm text-gray-400">
        Hold <kbd>Space</kbd> to speak
      </p>

      {scribe.partialTranscript && (
        <p className="bg-green-900/40 text-white">
          Live: {scribe.partialTranscript}
        </p>
      )}
      
    </div>
  );
}

export default Captions;
