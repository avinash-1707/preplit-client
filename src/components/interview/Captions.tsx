"use client";

import React, { useEffect, useRef } from "react";
import { useScribe } from "@elevenlabs/react";
import fetchTokenFromServer from "@/utils/fetchTokenFromServer";
import { useLLMSocket } from "@/hooks/useLLMSocket";

function Captions() {
  const { sendTranscript } = useLLMSocket();

  const lastPartialRef = useRef("");
  const committedRef = useRef("");
  const isTalkingRef = useRef(false);

  const scribe = useScribe({
    modelId: "scribe_v2_realtime",

    onPartialTranscript: (d) => {
      if (d.text && d.text.length >= lastPartialRef.current.length) {
        lastPartialRef.current = d.text;
      }
    },

    onCommittedTranscript: (d) => {
      committedRef.current = d.text;
    },
  });

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

    const handleKeyUp = async (e: KeyboardEvent) => {
      if (e.code !== "Space") return;

      e.preventDefault();
      isTalkingRef.current = false;

      //Force finalization
      await scribe.commit();

      // 3️⃣ allow events to arrive
      setTimeout(() => {
        const finalText =
          committedRef.current.trim() || lastPartialRef.current.trim();

        console.log("Final transcript:", finalText);

        if (finalText) {
          sendTranscript(finalText);
        }

        committedRef.current = "";
        lastPartialRef.current = "";
        scribe.disconnect();
      }, 200);
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
      <p
        className={`text-sm ${isTalkingRef.current ? "text-green-400" : "text-gray-400"}`}
      >
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
