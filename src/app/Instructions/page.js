import "../globals.css";

export const metadata = {
title: "Use Instructions — Critter & Friends",
description: "Instructions for exploring Critter & Friends and inviting insects to Dr. Fenton Critter's birthday party",
};

export default function AdditionalInformationPage() {
return (
<main className="aboutmain">

  {/* Header */}
  <header className="site-header">
    <nav>
      <a href="/additional-information">
        Use Instructions
      </a>
      <a href="/About">About this Project</a>
    </nav>
  </header>

  {/* Main content */}
  <section className="about-section">

    {/* Image */}
    <div className="about-image">
      <img
        src={"/SVG/Makers.svg"}
        alt="Illustration of the makers"
      />
    </div>

    {/* Instructions */}
    <div className="about-content">
      <div className="about-head">
        <h1>How to Play</h1>
        <h3>Help Dr. Fenton Critter invite all of his insect friends to his birthday party.</h3>
      </div>

      <div className="interview">

        <p>
          <b>Welcome to the Bug Party!</b>
        </p>

        <p>
          Hello! My name is Dr. Fenton Critter. I'm an entomologist, which
          is a fancy word for someone who gets to study bugs. I learn about
          where they live, what they do, and their goofy little
          personalities.
        </p>

        <p>
          It's my birthday, and I'm throwing a bug-tastic party! But I have
          so many crawling and buzzing friends that I can't send the
          invitations by myself.
        </p>

        <div className="question">
          <p>
            <b>Your mission:</b> Help Dr. Fenton Critter find his insect
            friends and invite them to the party.
          </p>
        </div>

        <p>
          <b>1. Find the insects</b>
        </p>

        <p>
          Look around the world and keep your eyes open for insects crawling,
          flying, and buzzing through the environment.
        </p>

        <p>
          When you spot a bug, click on it to invite it to the party.
        </p>

        <div className="question">
          <p>
            For example, when you see the bright 7-Spotted Ladybird crawling
            across the screen, give it a click. It will disappear, which
            means your invitation was successful and the ladybird is now
            coming to the party.
          </p>
        </div>

        <p>
          <b>2. Keep track of your progress</b>
        </p>

        <p>
          At the bottom of the screen, you'll find the <b>Party Progress
          Bar</b>. This shows you how many bugs are left to invite.
        </p>

        <p>
          Keep exploring and collecting insects until you've invited all
          of Dr. Fenton Critter's friends.
        </p>

        <p>
          <b>3. Explore your Bug Collection</b>
        </p>

        <p>
          Click the <b>menu icon</b> at the top of the screen to open your
          <b> Bug Collection</b>.
        </p>

        <p>
          Your Bug Collection shows all of the insects you've invited to
          the party. You can also learn more about each insect and read
          fun mini-stories about their time at the party.
        </p>

        <p>
          <b>4. Move through the world</b>
        </p>

        <p>
          Explore the world by scrolling.
        </p>

        <div className="question">
          <p>
            <b>Computer:</b> Scroll with your mouse to move through the
            world.
          </p>
          <p>
            <b>Phone:</b> Use two fingers to scroll and explore.
          </p>
        </div>

        <p>
          <b>5. Look out for sparkles</b>
        </p>

        <p>
          Now go and find Dr. Fenton Critter's friends. Explore carefully
          and keep an eye out for the sparkles. They may help you discover
          something special.
        </p>

        <div className="question">
          <p>
            <b>Remember:</b> Find the bugs, click to invite them, and keep
            exploring until the party is complete.
          </p>
        </div>

      </div>
    </div>

  </section>

  {/* Footer */}
  <footer>
    © 2026 Lydia Stewart & Thea Rummel. All rights reserved.
  </footer>

</main>


);
}