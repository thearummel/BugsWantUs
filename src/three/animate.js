import * as THREE from "three";

function animateSparkleGroup(group, time) {
    group.children.forEach(sparkle => {
        const {
            baseScale,
            speed,
            phase
        } = sparkle.userData;

        const pulse =
            0.2 +
            (Math.sin(time * speed + phase) + 1) * 0.4;

        const scale = baseScale * pulse;

        sparkle.scale.set(
            scale,
            scale,
            scale
        );
    });
}

export function animate(world, refs = {}) {
    let animationId;
    let running = true;


    if (world && world.controls) {
        world.controls.minPolarAngle = Math.PI / 2;
        world.controls.maxPolarAngle = Math.PI / 2;
        world.controls.minAzimuthAngle = 0;
        world.controls.maxAzimuthAngle = 0;
    }


    function render() {

        if (!running) return;
        animationId = requestAnimationFrame(render);

        if (world.controls && typeof world.controls.update === "function") {
            world.controls.update();
        }

        const z = world.camera.position.z;

        /*  if (z <= 15) {
             world.camera.position.x = Math.max(
                 -1,
                 Math.min(world.camera.position.x, 0.5)
 
                
             );
              world.camera.position.y = Math.max(
                 -0.2,
                  Math.min(world.camera.position.y, 0.5)
              )
         } */


        const time = performance.now() * 0.001;
        // Moth 

        if (refs.mothantenna) {

            refs.mothantenna.rotation.y = Math.sin(time * 3) * 0.04;

        }

        if (refs.mothantennatwo) {

            refs.mothantennatwo.rotation.y = Math.sin(time * 4) * 0.04;

        }



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



        // Fly

        if (refs.flyrightwing) {

            refs.flyrightwing.rotation.y = Math.sin(time * -4) * 0.01;

        }

        if (refs.flyleftwing) {

            refs.flyleftwing.rotation.y = Math.sin(time * 4) * 0.01;

        }



        // River Grass



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



        // YellowSally

        if (refs.sallybody) {

            refs.sallybody.rotation.y = Math.sin(time * 0.5) * 0.01;

        }

        if (refs.sallylegone) {

            refs.sallylegone.rotation.y = Math.sin(time * 2) * 0.05;

        }

        if (refs.sallylegtwo) {

            refs.sallylegtwo.rotation.y = Math.sin(time * 1) * 0.04;

        }

        if (refs.sallyleglow) {

            refs.sallyleglow.rotation.y = Math.sin(time * 1) * 0.04;

        }

        if (refs.sallylegmiddle) {

            refs.sallylegmiddle.rotation.y = Math.sin(time * 1) * 0.07;

        }





        // Bush Front 

        if (refs.bushfrontone) {

            refs.bushfrontone.rotation.y = Math.sin(time * 0.5) * 0.02;

        }

        if (refs.bushfronttwo) {

            refs.bushfronttwo.rotation.y = Math.sin(time * 0.2) * 0.05;

        }

        if (refs.bushfrontthree) {

            refs.bushfrontthree.rotation.y = Math.sin(time * 1) * 0.03;

        }

        if (refs.bushfrontfour) {

            refs.bushfrontfour.rotation.y = Math.sin(time * 0.7) * 0.02;

        }

        if (refs.bushfrontfive) {

            refs.bushfrontfive.rotation.y = Math.sin(time * 0.9) * 0.03;

        }

        if (refs.bushfrontsix) {

            refs.bushfrontsix.rotation.y = Math.sin(time * 0.8) * 0.05;

        }

        if (refs.bushfrontseven) {

            refs.bushfrontseven.rotation.y = Math.sin(time * 0.4) * 0.05;

        }

        if (refs.bushfronteight) {

            refs.bushfronteight.rotation.y = Math.sin(time * 0.3) * 0.02;

        }

        if (refs.bushfrontnine) {

            refs.bushfrontnine.rotation.y = Math.sin(time * 0.5) * 0.03;

        }



        // Butterfly

        if (refs.antennaone) {

            refs.antennaone.rotation.y = Math.sin(time * 3) * 0.04;

        }

        if (refs.antennatwo) {

            refs.antennatwo.rotation.y = Math.sin(time * 2) * 0.04;

        }





        // Clouds - bog

        if (refs.clouds && refs.clouds.position) {

            refs.clouds.position.x += 0.001;



        }



        // Bog Plants

        if (refs.bogplantone) {

            refs.bogplantone.rotation.y = Math.sin(time * 1) * 0.02;

        }



        if (refs.bogplanttwo) {

            refs.bogplanttwo.rotation.y = Math.sin(time * 1.5) * 0.01;

        }





//Grashopper


        if (refs.grashopperantenna) {

            refs.grashopperantenna.rotation.y = Math.sin(time * 2) * 0.03;

        }


        //silverfish

        if (refs.silverfishleg) {

            refs.silverfishleg.rotation.y = Math.sin(time * 2) * 0.03;

        }

        if (refs.tail) {

            refs.tail.rotation.y = Math.sin(time * 3) * 0.04;

        }

        // Ladybird
if (refs.ladybird) {
    const isMobile = window.innerWidth < 450;
    const endX = isMobile ? -2.1 : -3.1;

    if (refs.ladybirdStarted?.current) {
        if (refs.ladybird.position.x <= endX) {
            refs.ladybird.position.y = Math.sin(time * 8) * 0.01;
            refs.ladybird.position.x += 0.01;

            const legs = [
                refs.ladybirdlegone,
                refs.ladybirdlegtwo,
                refs.ladybirdlegthree,
                refs.ladybirdlegfour,
                refs.ladybirdlegfive,
                refs.ladybirdlegsix
            ];

            legs.forEach((leg, index) => {
                if (leg) {
                    leg.rotation.y =
                        Math.sin(
                            time * 8 +
                            (index % 2) * Math.PI
                        ) * 0.06;
                }
            });

        } else {
            refs.ladybird.position.x = endX+0.01;
            refs.ladybird.position.y = 0;

            const legs = [
                refs.ladybirdlegone,
                refs.ladybirdlegtwo,
                refs.ladybirdlegthree,
                refs.ladybirdlegfour,
                refs.ladybirdlegfive,
                refs.ladybirdlegsix
            ];

            legs.forEach(leg => {
                if (leg) {
                    leg.rotation.y = 0;
                }
            });
        }
    }
}


// Sparkles

const sparkleGroups = [
    refs.doorsparkles,
    refs.bushsparkles,
    refs.lakesparkles,
    refs.anthillsparkles,
    refs.riversparkles,
    refs.forestsparkles,
    refs.bowlsparkles,
    refs.sinksparkles,
];

sparkleGroups.forEach(group => {
    if (group) {
        animateSparkleGroup(group, time);
    }
});
        world.renderer.render(world.scene, world.camera);

        //console.log(world.camera.position);
    }

    render();

    return () => {
        running = false;
        if (animationId) cancelAnimationFrame(animationId);
    };
}