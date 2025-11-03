import DynamicBackground from "@/components/DynamicBackground";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";
import Header from "@/components/Header";

export default function Page() {
  return (
    <main className="relative min-h-[100svh] text-white">
      <DynamicBackground />
      <Header />
      {/* id=home pour l’ancre */}
      <div id="home">
        <Hero />
      </div>
      <Works />
      <Contact />
    </main>
  );
}
