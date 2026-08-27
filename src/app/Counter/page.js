


import CounterScene from "@/components/CounterScene";
import GlobalAudio from "@/components/audio/GlobalAudio";


export default function Counter() {
  
  
      return (
        <>
         <CounterScene />
      
        
            <GlobalAudio
              autoPlay
              loop
              volume={1}
              src="/audio/freesound_community-fridge-hum-loud-saint-john-191002-62243.mp3"
            />
    </>
  );
}