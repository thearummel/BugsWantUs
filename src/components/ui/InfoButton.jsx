"use client";
import React from "react";
import { useRouter } from "next/navigation";
import InfoIcon from "./icons/InfoIcon";

export default function InfoButton({ className = "", fallbackHref = "/" }) {
  const router = useRouter();

  const goAbout = () => {
    // prefer router.back for SPA navigation, fallback to a known route
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.push("/About");
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={goAbout}
      aria-label="About page"
      className={className}
      type="button"
      style ={{background: "transparent", border: "none"}}
    >
      <InfoIcon size={64} />
    </button>
  );
}