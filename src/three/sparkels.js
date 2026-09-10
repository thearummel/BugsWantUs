import * as THREE from "three";

const SPARKLE_COLORS = [
    0xffc5cb,
    0xfff0d2,
    0xff7d5a,
    0xfc8ff31,
    0xffffff,
];

function createSparkle() {
    const shape = new THREE.Shape();

    shape.moveTo(0, -1);

    shape.bezierCurveTo(
        0, -0.5,
        0.5, 0,
        1, 0
    );

    shape.bezierCurveTo(
        0.5, 0,
        0, 0.5,
        0, 1
    );

    shape.bezierCurveTo(
        0, 0.5,
        -0.5, 0,
        -1, 0
    );

    shape.bezierCurveTo(
        -0.5, 0,
        0, -0.5,
        0, -1
    );

     const color =
        SPARKLE_COLORS[
            Math.floor(Math.random() * SPARKLE_COLORS.length)
        ];

    const geometry = new THREE.ShapeGeometry(shape);

    const material = new THREE.MeshBasicMaterial({
     color: color,
        transparent: true,
        opacity: 1,
     
    });

    return new THREE.Mesh(geometry, material);
}


export function addSparkles(object, world, count = 6) {
    if (!object) return null;

    const center = new THREE.Vector3();

    object.getWorldPosition(center);

    const group = new THREE.Group();

    for (let i = 0; i < count; i++) {
        const sparkle = createSparkle();

        sparkle.position.set(
            center.x + (Math.random() - 0.5) * 0.4,
            center.y + (Math.random() - 0.5) * 0.4,
            center.z + (Math.random() - 0.1) * 0.3,
        );

        const scale = 0.02 + Math.random() * 0.2;

        sparkle.scale.set(
            scale,
            scale,
            scale
        );

        sparkle.userData.baseScale = scale;
        sparkle.userData.speed = 1 + Math.random() * 2;
        sparkle.userData.phase = Math.random() * Math.PI * 2;

        group.add(sparkle);
    }

    world.scene.add(group);

    return group;
}



export function updateSparkles(sparkleGroup, time) {
    if (!sparkleGroup) return;

    sparkleGroup.children.forEach((sparkle) => {

        const baseScale = sparkle.userData.baseScale;
        const speed = sparkle.userData.speed;
        const phase = sparkle.userData.phase;

        const pulse =
            0.5 +
            0.5 * Math.sin(
                time * speed + phase
            );

        const scale =
            baseScale *
            (0.5 + pulse);

        sparkle.scale.set(
            scale,
            scale,
            scale
        );

        sparkle.material.opacity =
            0.4 + pulse * 0.6;
    });
}


export function removeSparkles(sparkleGroup, world) {
    if (!sparkleGroup) return;

    world.scene.remove(sparkleGroup);

    sparkleGroup.traverse((child) => {

        if (child.geometry) {
            child.geometry.dispose();
        }

        if (child.material) {
            child.material.dispose();
        }

    });
}