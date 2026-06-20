"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  const pdf = "/cv/Mattis_kohen_cv_2026.pdf";
  const esgiLogo = "/images/101_logo.png";

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] text-center px-6">
      {/* Logo ESGI animé */}
      <div className="absolute top-6 right-6 z-20">
        <motion.a
          href="https://www.esgi.fr/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
          whileHover={{ scale: 1.05, rotate: 1 }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.div
            aria-hidden
            className="absolute -inset-4 rounded-xl bg-cyan-500/35 blur-xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img
              src={esgiLogo}
              alt="Logo ESGI"
              width={90}
              height={90}
              className="rounded-md drop-shadow-lg opacity-90 hover:opacity-100 transition"
            />
          </motion.div>
        </motion.a>
      </div>

      {/* --- Animation du titre --- */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-7xl font-bold tracking-tight text-white"
      >
        <TypeAnimation
  sequence={[
    "Hello ! 👋",
    3500,
    "Bienvenue ! 👨‍💻",
    3500,
    "Enchanté ! 😄",
    3500,
  ]}
  speed={15}           // vitesse d’écriture (plus bas = plus lent)
  deletionSpeed={20}   // vitesse d’effacement
  repeat={Infinity}
/>

        <span className="text-cyan-400"> “Mattis”</span>
      </motion.h1>

      {/* --- Pitch --- */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-4 max-w-2xl text-lg text-white/70 leading-relaxed"
      >
        Étudiant à l’<span className="text-white font-medium">ESGI</span>, je suis actuellement à la recherche
        d’une <span className="text-cyan-400 font-medium">alternance en développement Full Stack</span>.
        Passionné par la création d’expériences web modernes, je conçois des interfaces fluides,
        des animations dynamiques et des architectures performantes.
        <br className="hidden md:block" />
        Mon rythme : <span className="text-white font-medium">1 semaine en formation / 3 semaines en entreprise</span>.
      </motion.p>

      {/* --- Boutons --- */}
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
