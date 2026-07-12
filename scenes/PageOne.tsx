"use client";

import React, { useEffect, useState } from "react";
import PuppyPopup from "@/components/PuppyPopup";
import { Scene } from "@/hooks/useScene";

interface PageOneProps {
  onNavigate: (scene: Scene) => void;
}

export default function PageOne({ onNavigate }: PageOneProps) {
  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col justify-center items-center">

      {/* Card Content container */}
      <div className="welcome-card glass-panel w-full flex flex-col items-center relative z-10 px-8 py-10 border border-white/40">
        {/* Puppy Pops Up */}
        <PuppyPopup imageSrc="/puppies/puppy.png" />

        {/* Cuted styled text lines. Red & Black */}
        <div className="space-y-4 my-6 text-center">
          <h2 className="font-playpen text-4xl text-rose-500 font-extrabold tracking-wide">
            hey!!
          </h2>
          <p className="font-outfit text-2xl text-neutral-800 font-medium">
            i made something for you.
          </p>
          <p className="font-caveat text-4xl text-rose-600 font-bold">
            do you wanna see?
          </p>
          <p className="font-poppins text-lg text-neutral-900 font-semibold uppercase tracking-wider">
            yes or no
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-4 w-full justify-center">
          <button
            onClick={() => onNavigate("YES")}
            className="btn-custom btn-red text-white py-3 px-8 text-lg font-bold font-outfit"
          >
            Yes 💖
          </button>
          <button
            onClick={() => onNavigate("NO")}
            className="btn-custom btn-black text-white py-3 px-8 text-lg font-bold font-outfit"
          >
            No 💔
          </button>
        </div>
      </div>
    </div>
  );
}
