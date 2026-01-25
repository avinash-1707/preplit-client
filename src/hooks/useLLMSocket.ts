"use client";

import { getSocket } from "@/lib/getSocket";
import { useEffect, useRef, useState } from "react";

export function useLLMSocket() {
    const [answer, setAnswer] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    const socket = getSocket();
    const answerRef = useRef("");

    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("llm:token", ({ token }: { token: string }) => {
            answerRef.current += token;
            setAnswer(answerRef.current);
        });

        socket.on("llm:done", () => {
            setIsThinking(false);
        });

        socket.on("llm:error", (msg: string) => {
            console.error(msg);
            setIsThinking(false);
        });

        return () => {
            socket.off("connect");
            socket.off("llm:token");
            socket.off("llm:done");
            socket.off("llm:error");
        };
    }, [socket]);

    const sendTranscript = (text: string) => {
        answerRef.current = "";
        setAnswer("");
        setIsThinking(true);

        socket.emit("user:transcript", { text });
    };

    return {
        answer,
        isThinking,
        sendTranscript,
    };
}
