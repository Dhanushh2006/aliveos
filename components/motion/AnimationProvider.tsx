"use client";

import { useEffect } from "react";

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotionPreference = () => {
      document.documentElement.dataset.motion = media.matches ? "reduced" : "full";
    };

    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);

    return () => media.removeEventListener("change", syncMotionPreference);
  }, []);

  return children;
}
