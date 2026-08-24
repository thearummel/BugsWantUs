
"use client";

import Scene from "@/components/Scene";
import { useEffect, useRef } from "react";

export default function BogPage() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.08;
    }
  }, []);

  return (
    <>
      <Scene />

      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/freesound_community-swamp-woods-34735.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}