import { useEffect, useRef, useState } from "react";

export default function UserCamera() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError("camera access denied or not available");
      }
    }

    startCamera();

    return () => {
      // cleanup when component unmounts
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <p>Niggu</p>
    // <video
    //   ref={videoRef}
    //   autoPlay
    //   playsInline
    //   muted
    //   className="w-full h-full rounded-lg bg-black"
    // />
  );
}
