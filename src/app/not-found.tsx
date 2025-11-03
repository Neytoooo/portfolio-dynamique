import Link from "next/link";
import DynamicBackground from "@/components/DynamicBackground";

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] text-white">
      {/* Fond dynamique de ton site */}
      <DynamicBackground />

      {/* Contenu centré */}
      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-xl items-center justify-center px-6">
        <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
          <div className="mb-4 text-sm tracking-wider text-white/60">Erreur 404</div>
          <h1 className="text-3xl font-bold">Page introuvable</h1>
          <p className="mt-3 text-white/70">
            Le contenu que vous cherchez n’existe pas (encore) ou a été déplacé.
          </p>

          {/* CTAs alignés comme sur le site */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-lg border border-white/15 bg-white/10 px-4 py-2 hover:bg-white/15 transition"
            >
              ← Retour à l’accueil
            </Link>
            <Link
              href="/#works"
              className="rounded-lg bg-cyan-500/20 px-4 py-2 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/25 transition"
            >
              Voir mes projets
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
