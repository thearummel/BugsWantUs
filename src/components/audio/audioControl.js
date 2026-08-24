
const AUDIO_MUTED_KEY = "globalAudioMuted";

export function isAudioMuted() {
  if (typeof window === "undefined") return false;

  return localStorage.getItem(AUDIO_MUTED_KEY) === "true";
}

export function setAudioMuted(muted) {
  if (typeof window === "undefined") return;

  localStorage.setItem(AUDIO_MUTED_KEY, String(muted));

  document.querySelectorAll("audio").forEach((audio) => {
    audio.muted = muted;
  });

  window.dispatchEvent(
    new CustomEvent("global-audio-change", {
      detail: { muted },
    })
  );
}
