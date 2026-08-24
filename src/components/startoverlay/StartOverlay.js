"use client";

import { useState, useEffect, useRef } from "react";
import useTypewriter from "@/hooks/useTypewriter";
import styles from "./StartOverlay.module.css";
import LadybirdCanvas from "../LadybirdCanvas";

export default function StartOverlay({
  dialogue = [],
  onStart,
}) {
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const [alertReceived, setAlertReceived] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const svgObjectRef = useRef(null);
  const audioRef = useRef(null);
  const ladybirdStarted = useRef(false);



  const currentDialogue =
    dialogue[dialogueIndex] || "";

  const { displayed, finished } =
    useTypewriter(currentDialogue, 28);

  const isLastDialogue =
    dialogueIndex === dialogue.length - 1;

  const talking =
    !finished && displayed.length > 0;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (talking) {
      audio.play().catch((error) => {
        console.log("Audio playback prevented:", error);
      });
    } else {
      audio.pause();
    }
    
     if (audioRef.current) {
      audioRef.current.volume = 0.2;
      audioRef.current.playbackRate = 0.7;
    }
  }, [talking]);

  useEffect(() => {
    if (!svgLoaded) return;

    const object = svgObjectRef.current;

    if (!object) return;

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

  useEffect(() => {
    if (dialogueIndex === 3) {
      ladybirdStarted.current = true;
    }
  }, [dialogueIndex]);

  useEffect(() => {
    function handleShowStartButton(e) {
      console.log("Alert received:", e.detail);
      setAlertReceived(true);
    }

    window.addEventListener(
      "showStartButton",
      handleShowStartButton
    );

    return () => {
      window.removeEventListener(
        "showStartButton",
        handleShowStartButton
      );
    };
  }, []);

  function handleSvgLoad() {
    setSvgLoaded(true);
  }

  function handleDialogueClick() {

    if (!finished) return;


    if (!isLastDialogue) {
      setDialogueIndex((index) => index + 1);
      return;
    }
  }

  function handleStart() {
    setRevealing(true);

    setTimeout(() => {
      onStart?.();
    }, 900);
  }

  const showStartButton =
    (finished && isLastDialogue) || alertReceived;

  return (
    <div
      className={`${styles.overlay} ${revealing ? styles.reveal : ""
        }`}
    >
      <audio
        ref={audioRef}
        src="/audio/artificiallyinspired-alien-high-pitch-312010.mp3"
        loop
         volume={0.03}
        preload="auto"
      />


      <div className={styles.ladybirdLayer}>
        <LadybirdCanvas
          ladybirdStarted={ladybirdStarted}
        />
      </div>


      <div className={styles.centerContent}>


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

        <div
          className={`${styles.bottomBar} ${finished ? styles.clickable : ""
            }`}
          role="button"
          tabIndex={0}
          onClick={handleDialogueClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleDialogueClick();
            }
          }}
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
          onClick={handleStart}
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