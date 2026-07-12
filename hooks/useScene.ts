"use client";

import { useState } from "react";

export type Scene = "ONE" | "NO" | "YES" | "BIRTHDAY" | "GIFT" | "VIDEO";

export function useScene() {
  const [currentScene, setCurrentScene] = useState<Scene>("ONE");

  const changeScene = (scene: Scene) => {
    setCurrentScene(scene);
  };

  return {
    currentScene,
    changeScene,
  };
}
