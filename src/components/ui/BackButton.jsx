"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

export default function BackButton({ className = "", fallbackHref = "/" }) {
  const router = useRouter();

  const goBack = () => {
    // prefer router.back for SPA navigation, fallback to a known route
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={goBack}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " " ? goBack() : null)}
      aria-label="Go back"
      className={className}
      type="button"
    >
      <ArrowLeftIcon size={18} />
    </button>
  );
}