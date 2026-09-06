"use client";

import React from "react";
import InfoIcon from "./icons/InfoIcon";

const InfoButton = React.forwardRef(function InfoButton(
  { className = "", onClick, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type="button"
      className={className}
      aria-label="Information"
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
      }}
      {...rest}
    >
      <InfoIcon size={64} />
    </button>
  );
});

export default InfoButton;
