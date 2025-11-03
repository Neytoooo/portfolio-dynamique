"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#home", label: "Accueil" },
  { href: "#works", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const sections = ["home", "works", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );

    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", href);
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <nav className="backdrop-blur bg-white/10 border border-white/15 rounded-full px-4 py-2 flex gap-2">
        {LINKS.map((l) => {
          const isActive = active === l.href;
          return (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => onClick(e, l.href)}
              className={`px-3 py-1.5 rounded-full text-sm transition
                ${isActive ? "bg-white text-black" : "text-white/80 hover:text-white"}
              `}
            >
              {l.label}
            </a>
          );
        })}
      </nav>
    </header>
  );
}
