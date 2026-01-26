import { create } from "zustand";

interface LLMStore {
    answer: string;
    isThinking: boolean;

    start: () => void;
    commit: (text: string) => void;
    stop: () => void;
    reset: () => void;
}

export const useLLMStore = create<LLMStore>((set) => ({
    answer: "",
    isThinking: false,

    start: () => set({ isThinking: true, answer: "" }),
    commit: (text) => set({ answer: text }),
    stop: () => set({ isThinking: false }),
    reset: () => set({ answer: "", isThinking: false }),
}));
