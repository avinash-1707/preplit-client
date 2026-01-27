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
import { ChevronUpIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function ControlBar() {
  const {
    isMicOn,
    isCameraOn,
    captionsEnabled,
    toggleCamera,
    toggleCaptions,
    startMic,
    stopMic,
    stop,
    isLoading,
    audioInputs,
    videoInputs,
    selectedAudioInputId,
    selectedVideoInputId,
    setAudioInput,
    setVideoInput,
    interviewerCaptionsEnabled,
    userCaptionsEnabled,
    toggleInterviewerCaptions,
    toggleUserCaptions,
  } = useMicCameraStore();

  const captionDropDown = [
    {
      label: "Interviewer Captions",
      onClick: () => toggleInterviewerCaptions(),
      enabled: interviewerCaptionsEnabled,
    },
    {
      label: "Candidate Captions",
      onClick: () => toggleUserCaptions(),
      enabled: userCaptionsEnabled,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 px-3 sm:px-6 py-3 sm:py-4 bg-white/70 dark:bg-neutral-950/70 backdrop-blur border-t">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex items-center justify-center">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Push-to-talk Microphone (PRESS & HOLD ONLY) */}
            <div className="relative">
              <div
                className={`hidden sm:flex items-center h-11 sm:h-12 rounded-full overflow-hidden transition-all duration-300 ease-out border backdrop-blur-sm ${isMicOn ? "bg-linear-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300/60 dark:border-neutral-600/60 hover:shadow-lg hover:shadow-neutral-300 dark:hover:shadow-neutral-800/50 hover:scale-105" : "bg-linear-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200/60 dark:border-neutral-700/60 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 hover:scale-105"}`}
              >
                {/* Left: Push to Talk Button */}
                <button
                  disabled={isLoading}
                  title="Hold to talk"
                  className="h-full px-3.5 flex items-center justify-center transition-all duration-200 active:scale-95 group select-none"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    startMic(); // mic ON
                  }}
                  onMouseUp={(e) => {
                    e.preventDefault();
                    stopMic(); // mic OFF
                  }}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    startMic(); // mic ON
                  }}
                  onTouchEnd={(e) => {
                    e.preventDefault();
                    stopMic(); // mic OFF
                  }}
                >
                  {isMicOn ? (
                    <MicOnIcon className="size-6 group-hover:scale-110 transition-transform duration-200 text-green-600" />
                  ) : (
                    <MicOffIcon className="size-6 group-hover:scale-110 transition-transform duration-200" />
                  )}
                </button>

                {/* Divider */}
                <div
                  className={`w-px h-6 bg-linear-to-b from-transparent to-transparent ${
                    isMicOn
                      ? "via-green-300 dark:via-green-600"
                      : "via-neutral-300 dark:via-neutral-600"
                  }`}
                />

                {/* Right: Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-full pl-1.5 pr-2.5 flex items-center justify-center transition-all duration-200 hover:text-neutral-900 dark:hover:text-white active:scale-95 group">
                      <ChevronUpIcon
                        size={16}
                        className="group-hover:translate-y-[-2px] transition-all duration-200 group-data-[state=open]:rotate-180"
                      />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                      <DropdownMenuRadioGroup
                        value={selectedAudioInputId!}
                        onValueChange={setAudioInput}
                      >
                        {audioInputs.map((item, index) => (
                          <DropdownMenuRadioItem
                            key={index}
                            value={item.deviceId}
                          >
                            {item.label}
                          </DropdownMenuRadioItem>
                        ))}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Video */}
            <div
              className={`hidden sm:flex items-center h-11 sm:h-12 ${!isCameraOn ? "bg-linear-to-r from-red-400 to-red-500 dark:from-red-500 dark:to-red-600" : "bg-linear-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900"} rounded-full overflow-hidden text-neutral-700 dark:text-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 hover:scale-105 transition-all duration-300 ease-out border border-neutral-200/60 dark:border-neutral-700/60 backdrop-blur-sm
        `}
            >
              {/* Left: Main Action */}
              <button
                title={"Camera"}
                onClick={toggleCamera}
                className="h-full px-3.5 flex items-center justify-center transition-all duration-200 hover:text-neutral-900 dark:hover:text-white active:scale-95 group"
              >
                {isCameraOn ? (
                  <VideoOnIcon className="size-6 group-hover:scale-110 transition-transform duration-200" />
                ) : (
                  <VideoOffIcon className="size-6 group-hover:scale-110 transition-transform duration-200" />
                )}
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-linear-to-b from-transparent via-neutral-300 dark:via-neutral-600 to-transparent" />

              {/* Right: Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-full pl-1.5 pr-2.5 flex items-center justify-center transition-all duration-200 hover:text-neutral-900 dark:hover:text-white active:scale-95 group">
                    <ChevronUpIcon
                      size={16}
                      className="group-hover:translate-y-[-2px] transition-all duration-200 group-data-[state=open]:rotate-180"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuRadioGroup
                      value={selectedVideoInputId!}
                      onValueChange={setVideoInput}
                    >
                      {videoInputs.map((item, index) => (
                        <DropdownMenuRadioItem
                          key={index}
                          value={item.deviceId}
                        >
                          {item.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Captions */}
            <div
              className={`hidden sm:flex items-center h-11 sm:h-12 ${!captionsEnabled ? "bg-linear-to-r from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800" : "bg-linear-to-r from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900"} rounded-full overflow-hidden text-neutral-700 dark:text-neutral-300 hover:shadow-lg hover:shadow-neutral-200/50 dark:hover:shadow-neutral-900/50 hover:scale-105 transition-all duration-300 ease-out border border-neutral-200/60 dark:border-neutral-700/60 backdrop-blur-sm
        `}
            >
              {/* Left: Main Action */}
              <button
                title={"Captions"}
                onClick={toggleCaptions}
                className="h-full px-3.5 flex items-center justify-center transition-all duration-200 hover:text-neutral-900 dark:hover:text-white active:scale-95 group"
              >
                <Captions className="size-6 group-hover:scale-110 transition-transform duration-200" />
              </button>

              {/* Divider */}
              <div className="w-px h-6 bg-linear-to-b from-transparent via-neutral-300 dark:via-neutral-600 to-transparent" />

              {/* Right: Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="h-full pl-1.5 pr-2.5 flex items-center justify-center transition-all duration-200 hover:text-neutral-900 dark:hover:text-white active:scale-95 group">
                    <ChevronUpIcon
                      size={16}
                      className="group-hover:translate-y-[-2px] transition-all duration-200 group-data-[state=open]:rotate-180"
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuGroup>
                    <DropdownMenuRadioGroup
                      value={selectedVideoInputId!}
                      onValueChange={setVideoInput}
                    >
                      {captionDropDown.map((item, index) => (
                        <DropdownMenuCheckboxItem
                          key={index}
                          checked={!item.enabled}
                          onCheckedChange={item.onClick}
                        >
                          {item.label}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* End call */}
            <Button
              onClick={stop}
              className="h-11 sm:h-12 px-5 sm:px-6 flex items-center justify-center rounded-full overflow-hidden bg-linear-to-r from-red-500 to-red-600 text-white border border-red-400/60 dark:border-red-700/60 backdrop-blur-sm hover:shadow-lg hover:shadow-red-200/50 dark:hover:shadow-red-900/50 hover:scale-105 active:scale-95 transition-all duration-300 ease-out group"
              title="Leave call"
            >
              <DisconnectIcon className="size-6 group-hover:scale-110 transition-transform duration-200" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ControlBar;
