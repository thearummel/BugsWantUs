


import SinkScene from "@/components/SinkScene";
import GlobalAudio from "@/components/audio/GlobalAudio";

export default function Sink() {
 
    
      return (
        <>
         <SinkScene />
    

            <GlobalAudio
              autoPlay
              loop
              volume={1}
        src="/audio/freesound_community-fridge-hum-loud-saint-john-191002-62243.mp3"
            />
    </>
  );
}