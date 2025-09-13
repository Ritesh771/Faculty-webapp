// Simple notification sound using Web Audio API
class NotificationSound {
  private audioContext: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    // Initialize audio context on user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
    }
  }

  // Play a simple notification beep
  async playNotificationSound() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      // Resume context if suspended (required by some browsers)
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Create a pleasant notification sound
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Failed to play notification sound:', error);
    }
  }

  // Play success sound
  async playSuccessSound() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Success sound - ascending notes
      oscillator.frequency.setValueAtTime(523, this.audioContext.currentTime); // C5
      oscillator.frequency.setValueAtTime(659, this.audioContext.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(784, this.audioContext.currentTime + 0.2); // G5

      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.4);
    } catch (error) {
      console.warn('Failed to play success sound:', error);
    }
  }

  // Play error sound
  async playErrorSound() {
    if (!this.isEnabled || !this.audioContext) return;

    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Error sound - descending notes
      oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3);

      gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Failed to play error sound:', error);
    }
  }

  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  isSoundEnabled(): boolean {
    return this.isEnabled;
  }
}

// Create singleton instance
export const notificationSound = new NotificationSound();

// Helper functions for easy use
export const playNotificationSound = () => notificationSound.playNotificationSound();
export const playSuccessSound = () => notificationSound.playSuccessSound();
export const playErrorSound = () => notificationSound.playErrorSound();
export const setSoundEnabled = (enabled: boolean) => notificationSound.setEnabled(enabled);
export const isSoundEnabled = () => notificationSound.isSoundEnabled();