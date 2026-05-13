"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisScrollProvider(): null {
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    lenisRef.current = new Lenis();

    function raf(time: number): void {
      lenisRef.current?.raf(time);
      rafId.current = requestAnimationFrame(raf);
    }

    rafId.current = requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  //Nie renderuje nic do DOM - komponent tylko do zarządzania scrollowaniem
  return null;
}
