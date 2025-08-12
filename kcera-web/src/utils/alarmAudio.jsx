// Create one shared instance of the audio
export const alarmAudio = new Audio("/audio/alarm.m4a");
alarmAudio.loop = true; // so it keeps playing until stopped

export const playAlarm = () => {
  alarmAudio.currentTime = 0; // restart from beginning
  alarmAudio.play().catch((err) => console.warn("Audio playback failed:", err));
};

export const stopAlarm = () => {
  alarmAudio.pause();
  alarmAudio.currentTime = 0;
};
