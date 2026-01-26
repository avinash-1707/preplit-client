let audioCtx: AudioContext | null = null;
let playheadTime = 0;

const SAMPLE_RATE = 44100;

export async function initAndUnlockTTSPlayer() {
    if (!audioCtx) {
        audioCtx = new AudioContext({ sampleRate: SAMPLE_RATE });
    }

    if (audioCtx.state === "suspended") {
        await audioCtx.resume(); // 🔑 unlock audio
    }

    playheadTime = audioCtx.currentTime;
}

/**
 * ElevenLabs sends Int16 PCM
 */
export function playPCMChunk(chunk: ArrayBuffer) {
    if (!audioCtx) return;

    // Convert Int16 PCM → Float32
    const int16 = new Int16Array(chunk);
    const float32 = new Float32Array(int16.length);

    for (let i = 0; i < int16.length; i++) {
        float32[i] = int16[i] / 32768; // normalize
    }

    const buffer = audioCtx.createBuffer(
        1,
        float32.length,
        SAMPLE_RATE
    );

    buffer.copyToChannel(float32, 0);

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    source.connect(audioCtx.destination);

    // ⏱️ schedule playback (no gaps!)
    source.start(playheadTime);
    playheadTime += buffer.duration;
}
