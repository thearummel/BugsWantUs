import * as THREE from "three";

export function animate(world, refs, state) {

    let animationId;


    function render() {

        animationId = requestAnimationFrame(render);

        world.controls.minPolarAngle = Math.PI / 2;
        world.controls.maxPolarAngle = Math.PI / 2; 
        world.controls.minAzimuthAngle = 0;
        world.controls.maxAzimuthAngle = 0; //

   
        let time = performance.now() * 0.001;
     
    //Beetle all
    // ranke up and down sway motion
        if (refs.ranke) {

           
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

        if (refs.grasses)  {

            refs.grasses.forEach((grass) => {

                const swaySpeed = 1.5;
                const swayAmount = 0.02;

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

// Garden animations

        if ((refs.gardengrasone)||(refs.gardengrastwo)||(refs.gardengrasthree)||(refs.gardenplant)||(refs.gardenplanttwo)) {
            
            refs.gardengrasone.rotation.y = Math.sin(time * 2) * 0.06;
            refs.gardengrastwo.rotation.y = Math.sin(time * -2) * 0.06;
            refs.gardengrasthree.rotation.y = Math.sin(time * 2) * 0.06;
            refs.gardenplant.rotation.z = Math.sin(time * -2) * 0.05;
            refs.gardenplanttwo.rotation.y = Math.sin(time * 2) * 0.02;
        
        }
// Counter Fly wings
        if ((refs.flyrightwing)||(refs.flyleftwing)) {

            refs.flyrightwing.rotation.y = Math.sin(time * -4) * 0.01;
            refs.flyleftwing.rotation.y = Math.sin(time * 4) * 0.01;
        }
     
        world.renderer.render(
            world.scene,
            world.camera
        );

    }

    // sally anim

    if (refs.SallyLegTwo) {
         refs.SallyLegTwo.rotation.y = Math.sin(time * -4) * 0.01;
    }

    render();

    return () => {

        cancelAnimationFrame(animationId);

    };

}