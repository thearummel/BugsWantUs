"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ArrowLeftIcon from "./icons/ArrowLeftIcon";

export default function BackButton({ className = "", fallbackHref = "/" }) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={goBack}
      aria-label="Go back"
      className={className}
      type="button"
      style ={{background: "transparent", border: "none"}}
    >
      <ArrowLeftIcon size={64} />
    </button>
  );
}