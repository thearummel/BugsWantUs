


import RiverScene from "@/components/RiverScene";
import GlobalAudio from "@/components/audio/GlobalAudio";


export default function River() {


  return (
    <>
      <RiverScene />
     
      <GlobalAudio
        autoPlay
        loop
        volume={1}
        src="/audio/dragon-studio-quiet-stream-420899.mp3"
      />
      <GlobalAudio
        autoPlay
        loop
        volume={1}
        src="/audio/forest-stream-birds.mp3"
      />
    </>
  );
}