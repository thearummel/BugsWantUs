import * as THREE from "three";

export function animate(world, refs, state) {

    let animationId;

    function render() {

        animationId = requestAnimationFrame(render);

        //
        // Camera zoom
        //

     /*   world.camera.position.z = THREE.MathUtils.lerp(
            world.camera.position.z,
            state.targetZ,
            0.08
        );

        */

        //
        // Time
        //

        let time = performance.now() * 0.001;

        //
        // Plant animation
        //

        if (refs.plant2 && refs.plant2BaseScale) {

            let s = 1 + 0.002 * Math.sin(time * 2);

            refs.plant2.scale.set(
                refs.plant2BaseScale.x * s,
                refs.plant2BaseScale.y * s,
                refs.plant2BaseScale.z * s
            );

        }

    
        
       // 
        //
        // Render
        //

        world.renderer.render(
            world.scene,
            world.camera
        );

    }

    render();

    return () => {

        cancelAnimationFrame(animationId);

    };

}