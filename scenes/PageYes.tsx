"use client";

import React from "react";
import PuppyPopup from "@/components/PuppyPopup";
import { Scene } from "@/hooks/useScene";

interface PageYesProps {
  onNavigate: (scene: Scene) => void;
}

export default function PageYes({ onNavigate }: PageYesProps) {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col justify-center items-center">
      <div className="glass-panel w-full flex flex-col items-center px-8 py-10 border border-white/40">
        {/* Puppy Pops Up */}
        <PuppyPopup
          imageSrc="/puppies/smile.jpeg"
          bubbleText="that's a good gurll 🌻"
          bubbleColor="pink"
        />

        {/* Action Button */}
        <button
          onClick={() => onNavigate("BIRTHDAY")}
          className="btn-custom btn-red text-white mt-6 py-3 px-10 text-lg font-bold font-outfit"
        >
          Click Here ✨
        </button>
      </div>
    </div>
  );
}
