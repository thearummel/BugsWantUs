
"use client";
import BushScene from "@/components/BushScene";
import { useEffect, useRef } from "react";

export default function BushPage() {
  const audioRef = useRef(null);
  const forestAudioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 1;
    }
    if (forestAudioRef.current) {
      forestAudioRef.current.volume = 0.03;
    }
  }, []);

  return (
    <>
      <BushScene />
      <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/soul_serenity_sounds-leaves-rustling-236742.mp3"
        style={{ display: "none" }}
      />
      <audio
        ref={forestAudioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/forest-stream-birds.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}