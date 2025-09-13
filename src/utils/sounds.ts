// Simple audio player utility
class SoundPlayer {
  private static audioCache: { [key: string]: HTMLAudioElement } = {};
  private static isMuted = false;

  static preloadSounds() {
    const sounds = {
      hover:
        "https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3",
      click:
        "https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3",
      success:
        "https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3",
      purchase:
        "https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3",
      challenge:
        "https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3",
      quest:
        "https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3",
      tabSwitch:
        "https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3",
    };

    Object.entries(sounds).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.preload = "auto";
      audio.volume = 0.2; // Set default volume to 20%
      this.audioCache[key] = audio;
    });
  }

  static play(
    soundName:
      | "hover"
      | "click"
      | "success"
      | "purchase"
      | "challenge"
      | "quest"
      | "tabSwitch"
  ) {
    if (this.isMuted) return;

    const audio = this.audioCache[soundName];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {}); // Ignore autoplay restrictions
    }
  }

  static toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  static setMute(muted: boolean) {
    this.isMuted = muted;
  }
}

export default SoundPlayer;
