

"use client";
import RiverScene from "@/components/RiverScene";
import { useEffect, useRef } from "react";

export default function River() {
     const audioRef = useRef(null);
    
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
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
    </>
  );
}