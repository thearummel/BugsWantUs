
import "../globals.css";

export const metadata = {
  title: 'About — BugsWantUs',
  description: 'About page for the BugsWantUs project',
};

export default function AboutPage() {
  return (
    <main className="aboutmain" >
    
      <div className="mainwrapp">

        <h1>About this Project</h1>
        <p>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
           Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum."
        </p>
  
      </div>
      <div>
      © 2026 Lydia Stewart & Thea Rummel. All rights reserved.
    </div>
    </main>

    
  );
}