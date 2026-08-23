
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
        src="/animations/title-card.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnd}
      />
    </div>
  );
}

