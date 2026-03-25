"use client";

import { useEffect, useState } from "react";
import { MotionValue } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

interface ShootingStar {
  id: number;
  top: number;
  left: number;
  delay: number;
}

export default function StarField({ pScrollYProgress }: { pScrollYProgress?: MotionValue<number> }) {
  const [stars, setStars] = useState<Star[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    // 1. Static/Twinkling Stars
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // %
      y: Math.random() * 60,  // % (Only top 60% of screen/container)
      size: Math.random() * 2 + 1, // 1px to 3px
      opacity: Math.random() * 0.5 + 0.3,
      duration: Math.random() * 3 + 2, // Twinkle duration
      delay: Math.random() * 2,
    }));
    setStars(newStars);

    // 2. Shooting Stars (Meteor Shower)
    const newShootingStars = Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      top: Math.random() * 40, // Top 40%
      left: Math.random() * 90, // Varied horizontal start
      delay: Math.random() * 10 + 2, // Random delay between 2s and 12s
    }));
    setShootingStars(newShootingStars);

  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Render Static Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite ${star.delay}s`,
          }}
        />
      ))}

      {/* Render Shooting Stars */}
      {shootingStars.map((s) => (
        <div
          key={`shoot-${s.id}`}
          className="absolute bg-white"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: "150px", // Length of tail
            height: "1px",
            background: "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,1) 50%, rgba(255,255,255,0))",
            transform: "rotate(-45deg)",
            opacity: 0,
            animation: `shoot 4s linear infinite ${s.delay}s`,
          }}
        />
      ))}

      {/* CSS Animations */}
      <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 5px white; }
          }

          @keyframes shoot {
            0% {
              transform: translateX(0) translateY(0) rotate(-45deg);
              opacity: 1;
            }
            10% {
              opacity: 1;
            }
            20% {
                /* Travel distance */
              transform: translateX(-300px) translateY(300px) rotate(-45deg);
              opacity: 0;
            }
            100% {
              transform: translateX(-300px) translateY(300px) rotate(-45deg);
              opacity: 0;
            }
          }
        `}</style>
    </div>
  );
}
