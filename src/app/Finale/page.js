"use client";

import { useEffect, useState, useRef } from "react";
import FinaleScene from "@/components/FinaleScene";

const STORAGE_KEY = "collectedAnimals_v1";

export default function FinalePage() {
  const [transition, setTransition] = useState(false);
  const [showVideo, setShowVideo] = useState(false);

  const birthdayAudioRef = useRef(null);
  const forestAudioRef = useRef(null);

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setTransition(true);
    }, 5000);

    const videoTimer = setTimeout(() => {
      setShowVideo(true);
    }, 8000);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  useEffect(() => {
    if (birthdayAudioRef.current) {
      birthdayAudioRef.current.volume = 0.08;
    }

    if (forestAudioRef.current) {
      forestAudioRef.current.volume = 0.04;
    }
  }, []);

  const handleGoToStart = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.href = "/";
  };

  return (
    <div className="finale-container">
      <FinaleScene />

      {transition && <div className="circle-transition" />}

    {showVideo && (
  <>
    <video
      src="/animations/end-card.mp4"
      autoPlay
      playsInline
      className="end-video"
    />

    <button
      className="go-start-button"
      onClick={handleGoToStart}
    >
      Go To the start
    </button>
  </>
)}

     

      <audio
        ref={birthdayAudioRef}
        autoPlay
        preload="auto"
        src="/audio/sub_clair-happy-birthday-579516.mp3"
      />

      <audio
        ref={forestAudioRef}
        autoPlay
        loop
        preload="auto"
        src="/audio/forest-stream-birds.mp3"
      />
    </div>
  );
}
