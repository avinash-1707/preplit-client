"use client";

import { getSocket } from "@/lib/getSocket";
import { playPCMChunk } from "@/lib/ttsPlayer";
import { useEffect, useState } from "react";

export function useTTSSocket() {
    const socket = getSocket();
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        socket.on("tts:start", () => {
            setIsSpeaking(true);
        });

        socket.on("tts:chunk", (audioChunk: ArrayBuffer) => {
            playPCMChunk(audioChunk)
        });

        socket.on("tts:done", () => {
            setIsSpeaking(false);
        });

        return () => {
            socket.off("tts:start");
            socket.off("tts:chunk");
            socket.off("tts:done");
        };
    }, [socket]);

    return {
        isSpeaking,
    };
}
