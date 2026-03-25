"use client";

import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export default function SharkModel({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 0.6
}: {
    position?: [number, number, number],
    rotation?: [number, number, number],
    scale?: number
}) {
    const group = useRef<THREE.Group>(null);
    const animRef = useRef<THREE.Group>(null); // Internal group for local animations
    const { scene, animations } = useGLTF("/models/lanternfish_lamp.glb");
    const { actions } = useAnimations(animations, group);
    const lightRef = useRef<THREE.PointLight>(null);
    const bulbRef = useRef<THREE.Mesh>(null);

    // Interaction state
    const [hovered, setHovered] = useState(false);

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

        // 1. Light Pulse Effect
        const pulse = (Math.sin(t * 3) + 1) * 5;
        if (lightRef.current) {
            lightRef.current.intensity = pulse;
        }
        if (bulbRef.current) {
            (bulbRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = pulse / 2;
        }

        // 2. Animation Logic (Swimming + Interaction)
        if (animRef.current) {
            // Idle Swim (Floating)
            // Bobbing up/down
            const bob = Math.sin(t * 1.5) * 0.1;
            // Gentle side-to-side swim rotation
            const swim = Math.sin(t * 1) * 0.05;

            // Hover Retreat Logic
            // Target Z: 0 (normal) vs -1.5 (scared/hiding back)
            // Note: moving in negative Z relative to the fish moves it "away" if rotated correcttly, 
            // or we might need to adjust axis depending on orientation.
            // Since fish faces X usually, we might need to move in Z or -X.
            // Let's assume retreating "backwards" is usually negative Z or negative X in local space.
            // Trial: move along Z (sideways for fish?) or X?
            // Original model faces +Z or +X? Often +Z. 
            // Let's try retreating along Z for now.
            const targetZ = hovered ? -2 : 0;

            // Lerp current position to target
            animRef.current.position.z += (targetZ - animRef.current.position.z) * 0.08;

            // Apply Idle + Lerp results
            animRef.current.position.y = bob;
            animRef.current.rotation.y = swim;
        }
    });

    return (
        <group ref={group} dispose={null} position={position} rotation={rotation}>
            {/* Stationary Hitbox for stable interaction */}
            <mesh
                /* Raycaster detects invisible meshes by default? No, usually needs visible=true OR specific raycaster config. Let's use transparent opacity=0 to be safe and clear. */
                onPointerEnter={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
                onPointerLeave={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
            >
                {/* Large trigger zone */}
                <sphereGeometry args={[2.5, 16, 16]} />
                <meshBasicMaterial transparent opacity={0} />
            </mesh>

            <group ref={animRef}>
                {/* Original model */}
                <primitive object={scene} scale={scale} rotation={[0, 0, 0]}>
                    <group position={[1, 1.5, -0]}>
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
        </group>
    );
}

// Preload the model
useGLTF.preload("/models/lanternfish_lamp.glb");
