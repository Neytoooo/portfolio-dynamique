"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Dynamique",
    desc: "Version moderne du site itssharl avec background animé et motion.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    link: "#",
  },
  {
    title: "App Dashboard",
    desc: "Dashboard full responsive avec chart interactif et thème clair/sombre.",
    tech: ["React", "Recharts", "Shadcn/UI"],
    link: "#",
  },
  {
    title: "Landing Page 3D",
    desc: "Expérience WebGL légère utilisant Three.js et React Three Fiber.",
    tech: ["Three.js", "React Three Fiber", "GSAP"],
    link: "#",
  },
];

export default function Works() {
  return (
    <section
      id="works"
      className="relative z-10 py-24 px-6 text-white max-w-5xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        Mes projets
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            whileHover={{ scale: 1.02 }}
            className="block rounded-2xl p-6 bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-white/70 text-sm mb-4">{p.desc}</p>
            <ul className="flex flex-wrap gap-2 text-xs text-cyan-300">
              {p.tech.map((t) => (
                <li key={t} className="bg-cyan-900/40 px-2 py-1 rounded-md">
                  {t}
                </li>
              ))}
            </ul>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
