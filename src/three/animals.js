// animals.js
const STORAGE_KEY = "collectedAnimals_v1";

const registry = new Map();

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
  // store object reference
  registry.set(id, object);

  // if already collected, keep it hidden; otherwise add to scene
  const collected = !!readStore()[id];
  object.visible = !collected;
  if (!collected) {
    scene.add(object);
  } else {
    // optional: do not add to scene at all if already collected
    scene.add(object); object.visible = false;
  }
}

export function getObject(id) {
  return registry.get(id);
}

export function isCollected(id) {
  return !!readStore()[id];
}

export function getCollectedIds() {
  return Object.keys(readStore()).filter(k => readStore()[k]);
}

export function markCollected(id) {
  const store = readStore();
  store[id] = true;
  writeStore(store);
}

export function collectAnimal(id) {
  // hide/remove the model from scene so it's no longer clickable/visible
  const obj = registry.get(id);
  if (obj) {
    obj.visible = false;            // Raycaster ignores invisible objects
    if (obj.parent) obj.parent.remove(obj); // extra: remove from scene graph
  }

  markCollected(id);

  // notify UI/other code immediately
  window.dispatchEvent(new CustomEvent("animalCollected", { detail: { id } }));
}