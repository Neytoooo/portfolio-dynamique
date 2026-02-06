
import DynamicBackground from "@/components/DynamicBackground";
import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Works from "@/components/sections/Works";
import Contact from "@/components/sections/Contact";
import DeepOceanShark from "@/components/DeepOceanShark";
import FloatingSocialBubble from "@/components/FloatingSocialBubble";

export default function Page() {
  return (
    <main className="relative min-h-[100svh] text-white">
      <DynamicBackground />
      <DeepOceanShark />
      <FloatingSocialBubble />
      <Hero />
      <Works />
      <Skills />
      <Contact />
    </main>
  );
}
