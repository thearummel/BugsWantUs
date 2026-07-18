import * as THREE from "three";

export function setupInteractions(world, refs, state, router) {
    // console.log("router:", router);

    function onWheel(event) {

        state.targetZ += event.deltaY * 0.01;

        state.targetZ = THREE.MathUtils.clamp(
            state.targetZ,
            10,
            30
        );
    }

    function onClick(event) {

        world.mouse.x =
            (event.clientX / window.innerWidth) * 2 - 1;

        world.mouse.y =
            -(event.clientY / window.innerHeight) * 2 + 1;

        world.raycaster.setFromCamera(
            world.mouse,
            world.camera
        );

       const interactables = [
    {
        object: refs.door,
        action: () => router.push("/about"),
    },
    {
        object: refs.lake,
        action: () => router.push("/Beetle")
    },

    {
        object: refs.bowl,
        action:() => router.push("/Counter")
    }
];

for (const item of interactables) {
    if (!item.object) continue;

    const hits = world.raycaster.intersectObject(
        item.object,
        true
    );

    if (hits.length > 0) {
        item.action();
        break;
    }
}
    }

    function onResize() {

        world.camera.aspect =
            window.innerWidth / window.innerHeight;

        world.camera.updateProjectionMatrix();

        world.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
    }

    window.addEventListener("wheel", onWheel);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    return () => {
        window.removeEventListener("wheel", onWheel);
        window.removeEventListener("click", onClick);
        window.removeEventListener("resize", onResize);
    };
}