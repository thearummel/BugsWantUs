"use client";
import React from "react";
import styles from "./global-ui.module.css";
import BackButton from "./BackButton";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";

// Top-level UI wrapper. Place global buttons, overlays, status bars here.
// Keep markup minimal so adding this to layout.js is cheap.
export default function GlobalUI() {
  return (
    <div className={styles.globalUi}>
      <div className={styles.left}>
        <BackButton />
      </div>

      <div className={styles.right}>
        {/* Example place for other shared UI elements (toggle, status, theme switch) */}
        <button className={styles.iconBtn} aria-label="Example action">
          <ArrowLeftIcon size={18} />
        </button>
      </div>
    </div>
  );
}