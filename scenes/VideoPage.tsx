"use client";

import React, { useRef, useEffect, useState } from "react";
import { useAudio } from "@/hooks/useAudio";

export default function VideoPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentVideo, setCurrentVideo] = useState<'edit' | 'ai'>('edit');
  const { playBackground, pauseBackground } = useAudio();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentVideo === "ai") {
      // Keep background music playing for the second video
      playBackground();
      return;
    }

    // Pause background music immediately when entering the page
    pauseBackground();

    const handlePlay = () => {
      pauseBackground();
    };

    const handlePauseOrEnd = () => {
      playBackground();
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePauseOrEnd);
    video.addEventListener("ended", handlePauseOrEnd);

    // Attempt autoplay
    video.play().catch((err) => {
      console.log("Auto-playing video blocked by browser:", err);
      // If autoplay gets blocked, resume background music until user hits play
      playBackground();
    });

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePauseOrEnd);
      video.removeEventListener("ended", handlePauseOrEnd);
      // Always resume background music when exiting the video page
      playBackground();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideo]);

  // Handle source transition reloading and playing
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.load();
    video.play().catch(() => {});
  }, [currentVideo]);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col justify-center items-center px-4 animate-scale-up">
      <div className="glass-panel w-full p-4 sm:p-6 border border-white/40 shadow-2xl flex flex-col items-center">
        
        {/* Title */}
        <h2 className="font-playpen text-3xl font-extrabold text-pink-600 text-center mb-6 drop-shadow-sm">
          {currentVideo === 'edit' ? " " : " "}
        </h2>
        
        {/* Video Player Box */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-inner border-2 border-white bg-neutral-900 relative animate-text-pop">
          <video
            ref={videoRef}
            src={currentVideo === 'edit' ? "/video/edit.mp4" : "/video/ai.mp4"}
            controls
            autoPlay
            className="w-full h-full object-contain"
          >
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Video switcher button */}
        {currentVideo === 'edit' ? (
          <button
            onClick={() => setCurrentVideo('ai')}
            className="btn-custom btn-pink bg-pink-500 hover:bg-pink-600 text-white mt-8 py-3 px-10 text-lg font-bold font-outfit flex items-center gap-2 shadow-lg animate-bounce"
          >
            one more 🎬
          </button>
        ) : (
          <button
            onClick={() => setCurrentVideo('edit')}
            className="btn-custom btn-black text-white mt-8 py-2 px-6 text-sm font-bold font-outfit"
          >
            &larr; Watch First Video
          </button>
        )}
      </div>
    </div>
  );
}
