"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Microlink screenshot helper + cache bust                           */
/* ------------------------------------------------------------------ */
const THUMB_BUST = "v7"; // Incrémenté pour rafraîchir

const withBust = (url: string) => {
  try {
    const u = new URL(url);
    u.searchParams.set("v", THUMB_BUST);
    return u.toString();
  } catch {
    return url + (url.includes("?") ? "&" : "?") + "v=" + THUMB_BUST;
  }
};

const thumb = (url: string) =>
  `https://api.microlink.io/?url=${encodeURIComponent(
    withBust(url)
  )}&screenshot=true&meta=false&embed=screenshot.url&screenshot.waitFor=2500&screenshot.device=desktop&colorScheme=dark`;

const safeHref = (url?: string) => (url && url !== "#" ? url : "/404");

/* ------------------------------------------------------------------ */
/* Données projets                                                    */
/* ------------------------------------------------------------------ */
const projects = [
  {
    title: "Sponsio",
    desc: "Infrastructure Ad-Tech SaaS permettant aux créateurs d'automatiser la vente et la gestion de leurs espaces publicitaires (Widget intelligent, Stripe, Cloudinary).",
    tech: ["Next.js 15", "Supabase", "Prisma", "Stripe", "Cloudinary", "Tailwind"],
    github: "",
    preview: "https://sloty-app.vercel.app",
    vercel: true,
    status: "En ligne V1, et building V2",
  },
  {
    title: "Transactions App",
    desc: "Application de gestion de transactions (UI moderne, logique métier optimisée).",
    tech: ["Next.js", "TypeScript", "Tailwind", "MongoDB"],
    github: "https://github.com/Neytoooo/transactions-app",
    preview: "https://transactions-app-three.vercel.app",
    vercel: true,
    status: "online",
  },
  {
    title: "BTP Landing",
    desc: "Landing page professionnelle pour les entreprises du BTP, design moderne, animations fluides et structure responsive.",
    tech: ["Next.js", "TailwindCSS", "Framer Motion"],
    github: "https://github.com/Neytoooo/btp-landing",
    preview: "https://btp-landing.vercel.app/?v=v6",
    vercel: true,
    status: "online",
  },
  {
    title: "Portfolio",
    desc: "Mon site perso avec fond dynamique + transitions fluides.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
    github: "https://github.com/Neytoooo/portfolio-dynamique",
    preview: "https://portfolio-dynamique.vercel.app/",
    vercel: true,
    status: "online",
  },
  {
    title: "Projet #5 — À venir",
    desc: "Prochain projet en préparation… reste à l’affût !",
    tech: [] as string[],
    github: "",
    preview: "",
    vercel: false,
    status: "building",
  },
];

/* ------------------------------------------------------------------ */
/* Composant                                                          */
/* ------------------------------------------------------------------ */
export default function Works() {
  return (
    <section id="works" className="relative z-10 py-24 px-6 text-white max-w-5xl mx-auto">
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
            whileHover={{ scale: 1.01 }}
            className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:bg-white/10 transition relative"
          >
            {/* --- Bandeau status --- */}
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-9 bg-black/30 backdrop-blur-sm flex justify-end items-center px-3 rounded-t-md z-10">
                {p.status === "online" ? (
                  <span className="bg-green-500/20 text-green-300 text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm border border-green-500/30">
                    ● En ligne
                  </span>
                ) : p.status === "En ligne V1, et building V2" ? (
                  <span className="bg-blue-500/20 text-blue-300 text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm border border-blue-500/30">
                    ● V1 En ligne | 🚧 V2
                  </span>
                ) : (
                  <span className="bg-yellow-500/20 text-yellow-300 text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm border border-yellow-500/30">
                    🚧 Building
                  </span>
                )}
              </div>

              {/* --- Capture Microlink --- */}
              {p.preview || p.github ? (
                <a
                  href={(p.preview || p.github) || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={thumb((p.preview || p.github) || "#")}
                    alt={`Preview ${p.title}`}
                    className="w-full aspect-[16/9] object-cover rounded-t-md"
                    loading="lazy"
                  />
                </a>
              ) : (
                <div className="w-full aspect-[16/9] flex items-center justify-center bg-white/5 text-white/40 text-sm rounded-t-md">
                  Bientôt disponible
                </div>
              )}
            </div>

            {/* --- Infos --- */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-white/70 text-sm mb-4">{p.desc}</p>

              {p.tech.length > 0 && (
                <ul className="flex flex-wrap gap-2 text-xs text-cyan-300 mb-5">
                  {p.tech.map((t) => (
                    <li key={t} className="bg-cyan-900/40 px-2 py-1 rounded-md">
                      {t}
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center gap-4 text-sm">
                {p.github && (
                  <a
                    href={safeHref(p.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-white/80 hover:text-white transition"
                  >
                    <Github size={16} /> Code
                  </a>
                )}
                {p.preview && (
                  <a
                    href={safeHref(p.preview)}
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
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}