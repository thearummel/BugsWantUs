"use client";

import StartOverlay from "@/components/startoverlay/StartOverlay";
import Scene from "@/components/Scene";
import { useEffect, useState } from "react";

export default function Home() {
  const [started, setStarted] = useState(null);

  useEffect(() => {
    const hasStarted = sessionStorage.getItem("hasStarted");

    setStarted(hasStarted === "true");
  }, []);

  function handleStart() {
    sessionStorage.setItem("hasStarted", "true");
    setStarted(true);
  }

  // Avoid showing the overlay while we're checking sessionStorage
  if (started === null) {
    return <Scene />;
  }

  return (
    <>
      <Scene />

      {!started && (
        <StartOverlay
          dialogue="Hello! Click the box three times."
          onStart={handleStart}
        />
      )}
    </>
  );
}