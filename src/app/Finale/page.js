"use client";

import { useEffect, useState } from "react";
import FinaleScene from "@/components/FinaleScene";
import EndCard from "@/components/EndCard/EndCard";


const STORAGE_KEY = "collectedAnimals";

export default function FinalePage() {
  const [transition, setTransition] = useState(false);
  const [showEndCard, setShowEndCard] = useState(false);


  useEffect(() => {
    const transitionTimer = setTimeout(() => {
      setTransition(true);
    }, 12000);

    const endCardTimer = setTimeout(() => {
      setShowEndCard(true);
    }, 15000);

    return () => {
      clearTimeout(transitionTimer);
      clearTimeout(endCardTimer);
    };
  }, []);

  function handleGoToStart() {

    localStorage.removeItem("collectedAnimals");
    sessionStorage.removeItem("hasStarted");
    window.location.href = "/";

  }

  return (
    <div className="finale-container">
      <FinaleScene />

//add a start endcard button instead of a timeout
      {transition && <div className="circle-transition" />}

      {showEndCard && (
        <EndCard onRestart={handleGoToStart} />
      )}


    </div>
  );
}