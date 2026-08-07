"use client";
import { useEffect, useRef, useState } from "react";
import MenuButton from "./MenuButton";
import { getCollectedIds } from "@/three/animals.js";
import styles from "./overlay.module.css";


const animalCardMap = {
  fly: { id: "fly-card", path: "./SVG/card1.svg", title: "Fly Card" },
  beetle: { id: "beetle-card", path: "./SVG/beetleCard.svg", title: "Beetle Card" },
  moth: { id: "moth-card", path: "./SVG/mothCard.svg", title: "Moth Card" },
  silverfish: { id: "silverfish-card", path: "./SVG/silverfishCard.svg", title: "Silverfish Card" },
  butterfly: { id: "butterfly-card", path: "./SVG/butterflyCard.svg", title: "Butterfly Card" },
  bee: { id: "bee-card", path: "./SVG/beeCard.svg", title: "Bee Card" },
  beetlebody: { id: "beetlebody-card", path: "./SVG/beetlebodyCard.svg", title: "Beetle Card" },
  yellowsally: { id: "yellowsally-card", path: "./SVG/yellowsallyCard.svg", title: "Yellowsally Card" },
  grashopper: { id: "grashopper-card", path: "./SVG/grashopperCard.svg", title: "Grashopper Card" },
};

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

  const [cards, setCards] = useState(() => {
    const collected = getCollectedIds();
    const animalCards = collected.map(id => animalCardMap[id]).filter(Boolean);
    return [...animalCards, /* ...baseCards */];
  });

  useEffect(() => {
    function onAnimalCollected(e) {
      const id = e.detail?.id;
      if (!id) return;
      const card = animalCardMap[id];
      if (!card) return;
      setCards(prev => (prev.some(c => c.id === card.id) ? prev : [card, ...prev]));
    }
    window.addEventListener("animalCollected", onAnimalCollected);
    return () => window.removeEventListener("animalCollected", onAnimalCollected);
  }, []);
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