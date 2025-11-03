import DynamicBackground from "@/components/DynamicBackground";

export default function Page() {
  return (
    <main className="relative min-h-[100svh] text-white">
      <DynamicBackground />
      <section className="relative z-10 grid place-items-center min-h-[100svh] px-6">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold">Henri — Portfolio</h1>
          <p className="mt-4 text-base/7 text-white/80">
            Freelance dev — UI dynamique façon itssharl, mais avec mes propres formes.
          </p>
        </div>
      </section>
    </main>
  );
}
