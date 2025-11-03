"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] text-center px-6">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-7xl font-bold tracking-tight text-white"
      >
        Henri <span className="text-cyan-400">“Neyto”</span>
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

      <motion.a
        href="#works"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-6 py-3 rounded-full transition"
      >
        Voir mes projets ↓
      </motion.a>
    </section>
  );
}
