"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Transactions App",
    desc: "Application complète de gestion de transactions avec interface moderne et logique métier optimisée.",
    tech: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
    github: "https://github.com/Neytoooo/transactions-app",
    preview: "https://transactions-app.vercel.app",
    vercel: true,
  },
  {
    title: "Portfolio Dynamique",
    desc: "Mon site personnel inspiré d'Itssharl, avec fond dynamique et transitions fluides.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    github: "https://github.com/Neytoooo/portfolio-dynamique",
    preview: "https://portfolio-dynamique-5nu4q67ah-mattis-projects-a36fa3f1.vercel.app",
    vercel: true,
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
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            className="block rounded-2xl p-6 bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
            <p className="text-white/70 text-sm mb-4">{p.desc}</p>

            <ul className="flex flex-wrap gap-2 text-xs text-cyan-300 mb-5">
              {p.tech.map((t) => (
                <li key={t} className="bg-cyan-900/40 px-2 py-1 rounded-md">
                  {t}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 text-sm">
              {p.github && (
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-white/80 hover:text-white transition"
                >
                  <Github size={16} /> Code
                </a>
              )}

              {p.preview && (
                <a
                  href={p.preview}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition"
                >
                  <ExternalLink size={16} /> Preview
                </a>
              )}
            </div>

            {p.vercel && (
              <p className="text-[11px] text-white/40 mt-4 italic">
                Déployé sur <span className="text-white/70">Vercel</span>
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
