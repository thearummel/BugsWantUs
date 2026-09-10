"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./global-ui.module.css";

import BackButton from "./BackButton";
import BarBottom from "./BarBottom";
import InfoMenu from "./InfoMenu";
import OverlayMenu from "./OverlayMenu";
import AudioPlayer from "@/components/audio/audioPlayer";

export default function GlobalUI() {
    const pathname = usePathname();

    const isHome = pathname === "/";
    const isAbout = pathname === "/About";

    const isInstructions = pathname === "/Instructions";



    return (
        <div className={styles.globalUi}>

            {!isHome && (
                <div className={styles.bottomleft}>
                    <BackButton />
                </div>
            )}

       
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



           {!isHome && (
                <div className={styles.audioButton}>
                    <AudioPlayer />
                </div>
                  )}
        </div>
    );
}
