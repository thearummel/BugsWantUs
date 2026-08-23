
"use client";
import AntScene from "@/components/AntScene";
import { useEffect, useRef } from "react";

export default function AntPage() {
     const audioRef = useRef(null);
    
      useEffect(() => {
        if (audioRef.current) {
          audioRef.current.volume = 1;
        }
      }, []);
    
      return (
        <>
         <AntScene />
          <audio
        ref={audioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/freesound_community-low-hum-14645.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}