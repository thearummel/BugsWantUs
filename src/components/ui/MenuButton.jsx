"use client";
import React from "react";
import MenuIcon from "./icons/MenuIcon";

const MenuButton = React.forwardRef(function MenuButton(
  { className = "", fallbackHref = "/", onClick, ...rest },
  ref
) {
  const handleClick = (e) => {
    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Menu"
      className={className}
      type="button"
      style={{ background: "transparent", border: "none" }}
      ref={ref}
      {...rest} // allows aria-controls / aria-expanded to be passed
    >
      <MenuIcon size={64} />
    </button>
  );
});

export default MenuButton;