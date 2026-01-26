import { Button } from "@/components/ui/button";
import { initAndUnlockTTSPlayer } from "@/lib/ttsPlayer";
import { useRouter } from "next/navigation";
import React from "react";

function Interviews() {
  const router = useRouter();
  const handleInterviewStart = async () => {
    await initAndUnlockTTSPlayer();
    router.push("/interview/abcd");
  };
  return (
    <div>
      Interviews
      <Button onClick={handleInterviewStart} variant="outline">
        Start Interview
      </Button>
    </div>
  );
}

export default Interviews;
