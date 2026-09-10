"use client";

import { useState, useEffect, useRef } from "react";
import useTypewriter from "@/hooks/useTypewriter";
import styles from "./StartOverlay.module.css";
import LadybirdCanvas from "../LadybirdCanvas";

export default function StartOverlay({ dialogue = [], onStart }) {
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [alertReceived, setAlertReceived] = useState(false);

  const audioRef = useRef(null);
  const svgRef = useRef(null);
  const ladybirdStarted = useRef(false);

  const currentDialogue = dialogue[dialogueIndex] || "";

  const { displayed, finished } = useTypewriter(
    currentDialogue,
    28
  );

  const isLastDialogue = dialogueIndex === dialogue.length - 1;
  const talking = displayed.length > 0 && !finished;


  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = 0.2;
    audio.playbackRate = 0.7;

    if (talking) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [talking]);

  useEffect(() => {
    if (!svgLoaded) return;

    const svg = svgRef.current?.contentDocument;
    const mouth = svg?.getElementById("mouthAnimation"); //https://www.svggenie.com/blog/svg-animations-complete-guide

    if (!mouth) return;

    if (talking) {
      mouth.beginElement();
    } else {
      mouth.endElement();
    }
  }, [talking, svgLoaded]);

  useEffect(() => {
    if (dialogueIndex === 3) {
      ladybirdStarted.current = true;
    }
  }, [dialogueIndex]);

  useEffect(() => {
    function showButton() {
      setAlertReceived(true);
    }

    window.addEventListener("showStartButton", showButton);

    return () => {
      window.removeEventListener("showStartButton", showButton);
    };
  }, []);

  function nextDialogue() {
    if (!finished) return;

    if (!isLastDialogue) {
      setDialogueIndex(dialogueIndex + 1);
    }
  }

  function startGame() {
    setRevealing(true);

    setTimeout(() => {
      if (onStart) {
        onStart();
      }
    }, 900);
  }



  return (
    <div
      className={`${styles.overlay} ${
        revealing ? styles.reveal : ""
      }`}
    >
      <audio
        ref={audioRef}
        src="/audio/drcritter2_mixdown.wav"
        loop
        preload="auto"
      />

      <div className={styles.ladybirdLayer}>
        <LadybirdCanvas ladybirdStarted={ladybirdStarted} />
      </div>

      <div className={styles.centerContent}>
        <div
          className={styles.head}
          aria-label="Talking head"
          tabIndex={0}
        >
          <object
            ref={svgRef}
            data="/SVG/talkingHead.svg"
            type="image/svg+xml"
            aria-label="Talking head"
            onLoad={() => setSvgLoaded(true)}
          />
        </div>

        <div
          className={`${styles.bottomBar} ${
            finished ? styles.clickable : ""
          }`}
          role="button"
          tabIndex={0}
          onClick={nextDialogue}
        
        >
          <div className={styles.textbox}>
            <div className={styles.text}>
              {displayed}
            </div>

            {finished && !isLastDialogue && (
              <div className={styles.nextIndicator}>
                Click to continue →
              </div>
            )}
          </div>
        </div>
      </div>

      {dialogueIndex === 8 && (
        <button
          className={styles.startButton}
          onClick={startGame}
        >
          Start
        </button>
      )}

      {dialogueIndex === 5 && (
        <div className={styles.focus}></div>
      )}

      {dialogueIndex === 6 && (
        <div className={styles.focusmenu}></div>
      )}
    </div>
  );
}
