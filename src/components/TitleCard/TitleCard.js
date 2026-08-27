
"use client";

import { useState } from "react";
import styles from "./TitleCard.module.css";

export default function TitleCard({ onComplete }) {
  const [dissolving, setDissolving] = useState(false);

  function handleVideoEnd() {

    setDissolving(true);
    setTimeout(() => {
      onComplete?.();
    }, 900);
  }

  return (
    <div
      className={`${styles.titleCard} ${
        dissolving ? styles.dissolving : ""
      }`}
    >
     <video
        className={styles.video}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      >
        <source
          src="/animations/Small_Start_1.mp4"
          media="(max-width: 821px)"
        />
        <source
          src="/animations/Middle_Start.mp4"
          media="(max-width: 1025px)"
        /> 
        <source
          src="/animations/title-card.mp4"
          media="(min-width:  1028px)"
        />
      </video>
    </div>
  );
}

