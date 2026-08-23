

"use client";
import SinkScene from "@/components/SinkScene";
import { useEffect, useRef } from "react";

export default function Sink() {
     const audioRef = useRef(null);
    
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
        }
      }, []);
    
      return (
        <>
         <SinkScene />
          <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/freesound_community-fridge-hum-loud-saint-john-191002-62243.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}