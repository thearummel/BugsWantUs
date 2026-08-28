"use client";

import { useEffect, useRef, useState } from "react";
import FinaleScene from "@/components/FinaleScene";
import EndCard from "@/components/EndCard/EndCard";
import GlobalAudio from "@/components/audio/GlobalAudio";

const STORAGE_KEY = "collectedAnimals_v1";

export default function FinalePage() {
  const [transition, setTransition] = useState(false);
  const [showEndCard, setShowEndCard] = useState(false);

  const birthdayAudioRef = useRef(null);
  const forestAudioRef = useRef(null);

  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setTransition(true);
    }, 10000);

    const endCardTimer = setTimeout(() => {
      setShowEndCard(true);
    }, 12000);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(endCardTimer);
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

      {showEndCard && (
        <EndCard onRestart={handleGoToStart} />
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