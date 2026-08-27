"use client";

import { useEffect, useState, useRef } from "react";
import FinaleScene from "@/components/FinaleScene";
import GlobalAudio from "@/components/audio/GlobalAudio";

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



  const handleGoToStart = () => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem("hasStarted");
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
            Restart Game
          </button>
        </>
      )}

      <GlobalAudio
        autoPlay
        volume={0.08}
        src="/audio/sub_clair-happy-birthday-579516.mp3"
      />

      <GlobalAudio
        autoPlay
        loop
        volume={0.04}
        src="/audio/forest-stream-birds.mp3"
      />

    </div>
  );
}
