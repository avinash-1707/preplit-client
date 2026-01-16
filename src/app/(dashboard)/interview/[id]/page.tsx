import React from "react";
import InterviewShell from "./InterviewShell";

async function InterviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <InterviewShell sessionId={id} />;
}

export default InterviewPage;
