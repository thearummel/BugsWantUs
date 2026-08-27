import "../globals.css";

export const metadata = {
  title: "About — Critter & Friends",
  description: "About page for the Critter & Friends project",
};

export default function AboutPage() {
  return (
    <main className="aboutmain">

      {/* Header */}
      <header className="site-header">
        <nav>
            <a href="/Instructions">
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

        {/* Interview */}
        <div className="about-content">
          <div className="about-head">
            <h1>The ladies behind the bugs: an in depth interview with the creators of this site.</h1>
            <h3>By Mr. Pea, The BumbleBee | Special to The Insect Times </h3>
          </div>
          <div className="interview">
            <p> <b> Mr. Pea: </b>  Speaking on behalf of insects everywhere, it isn’t every day we find ourselves the subjects of a Master’s dissertation. Yet, Thea Rummel and Lydia Stewart have dedicated their final project for their interactive Digital Media course at Griffith College Dublin to spotlighting Ireland’s insect life.

              I caught up with the duo to discuss what drew them to our micro-world. Ladies, it’s lovely to be with you both today, please tell us about yourselves.  </p>
            <div className="question">
              <p>
                <b>Thea:</b> Hello Mr. Pea it's a pleasure to be here today. Well I am 24 years old and originally from Germany. I came to Ireland in 2025 to pursue my masters degree. In my free time love to be out in nature hiking, reading or having a nice picnic with friends.
              </p>
            </div>
            <div className="question">
              <p >
                <b>Lydia:</b>
              </p>
            </div>

            <p><b>Mr. Pea:</b> Marvellous… Now, the first question that comes to mind is why did you both decide to dedicate this site to Irish insect. </p>

            <div className="question">
              <p>
                <b>Lydia:</b> We wanted a project we’d actually enjoy! Combining my love for storytelling with Thea’s web tech skills let us create a fun interactive story! Our goal was to blend a technical challenge with a real ecological mission. Insects do so much for our ecosystems, but people often react with fear or indifference. We wanted to use web design to turn apathy into curiosity, reminding users that insects are deserving of kindness and that it is not a crime to be small!
              </p>
            </div>
            <div className="question">
              <p >
                <b>Thea: </b>  From a design perspective, the modern internet can feel pretty copy and paste. We didn't want another rigid WordPress site, we wanted to build something interactive from scratch! Digital media doesn’t have to be bland, it can foster creativity and is perfect for translating tricky ecological concepts into fun visual narratives. Users get to explore, collect native Irish bugs and read personified insect character cards with custom illustrations. It turns biodiversity data into a gamified scavenger hunt rather than a dry biology lesson.
              </p>
            </div>

            <p>
              <b>Mr. Pea:</b> Thea, I want to ask you about the process of creating this site. I am aware you created the beautiful illustrations, what was the process like from original concept to final product?
            </p>

            <div className="question">
              <p >
                <b>Thea:</b> As with any project, Lydia and I started by collecting visual inspiration and ensuring that our vision for the website was aligned. One illustration we loved was by the Korean artist <a href="https://www.instagram.com/goolygooly?igsi=MWNwZXdlZTZ2Y3ly"> <b>GOOLYGOOLY (굴리굴리)</b></a>. I then started creating layered illustrations using my iPad and Procreate. I then turned the layers into 3D models that could be used when building websites. Learning how to work with the JavaScript library Three.js was quite a learning curve, but I find it incredible how my 2D drawings have turned into this 3D website.
              </p>
            </div>


            <p>
              <b>Mr. Pea:</b> Fascinating.. Lydia, from my understanding, you underwent the research for this project, can you talk us through the process?
            </p>

            <div className="question">
              <p >
                <b>Lydia:</b> The research was hands-on from the start! We conducted primary research at the Natural History Museum with entomologist Aidan O’Hanlon, studying physical specimens up close and photographing real Irish insects to ensure our stylised designs stayed true to their actual biology. From there, I dug deep into local habitats, biological data, and the All-Ireland Pollinator Plan. It was an ongoing process throughout the whole project, but it gave me such a deep appreciation for these critters and helped me craft personalised stories for each insect card!
              </p>
            </div>

            <p>
              <b>Mr. Pea:</b> Hm.. I wonder if my ancestors were at the museum.. Anyways, ladies, I have a buzzing question that all of the readers are dying to know - What is your favourite insect and why?
            </p>
            <div className="question">
              <p >
                <b>Thea:</b> When I was a child, I loved an audiobook about a golden dung beetle that was stolen from a museum. The word 'Scarabaeus' was one of the first complicated-sounding words I learnt, so I feel I have to mention the dung beetle.
              </p>
            </div>

            <div className="question">
              <p >
                <b>Lydia:</b> I really love the death’s-head hawk moth. We actually got to see some in person during our primary research! I love this moth because of this pattern and I find it interesting how they sneak into beehives to steal honey using a special scent to trick the bees. They are thieves!
              </p>
            </div>

            <p>
              <b>Mr. Pea:</b> Wow, very controversial.. Thank you for your time today ladies, any final words for all our readers?  
            </p>

             <div className="question">
              <p >
                <b>Lydia and Thea:</b> We would like to say thank you to our dissertation supervisor Ellen Hickey, our tutor Ruairi Murphy, Dr. Aiden O’Hanlon, Thea's sister and school name, for testing and giving feedback about our project, Nami for fueling us with coffee, and to everyone who has helped us along the way. 
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