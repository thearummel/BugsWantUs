"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./global-ui.module.css";

import BackButton from "./BackButton";
import BarBottom from "./BarBottom";
import InfoMenu from "./InfoMenu";
import OverlayMenu from "./OverlayMenu";
import AudioButton from "./AudioButton";

export default function GlobalUI() {
    const pathname = usePathname();

    const isHome = pathname === "/";
    const isAbout = pathname === "/About";
    const isFinale = pathname === "/Finale";
    const isInstructions = pathname === "/Instructions";

    if (isFinale) {
        return null;
    }

    return (
        <div className={styles.globalUi}>

            {!isHome && (
                <div className={styles.bottomleft}>
                    <BackButton />
                </div>
            )}

            {/* Menus */}
            {!isAbout && !isInstructions && (
                <>
                    <div className={styles.right}>
                        <OverlayMenu />
                    </div>

                    <div className={styles.left}>
                        <InfoMenu />
                    </div>
                </>
            )}

           
            {!isAbout && !isInstructions && (
                <div className={styles.bottommiddle}>
                    <BarBottom />
                </div>
            )}

  
            {!isAbout && !isInstructions && (
                <div className={styles.audioButton}>
                    <AudioButton />
                </div>
            )}

        </div>
    );
}
