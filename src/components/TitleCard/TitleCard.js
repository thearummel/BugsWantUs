"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./TitleCard.module.css";

export default function TitleCard({ onComplete }) {
  const [dissolving, setDissolving] = useState(false);

  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => { //https://codepen.io/alvarotrigo/pen/eYEqPZa
    const target = containerRef.current;
    const text1 = text1Ref.current;
    const text2 = text2Ref.current;

    if (!target || !text1 || !text2) return;



    const texts = [
      "",
      " Critter & Friends"
    ];

    const morphTime = 0.5;
    const cooldownTime = 0;

    let textIndex = texts.length - 1;

    let time = new Date();

    let morph = 0;
    let cooldown = cooldownTime;

    text1.textContent =
      texts[textIndex % texts.length];

    text2.textContent =
      texts[(textIndex + 1) % texts.length];


    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;

      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }

      setMorph(fraction);
    }


    function setMorph(fraction) {
      text2.style.filter =
        `blur(${Math.min(
          8 / fraction - 8,
          100
        )}px)`;

      text2.style.opacity =
        `${Math.pow(
          fraction,
          0.4
        ) * 100}%`;

      fraction = 1 - fraction;

      text1.style.filter =
        `blur(${Math.min(
          8 / fraction - 8,
          100
        )}px)`;

      text1.style.opacity =
        `${Math.pow(
          fraction,
          0.4
        ) * 100}%`;


      text1.textContent =
        texts[textIndex % texts.length];

      text2.textContent =
        texts[(textIndex + 1) % texts.length];
    }


    function doCooldown() {

      morph = 0;

      text2.style.filter = "";

      text2.style.opacity = "100%";

      text1.style.filter = "";

      text1.style.opacity = "0%";
    }


    let animationFrame;

    function animate() {

      animationFrame =
        requestAnimationFrame(animate);

      const newTime = new Date();

      const shouldIncrementIndex =
        cooldown > 0;


      const dt =
        (newTime - time) / 5000;

      time = newTime;

      cooldown -= dt;


      if (cooldown <= 0) {

        if (shouldIncrementIndex) {
          textIndex++;
        }

        doMorph();

      } else {

        doCooldown();

      }
    }

    animate();


    return () => {
      cancelAnimationFrame(animationFrame);
    };

  }, []);


  useEffect(() => {

    const timer = setTimeout(() => {

      setDissolving(true);

      setTimeout(() => {
        onComplete?.();
      }, 2000);

    }, 6500);


    return () => {
      clearTimeout(timer);
    };

  }, [onComplete]);


  return (
    <div
      className={`${styles.titleCard} ${
        dissolving
          ? styles.dissolving
          : ""
      }`}
    >
      <div className={styles.background} />

  
      <div className={styles.content}>

        <div
          ref={containerRef}
          id="container"
          className={styles.morphContainer}
        >

          <span
            ref={text1Ref}
            className={styles.morphText}
          />

          <span
            ref={text2Ref}
            className={styles.morphText}
          />

        </div>


        <TypingSubtitle />

      </div>

      <svg
        className={styles.filters}
        aria-hidden="true"
      >
        <defs>

          <filter id="threshold">

            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 255 -140
              "
            />

          </filter>

        </defs>
      </svg>

    </div>
  );
}


function TypingSubtitle() {

  const text = "by Lydia Stewart and Thea Rummel";

  const [displayText, setDisplayText] =
    useState("");

  useEffect(() => {

    let index = 0;

  
    const startTimer = setTimeout(() => {

      const interval =
        setInterval(() => {

          index++;

          setDisplayText(
            text.slice(0, index)
          );

          if (index >= text.length) {
            clearInterval(interval);
          }

        }, 90);

      return () => {
        clearInterval(interval);
      };

    }, 2300);


    return () => {
      clearTimeout(startTimer);
    };

  }, []);


  return (
    <div className={styles.subtitle}>

      {displayText}

    </div>
  );
}
