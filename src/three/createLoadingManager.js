import * as THREE from "three";

export function createLoadingManager(onProgress, onLoaded) {
    const manager = new THREE.LoadingManager();

    manager.onProgress = (url, loaded, total) => {
        if (onProgress) {
            onProgress((loaded / total) * 100);
        }
    };

    manager.onLoad = () => {
        if (onLoaded) {
            onLoaded();
        }
    };

    return manager;
}