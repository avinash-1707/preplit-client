import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type MediaErrorCode =
  | "PERMISSION_DENIED"
  | "NOT_FOUND"
  | "NOT_READABLE"
  | "OVERCONSTRAINED"
  | "SECURITY"
  | "ABORT"
  | "UNKNOWN";

export interface MediaDeviceOption {
  deviceId: string;
  label: string;
  kind: MediaDeviceKind; // 'audioinput' | 'videoinput'
}

type CaptionRole = "user" | "interviewer";

interface CaptionsState {
  captionsEnabled: boolean;
  userCaptionsEnabled: boolean;
  interviewerCaptionsEnabled: boolean;

  toggleCaptions: () => void;
  toggleUserCaptions: () => void;
  toggleInterviewerCaptions: () => void;
}


interface MicCameraState extends CaptionsState {
  // Status
  hasPermission: boolean | null; // null = unknown
  isCameraOn: boolean;
  isMicOn: boolean;
  isLoading: boolean;
  error: { code: MediaErrorCode; message: string } | null;

  // Devices
  audioInputs: MediaDeviceOption[];
  videoInputs: MediaDeviceOption[];
  selectedAudioInputId: string | null;
  selectedVideoInputId: string | null;

  // Streams
  stream: MediaStream | null;

  // Actions
  initPermissions: () => Promise<void>;
  enumerateDevices: () => Promise<void>;

  /** Session-level */
  start: (opts?: { audio?: boolean; video?: boolean }) => Promise<void>;
  stop: () => void;

  /** Mic-level (PTT) */
  startMic: () => Promise<void>;
  stopMic: () => void;

  /** Camera */
  toggleCamera: () => void;

  /** Devices */
  setAudioInput: (deviceId: string) => Promise<void>;
  setVideoInput: (deviceId: string) => Promise<void>;

  clearError: () => void;
}


function mapMediaError(e: unknown): { code: MediaErrorCode; message: string } {
  if (!(e instanceof DOMException))
    return { code: "UNKNOWN", message: "Unknown media error" };
  switch (e.name) {
    case "NotAllowedError":
      return {
        code: "PERMISSION_DENIED",
        message: "Permission denied for camera/microphone",
      };
    case "NotFoundError":
      return {
        code: "NOT_FOUND",
        message: "No matching camera/microphone found",
      };
    case "NotReadableError":
      return {
        code: "NOT_READABLE",
        message: "Camera/microphone is already in use",
      };
    case "OverconstrainedError":
      return {
        code: "OVERCONSTRAINED",
        message: "Selected device does not satisfy constraints",
      };
    case "SecurityError":
      return {
        code: "SECURITY",
        message: "Security error accessing media devices",
      };
    case "AbortError":
      return { code: "ABORT", message: "Media request aborted" };
    default:
      return { code: "UNKNOWN", message: e.message || "Unknown media error" };
  }
}

async function getUserMediaSafe(
  constraints: MediaStreamConstraints
): Promise<MediaStream> {
  if (!navigator.mediaDevices?.getUserMedia)
    throw new Error("MediaDevices API not supported");
  return navigator.mediaDevices.getUserMedia(constraints);
}

