import { create } from "zustand";

type TranscriptState = {
    partial: string;
    final: string | null;
    setPartial: (text: string) => void;
    commitFinal: (text: string) => void;
    clear: () => void;
};

export const useTranscriptStore = create<TranscriptState>((set) => ({
    partial: "",
    final: null,

    setPartial: (text) => set({ partial: text }),

    commitFinal: (text) =>
        set({
            final: text,
            partial: "",
        }),

    clear: () =>
        set({
            partial: "",
            final: null,
        }),
}));
