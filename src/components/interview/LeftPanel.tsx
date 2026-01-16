import React from "react";
import AIInterviewer from "./AIInterviewer";
import UserCamera from "./UserCamera";

function LeftPanel() {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex-1">
        <AIInterviewer />
      </div>

      <div className="flex-1">
        <UserCamera />
      </div>
    </div>
  );
}

export default LeftPanel;
