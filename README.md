
animate - a
click - c


Bog:
a
- BogPlantOne 
- BogPlantTwo
- Clouds

c
- GrashopperPlant
- Grashopper
- Forest

Garden:
a
- gardengrasone 
- gardengrastwo
- gardengrasthree
//- GardenSmallFlowerone
//- GardenSmallFlowertwo
- GardenPlant
- GardenPlantTwo

c
- Door
- Flower
- River
- Bush
- Lake

Beetle:

a
- beetlewingleft
- beetlebackleg
- beetlefrontleg
- Body
- beetlewingright
- beetlelegright
- leg
- Ranke
- BeetlePflanze

Kitchen:

c
- Bowl
- Sink


Silverfish
a
- Tail
- SilverfishLeg

By River

- RiverGrasOne
- RiverGrasTwo
- RiverGrasThree

Bush

- bushFrontOne to Nine

YellowSally

- SallyBody
- SallyLegTwo
- SallyLegOne
- SallyLegLow
- SallyLegMiddle

Moth

- MothAntenna
- MothAntennaTwo


Butterfly
- AntennaOne
- AntennaTwo


typewriter something like this:
useEffect(() => {
  if (!dialogue) return;

  setDisplayedText("");

  let index = 0;

  const interval = setInterval(() => {
    setDisplayedText(dialogue.slice(0, index + 1));
    index++;

    if (index >= dialogue.length) {
      clearInterval(interval);
      setDialogueFinished(true);
    }
  }, 35);

  return () => clearInterval(interval);
}, [dialogue]);