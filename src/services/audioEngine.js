// Web Audio & Web Speech API Synth Audio Engine for Labbaik App
class AudioEngine {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.isPlaying = false;
    this.currentText = '';
    this.rate = 0.9; // Calm reading speed
    this.pitch = 1.0;
    this.utterance = null;
    this.onEndCallback = null;
  }

  speak(text, lang = 'ar-SA', onStart = null, onEnd = null) {
    if (!this.synth) {
      console.warn('Speech synthesis not supported');
      if (onEnd) onEnd();
      return;
    }

    // Stop current audio if playing
    this.stop();

    const cleanText = text.replace(/<[^>]*>?/gm, '');
    this.utterance = new SpeechSynthesisUtterance(cleanText);
    this.utterance.lang = lang;
    this.utterance.rate = this.rate;
    this.utterance.pitch = this.pitch;

    // Set voice if available
    const voices = this.synth.getVoices();
    const targetVoice = voices.find(v => v.lang.startsWith(lang.split('-')[0]));
    if (targetVoice) {
      this.utterance.voice = targetVoice;
    }

    this.utterance.onstart = () => {
      this.isPlaying = true;
      if (onStart) onStart();
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    this.utterance.onerror = (e) => {
      console.log('Audio playback info:', e);
      this.isPlaying = false;
      if (onEnd) onEnd();
    };

    this.synth.speak(this.utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isPlaying = false;
    }
  }

  setRate(speed) {
    this.rate = speed;
    if (this.utterance && this.isPlaying) {
      this.utterance.rate = speed;
    }
  }
}

export const audioEngine = new AudioEngine();
