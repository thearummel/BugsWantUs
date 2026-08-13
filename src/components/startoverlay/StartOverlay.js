
"use client";

import { useState, useEffect, useRef } from "react";
import useTypewriter from "@/hooks/useTypewriter";
import styles from "./StartOverlay.module.css";

export default function StartOverlay({
  dialogue = "Welcome…",
  onStart,
}) {
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [talking, setTalking] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [revealing, setRevealing] = useState(false);

  const requiredClicks = 3;
  const svgObjectRef = useRef(null);

  // Don't start the dialogue until the SVG has loaded.
  const { displayed, finished } = useTypewriter(
    dialogue,
    28
  );

  // Start talking once the typewriter actually starts.
  useEffect(() => {
    if (!svgLoaded) return;

    setTalking(
      !finished && displayed.length > 0
    );
  }, [
    svgLoaded,
    finished,
    displayed,
  ]);

  // Control the SVG mouth animation.
  useEffect(() => {
    const object = svgObjectRef.current;

    if (!object || !svgLoaded) return;

    const svg = object.contentDocument;
    const animation =
      svg?.getElementById("mouthAnimation");

    if (!animation) return;

    if (talking) {
      animation.beginElement();
    } else {
      animation.endElement();
    }
  }, [talking, svgLoaded]);

  function handleSvgLoad() {
    setSvgLoaded(true);
  }

  function handleHeadClick() {
    setClicks((c) => c + 1);
  }

  function handleStart() {
    setRevealing(true);

    setTimeout(() => {
      onStart?.();
    }, 900);
  }

  return (
    <div
      className={`${styles.overlay} ${
        revealing ? styles.reveal : ""
      }`}
    >
      <div className={styles.centerContent}>

        {/* Talking head */}
        <div
          className={styles.head}
          aria-label="Talking head"
          tabIndex={0}
        >
          <object
            ref={svgObjectRef}
            data="/SVG/talkingHead.svg"
            type="image/svg+xml"
            aria-label="Talking head"
            onLoad={handleSvgLoad}
          />
        </div>

        {/* Dialogue */}
        <div
          className={styles.bottomBar}
          role="button"
          onClick={handleHeadClick}
        >
          <div className={styles.textbox}>
            <div className={styles.text}>
              {displayed}
            </div>
          </div>
        </div>

      </div>

      {/* Start button */}
      {finished && clicks >= requiredClicks && (
        <button
          className={styles.startButton}
          onClick={handleStart}
        >
          Start
        </button>
      )}
    </div>
  );
}

