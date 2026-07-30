"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MenuIcon from "./icons/MenuIcon";

export default function MenuButton({ className = "", fallbackHref = "/" }) {
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
      aria-label="Go back"
      className={className}
      type="button"
      style ={{background: "transparent", border: "none"}}
    >
      <MenuIcon size={64} />
    </button>
  );
}