import DynamicBackground from "@/components/DynamicBackground";
import Hero from "@/components/sections/Hero";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <main className="relative min-h-[100svh] text-white">
      <DynamicBackground />
      <Hero />
      <Works />
      <Contact />
    </main>
  );
}
