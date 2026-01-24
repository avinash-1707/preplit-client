"use client";

import { getSocket } from "@/lib/getSocket";
import { get } from "http";
import { useEffect, useState } from "react";

export function useLLMSocket() {
    const [answer, setAnswer] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        const socket = getSocket();

        socket.on("connect", () => {
            console.log("Socket.IO connected:", socket.id);
        });

        socket.on("llm:token", (token: string) => {
            setAnswer((prev) => prev + token);
        });

        socket.on("llm:done", () => {
            setIsThinking(false);
        });

        socket.on("llm:error", (msg: string) => {
            console.error(msg);
            setIsThinking(false);
        });

        return () => {
            socket.off("llm:token");
            socket.off("llm:done");
            socket.off("llm:error");
        };
    }, []);

    const sendTranscript = (text: string) => {
        const socket = getSocket();

        setAnswer("");
        setIsThinking(true);

        socket.emit("user:transcript", {
            text,
        });
    };

    return {
        answer,
        isThinking,
        sendTranscript,
    };
}
