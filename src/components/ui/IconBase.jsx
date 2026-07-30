import React from "react";

export default function IconBase({ children, size = 34, className = "", ariaLabel, role = "img", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role={role}
      aria-label={ariaLabel}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}