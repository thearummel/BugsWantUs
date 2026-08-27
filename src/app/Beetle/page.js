



import BeetleScene from "@/components/BeetleScene";
import GlobalAudio from "@/components/audio/GlobalAudio";


export default function BeetlePage() {


  return (
    <>
      <BeetleScene />

     
      <GlobalAudio
        autoPlay
        loop
        volume={1}
        src="/audio/freesound_community-underwater-loop-amb-6182.mp3"
      />
    </>
  );
}