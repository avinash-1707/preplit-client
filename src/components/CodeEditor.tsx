"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Monaco = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center">
      Loading editor…
    </div>
  ),
});

type Props = {
  value: string;
  language?: string;
  onChange?: (value: string) => void;
};

export default function CodeEditor({
  value,
  language = "javascript",
  onChange,
}: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Monaco
      height="100%"
      language={language}
      value={value}
      theme={resolvedTheme === "dark" ? "vs-dark" : "vs"}
      onChange={(v) => onChange?.(v ?? "")}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        smoothScrolling: true,
        cursorSmoothCaretAnimation: "on",
        wordWrap: "on",
        automaticLayout: true,
        scrollBeyondLastLine: false,
      }}
    />
  );
}
