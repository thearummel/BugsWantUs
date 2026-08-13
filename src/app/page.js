"use client";
import StartOverlay from "@/components/startoverlay/StartOverlay";
import Scene from "@/components/Scene";
import { useState } from "react";

export default function Home() {
 const [started, setStarted] = useState(false);
  return (
    <>
      <Scene />
      {!started && <StartOverlay dialogue="Hello! Click my the box three times." onStart={() => setStarted(true)} />}
    </>
  );
}