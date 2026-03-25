"use client";

import { Canvas } from "@react-three/fiber";
import ThreeSeaweed from "./ThreeSeaweed";
import SharkModel from "./SharkModel";

export default function SeaweedContainer() {
    return (
        <div className="absolute bottom-0 left-0 w-full h-[1000px] z-[-5] overflow-hidden">
            <Canvas camera={{ position: [0, 4, 15], fov: 45 }}>
                {/* Adjusted Lighting: Less intense "green cloud" */}
                <ambientLight intensity={0.1} color="#002200" />
                <directionalLight position={[0, 10, 5]} intensity={1.5} color="#4ade80" />
                <spotLight position={[10, 0, 5]} intensity={2} color="#22c55e" angle={0.5} penumbra={1} />
                <spotLight position={[-10, 0, 5]} intensity={2} color="#22c55e" angle={0.5} penumbra={1} />
                {/* Subtle backlight */}
                <pointLight position={[0, -2, 2]} intensity={0.5} color="#86efac" distance={10} />

                {/* 
          A forest of tall, green seaweed.
          Scales varied for more organic look.
        */}

                {/* Far Background Layer (Darker/Smaller) */}
                <ThreeSeaweed position={[-9, -5, -4]} scale={3.2} swaySpeed={0.5} rotation={[0, 1, 0]} />
                <ThreeSeaweed position={[-5, -6, -5]} scale={4.5} swaySpeed={0.4} rotation={[0, 2, 0]} />
                <ThreeSeaweed position={[0, -5, -6]} scale={5.5} swaySpeed={0.3} rotation={[0, 3, 0]} />
                <ThreeSeaweed position={[5, -6, -5]} scale={4.2} swaySpeed={0.4} rotation={[0, 4, 0]} />
                <ThreeSeaweed position={[9, -5, -4]} scale={3.5} swaySpeed={0.5} rotation={[0, 5, 0]} />

                {/* Mid Layer (Varied sizes) */}
                <ThreeSeaweed position={[-7, -4, -2]} scale={2.8} swaySpeed={0.6} rotation={[0, 0.5, 0]} />
                <ThreeSeaweed position={[-3, -4.5, -2]} scale={3.8} swaySpeed={0.7} />
                <ThreeSeaweed position={[3, -4.5, -2]} scale={4.0} swaySpeed={0.6} rotation={[0, 1.5, 0]} />
                <ThreeSeaweed position={[7, -4, -2]} scale={3.0} swaySpeed={0.7} rotation={[0, 2.5, 0]} />

                {/* Foreground Layer (Side framing + New additions) */}
                <ThreeSeaweed position={[-8, -3, 0]} scale={2.5} swaySpeed={0.8} />
                <ThreeSeaweed position={[-6, -3.5, 1]} scale={2.0} swaySpeed={0.9} rotation={[0, 1, 0]} />
                <ThreeSeaweed position={[6, -3.5, 1]} scale={2.2} swaySpeed={0.8} rotation={[0, 3, 0]} />
                <ThreeSeaweed position={[8, -3, 0]} scale={2.6} swaySpeed={0.9} rotation={[0, 4, 0]} />

                {/* Extra fillers for density & variation */}
                <ThreeSeaweed position={[-1.5, -5, -1]} scale={3.5} swaySpeed={0.6} />
                <ThreeSeaweed position={[1.5, -5, -1]} scale={3.0} swaySpeed={0.65} rotation={[0, 2, 0]} />

                {/* New Additions (#1 and #2) */}
                <ThreeSeaweed position={[-4, -4, 0.5]} scale={1.8} swaySpeed={1.1} rotation={[0, 0.2, 0]} />
                <ThreeSeaweed position={[4, -4.2, 0.5]} scale={2.4} swaySpeed={1.0} rotation={[0, 3.5, 0]} />

                {/* Hidden Fish behind right seaweed */}
                <SharkModel
                    position={[8, -4, -2]}
                    rotation={[-0, 0.5, 0]}
                    scale={0.8}
                />

            </Canvas>

            {/* Greenish gradient at bottom to blend roots */}
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-[#001a00] to-transparent pointer-events-none" />
        </div>
    );
}
