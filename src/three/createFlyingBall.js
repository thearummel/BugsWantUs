import * as THREE from "three";

export function createFlyingBall(scene) {

    // Geometry
    let geometry = new THREE.SphereGeometry(0.2, 32, 32);

    // Material
    let material = new THREE.MeshStandardMaterial({
        color: 0x88ccff,
        emissive: 0x4488ff,
        emissiveIntensity: 1.5
    });

    // Mesh
    let ball = new THREE.Mesh(geometry, material);
    ball.position.set(0, 2, 0);

    scene.add(ball);

    // Light
    let light = new THREE.PointLight(0x88ccff, 2, 5);
    scene.add(light);

    return {
        ball,
        light
    };

}