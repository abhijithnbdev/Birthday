"use client";

import React, { useEffect, useState } from "react";
import { Scene } from "@/hooks/useScene";

interface BackgroundProps {
  scene: Scene;
}

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
}

interface Star {
  id: number;
  left: number;
  top: number;
  delay: number;
}

// Gorgeous SVG flower component
const FlowerSVG = ({ className }: { className: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={`w-24 h-24 sm:w-28 sm:h-28 drop-shadow-lg ${className}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Petals */}
    <path
      d="M50 50 C40 25, 60 25, 50 50 C30 40, 30 60, 50 50 C60 75, 40 75, 50 50 C70 60, 70 40, 50 50 Z"
      fill="#ffb3c6"
    />
    <path
      d="M50 50 C45 30, 55 30, 50 50 C35 45, 35 55, 50 50 C55 70, 45 70, 50 50 C65 55, 65 45, 50 50 Z"
      fill="#ff8fab"
    />
    {/* Alternate angles petals */}
    <g transform="rotate(45, 50, 50)">
      <path
        d="M50 50 C40 25, 60 25, 50 50 C30 40, 30 60, 50 50 C60 75, 40 75, 50 50 C70 60, 70 40, 50 50 Z"
        fill="#ffc2d1"
      />
      <path
        d="M50 50 C45 30, 55 30, 50 50 C35 45, 35 55, 50 50 C55 70, 45 70, 50 50 C65 55, 65 45, 50 50 Z"
        fill="#ff5c7d"
      />
    </g>
    {/* Flower center */}
    <circle cx="50" cy="50" r="12" fill="#ffd700" stroke="#ffb703" strokeWidth="2" />
    <circle cx="48" cy="48" r="3" fill="#ffe066" />
  </svg>
);

export default function Background({ scene }: BackgroundProps) {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [stars, setStars] = useState<Star[]>([]);

  // Generate floating hearts/stars statically on mount
  useEffect(() => {
    const listHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 10,
      delay: Math.random() * 6,
    }));
    const listStars = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
    }));
    setHearts(listHearts);
    setStars(listStars);
  }, []);

  // Determine classes
  let bgClasses = "absolute inset-0 bg-animated-theme transition-all duration-1000 ";
  if (scene === "BIRTHDAY" || scene === "GIFT" || scene === "VIDEO") {
    bgClasses += "birthday-bg";
  }

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Background layer */}
      <div className={bgClasses} />
      <div className="glow-overlay" />

      {/* Persistent corner flowers for all pages, animating in on first mount */}
      <div className="absolute inset-0 -m-6 sm:-m-10 pointer-events-none z-10">
        <div className="absolute top-0 left-0 animate-flower-tl">
          <FlowerSVG className="animate-float-slow" />
        </div>
        <div className="absolute top-0 right-0 animate-flower-tr">
          <FlowerSVG className="animate-float-medium" />
        </div>
        <div className="absolute bottom-0 left-0 animate-flower-bl">
          <FlowerSVG className="animate-float-medium" />
        </div>
        <div className="absolute bottom-0 right-0 animate-flower-br">
          <FlowerSVG className="animate-float-slow" />
        </div>
      </div>

      {/* Floating Hearts for sweet scenes */}
      {(scene === "YES" || scene === "BIRTHDAY") &&
        hearts.map((h) => (
          <div
            key={h.id}
            className="heart-particle flex items-center justify-center"
            style={{
              left: `${h.left}%`,
              fontSize: `${h.size}px`,
              animationDelay: `${h.delay}s`,
            }}
          >
            ❤️
          </div>
        ))}

      {/* Twinkling Stars */}
      {(scene === "ONE" || scene === "BIRTHDAY" || scene === "YES") &&
        stars.map((s) => (
          <div
            key={s.id}
            className="star-particle"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
    </div>
  );
}
