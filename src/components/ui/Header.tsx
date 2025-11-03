"use client";

import { useEffect, useState } from "react";

const links = [
  { name: "Accueil", href: "#hero" },
  { name: "Projets", href: "#works" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled ? "backdrop-blur-md bg-black/40 py-2" : "py-4"
      }`}
    >
      <nav className="flex justify-between items-center px-6 md:px-10 text-white/90">
        <span className="font-bold tracking-wide text-lg">
          Neyto<span className="text-cyan-400">.</span>
        </span>
        <ul className="flex gap-6 text-sm">
          {links.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                className="hover:text-cyan-400 transition-colors duration-200"
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
