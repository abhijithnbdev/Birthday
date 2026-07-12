"use client";

import React, { useState } from "react";
import { useAudio } from "@/hooks/useAudio";

interface GiftBoxProps {
  onOpen: () => void;
}

export default function GiftBox({ onOpen }: GiftBoxProps) {
  const [status, setStatus] = useState<"idle" | "shaking" | "opened">("idle");
  const { playRattleSFX, playUnboxSFX } = useAudio();

  const handleClick = () => {
    if (status !== "idle") return;

    setStatus("shaking");
    playRattleSFX();

    // Shake for 800ms, then open
    setTimeout(() => {
      setStatus("opened");
      playUnboxSFX();
      // Fire callback after opening animations complete (approx 1s total)
      setTimeout(() => {
        onOpen();
      }, 1000);
    }, 800);
  };

  return (
    <div className="flex flex-col items-center justify-center my-10">
      <div 
        onClick={handleClick}
        className={`gift-box-container ${status === "shaking" ? "shaking" : ""} ${status === "opened" ? "opened" : ""}`}
      >
        <div className="gift-box">
          {/* Ribbon Bow */}
          <div className="ribbon-bow">
            <div className="bow-left" />
            <div className="bow-right" />
          </div>
          
          {/* Top Lid */}
          <div className="gift-lid" />
          
          {/* Base */}
          <div className="gift-base" />
        </div>
      </div>
      
      {status === "idle" && (
        <p className="font-playpen text-lg text-pink-600 font-extrabold animate-pulse">
          🎁 Click the Gift Box to Open! 🎁
        </p>
      )}
      {status === "shaking" && (
        <p className="font-playpen text-lg text-amber-500 font-extrabold animate-bounce">
          Unboxing... ✨
        </p>
      )}
      {status === "opened" && (
        <p className="font-playpen text-lg text-green-600 font-extrabold">
          Surprise Reveal! 🎉
        </p>
      )}
    </div>
  );
}
