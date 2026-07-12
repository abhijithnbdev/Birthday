"use client";

import React, { useState, useEffect } from "react";
import PuppyPopup from "@/components/PuppyPopup";
import { Scene } from "@/hooks/useScene";
import { useAudio } from "@/hooks/useAudio";
import Cake from "@/components/Cake";

interface BirthdayPageProps {
  onNavigate: (scene: Scene) => void;
}

export default function BirthdayPage({ onNavigate }: BirthdayPageProps) {
  const { playRustleSFX, playClickSFX } = useAudio();
  // Animation entrance trigger
  const [animateIn, setAnimateIn] = useState(false);

  // States
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [showHugPopup, setShowHugPopup] = useState(false);
  const [showDarePopup, setShowDarePopup] = useState(false);

  const toggleLetter = () => {
    playRustleSFX();
    setIsLetterOpen((prev) => !prev);
  };

  useEffect(() => {
    // Start animation trigger on mount
    setAnimateIn(true);
  }, []);

  const marqueePhotos = [
    "/photos/child.png",
    "/photos/adult.png",
    "/photos/now.jpeg",
    "/photos/current.jpg",
  ];

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* 1. Header Hero Panel */}
      <div
        className={`glass-panel w-full flex flex-col items-center px-6 py-10 border border-white/40 text-center transition-all duration-1000 transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
      >
        {/* Puppy Pops Up */}
        <PuppyPopup imageSrc="/puppies/puppy.png" />

        {/* Infinite horizontal marquee loop of memory photos */}
        <div className="w-full overflow-hidden my-4 relative flex items-center bg-pink-50/10 rounded-3xl border border-rose-100/20 py-4">
          <div className="animate-marquee whitespace-nowrap">
            {marqueePhotos.map((src, index) => (
              <img
                key={`m1-${index}`}
                src={src}
                alt="memory"
                className="aspect-[9/16] w-[calc(50%-16px)] shrink-0 object-cover rounded-2xl mx-2 border-2 border-white shadow-md"
              />
            ))}
            {marqueePhotos.map((src, index) => (
              <img
                key={`m2-${index}`}
                src={src}
                alt="memory-loop"
                className="aspect-[9/16] w-[calc(50%-16px)] shrink-0 object-cover rounded-2xl mx-2 border-2 border-white shadow-md"
              />
            ))}
          </div>
        </div>

        {/* Happy Birthday texts. Styled Pink and Black */}
        <div className="space-y-4 my-6">
          <h1
            className={`text-4xl sm:text-5xl font-playpen font-extrabold text-pink-500 drop-shadow-sm transition-all duration-1000 delay-500 transform ${animateIn ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
          >
            Happy Birthday Sayanaaa 🎂
          </h1>

          <p
            className={`text-3xl font-caveat font-bold text-neutral-900 transition-all duration-1000 delay-[900ms] transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            you are my fav stranger ✨
          </p>

          <p
            className={`text-xl font-poppins font-semibold text-pink-600 uppercase tracking-widest transition-all duration-1000 delay-[1300ms] transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
          >
            Stay Happy 😊
          </p>
        </div>

        {/* AI Portrait rendered above the cake without titles */}
        <div className="my-6 flex justify-center w-full relative z-10 px-4">
          <img
            src="/photos/ai.png"
            alt="AI Portrait"
            className="w-64 sm:w-80 h-auto object-contain rounded-2xl border-4 border-white shadow-xl transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop";
            }}
          />
        </div>

        {/* Interactive Cake with candle blowing */}
        <Cake />

        {/* Scroll Indicator */}
        <div className="mt-8 text-neutral-500 animate-bounce flex flex-col items-center gap-1 font-outfit text-sm">
          <span>Scroll down for letter</span>
          <span>👇</span>
        </div>
      </div>

      {/* Spacer to simulate scrolling down */}
      <div className="h-20" />

      {/* 2. Interactive Letter Box */}
      <div
        className={`glass-panel w-full flex flex-col items-center px-6 py-12 border border-white/40 mt-8 text-center transition-all duration-1000 delay-700 transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
      >
        <h2 className="font-outfit text-2xl font-bold text-slate-800 mb-2">
          A Message For You 💌
        </h2>
        <p className="font-poppins text-xs text-neutral-500 max-w-sm mb-6">
        </p>

        {/* The Envelope component */}
        <div
          className={`envelope-wrapper hover:scale-[1.02] transition-transform duration-300 ${isLetterOpen ? "open" : ""
            }`}
          onClick={toggleLetter}
        >
          <div className="envelope">
            {/* Top Flap */}
            <div className="flap" />

            {/* Letter Paper inside */}
            <div className="letter-paper">
              <div className="letter-title">For Ammu 💫</div>
              <div className="letter-content text-left space-y-4 text-slate-700">
                <div>
                  <span className="font-bold text-rose-500 block text-xs tracking-wider uppercase font-outfit">
                    As a stranger:
                  </span>
                  <p className="mt-1 italic leading-relaxed text-sm">
                    "Even as a stranger in your life, your bright smile and energy bring so much light. May this new year of your life be filled with wonderful encounters, laughter, and peaceful moments. Happy birthday!🤍❤️"
                  </p>
                </div>
                <div className="border-t border-dashed border-rose-100 pt-3">
                  <span className="font-bold text-neutral-800 block text-xs tracking-wider uppercase font-outfit">
                    As a best friend:
                  </span>
                  <p className="mt-1 leading-relaxed text-sm">
                    "To my friend, you are the sweetest and face kanikatha friend i have 🐷.Hope you are happy and keep the smile 🥰💗."
                  </p>
                </div>
              </div>
            </div>

            {/* Front folds */}
            <div className="pocket" />
            <div className="bottom-fold" />
          </div>
        </div>

        {/* Open/Close Envelope Button */}
        <button
          onClick={toggleLetter}
          className={`btn-custom mt-8 ${isLetterOpen ? "btn-black" : "btn-pink"
            } font-outfit text-sm font-bold`}
        >
          {isLetterOpen ? "Close Letter ✉️" : "Open Letter 📂"}
        </button>
      </div>

      <div className="h-16" />

      {/* 4. Surprise Popup and Dare loops */}
      <div
        className={`glass-panel w-full flex flex-col items-center px-6 py-10 border border-white/40 mt-8 text-center transition-all duration-1000 delay-1000 transform ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
      >
        <button
          onClick={() => {
            playClickSFX();
            setShowHugPopup(true);
          }}
          className="btn-custom btn-pink bg-purple-500 hover:bg-purple-600 font-bold font-outfit text-white py-3 px-8 text-lg"
        >
          here is a surprise 🔥
        </button>

        {/* Yes / No segment */}
        <div className="mt-12 space-y-4">
          <p className="font-playpen text-xl font-bold text-neutral-800">
            do you want more?
          </p>

          <div className="flex gap-6 justify-center">
            <button
              onClick={() => onNavigate("VIDEO")}
              className="btn-custom btn-red text-white py-2 px-8 font-bold font-outfit text-base"
            >
              Yes 🥰
            </button>
            <button
              onClick={() => {
                playClickSFX();
                setShowDarePopup(true);
              }}
              className="btn-custom btn-black text-white py-2 px-8 font-bold font-outfit text-base"
            >
              No 🛑
            </button>
          </div>
        </div>
      </div>

      {/* Modals Popups */}

      {/* Hug surprise popup */}
      {showHugPopup && (
        <PuppyPopup
          imageSrc="/puppies/hug.jpg"
          bubbleText="its a hugg 🤗"
          bubbleColor="pink"
          isModal={true}
          onClose={() => {
            playClickSFX();
            setShowHugPopup(false);
          }}
        />
      )}

      {/* How dare you loop popup */}
      {showDarePopup && (
        <PuppyPopup
          imageSrc="/puppies/dare.jpg"
          bubbleText="how dare you 😤"
          bubbleColor="black"
          isModal={true}
          onClose={() => {
            playClickSFX();
            setShowDarePopup(false);
          }}
          actionButton={{
            text: "go back",
            onClick: () => {
              playClickSFX();
              setShowDarePopup(false);
            },
            color: "black",
          }}
        />
      )}
    </div>
  );
}
