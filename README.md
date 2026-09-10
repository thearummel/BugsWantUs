# Critter & Friends
## What this is

An educational, 3D interactive mini-game built with Next.js and Three.js where players explore 3D scenes find insects and collect character cards.

### Key features

Fully client-side 3D scenes using Three.js and glTF models (multiple rooms: Bog, Garden, River, Kitchen, etc.)
Click-to-collect mechanics with a persistent collection (localStorage)
Progress bar and collection UI with animated Lottie loader and audio backgrounds per scene
Finale page with a restart button that clears the collection and returns to start
Lightweight three.js animation system and interactive raycasting for pointer picking

### Stack

**Languages:**  JavaScript, CSS
**Framework:** Next.js (App Router, client components)
**3D:** three (glTF, GLTFLoader, OrbitControls, Raycaster)
**UI:**  React, lottie-react for animations

### Quick start (development)
```
Install npm install
```
```
Run dev server npm run dev
```
Open http://localhost:3000
Build & serve production (local) npm run build npm start


### Project layout 

src/
app/ Next pages (routes) and layout
components/ React components and scene wrappers (Scene, *Scene.js)
three/ Three.js code: setupScene, loaders, animations, interactions, animals registry
hooks/ small custom hooks (useTypewriter)
public/ static assets (models/, audio/, SVG/, animations/)



### Learning resources used

**Three.js fundamentals:** https://discoverthreejs.com/ and https://threejs.org/docs/
**glTF & loaders:** https://www.khronos.org/gltf/
**Raycasting / picking:** threejs.org/examples and Discover Three.js chapter on interaction, https://www.ramijames.com/learn-threejs/interaction/raycasting-and-mouse-events
**Animation & easing:** Robert Penner easing functions; https://www.svggenie.com/blog/svg-animations-complete-guide
**Promises & async/await:** MDN Promise/async docs
**Lottie:** https://lottiefiles.com/learn and lottie-react docs
**Next.js App Router and static assets:**https://nextjs.org/docs
**React Basics:** https://www.freecodecamp.org/learn/front-end-development-libraries-v9/
**Print Function:**https://www.nutrient.io/blog/how-to-print-pdfs-using-pdfjs/


