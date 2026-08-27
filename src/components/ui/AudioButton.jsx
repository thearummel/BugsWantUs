"use client";

import { useEffect, useState } from "react";
import { isAudioMuted, setAudioMuted } from "../audio/audioControl";

export default function AudioButton() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Get the saved state immediately
    setMuted(isAudioMuted());

    const handleAudioChange = (event) => {
      setMuted(event.detail.muted);
    };

    window.addEventListener(
      "global-audio-change",
      handleAudioChange
    );

    return () => {
      window.removeEventListener(
        "global-audio-change",
        handleAudioChange
      );
    };
  }, []);

  const handleClick = () => {
    setAudioMuted(!muted);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={muted ? "Turn audio on" : "Turn audio off"}
      title={muted ? "Turn audio on" : "Turn audio off"}
      className="audio-button"
    >
      {muted ? (
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M17 9L22 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M22 9L17 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 5L6 9H2V15H6L11 19V5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M15 9C16.5 10.5 16.5 13.5 15 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M18 6C21 9 21 15 18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
    </button>
  );
}
