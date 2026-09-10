"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const tracks = {
    "/Anthill": [
        {
            src: "/audio/freesound_community-low-hum-14645.mp3",
            volume: 1,
        },
    ],

    "/Garden": [
        {
            src: "/audio/forest-stream-birds.mp3",
            volume: 0.3,
        },
    ],

    "/Beetle": [
        {
            src: "/audio/freesound_community-underwater-loop-amb-6182.mp3",
            volume: 1,
        },
    ],

    "/Bog": [
        {
            src: "/audio/freesound_community-swamp-woods-34735.mp3",
            volume: 1,
        },
    ],

    "/Bush": [
        {
            src: "/audio/soul_serenity_sounds-leaves-rustling-236742.mp3",
            volume: 0.5,
        },
        {
            src: "/audio/forest-stream-birds.mp3",
            volume: 0.1,
        },
    ],

    "/Counter": [
        {
            src: "/audio/freesound_community-fridge-hum-loud-saint-john-191002-62243.mp3",
            volume: 0.3,
        },
    ],

    "/Kitchen": [
        {
            src: "/audio/freesound_community-fridge-hum-loud-saint-john-191002-62243.mp3",
            volume: 0.3,
        },
    ],

    "/Sink": [
        {
            src: "/audio/freesound_community-fridge-hum-loud-saint-john-191002-62243.mp3",
            volume: 0.3,
        },
    ],

    "/River": [
        {
            src: "/audio/forest-stream-birds.mp3",
            volume: 0.2,
        },
        {
            src: "/audio/dragon-studio-quiet-stream-420899.mp3",
            volume: 1,
        },
    ],

    "/Finale": [
        {
            src: "/audio/sub_clair-happy-birthday-579516.mp3",
            volume: 0.8,
        },
        {
            src: "/audio/forest-stream-birds.mp3",
            volume: 0.4,
        },
    ],
};

export default function AudioPlayer() {
    const pathname = usePathname();
    const audioRefs = useRef([]);
    const [muted, setMuted] = useState(null);
    const currentTracks = tracks[pathname] || [];


    useEffect(() => {
        const savedMute = localStorage.getItem("muteState");
        setMuted(savedMute === "true");
    }, []);

    useEffect(() => {
      
        if (muted === null) return;

        audioRefs.current.forEach((audio) => {
            audio.pause();
            audio.src = "";
        });

        audioRefs.current = [];

        currentTracks.forEach((track) => {
            const audio = new Audio(track.src);

            audio.loop = true;
            audio.volume = track.volume ?? 1;
            audio.muted = muted;

            audio.play().catch((error) => {
                console.log("Autoplay blocked:", error);
            });

            audioRefs.current.push(audio);
        });

        return () => {
            audioRefs.current.forEach((audio) => {
                audio.pause();
                audio.src = "";
            });

            audioRefs.current = [];
        };
    }, [pathname, muted]);

    const toggleMute = () => {
        const newMuted = !muted;

        audioRefs.current.forEach((audio) => {
            audio.muted = newMuted;
        });

        setMuted(newMuted);

        localStorage.setItem(
            "muteState",
            String(newMuted)
        );
    };

    if (muted === null) {
        return null;
    }

    return (
        <div className="audioButton">
            <button
                type="button"
                onClick={toggleMute}
                aria-label={
                    muted
                        ? "Turn audio on"
                        : "Turn audio off"
                }
                title={
                    muted
                        ? "Turn audio on"
                        : "Turn audio off"
                }
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
        </div>
    );
}
