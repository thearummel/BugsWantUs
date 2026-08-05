import * as THREE from "three";

export function animate(world, refs = {}) {
    let animationId;
    let running = true;

    // Set control 
    if (world && world.controls) {
        world.controls.minPolarAngle = Math.PI / 2;
        world.controls.maxPolarAngle = Math.PI / 2;
        world.controls.minAzimuthAngle = 0;
        world.controls.maxAzimuthAngle = 0;
    }


    function render() {
      
        if (!running) return;
        animationId = requestAnimationFrame(render);

         // update controls first for damping
        if (world.controls && typeof world.controls.update === "function") {
            world.controls.update();
        } 

        const z = world.camera.position.z;

        if (z <= 15) {
            world.camera.position.x = Math.max(
                -1,
                Math.min(world.camera.position.x, 0.5)

               
            );
             world.camera.position.y = Math.max(
                -0.2,
                 Math.min(world.camera.position.y, 0.5)
             )
        }


        const time = performance.now() * 0.001;

        // Beetle
        if (refs.ranke) {
            refs.ranke.rotation.y = Math.sin(time * 2) * 0.003;
        }
        if (refs.beetlepflanze) {
            refs.beetlepflanze.rotation.y = Math.sin(time * 2) * 0.01;
        }
        if (refs.beetlewingleft) {
            refs.beetlewingleft.rotation.y = Math.sin(time * 6) * 0.05;
        }
        if (refs.beetlewingright) {
            refs.beetlewingright.rotation.y = Math.sin(time * 5) * 0.05;
        }

        if (Array.isArray(refs.grasses)) {
            for (let i = 0; i < refs.grasses.length; i++) {
                const grass = refs.grasses[i];
                if (!grass || !grass.object) continue;

                const swaySpeed = 1.5;
                const swayAmount = 0.02;
                const wave = Math.sin(time * swaySpeed + (grass.offset || 0));


                const eased = THREE.MathUtils.smoothstep(wave, -1, 1);
                grass.object.rotation.y =
                    (grass.baseRotation || 0) + (eased - 0.5) * swayAmount;
            }
        }

        // garden group
        if (refs.gardengrasone) {
            refs.gardengrasone.rotation.y = Math.sin(time * 2) * 0.06;
        }
        if (refs.gardengrastwo) {
            refs.gardengrastwo.rotation.y = Math.sin(time * -2) * 0.06;
        }
        if (refs.gardengrasthree) {
            refs.gardengrasthree.rotation.y = Math.sin(time * 2) * 0.06;
        }
        if (refs.gardenplant) {
            refs.gardenplant.rotation.z = Math.sin(time * -2) * 0.05;
        }
        if (refs.gardenplanttwo) {
            refs.gardenplanttwo.rotation.y = Math.sin(time * 2) * 0.02;
        }

        if (refs.flyrightwing) {
            refs.flyrightwing.rotation.y = Math.sin(time * -4) * 0.01;
        }
        if (refs.flyleftwing) {
            refs.flyleftwing.rotation.y = Math.sin(time * 4) * 0.01;
        }

        if (refs.rivergrasone) {
            refs.rivergrasone.rotation.y = Math.sin(time * 1) * 0.04;
        }
        if (refs.rivergrastwo) {
            refs.rivergrastwo.rotation.y = Math.sin(time * 1) * 0.05;
        }
        if (refs.rivergrasthree) {
            refs.rivergrasthree.rotation.y = Math.sin(time * 1) * 0.08;
        }
        if (refs.sallylegone) {
            refs.sallylegone.rotation.y = Math.sin(time * 2) * 0.02;
        }

        if (refs.clouds && refs.clouds.position) {
            refs.clouds.position.x += 0.001;

        }



        world.renderer.render(world.scene, world.camera);

        //console.log(world.camera.position);
    }

    render();

    return () => {
        running = false;
        if (animationId) cancelAnimationFrame(animationId);
    };
}