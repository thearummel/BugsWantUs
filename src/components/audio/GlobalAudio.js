"use client";

import { useEffect, useState } from "react";
import { isAudioMuted } from "./audioControl";

export default function GlobalAudio({
  src,
  autoPlay = false,
  loop = false,
  volume = 1,
  ...props
}) {
  const [mounted, setMounted] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(isAudioMuted());
    setMounted(true);

    const handleAudioChange = (event) => {
      setMuted(event.detail.muted);
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
  }, []);

  if (!mounted) {
    return null;
  }

  const audioVolume = Number(volume);

  return (
    <audio
      src={src}
      autoPlay={autoPlay}
      loop={loop}
      preload="auto"
      muted={muted}
      volume={audioVolume}
      {...props}
    />
  );
}
