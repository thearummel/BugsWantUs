"use client";
import { useEffect, useState } from "react";

export default function useTypewriter(text = "", speed = 45) {
  const [displayed, setDisplayed] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!text) return setDisplayed("");

    setDisplayed("");
    setFinished(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        setFinished(true);
      }
    }, speed);

    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, finished };
}