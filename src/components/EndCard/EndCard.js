"use client";

import { useEffect, useState } from "react";
import styles from "../TitleCard/TitleCard.module.css";

export default function EndCard({ onRestart }) {
  const [dissolving, setDissolving] = useState(false);
  const [displayText, setDisplayText] = useState("");

  const text = "Thank you for your help!";

  useEffect(() => {
    let index = 0;

    const startTimer = setTimeout(() => {
      const interval = setInterval(() => {
        index++;

        setDisplayText(text.slice(0, index));

        if (index >= text.length) {
          clearInterval(interval);
        }
      }, 90);

      return () => clearInterval(interval);
    }, 1500);

    return () => clearTimeout(startTimer);
  }, []);

  const handleRestart = () => {
    setDissolving(true);

    setTimeout(() => {
      onRestart?.();
    }, 500);
  };
const handlePrint = () => {
  const iframe = document.createElement("iframe");

  iframe.style.position = "fixed";
  iframe.style.width = "0";
  iframe.style.height = "0";
  iframe.style.border = "0";
  iframe.style.visibility = "hidden";

  iframe.src = "/SVG/Invites.pdf";

  document.body.appendChild(iframe);

  iframe.onload = () => {
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();

      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 500);
  };
};


  return (
    <div
      className={`${styles.titleCard} ${
        dissolving ? styles.dissolving : ""
      }`}
    >
      <div className={styles.background} />

      <div className={styles.content}>

        <div className={styles.morphContainer}>
          <span
            className={styles.morphText}
            style={{
              opacity: 1,
              filter: "blur(0px)",
            }}
          >
            The End
          </span>
        </div>

        <div className={styles.subtitle}>
          {displayText}
        </div>

        <div className={styles.endButtons}>
          <button
            className={styles.endButton}
            onClick={handleRestart}
          >
            Restart Game
          </button>

          <button
            className={styles.endButton}
            onClick={handlePrint}
          >
            Print the Cards
          </button>
        </div>

      </div>
    </div>
  );
}
