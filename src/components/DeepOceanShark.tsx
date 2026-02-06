
"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import ThreeShark from "@/components/ThreeShark";

export default function DeepOceanShark() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Animation Trigger range
    // Shark swims when we are in the last 30% of the page (Skills section)
    // X translation: Moves from Right (100vw) to Left (-100vw) based on scroll
    // OR: continuously swims if we are deep?
    // Let's make it scroll-driven for precise control ("passing through").
    // Map scroll [0.6, 1.0] -> x: [120%, -120%]

    // Smooth scroll for "floating" feel instead of jerky direct mapping
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const sharkX = useTransform(smoothScroll, [0.65, 0.95], ["120vw", "-120vw"]);
    const sharkOpacity = useTransform(smoothScroll, [0.6, 0.7, 0.9, 1], [0, 1, 1, 0]);

    return (
        <div
            ref={containerRef}
            // Restore: Deep bottom swim
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-end justify-center pointer-events-none"
        >
            <motion.div
                style={{
                    x: sharkX, // RESTORED: Swimming
                    opacity: sharkOpacity,
                    scale: 1
                }}
                className="relative w-[750px] h-[750px] translate-y-[10%]"
            >
                <ThreeShark />
            </motion.div>
        </div>
    );
}

