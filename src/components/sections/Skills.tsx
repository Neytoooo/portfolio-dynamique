"use client";

import { motion, useScroll, useSpring, useTransform, useVelocity, MotionValue } from "framer-motion";
import Image from "next/image";
import React, { useRef } from "react";

/* ------------------------------------------------------------------ */
/* CONFIG                                                             */
/* ------------------------------------------------------------------ */
type Skill = {
    name: string;
    brandColor: string; // Hex color for the shadow/glow
    imageSrc: string;
};

const SKILLS: Skill[] = [
    // --- Frontend ---
    {
        name: "React",
        brandColor: "#61DAFB",
        imageSrc: "/images/React_(web_framework)-Logo.wine.png"
    },
    {
        name: "Next.js",
        brandColor: "#000000",
        imageSrc: "/images/next_js_logo_icon_145038.png"
    },
    {
        name: "TypeScript",
        brandColor: "#3178C6",
        imageSrc: "/images/typescript-def.png"
    },
    {
        name: "Tailwind",
        brandColor: "#38BDF8",
        imageSrc: "/images/tailwind-css-logo.png"
    },
    {
        name: "HTML5",
        brandColor: "#E34F26",
        imageSrc: "/images/HTML5_logo_and_wordmark.svg.png"
    },
    {
        name: "CSS3",
        brandColor: "#1572B6",
        imageSrc: "/images/CSS3_logo_and_wordmark.svg.png"
    },

    // --- Backend ---
    {
        name: "Node.js",
        brandColor: "#339933",
        imageSrc: "/images/node-js-logo-png_seeklogo-269242.png"
    },
    {
        name: "Supabase",
        brandColor: "#3ECF8E",
        imageSrc: "/images/supabase.png"
    },
    {
        name: "Python",
        brandColor: "#3776AB",
        imageSrc: "/images/Python-logo.png"
    },
    {
        name: "PostgreSQL",
        brandColor: "#336791",
        imageSrc: "/images/PostgreSQL-Logo.wine.png"
    },
    {
        name: "PHP",
        brandColor: "#777BB4",
        imageSrc: "/images/pngimg.com - php_PNG26.png"
    },
    {
        name: "Symfony",
        brandColor: "#000000",
        imageSrc: "/images/symfony_black_03.png"
    },
    {
        name: "Laravel",
        brandColor: "#FF2D20",
        imageSrc: "/images/Laravel-Logo.wine.png"
    },
    {
        name: "MySQL",
        brandColor: "#4479A1",
        imageSrc: "/images/MySQL-Logo.wine.png"
    },
    {
        name: "MariaDB",
        brandColor: "#C0765A",
        imageSrc: "/images/mariadb-logo-black-and-white.png"
    },

    // --- Outils ---
    {
        name: "Docker",
        brandColor: "#2496ED",
        imageSrc: "/images/docker-logo-png-transparent.png"
    },
    {
        name: "Git",
        brandColor: "#F05032",
        imageSrc: "/images/Git-Icon-1788C.png"
    },
    {
        name: "GitHub",
        brandColor: "#181717",
        imageSrc: "/images/25231.png"
    },
    {
        name: "Vercel",
        brandColor: "#000000",
        imageSrc: "/images/Vercel-Emblem.png"
    },
];

