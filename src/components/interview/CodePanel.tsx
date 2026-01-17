import React from "react";
import CodeEditor from "../CodeEditor";
function CodePanel() {
  return (
    <div className="w-full h-full p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900">
      <p className="text-xs pb-2 text-muted-foreground">javascript</p>
      <CodeEditor value={`console.log("Hello world!")`} />
    </div>
  );
}

export default CodePanel;
