"use client";

import { useEffect, useRef } from "react";
import { isAudioMuted } from "./audioControl";

export default function GlobalAudio({
  src,
  autoPlay = false,
  loop = false,
  volume = 2,
  ...props
}) {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;
    audio.muted = isAudioMuted();

    const handleAudioChange = (event) => {
      audio.muted = event.detail.muted;
    };

    window.addEventListener(
      "global-audio-change",
      handleAudioChange
    );

    return () => {
      window.removeEventListener(
        "global-audio-change",
        handleAudioChange
      );
    };
  }, [volume]);

  return (
    <audio
      ref={audioRef}
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      preload="auto"
      {...props}
    />
  );
}
