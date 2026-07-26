import * as THREE from "three";

export function animate(world, refs, state) {

    let animationId;


    function render() {

        animationId = requestAnimationFrame(render);

        world.controls.minPolarAngle = Math.PI / 2;
        world.controls.maxPolarAngle = Math.PI / 2;
        world.controls.minAzimuthAngle = 0;
        world.controls.maxAzimuthAngle = 0;

   
        let time = performance.now() * 0.001;
        
    // ranke up and down sway motion
        if (refs.ranke) {

            refs.ranke.position.y = Math.sin(time * 2) * 0.003;
            refs.ranke.rotation.y = Math.sin(time * 2) * 0.003;
        }
        if (refs.beetlepflanze) {

            refs.beetlepflanze.rotation.y = Math.sin(time * 2) * 0.01;
        }

        if ((refs.beetlewingleft)||(refs.beetlewingright)) {

            refs.beetlewingleft.rotation.y = Math.sin(time * 6) * 0.05;
            refs.beetlewingright.rotation.y = Math.sin(time * 5) * 0.05;
        }
       //Grass sway in Flowers

        if (refs.grasses) {

            refs.grasses.forEach((grass) => {

                const swaySpeed = 1.5;
                const swayAmount = 0.05;

                // Bezier-like smooth oscillation
                const wave = Math.sin(
                    time * swaySpeed + grass.offset
                );

                const eased = THREE.MathUtils.smoothstep(
                    wave,
                    -1,
                    1
                );

                grass.object.rotation.y =
                    grass.baseRotation +
                    (eased - 0.5) * swayAmount;

            });

        }

        // Beetle movement

    
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