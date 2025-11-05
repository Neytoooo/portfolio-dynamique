"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { ReactNode } from "react"; // ✅

type Social = {
  label: string;
  href: string;
  icon: ReactNode; // ✅ au lieu de JSX.Element
};

const socials: Social[] = [
  { label: "GitHub",   href: "https://github.com/Neytoooo",          icon: <Github size={16} /> },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mattis-kohen-538b10222", icon: <Linkedin size={16} /> },
];


export default function FloatingSocialBubble() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click / ESC
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 select-none"
      aria-live="polite"
    >
      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="mb-3 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.35)] p-3"
          >
            <div className="flex items-center gap-2 mb-2 text-xs uppercase tracking-wide text-white/60">
              <span>Mes réseaux</span>
            </div>
            <ul className="flex flex-col gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 px-3 py-2 transition"
                  >
                    <span className="opacity-80 group-hover:opacity-100">{s.icon}</span>
                    <span className="text-sm text-white/90 group-hover:text-white">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bubble button */}
      {/* Bubble button */}
<motion.button
  onClick={() => setOpen(v => !v)}
  aria-expanded={open}
  aria-label={open ? "Fermer les réseaux" : "Ouvrir les réseaux"}
  whileTap={{ scale: 0.97 }}
  className="relative grid h-20 w-20 place-items-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:bg-white/15 transition"
>

  {/* glow */}
  <motion.span
    aria-hidden
    className="absolute -inset-3 rounded-full bg-cyan-400/25 blur-xl"
    animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
    transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
  />
  {/* avatar */}
  <div className="relative h-16 w-16 overflow-hidden rounded-full ring-1 ring-white/20">
    <Image
      src="/images/avatar-3d2.png"
      alt="Avatar 3D"
      fill
      sizes="64px"
      className="object-cover"
      priority
    />
  </div>
</motion.button>

    </div>
  );
}
