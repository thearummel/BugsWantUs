

import AntScene from "@/components/AntScene";
import GlobalAudio from "@/components/audio/GlobalAudio";

export default function AntPage() {
    
    
      return (
        <>
         <AntScene />
    

         <GlobalAudio
        autoPlay
        volume={1}
       src="/audio/freesound_community-low-hum-14645.mp3"
      />
      
  
    </>
  );
}