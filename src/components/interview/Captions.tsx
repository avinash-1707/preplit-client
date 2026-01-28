"use client";

import { useTranscriptStore } from "@/store/transcriptStore";
import { useEffect, useState } from "react";
import CaptionTab from "./CaptionTab";

export default function Captions() {
  const { partial, final } = useTranscriptStore();
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    if (partial) {
      setVisibleText(partial);
      return;
    }

    if (final) {
      setVisibleText(final);
      const t = setTimeout(() => setVisibleText(""), 2500);
      return () => clearTimeout(t);
    }
  }, [partial, final]);

  if (!visibleText) return null;

  return (
    <CaptionTab>
      <p className="bg-green-900/40 text-white text-sm">{visibleText}</p>
    </CaptionTab>
  );
}
