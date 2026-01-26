"use client";

import { useMicCameraStore } from "@/store/MicCameraStore";
import { SessionUser } from "@/types/SessionUser";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MicOffIcon } from "../svgs/InterviewControlIcons";

export default function UserCamera({ user }: { user: SessionUser }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const { stream, isCameraOn, isMicOn, start, stop, error, enumerateDevices } =
    useMicCameraStore();

  const [isSpeaking, setIsSpeaking] = useState(false);

  // Start camera+mic on mount
  useEffect(() => {
    start({ audio: true, video: true });
    return () => stop();
  }, [start, stop]);

  // Attach stream to video
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Speaking detection using Web Audio API
  useEffect(() => {
    if (!stream || !isMicOn) {
      setIsSpeaking(false);
      return;
    }

    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 512;

    const source = audioCtx.createMediaStreamSource(stream);
    source.connect(analyser);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;

    let rafId: number;
    const threshold = 18; // tweak for sensitivity

    const tick = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      setIsSpeaking(avg > threshold);
      rafId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(rafId);
      audioCtx.close();
    };
  }, [stream, isMicOn]);

  return (
    <div
      className={`relative w-full h-full rounded-lg overflow-hidden bg-black duration-200 ${
        isSpeaking ? "border-4 border-neutral-400" : ""
      }`}
    >
      {/* Video or Avatar */}
      {isCameraOn ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="transform scale-x-[-1]"
        />
      ) : (
        <div className="h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={user.image ?? "/default-avatar.png"}
            alt="default ass avatar"
            height={100}
            width={100}
            className="rounded-full size-36"
          />
        </div>
      )}

      {/* Mic Off Indicator */}
      {!isMicOn && (
        <div className="absolute top-2 right-2 bg-white/50 dark:bg-black/50 rounded-full p-2">
          <MicOffIcon className="size-5" />
        </div>
      )}

      {/* Error overlay */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm">
          {error.message}
        </div>
      )}
    </div>
  );
}
