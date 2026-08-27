


import Scene from "@/components/Scene";

import GlobalAudio from "@/components/audio/GlobalAudio";


export default function BogPage() {


  return (
    <>
      <Scene />

  
          <GlobalAudio
              autoPlay
              loop
              volume={1}
              src="/audio/freesound_community-swamp-woods-34735.mp3"
            />
    </>
  );
}