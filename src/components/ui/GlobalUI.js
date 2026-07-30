"use client";
import React from "react";
import styles from "./global-ui.module.css";
import BackButton from "./BackButton";
import MenuButton from "./MenuButton";
import BarBottom from "./BarBottom";
import InfoButton from "./InfoButton";


// Top-level UI wrapper. Place global buttons, overlays, status bars here.
// Keep markup minimal so adding this to layout.js is cheap.
export default function GlobalUI() {
    return (
        <div className={styles.globalUi}>
            <div className={styles.bottomleft}>
                <BackButton />
            </div>
            <div className={styles.right}>
                <MenuButton />
            </div>
            <div className={styles.bottommiddle}>
                <BarBottom />
            </div>
            <div className={styles.left}>
                <InfoButton />
            </div>

        </div>
    );
}