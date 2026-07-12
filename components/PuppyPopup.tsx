"use client";

import React, { useEffect } from "react";
import { useAudio } from "@/hooks/useAudio";

interface PuppyPopupProps {
  imageSrc: string; // e.g. "/puppies/puppy.png"
  bubbleText?: string;
  bubbleColor?: "pink" | "red" | "black";
  isModal?: boolean;
  onClose?: () => void;
  title?: string;
  actionButton?: {
    text: string;
    onClick: () => void;
    color?: "pink" | "red" | "black";
  };
}

export default function PuppyPopup({
  imageSrc,
  bubbleText,
  bubbleColor = "pink",
  isModal = false,
  onClose,
  title,
  actionButton,
}: PuppyPopupProps) {
  const { playWoofSFX } = useAudio();

  useEffect(() => {
    playWoofSFX();
  }, [playWoofSFX]);
  // Bubbles colors classes
  const colorMap = {
    red: "border-red-500 text-red-600 shadow-[5px_5px_0px_#ef4444]",
    black: "border-neutral-900 text-neutral-900 shadow-[5px_5px_0px_#171717]",
    pink: "border-pink-500 text-opacity-100 text-pink-600 shadow-[5px_5px_0px_#ec4899]",
  };

  const bubbleClass = `relative bg-white border-3 rounded-3xl p-5 mb-5 max-w-xs text-center font-bold animate-text-pop font-playpen ${colorMap[bubbleColor]
    }`;

  const isHug = imageSrc.includes("hug");

  const renderContent = () => (
    <div className="puppy-container animate-puppy">
      {bubbleText && (
        <div className={bubbleClass}>
          {bubbleText}
          <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[15px] border-t-white" />
          <div className={`absolute bottom-[-19px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[16px] border-t-neutral-900 -z-10`} />
        </div>
      )}

      <div className={`${isHug ? 'hug-img-wrapper' : 'puppy-img-wrapper'} hover:scale-105 transition-all duration-300`}>
        <img
          src={imageSrc}
          alt="Cute Puppy"
          className={isHug ? 'hug-img' : 'puppy-img'}
          onError={(e) => {
            // Fallback image in case the local image has issues
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=300&auto=format&fit=crop";
          }}
        />
      </div>
      {title && (
        <h3 className="mt-3 font-semibold text-lg text-slate-800 font-outfit">
          {title}
        </h3>
      )}
      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className={`btn-custom mt-5 py-2.5 px-7 text-sm font-semibold font-outfit ${actionButton.color === "pink" ? "btn-pink" : actionButton.color === "black" ? "btn-black" : "btn-red"
            }`}
        >
          {actionButton.text}
        </button>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 bg-neutral-950/70 backdrop-blur-md flex justify-center items-center z-50 p-4 animate-fade-in pointer-events-auto">
        <div className={`bg-white/95 backdrop-blur border border-white/20 p-8 rounded-3xl shadow-2xl w-full ${isHug ? 'max-w-lg' : 'max-w-sm'} text-center relative max-h-[90vh] overflow-y-auto animate-scale-up`}>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-rose-500 font-bold flex items-center justify-center transition-colors"
            >
              &times;
            </button>
          )}
          {renderContent()}
        </div>
      </div>
    );
  }

  return renderContent();
}
