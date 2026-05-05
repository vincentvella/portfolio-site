"use client";

import { useEffect } from "react";

const BASE_DX = 4;
const BASE_DY = 4;
const RANGE = 3;

export function CursorShadowTracker() {
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let raf = 0;
    let nextX = BASE_DX;
    let nextY = BASE_DY;

    const apply = () => {
      raf = 0;
      root.style.setProperty("--shadow-dx", `${nextX.toFixed(2)}px`);
      root.style.setProperty("--shadow-dy", `${nextY.toFixed(2)}px`);
    };

    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      nextX = BASE_DX - cx * RANGE;
      nextY = BASE_DY - cy * RANGE;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const reset = () => {
      nextX = BASE_DX;
      nextY = BASE_DY;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", reset);
      if (raf) cancelAnimationFrame(raf);
      root.style.removeProperty("--shadow-dx");
      root.style.removeProperty("--shadow-dy");
    };
  }, []);

  return null;
}
