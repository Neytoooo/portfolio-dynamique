"use client";

import { motion } from "framer-motion";
import { Mail, Calendar, Download, ArrowRight } from "lucide-react";

export default function Contact() {
  const email = "mattiskhn@gmail.com";
  const cv = "/cv/Mattis_Kohen_CV_2025.pdf";
  const calendar = "mailto:mattiskhn@gmail.com?subject=Proposer%20une%20rencontre";

  return (
    <section id="contact" className="relative z-10 py-28 px-6 text-white">
      {/* Aura douce derrière le bloc */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="mx-auto h-64 w-64 rounded-full bg-cyan-500/20 blur-3xl opacity-40" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
      >
        {/* Titre */}
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Me contacter
          </h2>
          <div className="mx-auto mt-2 h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70" />
        </div>

        {/* Badge + pitch */}
        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-300 text-xs font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Disponible en alternance — rythme 1 sem. école / 3 sem. entreprise
          </span>

          <p className="max-w-2xl text-white/70 leading-relaxed">
            Vous cherchez un développeur <span className="text-white">Full Stack</span> motivé,
            sérieux sur la qualité et à l’aise sur l’UI moderne ? Parlons-en :
            je veux apporter de la valeur rapidement tout en continuant de progresser au contact de votre équipe.
          </p>
        </div>

        {/* CTA principaux */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-6 py-3 font-medium text-black hover:bg-cyan-400 transition"
          >
            <Mail size={18} /> Me contacter
          </a>
          <a
            href={`mailto:${email}?subject=Proposition%20d'alternance&body=Bonjour%20Mattis,%0A%0AJe%20souhaite%20échanger%20au%20sujet%20d'une%20alternance...`}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white/90 hover:bg-white/15 transition"
          >
            Proposer une alternance <ArrowRight size={18} />
          </a>
        </div>

        {/* Liens secondaires */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <a
            href={cv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 hover:bg-white/10 transition"
          >
            <Download size={16} /> Voir mon CV
          </a>
          <a
            href={calendar}
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 hover:bg-white/10 transition"
          >
            <Calendar size={16} /> Demander un créneau
          </a>
        </div>

        {/* Footer mini */}
        <p className="mt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Mattis Kohen — Tous droits réservés
        </p>
      </motion.div>
    </section>
  );
}
