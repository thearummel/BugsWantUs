

import GardenScene from "@/components/GardenScene";
import GlobalAudio from "@/components/audio/GlobalAudio";


export default function Garden() {




  return (
    <>
      <GardenScene />

    
            <GlobalAudio
              autoPlay
              loop
              volume={1}
              src="/audio/forest-stream-birds.mp3"
            />
    </>
  );
}