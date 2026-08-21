import GardenScene from "@/components/GardenScene";

export default function Garden() {
  return (
    <>
      <GardenScene />

      <audio
        autoPlay
        loop
        preload="auto"
        src="/audio/forest-stream-birds.mp3"
        style={{ display: "none" }}
      />
    </>
  );
}

//Sound Effect by <a href="https://pixabay.com/de/users/sspsurvival-22364443/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=8257">Semen Surin</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=8257">Pixabay</a>