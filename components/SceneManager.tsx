"use client";

import React from "react";
import { useScene, Scene } from "@/hooks/useScene";
import PageOne from "@/scenes/PageOne";
import PageNo from "@/scenes/PageNo";
import PageYes from "@/scenes/PageYes";
import BirthdayPage from "@/scenes/BirthdayPage";
import VideoPage from "@/scenes/VideoPage";
import Background from "./Background";

import { useAudio } from "@/hooks/useAudio";

export default function SceneManager() {
  const { currentScene, changeScene } = useScene();
  const { isPlaying, playBackground, toggleBackground, playClickSFX } = useAudio();

  React.useEffect(() => {
    // Attempt automatic play on load
    playBackground();

    // Define one-time interaction handler to bypass browser blocks
    const startAudioOnInteraction = () => {
      playBackground();
      // Remove listeners immediately upon first trigger
      window.removeEventListener("click", startAudioOnInteraction);
      window.removeEventListener("keydown", startAudioOnInteraction);
      window.removeEventListener("touchstart", startAudioOnInteraction);
    };

    window.addEventListener("click", startAudioOnInteraction);
    window.addEventListener("keydown", startAudioOnInteraction);
    window.addEventListener("touchstart", startAudioOnInteraction);

    return () => {
      window.removeEventListener("click", startAudioOnInteraction);
      window.removeEventListener("keydown", startAudioOnInteraction);
      window.removeEventListener("touchstart", startAudioOnInteraction);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleMusic = () => {
    playClickSFX();
    toggleBackground();
  };

  const handleInteract = (nextScene: Scene) => {
    playClickSFX();
    // Start music on first click if not playing already
    if (!isPlaying) {
      playBackground();
    }
    changeScene(nextScene);
  };

  const renderScene = () => {
    switch (currentScene) {
      case "ONE":
        return <PageOne onNavigate={handleInteract} />;
      case "NO":
        return <PageNo onNavigate={handleInteract} />;
      case "YES":
        return <PageYes onNavigate={handleInteract} />;
      case "BIRTHDAY":
        return <BirthdayPage onNavigate={handleInteract} />;
      case "VIDEO":
        return <VideoPage />;
      default:
        return <PageOne onNavigate={handleInteract} />;
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
      {/* Background with anim variations based on scene */}
      <Background scene={currentScene} />

      {/* Persistent floating music control */}
      <button
        onClick={toggleMusic}
        className={`music-btn ${isPlaying ? "playing" : ""}`}
        aria-label="Toggle background music"
      >
        <span className="text-xl">
          {isPlaying ? "🎵" : "🔇"}
        </span>
      </button>

      {/* Render Current Page Scene */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center px-4 py-8">
        {renderScene()}
      </div>
    </div>
  );
}
