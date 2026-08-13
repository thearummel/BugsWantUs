"use client";

import { useState, useEffect, useRef } from "react";
import useTypewriter from "@/hooks/useTypewriter";
import styles from "./StartOverlay.module.css";
import LadybirdCanvas from "../LadybirdCanvas";

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

  const { displayed, finished } =
    useTypewriter(dialogue, 28);

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
      {/* Ladybird Three.js canvas */}
      <div className={styles.ladybirdLayer}>
        <LadybirdCanvas />
      </div>

      {/* DOM UI */}
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
          tabIndex={0}
          onClick={handleHeadClick}
        >
          <div className={styles.textbox}>
            <div className={styles.text}>
              {displayed}
            </div>
          </div>
        </div>

      </div>

      {finished &&
        clicks >= requiredClicks && (
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