"use client";

import { useMicCameraStore } from "@/store/MicCameraStore";
import { Button } from "../ui/button";
import {
  Captions,
  DisconnectIcon,
  MicOffIcon,
  MicOnIcon,
  VideoOffIcon,
  VideoOnIcon,
} from "../svgs/InterviewControlIcons";

function ControlBar() {
  const {
    isMicOn,
    isCameraOn,
    toggleMic,
    toggleCamera,
    start,
    stop,
    isLoading,
  } = useMicCameraStore();

  const CONTROL_BTN =
    "w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all";

  return (
    <div className="fixed bottom-0 left-0 right-0 px-3 sm:px-6 py-3 sm:py-4 bg-white/70 dark:bg-neutral-950/70 backdrop-blur border-t">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Microphone */}
            <Button
              onClick={toggleMic}
              disabled={isLoading}
              className={`${CONTROL_BTN} ${
                isMicOn
                  ? "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              title={isMicOn ? "Turn off microphone" : "Turn on microphone"}
              size="icon"
            >
              {isMicOn ? (
                <MicOnIcon className="size-6.5" />
              ) : (
                <MicOffIcon className="size-6.5" />
              )}
            </Button>

            {/* Video */}
            <Button
              onClick={toggleCamera}
              disabled={isLoading}
              className={`${CONTROL_BTN} ${
                isCameraOn
                  ? "bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              title={isCameraOn ? "Turn off camera" : "Turn on camera"}
              size="icon"
            >
              {isCameraOn ? (
                <VideoOnIcon className="size-6" />
              ) : (
                <VideoOffIcon className="size-6" />
              )}
            </Button>

            {/* Captions */}
            <Button
              className={`${CONTROL_BTN} bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hidden sm:flex`}
              title="Captions"
              size="icon"
            >
              <Captions className="size-6" />
            </Button>

            {/* End call */}
            <Button
              onClick={stop}
              className={`${CONTROL_BTN} px-5 sm:px-6 bg-red-500 hover:bg-red-600 text-white`}
              title="Leave call"
              size="icon"
            >
              <DisconnectIcon className="size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlBar;
