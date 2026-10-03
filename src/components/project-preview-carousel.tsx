"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import { motion, useInView } from "motion/react";
import type { ReportProject } from "@/lib/projects";
import { canDisplayMedia, projectMedia, type ProjectMedia } from "@/lib/project-media";
import { AutoplayProgress } from "./autoplay-progress";
import { ProjectVisual } from "./project-visual";

function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const readMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotion = () => true;

export function PreviewMedia({ item }: { item: ProjectMedia }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <p role="status" className="flex items-center gap-2 p-6 text-sm"><ImageOff aria-hidden="true" className="size-4" />Preview unavailable.</p>;
  if (item.format === "video") return <video controls playsInline preload="metadata" aria-label={item.alt} onError={() => setFailed(true)} className="h-full w-full object-contain">
    <source src={item.src} />
    {item.captionsSrc && <track kind="captions" src={item.captionsSrc} srcLang="en" label="English" default />}
    Your browser does not support this video.
  </video>;
  return <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 480px, (min-width: 640px) 80vw, 90vw" unoptimized={item.format === "gif" || item.src.toLowerCase().endsWith(".gif")} onError={() => setFailed(true)} className="object-contain" />;
}

export function ProjectPreviewCarousel({ project }: { project: ReportProject }) {
  const id = useId();
  const [index, setIndex] = useState(0);
  const root = useRef<HTMLElement>(null);
  const inView = useInView(root, { amount: 0.3 });
  const reducedMotion = useSyncExternalStore(subscribeMotion, readMotion, serverMotion);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const media = projectMedia.filter((item) => item.projectId === project.id && canDisplayMedia(item));
  const total = media.length + 1;
  const autoPlaying = playing && reducedMotion === false && total > 1;
  const isVideo = media[index - 1]?.format === "video";
  const change = (direction: number) => {
    setPlaying(false);
    setIndex((current) => (current + direction + total) % total);
  };
  const advance = useCallback(() => setIndex((current) => (current + 1) % total), [total]);

  return <section ref={root} tabIndex={0} onClick={() => setPlaying(false)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} aria-label={`${project.title} work preview`} aria-roledescription="carousel" className="project-preview flex flex-col min-w-0 border-t border-slate-200 bg-slate-50/70 p-6 sm:p-8 lg:border-l lg:border-t-0 dark:border-slate-800 dark:bg-slate-950/40">
    <div className="mb-4 flex min-h-11 items-center justify-between gap-3">
      <h4 className="eyebrow">Work preview</h4>
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-medium text-slate-600 dark:text-slate-300">{index + 1} / {total}</span>
        
      </div>
    </div>
    <div className="relative mt-auto">
    <div id={id} className="relative h-72 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <motion.div initial={false} animate={{ x: `-${index * 100}%` }} transition={{ duration: reducedMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }} className="flex h-full w-full">
        {[null, ...media].map((entry, position) => <div key={entry?.id ?? "overview"} role="group" aria-roledescription="slide" aria-label={`${position + 1} of ${total}: ${entry?.title ?? "Work overview"}`} aria-hidden={position !== index} inert={position !== index} className="relative flex h-full w-full shrink-0 items-center justify-center">
          {entry ? (entry.format !== "video" || position === index) && <PreviewMedia item={entry} /> : <div className="w-full p-3"><ProjectVisual kind={project.visual} /></div>}
        </div>)}
      </motion.div>
    </div>
    <button type="button" aria-label={`Previous preview: ${project.title}`} aria-controls={id} disabled={total < 2} onClick={() => change(-1)} className="preview-arrow absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-emerald-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"><ChevronLeft aria-hidden="true" className="size-4" /></button>
    <button type="button" aria-label={`Next preview: ${project.title}`} aria-controls={id} disabled={total < 2} onClick={() => change(1)} className="preview-arrow absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white shadow-md hover:bg-emerald-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"><ChevronRight aria-hidden="true" className="size-4" /></button>
    </div>
    <AutoplayProgress step={index} running={autoPlaying && inView && !hovered && !focused && !isVideo} onAdvance={advance} />
    <p className="sr-only" aria-live={autoPlaying ? "off" : "polite"}>{media[index - 1]?.caption ?? "Illustrative work overview"}</p>
  </section>;
}


