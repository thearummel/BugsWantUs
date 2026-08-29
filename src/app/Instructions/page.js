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
      <a href="/Instructions">
        Use Instructions
      </a>
      <a href="/About">About</a>
    </nav>
  </header>

  {/* Main content */}
  <section className="about-section">

    {/* Image */}
    <div className="about-image">
      <img
        src={"/SVG/talkingHead.svg"}
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
  <b>1. Find the Bugs</b>
  <br />
  Explore the world and look for insects crawling, flying, and buzzing
  through the environment.
</p>


  

    <p>
      <b>Click a bug to invite it to the party.</b>
    </p>

    <p>
      <b>2. Track Your Progress</b>
  <br />
      Check the <b>Party Progress Bar</b> at the bottom of the screen to
      see how many bugs you still need to find.
    </p>

   

    <p>
      <b>3. Check Your Collection</b>
  <br />
       Open the <b>Bug Collection</b> from the menu to see the bugs you've
      found and learn more about them.
    </p>

  
    <p>
      <b>4. Explore the World</b>
  <br />
       Explore by scrolling through the world.
    </p>

  

    <p>
      <b>Computer:</b> Scroll with your mouse.
      <br />
      <b>Phone:</b> Scroll with two fingers.
    </p>

    <p>
      <b>5. Look Out for Sparkles</b>
   <br />
      Keep an eye out for sparkles as you explore. They may help you
      discover something special.
    </p>

  

    <p>
      <b>Find the bugs, invite them to the party, and find them all!</b>
    </p>

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