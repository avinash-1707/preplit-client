let spokenLength = 0;

export function speakStream(text: string) {
    if (text.length <= spokenLength) return;

    const newText = text.slice(spokenLength);

    // Look for sentence ending
    const match = newText.match(/^(.*?[.!?])\s*/);

    if (match) {
        const sentence = match[1];
        const utterance = new SpeechSynthesisUtterance(sentence);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);

        spokenLength += match[0].length;
    }
}

export function speakRemaining(text: string) {
    const remaining = text.slice(spokenLength).trim();
    if (remaining) {
        const utterance = new SpeechSynthesisUtterance(remaining);
        utterance.lang = "en-US";
        utterance.rate = 1;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
        spokenLength = text.length;
    }
}

export function resetSpeech() {
    spokenLength = 0;
    speechSynthesis.cancel();
}