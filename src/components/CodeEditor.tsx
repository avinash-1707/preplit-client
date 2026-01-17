"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();

  return (
    <Monaco
      height="100%"
      language={language}
      value={value}
      theme={theme === "dark" ? "vs-dark" : "vs"}
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
