"use client";

import { getSocket } from "@/lib/getSocket";
import { get } from "http";
import { useEffect, useState } from "react";

export function useLLMSocket() {
    const [answer, setAnswer] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    const socket = getSocket();

    useEffect(() => {

        socket.on("connect", () => {
            console.log("Socket.IO connected:", socket.id);
        });

        socket.on("llm:token", ({ token }: { token: string }) => {
            setAnswer((prev) => prev + token);
        });

        socket.on("llm:done", () => {
            console.log(answer)
            setIsThinking(false);
        });

        socket.on("llm:error", (msg: string) => {
            console.error(msg);
            setIsThinking(false);
        });

        return () => {
            socket.off("connect")
            socket.off("llm:token");
            socket.off("llm:done");
            socket.off("llm:error");
        };
    }, []);

    const sendTranscript = (text: string) => {

        setAnswer("");
        setIsThinking(true);

        console.log("socket trying to send message")

        socket.emit("user:transcript", {
            text,
        });

        console.log("Socket sent message successfully", text)
    };

    return {
        answer,
        isThinking,
        sendTranscript,
    };
}
