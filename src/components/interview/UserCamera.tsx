"use client";

import { useMicCameraStore } from "@/store/MicCameraStore";
import { SessionUser } from "@/types/SessionUser";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MicOffIcon } from "../svgs/InterviewControlIcons";

import { useScribe } from "@elevenlabs/react";
import fetchTokenFromServer from "@/utils/fetchTokenFromServer";
import { useTranscriptStore } from "@/store/transcriptStore";
import { useLLMSocket } from "@/hooks/useLLMSocket";

export default function UserCamera({ user }: { user: SessionUser }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { stream, isCameraOn, isMicOn, start, stop, error } =
    useMicCameraStore();

  const [isSpeaking, setIsSpeaking] = useState(false);

  /* ---------------- STT refs ---------------- */
  const lastPartialRef = useRef("");
  const hasSentFinalRef = useRef(false);

  const { setPartial, commitFinal } = useTranscriptStore();
  const { sendTranscript } = useLLMSocket();

  /* ---------------- ElevenLabs STT ---------------- */
  const scribe = useScribe({
    modelId: "scribe_v2_realtime",
    languageCode: "en",

    onPartialTranscript: (d) => {
      if (!d.text) return;

      if (d.text.length >= lastPartialRef.current.length) {
        lastPartialRef.current = d.text;
        setPartial(d.text);
      }
    },

    onCommittedTranscript: (d) => {
      const finalText = d.text?.trim() || lastPartialRef.current.trim();

      if (!finalText || hasSentFinalRef.current) return;

      hasSentFinalRef.current = true;

      commitFinal(finalText);
      sendTranscript(finalText);

      lastPartialRef.current = "";

      if (scribe.isConnected) {
        scribe.disconnect();
      }
    },
  });

  /* ---------------- start camera on mount ---------------- */
  useEffect(() => {
    start({ audio: false, video: true });
    return () => stop();
  }, [start, stop]);

  /* ---------------- attach stream to video ---------------- */
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  /* ---------------- mic ON/OFF → STT lifecycle ---------------- */
  useEffect(() => {
    if (!isMicOn) {
      if (scribe.isConnected) {
        scribe.commit();

        // fallback if commit event never fires
        setTimeout(() => {
          if (!hasSentFinalRef.current) {
            const fallback = lastPartialRef.current.trim();
            if (fallback) {
              commitFinal(fallback);
              sendTranscript(fallback);
            }
            lastPartialRef.current = "";
            hasSentFinalRef.current = false;
            scribe.disconnect();
          }
        }, 150);
      }
      return;
    }

    // mic turned ON
    hasSentFinalRef.current = false;
    lastPartialRef.current = "";

    let cancelled = false;

    (async () => {
      const token = await fetchTokenFromServer();
      if (cancelled) return;

      await scribe.connect({
        token,
        microphone: {
          echoCancellation: true,
          noiseSuppression: true,
        },
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [isMicOn]);

  /* ---------------- speaking detection ---------------- */
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

    let rafId: number;
    const threshold = 18;

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

  /* ---------------- UI ---------------- */
  return (
    <div
      className={`relative w-full h-full rounded-lg overflow-hidden bg-black duration-200 ${
        isSpeaking ? "border-4 border-neutral-400" : ""
      }`}
    >
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
            alt="default avatar"
            height={100}
            width={100}
            className="rounded-full size-36"
          />
        </div>
      )}

      {!isMicOn && (
        <div className="absolute top-2 right-2 bg-white/50 dark:bg-black/50 rounded-full p-2">
          <MicOffIcon className="size-5" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white text-sm">
          {error.message}
        </div>
      )}
    </div>
  );
}
