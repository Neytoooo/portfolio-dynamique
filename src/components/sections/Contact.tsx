"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative z-10 py-28 text-center px-6 text-white/90"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-6"
      >
        Me contacter
      </motion.h2>

      <p className="text-white/60 mb-8">
        Tu veux collaborer ou me confier un projet ? Envoie-moi un message.
      </p>

      <motion.a
        href="mailto:mattiskhn@gmail.com"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block bg-cyan-500 hover:bg-cyan-400 text-black font-medium px-8 py-3 rounded-full transition"
      >
        mattiskhn@gmail.com
      </motion.a>

      <p className="mt-10 text-sm text-white/40">
        © {new Date().getFullYear()} Henri “Neyto” — Tous droits réservés
      </p>
    </section>
  );
}
