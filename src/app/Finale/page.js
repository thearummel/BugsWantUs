"use client";
import { useEffect, useState } from "react";
import FinaleScene from "@/components/FinaleScene";
import styles from "@/app/globals.css"

export default function FinalePage() {
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
 

      {showVideo && (
        <video
          src="/animations/end-card.mp4"
          autoPlay
          playsInline
          className="fixed inset-0 z-[9999] w-screen h-screen object-cover"
        />
      )}
           <FinaleScene />
    </>
  );
}