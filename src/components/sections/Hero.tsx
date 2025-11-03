"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
  const pdf = "/cv/Mattis_Kohen_CV_2025.pdf";
  const esgiLogo = "/images/101_logo.png";

  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX);
    y.set(offsetY);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative z-10 flex flex-col items-center justify-center min-h-[100svh] text-center px-6">
      {/* Logo ESGI avec glow et légère inclinaison */}
      <div className="absolute top-6 right-6 z-20">
        <motion.div
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="relative w-[90px] h-[90px]"
        >
          {/* Glow animé */}
          <motion.div
            aria-hidden
            className="absolute -inset-4 rounded-xl bg-cyan-500/35 blur-xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Logo flottant */}
          <motion.div
            animate={{ y: [0, -1.5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid place-items-center"
          >
            <a
              href="https://www.esgi.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Image
                src={esgiLogo}
                alt="Logo ESGI"
                width={90}
                height={90}
                className="rounded-md drop-shadow-lg opacity-90 hover:opacity-100 transition"
                priority
              />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Titre */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl md:text-7xl font-bold tracking-tight text-white"
      >
        Hello ! <span className="text-cyan-400">“Mattis”</span>
      </motion.h1>

      {/* Pitch */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="mt-4 max-w-2xl text-lg text-white/70 leading-relaxed"
      >
        Étudiant à l’<span className="text-white font-medium">ESGI</span>, je suis actuellement à la recherche
        d’une <span className="text-cyan-400 font-medium">alternance en développement Full Stack</span>.
        Passionné par la création d’expériences web modernes, je conçois des interfaces fluides,
        des animations dynamiques et des architectures robustes, en alliant performance et design.
        <br className="hidden md:block" />
        Mon rythme : <span className="text-white font-medium">1 semaine en formation / 3 semaines en entreprise</span>.
      </motion.p>

      {/* Boutons */}
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
