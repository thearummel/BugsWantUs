"use client";

import GardenScene from "@/components/GardenScene";
import { useEffect, useRef } from "react";

export default function Garden() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.08;
    }
  }, []);

  return (
    <>
      <GardenScene />

      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/forest-stream-birds.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}