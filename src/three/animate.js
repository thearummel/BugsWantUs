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
        // Flying ball
        //

     /*   flyingBall.ball.position.x = Math.sin(time * 0.8) * 6;
        flyingBall.ball.position.y = 2 + Math.sin(time * 1.5) * 1.2;
        flyingBall.ball.position.z = Math.cos(time * 1.1) * 4;

        flyingBall.light.position.copy(
            flyingBall.ball.position
        );
*/
        //
        // Controls
        //

        world.controls.update();
        
       // console.log(world.camera.position);
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