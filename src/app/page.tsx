import DynamicBackground from "@/components/DynamicBackground";
import Header from "@/components/ui/Header";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative min-h-[100svh] text-white scroll-smooth">
      <DynamicBackground />
      <Header />
      <div id="hero">
        <Hero />
      </div>
      <Works />
      <Contact />
    </main>
  );
}
