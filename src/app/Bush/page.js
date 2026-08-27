

import BushScene from "@/components/BushScene";
import GlobalAudio from "@/components/audio/GlobalAudio";



export default function BushPage() {




  return (
    <>
      <BushScene />

      <GlobalAudio
        autoPlay
        loop
        volume={0.3}
        src="/audio/soul_serenity_sounds-leaves-rustling-236742.mp3"
      />
      <GlobalAudio
        autoPlay
        loop
        volume={0.01}
        src="/audio/forest-stream-birds.mp3"
      />
    </>
  );
}