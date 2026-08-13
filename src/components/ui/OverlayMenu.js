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
    text: ["The Common Fly was very excited to attend Dr. Critter’s birthday! So much so, that they arrived an hour ahead of time!", "They decided to wear matching ties with their best friend, the Silverfish. The Common Fly made sure to introduce their friend to every bug at the party and took part in every single party game that evening!", "The Common Fly gifted Dr. Critter a slightly rotten apple, (which Dr. Critter sneakily threw it away."]
  },

  moth: {
    id: "moth-card",
    path: "./SVG/mothCard.svg",
    title: "Moth Card",
    text: ["The Elephant Hawk Moth was bursting with excitement at the big party! Zooming past every tiny bug, they buzzed a speedy hello without even slowing down.", "For the party, they brought a delicious treat, sweet nectar straight from a honeysuckle flower. They were truly the life of the party! When it was time for charades, the moth happily pretended to be a hummingbird. It is their favorite animal to copy, thanks to their own super-fast wings and amazing hovering skills.", "As night fell and the sky grew dark, the nocturnal moth kept the fun going strong. With their night vision power, they can see clear as day! For this bug, the party was only just beginning!"]
  },

  silverfish: {
    id: "silverfish-card",
    path: "./SVG/silverfishCard.svg",
    title: "Silverfish Card",
    text: ["The Silverfish was a bit unsure whether they should attend the party or not, as they are quite shy. But the Silverfish worked up the courage to attend the party! Wearing a lovely, but a little bit stained, red tie.","They gifted Dr.Critter a single oat for his birthday, as it is one of the Silverfishes favourite meals. They made sure to pick the most delicious looking oat!","The Silverfish spent the night talking to their best friend, the Common Fly and reading a book they found at the table… They sneakily took a bite of the page when no bug was looking!"]
  },
  butterfly: {
    id: "butterfly-card",
    path: "./SVG/butterflyCard.svg",
    title: "Butterfly Card"
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
    text: ["The Great Diving Beetle zipped straight to Dr. Critter’s birthday party right after work! Without any time to change, they wore their usual work outfit to the celebration, a shiny wetsuit!", "They surprised Dr. Critter with a thoughtful gift, a fossil they found during one of their big sea adventures. They crossed their antennas, hoping Dr. Critter loves it!","For dinner, the Great Diving beetle munched on delicious little fish while sharing funny stories with the Small Yellow Sally.","They headed home early, excited to wake up at dawn for a refreshing morning sea swim!"]
   },

  yellowsally: { 
    id: "yellowsally-card", 
    path: "./SVG/yellowsallyCard.svg", 
    title: "Yellowsally Card"
   },
  grashopper: { 
    id: "grashopper-card", 
    path: "./SVG/grashopperCard.svg", 
    title: "Grashopper Card" 
  },
  ladybird: { 
    id: "ladybird-card", 
    path: "./SVG/ladybirdCard.svg", 
    title: "Ladybird Card" 
  },
  
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
                className={`${styles.card} ${activeCard === c.id ? styles.cardActive : ""
                  }`}
                tabIndex={open ? 0 : -1}
                ref={idx === 0 ? firstCardRef : null}
                onClick={() =>
                  setActiveCard((current) =>
                    current === c.id ? null : c.id
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveCard((current) =>
                      current === c.id ? null : c.id
                    );
                  }
                }}
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
        </div>
      </div>
    </>
  );
}