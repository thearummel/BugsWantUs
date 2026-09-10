"use client";

import React, { useRef, useState } from "react";
import InfoButton from "./InfoButton";
import styles from "./info.module.css";

export default function InfoMenu({ onRestart }) {

  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("instructions");
  const overlayRef = useRef(null);

  function onOverlayClick(e) {
    if (e.target === overlayRef.current) {
      setOpen(false);
    }
  }

  function handleGoToStart() {

    localStorage.removeItem("collectedAnimals");
    sessionStorage.removeItem("hasStarted");
    window.location.href = "/";

  }

  return (
    <>
      <InfoButton
        aria-controls="info-menu"
        aria-expanded={open}
        title={open ? "Close Information" : "Open Information"}
        onClick={() => setOpen(!open)}
      />

      <div
        id="info-menu"
        ref={overlayRef}
        className={`${styles.overlay} ${open ? styles.open : ""}`}
        aria-hidden={!open}
        onClick={onOverlayClick}
      >
        <div
          className={styles.overlayPanel}
          onClick={(e) => e.stopPropagation()}
        >


          <header className={styles.overlayHeader}>
            <nav className={styles.infoNav}>
              <button
                type="button"
                className={
                  activeSection === "instructions"
                    ? styles.navActive
                    : ""
                }
                onClick={() => setActiveSection("instructions")}
              >
                How to Play
              </button>

              <button
                type="button"
                className={
                  activeSection === "about"
                    ? styles.navActive
                    : ""
                }
                onClick={() => setActiveSection("about")}
              >
                About
              </button>




            </nav>

            <div className={styles.headerRight}>
              <button
                className={styles.endButton}
                onClick={handleGoToStart}
              >
                Restart Game
              </button>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setOpen(false)}
                aria-label="Close information"
                title="Close information"
              >
                ✕
              </button>
            </div>

          </header>


          {activeSection === "instructions" && (
            <section className={styles.aboutSection}>

              <div className={styles.aboutImage}>
                <img
                  src="/SVG/talkingHead.svg"
                  alt="Illustration of the makers"
                />
              </div>

              <div className={styles.aboutContent}>

                <div className={styles.aboutHead}>
                  <h1>How to Play</h1>

                  <h2>
                    Help Dr. Fenton Critter invite all of his insect
                    friends to his birthday party.
                  </h2>
                </div>

                <div className={styles.instructions}>

                 
                    <h3>1. Find the Bugs</h3>
               
                    <div>
                      <p>
                        Explore the world and look for insects crawling,
                        flying, and buzzing through the environment.
                      </p>
                      <b>Click a bug to invite it to the party.</b>
                    </div>
                 

              
                 
                    <h3>2. Track Your Progress</h3>
                  
                    <p>
                      Check the <b>Party Progress Bar</b> at the bottom
                      of the screen to see how many bugs you still need
                      to find.
                    </p>
                

              
                    <h3>3. Check Your Collection</h3>
                  <p>
                    
                      Open the <b>Bug Collection</b> from the menu to see
                      the bugs you've found and learn more about them.
                  </p>
        
                    <h3>4. Explore the World</h3>
                    <div>
                      
                      <p>Explore by scrolling through the world.</p>
                      <p><b>Computer:</b> Scroll with your mouse.</p>
                      <p><b>Phone:</b> Scroll with two fingers.</p>
                    </div>

                    <h3>5. Look Out for Sparkles</h3>
                  
                    <p>
                      Keep an eye out for sparkles as you explore. They
                      may help you discover something special.
                    </p>
               

                    <h3>
                      Find the bugs, invite them to the party, and find
                      them all!
                    </h3>
             

                </div>
              </div>

            </section>
          )}


       
          {activeSection === "about" && (
            <section className={styles.aboutSection}>

              <div className={styles.aboutImage}>
                <img
                  src="/SVG/Makers.svg"
                  alt="Illustration of the makers"
                />
              </div>

              <div className={styles.aboutContent}>

                <div className={styles.aboutHead}>
                  <h1>
                    The ladies behind the bugs: an in depth interview
                    with the creators of this site.
                  </h1>

                  <h3>
                    By Mr. Pea, The BumbleBee | Special to The Insect
                    Times
                  </h3>
                </div>


                <div className={styles.interview}>

               
                    <div>
                      <h3>Mr. Pea:</h3>
                         <p>Speaking on behalf of insects
                      everywhere, it isn’t every day we find ourselves
                      the subjects of a Master’s dissertation. Yet,
                      Thea Rummel and Lydia Stewart have dedicated their
                      final project for their interactive Digital Media
                      course at Griffith College Dublin to spotlighting
                      Ireland’s insect life.
                                        </p>
                      
                                        <p>
                      I caught up with the duo to discuss what drew them
                      to our micro-world. Ladies, it’s lovely to be with
                      you both today, please tell us about yourselves.
                                        </p>
                    </div>
                    


                  <div className={styles.question}>
                  
                      <h3>Thea:</h3> 
                        <p>Hello Mr. Pea it's a pleasure to be
                      here today. Well I am 24 years old and originally
                      from Germany. I came to Ireland in 2025 to pursue
                      my masters degree. In my free time love to be out
                      in nature hiking, reading or having a nice picnic
                      with friends.
                    </p>
                  </div>


                  <div className={styles.question}>
                   
                      <h3>Lydia:</h3> 
                       <p>It’s very nice to be here, Mr. Pea!
                      I'm 23 years old and I live in County Dublin. In
                      my spare time I love to write stories, watch
                      movies and go on walks!
                    </p>
                  </div>


                <div>
                  
                      <h3>Mr. Pea:</h3>
                        <p> Marvellous… Now, the first question
                      that comes to mind is why did you both decide to
                      dedicate this site to Irish insect.
                    </p>
                </div>


                  <div className={styles.question}>
                  
                      <h3>Lydia:</h3> 
                      <p> 
                      We wanted a project we’d actually
                      enjoy! Combining my love for storytelling with
                      Thea’s web tech skills let us create a fun
                      interactive story! Our goal was to blend a
                      technical challenge with a real ecological
                      mission. Insects do so much for our ecosystems,
                      but people often react with fear or indifference.
                      We wanted to use web design to turn apathy into
                      curiosity, reminding users that insects are
                      deserving of kindness and that it is not a crime
                      to be small!
                    </p>
                  </div>


                  <div className={styles.question}>
                  
                      <h3>Thea:</h3>
                        <p> From a design perspective, the modern
                      internet can feel pretty copy and paste. We didn't
                      want another rigid WordPress site, we wanted to
                      build something interactive from scratch! Digital
                      media doesn’t have to be bland, it can foster
                      creativity and is perfect for translating tricky
                      ecological concepts into fun visual narratives.
                      Users get to explore, collect native Irish bugs
                      and read personified insect character cards with
                      custom illustrations. It turns biodiversity data
                      into a gamified scavenger hunt rather than a dry
                      biology lesson.
                    </p>
                  </div>


             
                    <div>
                      <h3>Mr. Pea:</h3>
                           <p>Thea, I want to ask you about the
                      process of creating this site. I am aware you
                      created the beautiful illustrations, what was the
                      process like from original concept to final product?
                                        </p>
                    </div>


                  <div className={styles.question}>
                  
                      <h3>Thea:</h3> 
                        <p>As with any project, Lydia and I
                      started by collecting visual inspiration and
                      ensuring that our vision for the website was
                      aligned. One illustration we loved was by the
                      Korean artist{" "}
                      <a
                        href="https://www.instagram.com/goolygooly?igsi=MWNwZXdlZTZ2Y3ly"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <b>GOOLYGOOLY (굴리굴리)</b>
                      </a>
                      . I then started creating layered illustrations
                      using my iPad and Procreate. I then turned the
                      layers into 3D models that could be used when
                      building websites. Learning how to work with the
                      JavaScript library Three.js was quite a learning
                      curve, but I find it incredible how my 2D drawings
                      have turned into this 3D website.
                    </p>
                  </div>


                
                    <div>
                      <h3>Mr. Pea:</h3>
                        <p>Fascinating.. Lydia, from my
                      understanding, you underwent the research for this
                      project, can you talk us through the process?
                                        </p>
                    </div>


                  <div className={styles.question}>
                  
                      <h3>Lydia:</h3> 
                        <p>The research was hands-on from the
                      start! We conducted primary research at the
                      Natural History Museum with entomologist Aidan
                      O’Hanlon, studying physical specimens up close
                      and photographing real Irish insects to ensure our
                      stylised designs stayed true to their actual
                      biology. From there, I dug deep into local
                      habitats, biological data, and the All-Ireland
                      Pollinator Plan. It was an ongoing process
                      throughout the whole project, but it gave me such
                      a deep appreciation for these critters and helped
                      me craft personalised stories for each insect card!
                    </p>
                  </div>


               
                    <div>
                      <h3>Mr. Pea:</h3>
                         <p> Hm.. I wonder if my ancestors were
                      at the museum.. Anyways, ladies, I have a buzzing
                      question that all of the readers are dying to know -
                      What is your favourite insect and why?
                                        </p>
                    </div>


                  <div className={styles.question}>
                  
                      <h3>Thea:</h3>
                        <p> When I was a child, I loved an
                      audiobook about a golden dung beetle that was
                      stolen from a museum. The word 'Scarabaeus' was
                      one of the first complicated-sounding words I
                      learnt, so I feel I have to mention the dung beetle.
                    </p>
                  </div>


                  <div className={styles.question}>
                 
                      <h3>Lydia:</h3>
                         <p> I really love the death’s-head hawk
                      moth. We actually got to see some in person during
                      our primary research! I love this moth because of
                      this pattern and I find it interesting how they
                      sneak into beehives to steal honey using a special
                      scent to trick the bees. They are thieves!
                    </p>
                  </div>


                
                    <div>
                      <h3>Mr. Pea:</h3>
                        <p>Wow, very controversial.. Thank you
                      for your time today ladies, any final words for all
                      our readers?
                                        </p>
                    </div>


                  <div className={styles.question}>
                 
                      <h3>Lydia and Thea:</h3>
                        <p> We would like to say thank
                      you to our dissertation supervisor Ellen Hickey,
                      our tutor Ruairi Murphy, Dr. Aiden O’Hanlon,
                      Thea's sister and school name, for testing and
                      giving feedback about our project, Nami for
                      fueling us with coffee, and to everyone who has
                      helped us along the way.
                    </p>
                  </div>

                </div>
              </div>

            </section>
          )}


          <footer className={styles.overlayFooter}>
            © 2026 Lydia Stewart &amp; Thea Rummel. All rights reserved.
          </footer>

        </div>
      </div>
    </>
  );
}