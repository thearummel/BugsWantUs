

"use client";

import BeetleScene from "@/components/BeetleScene";
import { useEffect, useRef } from "react";

export default function BeetlePage() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
    }
  }, []);

  return (
    <>
      <BeetleScene />

      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/freesound_community-underwater-loop-amb-6182.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}