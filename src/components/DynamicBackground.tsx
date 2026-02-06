"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Shape = {
  size: number;
  depth: number;   // 0..1 parallax
  rotate: number;
  opacity: number;
  blur: number;
  borderRadius: string; // ex: "45% 55% 60% 40% / 55% 45% 40% 60%"
  gradient: [string, string];
  mixBlend: "screen" | "overlay" | "soft-light";
};

/* ... SHAPES array remains unchanged ... */
const SHAPES: Shape[] = [
  {
    size: 420,
    depth: 0.12,
    rotate: 15,
    opacity: 0.28,
    blur: 20,
    borderRadius: "42% 58% 63% 37% / 45% 40% 60% 55%",
    gradient: ["#7c3aed", "#22d3ee"],
    mixBlend: "screen",
  },
  {
    size: 520,
    depth: 0.2,
    rotate: -8,
    opacity: 0.22,
    blur: 24,
    borderRadius: "60% 40% 45% 55% / 40% 60% 55% 45%",
    gradient: ["#06b6d4", "#16a34a"],
    mixBlend: "overlay",
  },
  {
    size: 360,
    depth: 0.35,
    rotate: 32,
    opacity: 0.25,
    blur: 18,
    borderRadius: "55% 45% 60% 40% / 60% 40% 45% 55%",
    gradient: ["#f59e0b", "#ef4444"],
    mixBlend: "screen",
  },
  {
    size: 680,
    depth: 0.08,
    rotate: -22,
    opacity: 0.18,
    blur: 30,
    borderRadius: "48% 52% 58% 42% / 50% 50% 42% 58%",
    gradient: ["#a78bfa", "#f472b6"],
    mixBlend: "soft-light",
  },
];

export default function DynamicBackground() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  // Map scroll progress to darkness opacity.
  // 0% scroll (top) -> 0 opacity (normal colors)
  // 50% scroll -> 0.4 opacity
  // 100% scroll (bottom/skills) -> 0.98 opacity (Almost fully black/Abyss)
  const darknessOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.4, 0.98]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = 0, y = 0;
    let tx = 0, ty = 0;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      // normalisés -1..1
      tx = Math.max(-1, Math.min(1, (e.clientX - cx) / (r.width / 2)));
      ty = Math.max(-1, Math.min(1, (e.clientY - cy) / (r.height / 2)));
    };

    const onLeave = () => {
      tx = 0; ty = 0;
    };

    const tick = () => {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      el.style.setProperty("--mx", String(x));
      el.style.setProperty("--my", String(y));
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    let raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 overflow-hidden bg-black"
      // fallback si pas de JS: dégradé neutre
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 50%, rgba(30,30,30,.9), rgba(0,0,0,1))",
      }}
    >
      {/* centre de la scène */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {SHAPES.map((s, i) => (
          <span
            key={i}
            className="absolute will-change-transform"
            style={{
              width: s.size,
              height: s.size,
              left: -s.size / 2,
              top: -s.size / 2,
              borderRadius: s.borderRadius,
              filter: `blur(${s.blur}px)`,
              opacity: s.opacity,
              mixBlendMode: s.mixBlend,
              background: `conic-gradient(from ${s.rotate}deg, ${s.gradient[0]}, ${s.gradient[1]})`,
              transform: `translate3d(calc(var(--mx,0) * ${s.depth * 40}px), calc(var(--my,0) * ${s.depth * 40}px), 0) rotate(${s.rotate}deg)`,
              transition: "transform 40ms linear",
            }}
          />
        ))}
      </div>

      {/* DEEP OCEAN OVERLAY: Renders ON TOP of shapes to dim them */}
      <motion.div
        className="absolute inset-0 z-10 bg-[#020617] pointer-events-none"
        style={{ opacity: darknessOpacity }}
      />

      {/* overlay grain subtil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] mix-blend-soft-light z-20"
        style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.8'/></svg>\")" }} />
    </div>
  );
}
