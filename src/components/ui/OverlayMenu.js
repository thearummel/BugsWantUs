"use client";
import { useEffect, useRef, useState } from "react";
import MenuButton from "./MenuButton";
import { getCollectedIds } from "@/three/animals.js";
import styles from "./overlay.module.css";

const animalCardMap = {

  fly: {
    id: "fly-card",
    path: "./SVG/flyCard.svg",
    title: "Fly Card",
    text: [
      "Arriving an hour early in a matching tie with their best friend, the Silverfish, the excited Common Fly introduced their buddy to everyone and played every party game.",
      "They gifted Dr. Critter a slightly rotten apple, which the host sneakily tossed away when no one was looking."
    ]
  },

  moth: {
    id: "moth-card",
    path: "./SVG/mothCard.svg",
    title: "Moth Card",
    text: [
      "Bursting with excitement, the Elephant Hawk Moth zoomed through Dr. Critter’s party, buzzing greetings while bringing sweet honeysuckle nectar to share.",
      "They stole the show during charades by using their hovering skills to mimic their favorite animal, a hummingbird. As night fell, this nocturnal bug used their night vision to keep the celebration going strong well into the dark."
    ]
  },

  silverfish: {
    id: "silverfish-card",
    path: "./SVG/silverfishCard.svg",
    title: "Silverfish Card",
    text: [
      "Overcoming their shyness, the Silverfish bravely attended the party wearing a slightly stained red tie.",
      "They gifted Dr. Critter their favorite treat, a single carefully chosen oat, before spending the night chatting with their best friend, the Common Fly.",
      "They read a book and sneakily took a bite out of a page when no one was looking."
    ]
  },

  butterfly: {
    id: "butterfly-card",
    path: "./SVG/butterflyCard.svg",
    title: "Butterfly Card",
    text: [
      "Excited for Dr. Critter’s big birthday, the Common Blue Butterfly fluttered in with their bright blue shimmering wings.",
      "They proudly gifted Dr. Critter a lovely, fresh flower. After sipping a few sweet drops of wildflower nectar, the butterfly spent the rest of the evening dancing in the warm breeze, filling the air with colorful, fluttering cheer."
    ]
  },

  bee: {
    id: "bee-card",
    path: "./SVG/beeCard.svg",
    title: "Bee Card"
  },

  beetlebody: {
    id: "beetlebody-card",
    path: "./SVG/beetleCard.svg",
    title: "Beetle Card",
    text: [
      "Zipping straight to the party after work in their shiny wetsuit, the Great Diving Beetle gifted Dr. Critter a fossil from a sea adventure, antenna-crossed that he'd love it.",
      "After eating little fish and swapping funny stories with the Small Yellow Sally, they headed home early to rest up for a dawn sea swim."
    ]
  },

  yellowsally: {
    id: "yellowsally-card",
    path: "./SVG/yellowsallyCard.svg",
    title: "Yellowsally Card",
    text: [
      "Arriving late after sunbathing by the river, the Small Yellow Sally rushed over with their lounging sunbed.",
      "They gifted Dr. Critter a polished riverbed rock (maybe a last-minute find) before munching on algae and spending the evening happily chatting away with their good buddy, the Great Diving Beetle."
    ]
  },

  grashopper: {
    id: "grashopper-card",
    path: "./SVG/grashopperCard.svg",
    title: "Grashopper Card",
    text: [
      "Hopping in just after the party started, the friendly Large Marsh Grasshopper quickly made new friends with their big, bubbly personality.",
      "After munching on tasty leaves with everyone, they played a lovely sunset birthday song for Dr. Critter that was so beautiful, it brought a sweet tear to the host's eye."
    ]
  },

  ladybird: {
    id: "ladybird-card",
    path: "./SVG/ladybirdCard.svg",
    title: "Ladybird Card",
    text: [
      "Closing their cozy cafe early, the 7-Spotted Ladybug arrived at Dr. Critter’s birthday party in style, wearing a special leaf hat from the Common Blue Butterfly.",
      "The gentle guest gifted Dr. Critter a daisy umbrella before happily relaxing on a warm rock, watching friends dance until bedtime."
    ]
  },

  ant: {
    id: "ant-card",
    path: "./SVG/antCard.svg",
    title: "Ant Card",
    text: [
      "Marching in right on time, the Hairy Wood Ant arrived in their work boots after a busy day building anthills.",
      "They gifted Dr. Critter a sturdy pine-needle hard hat (but it might not fit Dr. Critter’s head).",
      "After fueling up on a crunchy honeydew snack, the tireless ant spent the night helping set up party games, lifting heavy decorations with ease, and keeping every bug's spirits high."
    ]
  }

};

export default function OverlayMenu() {
  const [activeCard, setActiveCard] = useState(null);
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

  const [cards, setCards] = useState([]);

  useEffect(() => {
    const collected = getCollectedIds();
    const animalCards = collected
      .map((id) => animalCardMap[id])
      .filter(Boolean);

    setCards(animalCards);
  }, []);

  useEffect(() => {
    function onAnimalCollected(e) {
      const id = e.detail?.id;
      if (!id) return;

      const card = animalCardMap[id];
      if (!card) return;

      setCards(prev =>
        prev.some(c => c.id === card.id)
          ? prev
          : [card, ...prev]
      );

      // Send event to StartOverlay
      window.dispatchEvent(
        new CustomEvent("showStartButton", {
          detail: { id }
        })
      );
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

      <MenuButton
        ref={menuBtnRef}
        aria-controls="overlay"
        aria-expanded={open}
        title={open ? "Close invitations" : "Open invitations"}
        onClick={() => {
          setOpen((s) => !s);

          window.dispatchEvent(
            new CustomEvent("showStartButton")
          );
        }}
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
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close invitations"
              title="Close invitations"
            >
              ✕
            </button>
          </header>

          <main className={styles.cardsGrid} id="cardsGrid">
            {cards.map((c, idx) => (
              <article
                key={c.id}
                className={`${styles.card} ${activeCard === c.id ? styles.cardActive : ""
                  }`}
                tabIndex={open ? 0 : -1}
                ref={idx === 0 ? firstCardRef : null}
                onClick={() =>
                  setActiveCard((current) =>
                    current === c.id ? null : c.id
                  )
                }
               /*  onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveCard((current) =>
                      current === c.id ? null : c.id
                    );
                  }
                }} */
                role="button"
                aria-expanded={activeCard === c.id}
              >
                <img src={c.path} alt={c.title} />

                <div className={styles.cardReveal}>
                  <div className={styles.cardText}>
                    {(c.text || []).map((line, lineIndex) => (
                      <span
                        key={lineIndex}
                        className={styles.textLine}
                        style={{
                          "--line-index": lineIndex,
                        }}
                      >
                        {line}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </main>

          <footer className={styles.overlayFooter}>
            <button
              className={styles.printBtn}
              aria-label="Print cards"
              title="Print cards"
            >
              <img
                src="/SVG/printBtn.svg"
                alt=""
              />
            </button>
          </footer>
        </div>
      </div>
    </>
  );
}