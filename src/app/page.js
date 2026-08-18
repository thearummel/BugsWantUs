"use client";

import StartOverlay from "@/components/startoverlay/StartOverlay";
import Scene from "@/components/Scene";
import { useEffect, useState } from "react";

const dialogue = [
  // INTRO
  `Hello! My name is Dr. Fenton Critter. I’m an entomologist, which is a super fancy word for someone who gets to study bugs all day long! I learn all about where they live, what they like to do, and even their goofy little personalities.`,

  `Guess what? It’s my birthday, and I’m throwing a giant bug-tastic party! But here’s the problem... I have so many crawling, flying, and buzzing friends that I can’t send out all the invitations by myself.`,

  `That’s where you come in! Are you ready to help me get this party started? Let me show you what to do!`,

  // TUTORIAL
  `Look at your screen… a beautiful, bright 7-Spotted Ladybird is crawling right across! Don't be shy, go ahead and give that little bug a click!`,

  `Poof! Did you see it vanish? That means your invitation flew right into its tiny hands, and the 7-Spotted Ladybird is officially coming to the party! This is what I need you to do for the rest of my friends in the wild.`,

  // PROGRESS BAR
  `At the bottom is your Party Progress Bar! Every single time you send out an invitation, one of these little boxes fills right up. It’s like a countdown to party time! It shows you exactly how many bugs are left to invite!`,

  // CARD SECTION
  `Click on the menu icon up top to open your Bug Collection! Here, you can see all the awesome insects you’ve invited so far, discover cool facts about them, and read fun mini-stories about their time at the party!`,

  // INFO SECTION
  `Now go find my friends and have fun and look out for the sparkels`,
];

export default function Home() {
  const [started, setStarted] = useState(null);

  useEffect(() => {
    const hasStarted =
      sessionStorage.getItem("hasStarted");

    setStarted(hasStarted === "true");
  }, []);

  function handleStart() {
    sessionStorage.setItem("hasStarted", "true");
    setStarted(true);
  }

  // Avoid showing the overlay while checking sessionStorage
  if (started === null) {
    return <Scene />;
  }

  return (
    <>
      <Scene />

      {!started && (
        <StartOverlay
          dialogue={dialogue}
          onStart={handleStart}
        />
      )}
    </>
  );
}