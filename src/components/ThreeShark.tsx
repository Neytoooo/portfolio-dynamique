"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

// --- OLD MODEL (Lanternfish Lamp 1) ---
// Kept for backup/reference
function SharkModel() {
    const group = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF("/models/lanternfish_lamp.glb");
    const { actions } = useAnimations(animations, group);
    const lightRef = useRef<THREE.PointLight>(null);
    const bulbRef = useRef<THREE.Mesh>(null);

    useEffect(() => {
        if (actions) {
            const actionNames = Object.keys(actions);
            if (actionNames.length > 0) {
                actions[actionNames[0]]?.reset().fadeIn(0.5).play();
            }
        }
    }, [actions, scene]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        // Pulse Effect
        const pulse = (Math.sin(t * 3) + 1) * 5;

        if (lightRef.current) {
            lightRef.current.intensity = pulse;
        }
        if (bulbRef.current) {
            (bulbRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse / 2;
        }
    });

    return (
        <group ref={group} dispose={null}>
            {/* Original rotation for side view */}
            <primitive object={scene} scale={0.6} rotation={[0, 0, 0]}>
                {/* 
                    Original Light Position 
                    [0, 1.9, 0.0] was the last good one for this model? 
                    Let's check the logs/comments... 
                    "ADJUSTED POSITION: [0, 1.9, 0.0]" was successful for Fish 1.
                */}
                <group position={[1, 1.8, 0.6]}>
                    <mesh ref={bulbRef}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial
                            color="#ffff00"
                            emissive="#ffff00"
                            emissiveIntensity={2}
                            toneMapped={false}
                        />
                    </mesh>

                    <pointLight
                        ref={lightRef}
                        intensity={10}
                        distance={10}
                        color="#ffff00"
                        castShadow
                    />
                </group>
            </primitive>
        </group>
    );
}

// Preload the model
useGLTF.preload("/models/lanternfish_lamp.glb");

export default function ThreeShark() {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                {/* Cinematic Deep Sea Lighting */}
                <ambientLight intensity={0.6} color="#0f172a" />
                <directionalLight position={[5, 10, 5]} intensity={1.5} color="#38bdf8" />
                <spotLight position={[-10, 0, 5]} intensity={2} color="#22d3ee" angle={0.5} penumbra={1} />

                {/* Restore side rotation for the container if needed, or keep 0 if model handles it */}
                {/* Fish 1 needed -Math.PI/2 to look sideways? Original code had it. */}
                <group rotation={[0, -Math.PI / 2, 0]}>
                    <SharkModel />
                </group>
            </Canvas>
        </div>
    );
}
