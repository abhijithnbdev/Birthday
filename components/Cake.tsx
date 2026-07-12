"use client";

import React, { useState, useEffect } from "react";
import { useAudio } from "@/hooks/useAudio";

interface SprinkleData {
  id: number;
  left: number;
  top: number;
  color: string;
  rotate: number;
}

const CandleTwo = () => (
  <svg
    viewBox="0 0 40 60"
    className="candle-digit-svg w-8 h-12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 10 18 C 10 6, 30 6, 30 18 C 30 28, 10 40, 10 50 L 30 50"
      fill="none"
      stroke="url(#candleGrad2)"
      strokeWidth="6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="candleGrad2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#db2777" />
      </linearGradient>
    </defs>
  </svg>
);

const CandleZero = () => (
  <svg
    viewBox="0 0 40 60"
    className="candle-digit-svg w-8 h-12"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="8"
      y="10"
      width="24"
      height="40"
      rx="12"
      fill="none"
      stroke="url(#candleGrad0)"
      strokeWidth="6"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="candleGrad0" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#a855f7" />
        <stop offset="100%" stopColor="#7e22ce" />
      </linearGradient>
    </defs>
  </svg>
);

export default function Cake() {
  const [isBlown, setIsBlown] = useState(false);
  const [sprinklesLayer1, setSprinklesLayer1] = useState<SprinkleData[]>([]);
  const [sprinklesLayer2, setSprinklesLayer2] = useState<SprinkleData[]>([]);
  const { playBlowSFX, playUnboxSFX, playClickSFX } = useAudio();

  // Generate sprinkles statically on mount to prevent Next.js hydration mismatch
  useEffect(() => {
    const colors = ["#fb5607", "#ff006e", "#8338ec", "#3a86c8", "#ffbe0b", "#06d6a0"];
    
    const s1 = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      top: Math.random() * 50 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 360,
    }));

    const s2 = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      top: Math.random() * 40 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotate: Math.random() * 360,
    }));

    setSprinklesLayer1(s1);
    setSprinklesLayer2(s2);
  }, []);

  const handleBlow = () => {
    if (isBlown) {
      // Re-light the candles for fun!
      playClickSFX();
      setIsBlown(false);
    } else {
      // Blow out
      playBlowSFX();
      // Add a slight delay for celebratory sound
      setTimeout(() => {
        playUnboxSFX();
      }, 300);
      setIsBlown(true);
    }
  };

  return (
    <div className="cake-container">
      {/* 20th Birthday age topper board */}
      <div className="age-banner">
        {isBlown ? "🎂 20 Years of Sparkle ✨" : "🕯️ Turning 20 🎂"}
      </div>

      <div className="cake mt-8">
        {/* Candles sitting on top layer */}
        <div className="candles-wrapper">
          {/* Digit 2 Candle */}
          <div className="candle">
            <div className={`flame ${isBlown ? "blown" : ""}`} />
            <div className={`smoke ${isBlown ? "puffing" : ""}`} />
            <div className="candle-wick" />
            <CandleTwo />
          </div>

          {/* Digit 0 Candle */}
          <div className="candle">
            <div className={`flame ${isBlown ? "blown" : ""}`} />
            <div className={`smoke ${isBlown ? "puffing" : ""}`} />
            <div className="candle-wick" />
            <CandleZero />
          </div>
        </div>

        {/* Cake Layer 3 (Top Layer - Pink) */}
        <div className="cake-layer cake-layer-3">
          <div className="frosting-drip drip-layer-3" />
          {sprinklesLayer2.map((s) => (
            <div
              key={s.id}
              className="sprinkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                backgroundColor: s.color,
                transform: `rotate(${s.rotate}deg)`,
              }}
            />
          ))}
        </div>

        {/* Cake Layer 2 (Middle Layer - Cream) */}
        <div className="cake-layer cake-layer-2">
          <div className="frosting-drip drip-layer-2" />
          {sprinklesLayer1.map((s) => (
            <div
              key={s.id}
              className="sprinkle"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                backgroundColor: s.color,
                transform: `rotate(${s.rotate}deg)`,
              }}
            />
          ))}
        </div>

        {/* Cake Layer 1 (Bottom Layer - Dark Pink) */}
        <div className="cake-layer cake-layer-1" />
      </div>

      {/* Blow control button */}
      <button
        onClick={handleBlow}
        className={`btn-custom mt-8 py-3 px-8 text-sm font-bold font-outfit ${
          isBlown ? "btn-pink" : "btn-red animate-pulse"
        }`}
      >
        {isBlown ? "Re-light Candles 🔥" : "Blow Candles 🌬️"}
      </button>

      {/* Birthday Wish Reveal */}
      {isBlown && (
        <div className="mt-6 text-center animate-text-pop px-4">
          <p className="font-playpen text-xl font-extrabold text-pink-600">
            Make a wish Broo 🌟
          </p>
          <p className="font-caveat text-3xl text-neutral-800 font-bold mt-2">
            "May your 20s be filled with endless laughter, success, and love!" 💖
          </p>
        </div>
      )}
    </div>
  );
}
