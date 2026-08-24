"use client";

import React from "react";
import { usePathname } from "next/navigation";
import styles from "./global-ui.module.css";
import BackButton from "./BackButton";
import BarBottom from "./BarBottom";
import InfoButton from "./InfoButton";
import OverlayMenu from "./OverlayMenu";

export default function GlobalUI() {
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isAbout = pathname === "/About"
    const isFinale = pathname === "/Finale"
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

            <div className={styles.right}>
                <OverlayMenu />
            </div>
            {!isAbout && (
                <div className={styles.bottommiddle}>
                    <BarBottom />
                </div>
            )}

            {!isHome && (
                <div className={styles.left}>
                    <InfoButton tooltip="Information" />
                </div>
            )}
        </div>
    );
}