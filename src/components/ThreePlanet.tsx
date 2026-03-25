"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ThreePlanetProps {
    path: string;
    position?: [number, number, number];
    scale?: number;
    rotationSpeed?: number;
}

export default function ThreePlanet({
    path,
    position = [0, 0, 0],
    scale = 1,
    rotationSpeed = 0.005
}: ThreePlanetProps) {
    const group = useRef<THREE.Group>(null);
    const { scene } = useGLTF(path);

    useFrame((state, delta) => {
        if (group.current) {
            group.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <group ref={group} position={position} scale={scale}>
            <primitive object={scene} />
        </group>
    );
}
