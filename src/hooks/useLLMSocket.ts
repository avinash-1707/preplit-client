"use client";

import { getSocket } from "@/lib/getSocket";
import { useEffect, useRef } from "react";
import { useLLMStore } from "@/store/llmStore";

export function useLLMSocket() {
    const socket = getSocket();
    const bufferRef = useRef("");

    const start = useLLMStore((s) => s.start);
    const commit = useLLMStore((s) => s.commit);
    const stop = useLLMStore((s) => s.stop);

    useEffect(() => {
        socket.on("llm:start", () => {
            bufferRef.current = "";
            start();
        });

        socket.on("llm:token", ({ token }: { token: string }) => {
            bufferRef.current += token;
            commit(bufferRef.current);
        });

        socket.on("llm:done", () => {
            stop();
        });

        socket.on("llm:error", () => {
            stop();
        });

        return () => {
            socket.off("llm:start");
            socket.off("llm:token");
            socket.off("llm:done");
            socket.off("llm:error");
        };
    }, [socket, start, commit, stop]);

    const sendTranscript = (text: string) => {
        bufferRef.current = "";
        start();
        socket.emit("user:transcript", { text });
    };

    return { sendTranscript };
}
