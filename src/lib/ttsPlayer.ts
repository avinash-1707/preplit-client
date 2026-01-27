let audioCtx: AudioContext | null = null;
let playheadTime = 0;

export async function initAndUnlockTTSPlayer() {
    if (!audioCtx) {
        audioCtx = new AudioContext(); // ← let browser choose rate
    }

    if (audioCtx.state === "suspended") {
        await audioCtx.resume();
    }

    playheadTime = audioCtx.currentTime;
}

/**
 * ElevenLabs now sends MP3 chunks
 */
export async function playMP3Chunk(mp3Chunk: ArrayBuffer) {
    if (!audioCtx) return;

    // Decode MP3 → AudioBuffer
    const audioBuffer = await audioCtx.decodeAudioData(
        mp3Chunk.slice(0) // Safari fix
    );

    const source = audioCtx.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioCtx.destination);

    // ⏱️ gapless scheduling
    const startTime = Math.max(playheadTime, audioCtx.currentTime);
    source.start(startTime);

    playheadTime = startTime + audioBuffer.duration;
}
