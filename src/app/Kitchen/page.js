

import KitchenScene from "@/components/KitchenScene";
import GlobalAudio from "@/components/audio/GlobalAudio";


export default function Kitchen() {
  

  return (
    <>
      <KitchenScene />


      <GlobalAudio
        autoPlay
        loop
        volume={1}
        src="/audio/koiroylers-open-and-close-door-351942.mp3"
      />
      <GlobalAudio
        autoPlay
        loop
        volume={1}
        src="/audio/freesound_community-fridge-hum-loud-saint-john-191002-62243.mp3"
      />
    </>
  );
}