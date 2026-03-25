
"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import ThreeShark from "@/components/ThreeShark";

export default function DeepOceanShark() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll();

    // Animation Trigger range
    // Shark swims more slowly across the whole page depth
    // Map scroll [0.2, 1.0] -> x: [120%, -120%]
    // This reduces speed by expanding the time (scroll distance) it takes to cross

    // Smooth scroll for "floating" feel instead of jerky direct mapping
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const sharkX = useTransform(smoothScroll, [0.70, 1], ["120vw", "-120vw"]);
    const sharkOpacity = useTransform(smoothScroll, [0.45, 0.6, 0.9, 1], [0, 1, 1, 0]);

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
                className="relative w-[750px] h-[750px] translate-y-[0%]"
            >
                <ThreeShark />
            </motion.div>
        </div>
    );
}

