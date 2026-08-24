"use client";

import { useEffect, useState } from "react";
import { isAudioMuted, setAudioMuted } from "../audio/audioControl";

export default function AudioButton() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    setMuted(isAudioMuted());

    const handleAudioChange = (event) => {
      setMuted(event.detail.muted);
    };

    window.addEventListener("global-audio-change", handleAudioChange);

    return () => {
      window.removeEventListener(
        "global-audio-change",
        handleAudioChange
      );
    };
  }, []);

  const handleClick = () => {
    const newMutedState = !muted;

    setMuted(newMutedState);
    setAudioMuted(newMutedState);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={muted ? "Turn audio on" : "Turn audio off"}
      title={muted ? "Turn audio on" : "Turn audio off"}
    >
      {muted ? "Audio is OFF" : "Audio is ON"}
    </button>
  );
}
