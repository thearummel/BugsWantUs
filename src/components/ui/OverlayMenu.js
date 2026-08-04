"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./overlay.module.css";
import MenuButton from "./MenuButton";


export default function OverlayMenu() {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuBtnRef = useRef(null); 
  const firstCardRef = useRef(null);

  // Lock background scroll & manage focus
 /*  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // focus first card after open
      setTimeout(() => {
        firstCardRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
      menuBtnRef.current?.focus();
    }
  }, [open]); */

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", onKey);

    // cleanup funcion 
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Click outside to close
  function onOverlayClick(e) {
    if (e.target === overlayRef.current) setOpen(false);
  }

  // card data could be body and title and things like that
const cards = [
  { id: 1, path: "./SVG/card1.svg", title: "Card 1" },
  { id: 2, path: "./SVG/card2.svg", title: "Card 2" },
  { id: 3, path: "./SVG/card3.svg", title: "Card 3" },
];

  return (
    <>
      {/* Render MenuButton directly, give it the ref and aria props */}
      <MenuButton
        ref={menuBtnRef}
        aria-controls="overlay"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      // className={styles.menuBtn}
      />

      <div
        id="overlay"
        ref={overlayRef}
        className={`${styles.overlay} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={onOverlayClick}
      >
        <div
          className={styles.overlayPanel}
          role="document"
          onClick={(e) => e.stopPropagation()}
        >
          <header className={styles.overlayHeader}>
            <h2>Invitations you have given out:</h2>
            <button
              aria-label="Close overlay"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>

          <main className={styles.cardsGrid} id="cardsGrid">
            {cards.map((c, idx) => (
              <article
                key={c.id}
                className={styles.card}
                tabIndex={open ? 0 : -1}
                ref={idx === 0 ? firstCardRef : null}
              >
                <img src={c.path} alt={c.title} />
              </article>
            ))}
          </main>
        </div>
      </div>
    </>
  );
}