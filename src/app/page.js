"use client";

import StartOverlay from "@/components/startoverlay/StartOverlay";
import TitleCard from "@/components/TitleCard/TitleCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const dialogue = [
  `Hello! My name is Dr. Fenton Critter. I’m an entomologist, which is a fancy word for someone who gets to study bugs! I learn about where they live, what they do, and their goofy little personalities.`,
  `Guess what? It’s my birthday, and I’m throwing a bug-tastic party! But here’s the problem... I have so many crawling and buzzing friends that I can’t send the invitations by myself.`,
  `That’s where you come in! Are you ready to help me get this party started? Let me show you what to do!`,
  `Look at your screen… a beautiful, bright 7-Spotted Ladybird is crawling right across! Don't be shy, give that little bug a click!`,
  `Poof! Did you see it vanish? That means the 7-Spotted Ladybird is officially coming to the party! This is what I need you to do for the rest of my friends in the wild.`,
  `At the bottom is your Party Progress Bar! It’s like a countdown to party time! It shows you exactly how many bugs are left to invite!`,
  `Click on the menu icon up top to open your Bug Collection! Here, you can see all the insects you’ve invited. Learn about them, and read fun mini-stories about their time at the party!`,
  'To move through the world just scroll with your mouse.',
  `Now go find my friends and have fun and look out for the sparkels`,
];

export default function Home() {
  const [started, setStarted] = useState(null);
  const [titleFinished, setTitleFinished] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hasStarted = sessionStorage.getItem("hasStarted");
    if (hasStarted === "true") {
      router.replace("/Bog");
      setStarted(true);
    } else {
      setStarted(false);
    }
  }, [router]);

  function handleTitleComplete() {
    setTitleFinished(true);

  }

  function handleStart() {
    sessionStorage.setItem("hasStarted", "true");
    router.push("/Bog");
  }

  if (started === null) return null;
  if (started === true) return null;

  return (
    <> {!titleFinished && (
      <TitleCard onComplete={handleTitleComplete} />
    )}
      {titleFinished && (
        <StartOverlay dialogue={dialogue} onStart={handleStart} />
      )}
    </>
  );
}