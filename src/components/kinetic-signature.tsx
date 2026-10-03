"use client";

import { useEffect, useRef } from "react";


type Particle = { x: number; y: number; vx: number; vy: number; u: number; seed: number };

export function KineticSignature() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(false);


  useEffect(() => {
    const surface = canvas.current;
    const ctx = surface?.getContext("2d", { alpha: true });
    if (!surface || !ctx) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 1, height = 1, frame = 0, time = 0, previous = 0, visible = false;
    let particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000, active: false };
    const target = (p: Particle) => {
      const envelope = Math.sin(p.u * Math.PI);
      return {
        x: width * (.07 + p.u * .86),
        y: height * .49 + Math.sin(p.u * Math.PI * 3.4 + time * .48) * height * .16 * envelope + Math.sin(p.seed * 13.7) * 2.4 * envelope,
      };
    };
    const draw = (now: number) => {
      frame = 0;
      const dt = Math.min((now - previous) / 16.667 || 1, 2);
      previous = now;
      const animate = !motion.matches && !pausedRef.current;
      if (animate) time += dt / 60;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (const p of particles) {
        const home = target(p);
        if (animate) {
          const dx = home.x - pointer.x, dy = home.y - pointer.y;
          const distance = Math.hypot(dx, dy);
          const influence = pointer.active ? Math.max(0, 1 - distance / 135) : 0;
          const angle = p.seed * 2.39996;
          const scatter = influence * influence;
          const tx = home.x + Math.cos(angle) * scatter * (55 + p.seed % 65);
          const ty = home.y + Math.sin(angle) * scatter * (45 + p.seed % 50);
          p.vx = (p.vx + (tx - p.x) * .045 * dt) * Math.pow(.79, dt);
          p.vy = (p.vy + (ty - p.y) * .045 * dt) * Math.pow(.79, dt);
          p.x += p.vx * dt;
          p.y += p.vy * dt;
        } else if (motion.matches) { p.x = home.x; p.y = home.y; }
        const alpha = .13 + Math.sin(p.u * Math.PI) * .28;
        ctx.fillStyle = `hsla(${158 + p.u * 70},75%,76%,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.seed % 9 === 0 ? 1.25 : .65, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";
      if (visible && !document.hidden && animate) frame = requestAnimationFrame(draw);
    };
    const start = () => {
      cancelAnimationFrame(frame);
      previous = performance.now();
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      const rect = surface.getBoundingClientRect();
      width = Math.max(1, rect.width); height = Math.max(1, rect.height);
      const dpr = Math.min(devicePixelRatio || 1, 2);
      surface.width = Math.round(width * dpr); surface.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: width < 400 ? 1100 : 2000 }, (_, i) => {
        const p = { x: 0, y: 0, vx: 0, vy: 0, u: i / (width < 400 ? 1099 : 1999), seed: i };
        const home = target(p); return { ...p, ...home };
      });
      start();
    };
    const move = (event: PointerEvent) => {
      const rect = surface.getBoundingClientRect();
      pointer.x = event.clientX - rect.left; pointer.y = event.clientY - rect.top; pointer.active = true;
    };
    const leave = () => { pointer.active = false; };
    const release = (event: PointerEvent) => { if (event.pointerType !== "mouse") leave(); };
    const focus = () => { pointer.x = width / 2; pointer.y = height / 2; pointer.active = true; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; start(); });
    const sizeObserver = new ResizeObserver(resize);
    observer.observe(surface); sizeObserver.observe(surface);
    surface.addEventListener("pointermove", move);
    surface.addEventListener("pointerleave", leave);
    surface.addEventListener("pointerup", release);
    surface.addEventListener("focus", focus);
    surface.addEventListener("blur", leave);
    surface.addEventListener("signature-playback", start);
    document.addEventListener("visibilitychange", start);
    motion.addEventListener("change", start);
    resize();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); sizeObserver.disconnect();
      surface.removeEventListener("pointermove", move); surface.removeEventListener("pointerleave", leave);
      surface.removeEventListener("pointerup", release); surface.removeEventListener("focus", focus);
      surface.removeEventListener("blur", leave); surface.removeEventListener("signature-playback", start);
      document.removeEventListener("visibilitychange", start); motion.removeEventListener("change", start);
    };
  }, []);

  return <div className="kinetic-signature">
    <canvas onClick={() => { pausedRef.current = !pausedRef.current; canvas.current?.dispatchEvent(new Event("signature-playback")); }} ref={canvas} tabIndex={0} role="img" aria-label="Interactive digital signature. Move your pointer over the wave, or focus it with the keyboard, to disperse its particles. Move away to restore the wave." className="signature-canvas">A flowing wave representing clarity emerging from data.</canvas>
    <div className="signature-caption"><span>From possibility to clarity.</span></div>
  </div>;
}

