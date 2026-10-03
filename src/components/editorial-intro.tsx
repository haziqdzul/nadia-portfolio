"use client";

import Image from "next/image";
import { preload } from "react-dom";
import { useEffect, useState, type ReactNode } from "react";

// Replace this local preview without changing the loading sequence.
const introPhotos = ["perspective", "desk", "workspace", "laptop", "tools"].map(name => `/images/samples/${name}.jpg`);

export function EditorialIntro({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<"ready" | "loading" | "playing" | "exit" | "done">("ready");
  const [progress, setProgress] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  introPhotos.forEach(src => preload(src, { as: "image" }));

  useEffect(() => {
    let cancelled = false;
    let frame = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const delay = (ms: number) => new Promise<void>((resolve) => { timers.push(setTimeout(resolve, ms)); });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scrollRoot = document.documentElement;
    const previousOverflow = scrollRoot.style.overflow;
    scrollRoot.style.overflow = "hidden";
    const photo = new window.Image();
    photo.src = introPhotos[0];
    const assets = Promise.allSettled([photo.decode(), document.fonts.ready]);
    const finish = () => {
      if (cancelled) return;
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      document.removeEventListener("keydown", escape);
      scrollRoot.style.overflow = previousOverflow;
      setPhase("done");
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") finish(); };
    document.addEventListener("keydown", escape);
    const start = performance.now();
    // Intro progress, not a claim about downloaded bytes. Hold below 100 until ready.
    const tick = (now: number) => {
      if (cancelled) return;
      setPhase("loading");
      setPhotoIndex(reduced ? 0 : Math.floor((now - start) / 500) % introPhotos.length);
      setProgress(reduced ? 100 : Math.min(95, Math.round((now - start) / 1500 * 95)));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    void (async () => {
      await Promise.all([delay(reduced ? 350 : 1500), Promise.race([assets, delay(5000)])]);
      if (cancelled) return;
      cancelAnimationFrame(frame);
      setProgress(100);
      await delay(reduced ? 100 : 200);
      if (cancelled) return;
      setPhase("playing");
      await delay(reduced ? 250 : 2400);
      if (cancelled) return;
      setPhase("exit");
      await delay(reduced ? 180 : 850);
      finish();
    })();
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      document.removeEventListener("keydown", escape);
      scrollRoot.style.overflow = previousOverflow;
    };
  }, []);

  return <>
    {phase !== "done" && <div className="editorial-intro" data-phase={phase} aria-hidden="true">
      <div className="intro-loader">
        <div className="intro-loader-label"><span>Nadia Irdina</span><span className="intro-counter">{String(progress).padStart(2, "0")}</span></div>
        <div className="intro-loader-image">{introPhotos.map((src, index) => <Image key={src} src={src} alt="" fill sizes="280px" className="object-cover" style={{ opacity: index === photoIndex ? 1 : 0 }} />)}</div>
      </div>
      <div className="intro-paper">
        <span className="intro-signature">N—I <span>Business Intelligence Analyst</span></span>
        <div className="intro-name">
          <div className="intro-word intro-first"><span>NADIA</span></div>
          <div className="intro-word intro-second"><span>IRDINA</span></div>
        </div>
        <p className="intro-caption">Smarter decisions,<br />powered by <strong>clean analytics.</strong></p>
      </div>
    </div>}
    <div data-intro-pending={phase !== "done"} inert={phase !== "ready" && phase !== "done"}>{children}</div>
    <noscript><style>{`.editorial-intro { display: none !important; } [data-intro-pending] :is(.hero-role, .hero-data, .hero-speaks, .hero-insights, .hero-follows) { animation: none !important; opacity: 1 !important; transform: none !important; }`}</style></noscript>
  </>;
}



