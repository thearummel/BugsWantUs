import * as THREE from "three";

export function createParticles(scene) {

    let count = 75;

    let positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {

        positions[i * 3] = (Math.random() - 0.5) * 40;
        positions[i * 3 + 1] = Math.random() * 20 - 10;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    let geometry = new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    let material = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.08,
        transparent: true,
        opacity: 0.45,
        depthWrite: false
    });

    let points = new THREE.Points(geometry, material);

    scene.add(points);

    return points;
}
