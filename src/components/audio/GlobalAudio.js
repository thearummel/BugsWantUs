"use client";

import { useEffect, useRef, useState } from "react";
import { isAudioMuted } from "./audioControl";

export default function GlobalAudio({
  src,
  autoPlay = false,
  loop = false,
  volume = 1,
  ...props
}) {
  const audioRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(isAudioMuted());
    setMounted(true);

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

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = Number(volume);
    }
  }, [volume]);

  if (!mounted) {
    return null;
  }

  return (
    <audio
      ref={audioRef}
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      preload="auto"
      muted={muted}
      {...props}
    />
  );
}
