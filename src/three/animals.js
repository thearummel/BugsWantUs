
const STORAGE_KEY = "collectedAnimals_v1";

const registry = new Map();

const ANIMAL_IDS = [
  "fly",
  "beetlebody",
  "moth",
  "yellowsally",
  "silverfish",
  "butterfly",
  "grashopper",
  "ladybird",
  "ant",
];

function readStore() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function writeStore(obj) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj));
}

export function registerAnimal(id, object, scene) {
  registry.set(id, object);

  const collected = !!readStore()[id];

  object.visible = !collected;
  scene.add(object);

  if (collected) {
    object.visible = false;
  }
}

export function getObject(id) {
  return registry.get(id);
}

export function isCollected(id) {
  return !!readStore()[id];
}

export function getCollectedIds() {
  const store = readStore();
  return Object.keys(store).filter((k) => store[k]);
}

export function markCollected(id) {
  const store = readStore();
  store[id] = true;
  writeStore(store);
}

export function collectAnimal(id) {
  const obj = registry.get(id);

  if (obj) {
    obj.visible = false;

    if (obj.parent) {
      obj.parent.remove(obj);
    }
  }

  markCollected(id);

  window.dispatchEvent(
    new CustomEvent("animalCollected", {
      detail: { id },
    })
  );

  const allCollected = ANIMAL_IDS.every((animalId) =>
    isCollected(animalId)
  );

  if (allCollected) {
    window.dispatchEvent(new CustomEvent("allAnimalsCollected"));
  }
}