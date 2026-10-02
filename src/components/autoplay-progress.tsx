"use client";

import { useEffect, useRef } from "react";

/** The fill and slide advance share one clock; pauses preserve elapsed time. */
export function AutoplayProgress({ running, step, onAdvance, duration = 4000 }: {
  running: boolean;
  step: number;
  onAdvance: () => void;
  duration?: number;
}) {
  const fill = useRef<HTMLSpanElement>(null);
  const elapsed = useRef(0);
  useEffect(() => {
    elapsed.current = 0;
    if (fill.current) fill.current.style.transform = "scaleX(0)";
  }, [step]);
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let previous: number | null = null;
    const visibility = () => { previous = null; };
    const tick = (now: number) => {
      if (!document.hidden && previous !== null) elapsed.current += now - previous;
      previous = document.hidden ? null : now;
      if (fill.current) fill.current.style.transform = `scaleX(${Math.min(elapsed.current / duration, 1)})`;
      if (elapsed.current >= duration) { elapsed.current = 0; onAdvance(); return; }
      frame = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", visibility);
    frame = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frame); document.removeEventListener("visibilitychange", visibility); };
  }, [running, step, duration, onAdvance]);
  return <div aria-hidden="true" className="mt-3 h-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700"><span ref={fill} className="block h-full origin-left bg-gradient-to-r from-cyan-600 via-violet-500 to-pink-500" style={{ transform: "scaleX(0)" }} /></div>;
}
