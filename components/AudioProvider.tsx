"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  BIRTHDAY_MELODY,
  playChimeTone,
  playWoof,
  playPop,
  playRustle,
  playRattle,
  playUnbox,
  playClick,
  playBlow,
} from "@/lib/audioService";

interface AudioContextType {
  isPlaying: boolean;
  playBackground: () => void;
  pauseBackground: () => void;
  toggleBackground: () => void;
  playWoofSFX: () => void;
  playPopSFX: () => void;
  playRustleSFX: () => void;
  playRattleSFX: () => void;
  playUnboxSFX: () => void;
  playClickSFX: () => void;
  playBlowSFX: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const mp3Ref = useRef<HTMLAudioElement | null>(null);
  const useSynthRef = useRef<boolean>(false); // Start false, fallback to synth if mp3 errors
  const melodyIndexRef = useRef(0);
  const nextNoteTimeRef = useRef(0);
  const timerRef = useRef<number | null>(null);

  // Initialize AudioContext
  const initAudioCtx = () => {
    if (typeof window === "undefined") return;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch((e) => console.log("Failed to resume AudioContext:", e));
    }
  };

  // Web Audio Synth Scheduler
  const scheduler = () => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Keep scheduling notes ahead by 200ms
    while (nextNoteTimeRef.current < ctx.currentTime + 0.2) {
      const noteObj = BIRTHDAY_MELODY[melodyIndexRef.current];
      const duration = noteObj.beats * 0.5; // at 120 BPM, 1 beat is 0.5s

      playChimeTone(ctx, noteObj.note, duration, nextNoteTimeRef.current, 0.05);

      nextNoteTimeRef.current += duration;
      melodyIndexRef.current = (melodyIndexRef.current + 1) % BIRTHDAY_MELODY.length;
    }
  };

  const startSynth = () => {
    initAudioCtx();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
    }

    nextNoteTimeRef.current = ctx.currentTime + 0.05;
    scheduler();
    timerRef.current = window.setInterval(scheduler, 50);
    setIsPlaying(true);
  };

  const stopSynth = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Play Background Music
  const playBackground = () => {
    initAudioCtx();

    if (useSynthRef.current) {
      startSynth();
      return;
    }

    // Try HTML5 Audio MP3/MPEG
    if (!mp3Ref.current) {
      mp3Ref.current = new Audio("/music/song.mp3");
      mp3Ref.current.loop = true;

      // Handle loading failure
      mp3Ref.current.onerror = () => {
        console.warn("song.mp3 failed to load, falling back to chime synth.");
        useSynthRef.current = true;
        startSynth();
      };
    }

    mp3Ref.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.warn("MP3 playback blocked/failed. Trying chime synth fallback.");
        // Audio might just be blocked by user gesture, or file 404ed
        useSynthRef.current = true;
        startSynth();
      });
  };

  // Pause Background Music
  const pauseBackground = () => {
    if (mp3Ref.current) {
      mp3Ref.current.pause();
    }
    stopSynth();
    setIsPlaying(false);
  };

  // Toggle Background Music
  const toggleBackground = () => {
    if (isPlaying) {
      pauseBackground();
    } else {
      playBackground();
    }
  };

  // SFX triggers
  const playWoofSFX = () => {
    // Muted by user request
  };

  const playPopSFX = () => {
    // Muted by user request
  };

  const playRustleSFX = () => {
    // Muted by user request
  };

  const playRattleSFX = () => {
    // Muted by user request
  };

  const playUnboxSFX = () => {
    // Muted by user request
  };

  const playClickSFX = () => {
    // Muted by user request
  };

  const playBlowSFX = () => {
    // Muted by user request
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
      }
      if (mp3Ref.current) {
        mp3Ref.current.pause();
      }
    };
  }, []);

  return (
    <AudioContext.Provider
      value={{
        isPlaying,
        playBackground,
        pauseBackground,
        toggleBackground,
        playWoofSFX,
        playPopSFX,
        playRustleSFX,
        playRattleSFX,
        playUnboxSFX,
        playClickSFX,
        playBlowSFX,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