/* ------------------------------------------------------------------ */
/* SKILL BUBBLE COMPONENT                                             */
/* ------------------------------------------------------------------ */
function SkillBubble({
    skill,
    delay = 0,
}: {
    skill: Skill;
    delay?: number;
}) {
    // Brand glow for the external shadow
    const shadowStyle = {
        "--skill-glow": `${skill.brandColor}aa`,   // ~66% opacity for strong glow on hover
        "--skill-tint": `${skill.brandColor}20`,   // Very subtle tint inside
    } as React.CSSProperties;

    // Floating animation config (randomized slightly by passed delay/index)
    // We use the delay to offset the start so they don't all move in sync.
    const floatDuration = 4 + (delay % 3); // 4-7s

    return (
        <motion.div
            className="group relative"
            style={shadowStyle}
            // Floating Animation
            animate={{
                y: [-8, 8, -8], // Move up and down
            }}
            transition={{
                duration: floatDuration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
                delay: delay * 0.2, // Stagger effect
            }}
        >
            <div
                className={`
          relative flex h-24 w-24 items-center justify-center 
          
          /* GLASS BUBBLE BASE */
          bg-white/5
          backdrop-blur-[1px]
          border border-white/20
          
          /* 3D VOLUME (Inner Shadows) */
          /* 1. Top-left light (inset) */
          /* 2. Bottom-right shadow (inset) */
          /* 3. Subtle rim light */
          shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.2),_inset_5px_5px_15px_rgba(255,255,255,0.4),_inset_0px_0px_4px_rgba(255,255,255,0.6)]
          
          transition-all duration-500 ease-out
          
          rounded-full 
          
          /* HOVER EFFECTS */
          group-hover:-translate-y-4
          /* On hover: Strong colored glow OUTSIDE + bit more light INSIDE */
          group-hover:shadow-[0_15px_35px_var(--skill-glow),_inset_-5px_-5px_20px_rgba(0,0,0,0.1),_inset_5px_5px_20px_rgba(255,255,255,0.6)]
          group-hover:border-white/40
        `}
            >
                {/* SPECULAR HIGHLIGHT (The shiny reflection) */}
                {/* Main reflection (top-left) */}
                <div className="absolute top-[12%] left-[15%] h-[25%] w-[45%] rotate-[-45deg] rounded-[100%] bg-gradient-to-b from-white to-transparent opacity-80 pointer-events-none filter blur-[1px] z-20" />

                {/* Secondary small reflection (bottom-right) */}
                <div className="absolute bottom-[15%] right-[15%] h-[10%] w-[10%] rounded-full bg-white/40 blur-[2px] pointer-events-none z-20" />

                {/* IMAGE */}
                <div className="relative h-14 w-14 transition-all duration-300 group-hover:scale-110 z-10 opacity-90 group-hover:opacity-100">
                    <Image
                        src={skill.imageSrc}
                        alt={skill.name}
                        fill
                        className="object-contain drop-shadow-sm"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                </div>
            </div>

            {/* Tooltip */}
            <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 opacity-0 transition-all duration-500 group-hover:bottom-[-2.5rem] group-hover:opacity-100 pointer-events-none z-30">
                <span
                    className="text-sm font-semibold tracking-wide text-white px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 whitespace-nowrap shadow-xl"
                    style={{ textShadow: `0 0 10px ${skill.brandColor}` }}
                >
                    {skill.name}
                </span>
            </div>
        </motion.div>
    );
}

/* ------------------------------------------------------------------ */
/* MAIN SECTION COMPONENT                                             */
/* ------------------------------------------------------------------ */
export default function Skills() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);

    // Smooth out the velocity for inertia
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 30, // Lower damping for more "swing"
        stiffness: 200
    });

    // Calculate INERTIA (vertical shift) based on velocity
    // Scroll Down (Positive Vel) -> Shift Bubbles DOWN (Positive Y) to create "Heavy/Falling" feel?
    // Or Shift UP to create "Lag"?
    // "Elevator falling": You float UP relative to elevator.
    // So if content drops (Scroll Up -> Vel Negative), you float UP?
    // Let's try mapping velocity directly to Y.
    // Range: +/- 100px max shift.

    const inertiaY = useTransform(smoothVelocity, [-2000, 2000], [-100, 100]);

    return (
        <section ref={containerRef} className="relative z-10 py-24 px-6 text-white max-w-6xl mx-auto">


            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-3xl md:text-4xl font-bold text-center mb-16 relative z-10"
            >
                Mes compétences
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full perspective-[1000px] relative z-10">
                {SKILLS.map((skill, idx) => (
                    <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05, duration: 0.3, type: "spring" }}
                        style={{
                            y: inertiaY // Apply inertia translation here
                        }}
                    >
                        <SkillBubble skill={skill} delay={idx} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
