import React from "react";
import IconBase from "../IconBase";

export function ArrowLeftIcon({ size = 20, className = "", ariaLabel = "Back", ...props }) {
  return (
    <IconBase size={size} viewBox="0 0 24 24" className={className} ariaLabel={ariaLabel} {...props}>
      <path d="M14 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </IconBase>
  );
}

export default ArrowLeftIcon;