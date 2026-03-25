"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ThreeSeaweedProps {
    position?: [number, number, number];
    scale?: number;
    rotation?: [number, number, number];
    swaySpeed?: number;
    swayIntensity?: number;
}

export default function ThreeSeaweed({
    position = [0, 0, 0],
    scale = 1,
    rotation = [0, 0, 0],
    swaySpeed = 1,
    swayIntensity = 0.1
}: ThreeSeaweedProps) {
    const { scene } = useGLTF("/models/claret_tall_seaweed.glb");
    // Clone the scene so we can have multiple independent instances
    const clone = scene.clone();

    const group = useRef<THREE.Group>(null);

    // Random starting phase for variety
    const randomPhase = useRef(Math.random() * 100);

    useFrame((state) => {
        if (!group.current) return;

        const t = state.clock.getElapsedTime();

        // Swaying animation: mostly rotation around Z (or X depending on model orientation)
        // We want a gentle underwater swaying motion
        const sway = Math.sin(t * swaySpeed + randomPhase.current) * swayIntensity;

        group.current.rotation.z = rotation[2] + sway;
        group.current.rotation.x = rotation[0] + sway * 0.5; // Add a little X sway too
    });

    return (
        <group ref={group} position={position} rotation={rotation} scale={scale}>
            <primitive object={clone} />
        </group>
    );
}

useGLTF.preload("/models/claret_tall_seaweed.glb");
