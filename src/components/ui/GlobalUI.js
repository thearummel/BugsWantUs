"use client";
import React from "react";
import styles from "./global-ui.module.css";
import BackButton from "./BackButton";
import BarBottom from "./BarBottom";
import InfoButton from "./InfoButton";
import OverlayMenu from "./OverlayMenu"



export default function GlobalUI() {
    return (
        <div className={styles.globalUi}>
            <div className={styles.bottomleft}>
                <BackButton />
            </div>
            <div className={styles.right}>
                <OverlayMenu />
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