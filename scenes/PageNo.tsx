"use client";

import React from "react";
import PuppyPopup from "@/components/PuppyPopup";
import { Scene } from "@/hooks/useScene";

interface PageNoProps {
  onNavigate: (scene: Scene) => void;
}

export default function PageNo({ onNavigate }: PageNoProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center">
      <div className="glass-panel w-full flex flex-col items-center px-8 py-10 border border-white/40">
        {/* Puppy Pops Up */}
        <PuppyPopup
          imageSrc="/puppies/dare.jpg"
          bubbleText="how dare you 😤"
          bubbleColor="black"
        />

        {/* Action Button */}
        <button
          onClick={() => onNavigate("ONE")}
          className="btn-custom btn-black text-white mt-6 py-2.5 px-8 text-base font-semibold font-outfit"
        >
          &larr; Go Back
        </button>
      </div>
    </div>
  );
}
