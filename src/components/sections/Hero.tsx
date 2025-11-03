"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const pdf = "/cv/Mattis_Kohen_CV_2025.pdf";

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-7xl font-bold tracking-tight text-white"
      >
        Hello ! <span className="text-cyan-400">“Mattis”</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-4 max-w-xl text-lg text-white/70"
      >
        Développeur freelance passionné par les interfaces fluides,
        les animations web et le design réactif.
      </motion.p>

      {/* --- Les boutons --- */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href="#works"
          className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-6 py-3 rounded-full transition"
        >
          Voir mes projets ↓
        </a>

        <a
          href={pdf}
          download
          className="inline-block border border-white/30 hover:border-white/60 text-white/80 px-6 py-3 rounded-full transition"
        >
          Télécharger CV
        </a>

        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black px-6 py-3 rounded-full transition"
        >
          Visionner CV
        </a>
      </div>
    </section>
  );
}
