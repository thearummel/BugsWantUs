"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import InfoIcon from "./icons/InfoIcon";

export default function InfoButton({ className = "", fallbackHref = "/" }) {
  const router = useRouter();
  const pathname = usePathname();

  const goInfo = () => {
    if (pathname === "/Instructions") {
     router.back();
    } else {
      router.push("/Instructions");
    }
  };

  return (
    <button
      onClick={goInfo}
      aria-label={pathname === "/About" ? "Go home" : "About page"}
      className={className}
      type="button"
      style={{ background: "transparent", border: "none" }}
    >
      <InfoIcon size={64} />
    </button>
  );
}