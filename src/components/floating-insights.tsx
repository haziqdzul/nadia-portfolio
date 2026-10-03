"use client";

import { useRef, type CSSProperties } from "react";
import { useInView } from "motion/react";
import { useInteractionPause } from "./use-interaction-pause";

// Fixed positions keep server and client markup identical.
const particles = [
  { x: 8, y: 150, kind: "node", duration: 14, delay: -4 },
  { x: 23, y: 112, kind: "database", duration: 18, delay: -9 },
  { x: 42, y: 170, kind: "bars", duration: 16, delay: -2 },
  { x: 63, y: 122, kind: "network", duration: 20, delay: -12 },
  { x: 84, y: 163, kind: "database", duration: 17, delay: -6 },
  { x: 34, y: 55, kind: "node", duration: 19, delay: -10 },
  { x: 77, y: 52, kind: "node", duration: 15, delay: -1 },
];

export function FloatingInsights({ engaged = false }: { engaged?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { amount: 0.1 });
  const { paused, handlers } = useInteractionPause();
  return <div ref={root} {...handlers} tabIndex={0} aria-label="Ambient insights. Hover or focus to pause; click or tap to toggle playback." className="floating-insights" data-paused={paused || !visible} data-engaged={engaged}>
    <div className="insights-atmosphere" aria-hidden="true" />
    <svg aria-hidden="true" focusable="false" viewBox="0 0 440 220" className="insights-field">
      <g className="insights-cluster">
      <g className="insights-constellation" fill="none" stroke="currentColor" strokeWidth="0.8">
        <path d="M48 144 128 91 226 131 314 66 386 117" opacity=".24" />
        <path d="m128 91 41-49 145 24M226 131l43 55 117-69" opacity=".12" />
        {[[48,144],[128,91],[226,131],[314,66],[386,117],[169,42],[269,186]].map(([x,y]) => <g key={x}><circle cx={x} cy={y} r="8" fill="currentColor" opacity=".06" stroke="none" /><circle cx={x} cy={y} r="2.5" fill="currentColor" stroke="none" opacity=".55" /></g>)}
      </g>
      {particles.map((particle,index) => <g key={index} transform={`translate(${particle.x * 4.4} ${particle.y})`}>
        <g className={`insight-particle insight-tone-${index % 3}`} style={{ "--drift-duration": `${particle.duration}s`, "--drift-delay": `${particle.delay}s` } as CSSProperties} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
          {particle.kind === "database" ? <><ellipse cx="0" cy="-7" rx="9" ry="3.5" /><path d="M-9-7V7c0 5 18 5 18 0V-7M-9 0c0 5 18 5 18 0" /></> : particle.kind === "bars" ? <><path d="M-10 9V1m9 8V-6m9 15V-13" strokeWidth="3" /><path d="M-14 15h28" opacity=".35" /></> : particle.kind === "network" ? <><path d="m-12 7 12-17 13 17M-12 7h25" opacity=".45" /><circle cx="-12" cy="7" r="3" /><circle cx="0" cy="-10" r="3" /><circle cx="13" cy="7" r="3" /></> : <><circle r="11" opacity=".18" /><circle r="3" fill="currentColor" stroke="none" /></>}
        </g>
      </g>)}
      </g>
    </svg>

  </div>;
}