export const useMicCameraStore = create<MicCameraState>()(
  devtools((set, get) => ({
    hasPermission: null,
    isCameraOn: false,
    isMicOn: false,
    isLoading: false,
    error: null,

    audioInputs: [],
    videoInputs: [],
    selectedAudioInputId: null,
    selectedVideoInputId: null,

    stream: null,

    captionsEnabled: false,
    userCaptionsEnabled: false,
    interviewerCaptionsEnabled: false,

    clearError: () => set({ error: null }),

    initPermissions: async () => {
      try {
        set({ isLoading: true, error: null });
        // Ask minimal permissions to unlock labels
        const s = await getUserMediaSafe({ audio: true, video: true });
        s.getTracks().forEach((t) => t.stop());
        set({ hasPermission: true });
        await get().enumerateDevices();
      } catch (e) {
        const mapped = mapMediaError(e);
        set({ hasPermission: false, error: mapped });
      } finally {
        set({ isLoading: false });
      }
    },

    enumerateDevices: async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices
          .filter((d) => d.kind === "audioinput")
          .map((d) => ({
            deviceId: d.deviceId,
            label: d.label || "Microphone",
            kind: d.kind,
          }));
        const videoInputs = devices
          .filter((d) => d.kind === "videoinput")
          .map((d) => ({
            deviceId: d.deviceId,
            label: d.label || "Camera",
            kind: d.kind,
          }));

        const { selectedAudioInputId, selectedVideoInputId } = get();
        set({
          audioInputs,
          videoInputs,
          selectedAudioInputId:
            selectedAudioInputId ?? audioInputs[0]?.deviceId ?? null,
          selectedVideoInputId:
            selectedVideoInputId ?? videoInputs[0]?.deviceId ?? null,
        });
      } catch (e) {
        set({ error: mapMediaError(e) });
      }
    },

    start: async (opts = { audio: true, video: true }) => {
      try {
        set({ isLoading: true, error: null });
        const { selectedAudioInputId, selectedVideoInputId } = get();
        const constraints: MediaStreamConstraints = {
          audio: opts.audio
            ? selectedAudioInputId
              ? { deviceId: { exact: selectedAudioInputId } }
              : true
            : false,
          video: opts.video
            ? selectedVideoInputId
              ? { deviceId: { exact: selectedVideoInputId } }
              : true
            : false,
        };

        const stream = await getUserMediaSafe(constraints);
        set({
          stream,
          isMicOn: !!opts.audio,
          isCameraOn: !!opts.video,
          hasPermission: true,
        });
      } catch (e) {
        set({ error: mapMediaError(e), hasPermission: false });
      } finally {
        set({ isLoading: false });
      }
    },

    stop: () => {
      const { stream } = get();
      stream?.getTracks().forEach((t) => t.stop());
      set({ stream: null, isMicOn: false, isCameraOn: false });
    },

    startMic: async () => {
      const { stream, isMicOn, selectedAudioInputId } = get();

      if (isMicOn) return;

      try {
        const audioStream = await getUserMediaSafe({
          audio: selectedAudioInputId
            ? { deviceId: { exact: selectedAudioInputId } }
            : true,
          video: false,
        });

        set((state) => {
          const videoTracks = state.stream?.getVideoTracks() ?? [];

          const combined = new MediaStream([
            ...audioStream.getAudioTracks(),
            ...videoTracks,
          ]);

          return {
            stream: combined,
            isMicOn: true,
            error: null,
          };
        });
      } catch (e) {
        set({ error: mapMediaError(e) });
      }
    },

    stopMic: () => {
      const { stream, isMicOn } = get();

      if (!isMicOn) return;

      stream?.getAudioTracks().forEach((track) => track.stop());

      set((state) => {
        const videoTracks = state.stream?.getVideoTracks() ?? [];
        const newStream = new MediaStream(videoTracks);

        return {
          stream: newStream,
          isMicOn: false,
        };
      });
    },


    toggleCamera: async () => {
      const { stream, isCameraOn, selectedVideoInputId, isMicOn } = get();

      if (!isCameraOn) {
        // TURN ON → request a fresh video track
        try {
          const videoStream = await getUserMediaSafe({
            video: selectedVideoInputId
              ? { deviceId: { exact: selectedVideoInputId } }
              : true,
            audio: false,
          });

          set((state) => {
            const audioTracks = state.stream?.getAudioTracks() ?? [];
            const combined = new MediaStream([
              ...audioTracks,
              ...videoStream.getVideoTracks(),
            ]);

            return { stream: combined, isCameraOn: true };
          });
        } catch (e) {
          set({ error: mapMediaError(e) });
        }
      } else {
        // TURN OFF → stop video tracks only
        stream?.getVideoTracks().forEach((t) => t.stop());

        set((state) => {
          const audioTracks = state.stream?.getAudioTracks() ?? [];
          const newStream = new MediaStream(audioTracks);

          return { stream: newStream, isCameraOn: false };
        });
      }
    },

    setAudioInput: async (deviceId: string) => {
      set({ selectedAudioInputId: deviceId });
      const { isMicOn, isCameraOn } = get();
      if (isMicOn || isCameraOn)
        await get().start({ audio: isMicOn, video: isCameraOn });
    },

    setVideoInput: async (deviceId: string) => {
      set({ selectedVideoInputId: deviceId });
      const { isMicOn, isCameraOn } = get();
      if (isMicOn || isCameraOn)
        await get().start({ audio: isMicOn, video: isCameraOn });
    },

    toggleCaptions: () =>
      set((state) => {
        const enabled = !state.captionsEnabled;

        return {
          captionsEnabled: enabled,
          userCaptionsEnabled: enabled,
          interviewerCaptionsEnabled: enabled,
        };
      }),

    toggleUserCaptions: () =>
      set((state) => {
        if (!state.captionsEnabled) return state;

        return {
          userCaptionsEnabled: !state.userCaptionsEnabled,
        };
      }),

    toggleInterviewerCaptions: () =>
      set((state) => {
        if (!state.captionsEnabled) return state;

        return {
          interviewerCaptionsEnabled: !state.interviewerCaptionsEnabled,
        };
      }),

  }))
);
