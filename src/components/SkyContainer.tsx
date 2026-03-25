"use client";

import { Canvas } from "@react-three/fiber";
import ThreePlanet from "./ThreePlanet";
import { motion, useScroll, useTransform } from "framer-motion";

export default function SkyContainer() {
    const { scrollYProgress } = useScroll();

    // Fade out planets as we descend into the ocean
    const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
    // Move them up slightly as we scroll down for parallax
    const yTransform = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

    return (
        <motion.div
            className="absolute top-0 left-0 w-full h-[800px] z-[-2] pointer-events-none"
            style={{ opacity, y: yTransform }}
        >
            <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, 5, 5]} intensity={1} color="#ffaa00" />

                {/* Lava Planet - Left side */}
                <ThreePlanet
                    path="/models/lava_planet.glb"
                    position={[-4, 1, 0]}
                    scale={0.4}
                    rotationSpeed={0.002}
                />


            </Canvas>
        </motion.div>
    );
}
