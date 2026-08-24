

"use client";
import RiverScene from "@/components/RiverScene";
import { useEffect, useRef } from "react";

export default function River() {
     const audioRef = useRef(null);
       const forestAudioRef = useRef(null);
    
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
        }
          if (forestAudioRef.current) {
      forestAudioRef.current.volume = 0.04;
    }
      }, []);
    
      return (
        <>
         <RiverScene />
          <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/dragon-studio-quiet-stream-420899.mp3"
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