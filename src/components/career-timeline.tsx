"use client";
import Image from "next/image";
import { useCallback, useId, useRef, useState, useSyncExternalStore } from "react";
import { BriefcaseBusiness, ChevronLeft, ChevronRight, Pause, Play, type LucideIcon } from "lucide-react";
import { motion, useInView } from "motion/react";
import { projectMedia, canDisplayMedia } from "@/lib/project-media";
import { AutoplayProgress } from "./autoplay-progress";
import { PreviewMedia } from "./project-preview-carousel";

type CareerEntry = Readonly<{
  id: string;
  date: string;
  title: string;
  organization: string;
  details: readonly string[];
  icon: LucideIcon;
}>;

const entries: readonly CareerEntry[] = [
  { id: "datamicron", date: "Mar 2024 – Present", title: "Business Intelligence Analyst", organization: "Datamicron", icon: BriefcaseBusiness, details: [
    "Structured expert input into nine enforcement use cases and supported STATSDW requirements and data readiness.",
    "Supported STATSDW user training (February 2025), UAT (March), and acceptance and knowledge transfer activities (April).",
    "Contributed to the June 2025 go-live and July final acceptance testing milestones.",
    "Mapped health-data definitions from Doris / StarRocks to Oracle and built Tableau consultant profiling views."
  ] },
  { id: "mcis", date: "Oct 2023 – Jan 2024", title: "Internship", organization: "MCIS Life", icon: BriefcaseBusiness, details: ["Contributed statistical analysis to ESG and climate-risk questions, connecting quantitative findings to sustainability analysis in insurance."] },
];

const gallery = projectMedia.filter(canDisplayMedia);
function subscribeMotion(callback: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}
const readMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverMotion = () => true;
export function CareerTimeline() {
  const id = useId();
  const [index, setIndex] = useState(0);
  const reduce = useSyncExternalStore(subscribeMotion, readMotion, serverMotion);
  const root = useRef<HTMLElement>(null);
  const inView = useInView(root, { amount: 0.3 });
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const autoplay = playing && !reduce && gallery.length > 1;
  const video = gallery[index]?.format === "video";
  const select = (next: number) => { setPlaying(false); setIndex(next); };
  const change = (direction: number) => select((index + direction + gallery.length) % gallery.length);
  const advance = useCallback(() => setIndex((current) => (current + 1) % gallery.length), []);
  return <section id="experience" aria-labelledby={`${id}-heading`} className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 sm:py-28">
    <p className="eyebrow">03 / Experience</p><h2 id={`${id}-heading`} className="section-heading mt-4 text-slate-950 dark:text-slate-50">Experience that shaped my work.</h2>
    <div className="mt-9 grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:gap-10">
      <div className="min-w-0 space-y-5 lg:sticky lg:top-28">
        <section ref={root} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} aria-label="Career media" aria-roledescription="carousel" className="overflow-hidden rounded-3xl border border-emerald-100 bg-white p-3 shadow-lg shadow-emerald-950/5 sm:p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center justify-between gap-3"><h3 className="text-sm font-semibold text-slate-950 dark:text-white">Work & moments</h3><div className="flex items-center gap-2"><button type="button" disabled={reduce || gallery.length < 2} aria-label={autoplay ? "Pause career photos" : "Play career photos"} onClick={() => setPlaying(!playing)} className="flex size-11 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:text-slate-200 dark:hover:bg-slate-800">{autoplay ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}</button><span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[11px] text-slate-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-slate-100">{gallery.length ? index + 1 : 0} / {gallery.length}</span></div></div>
          <div className="relative"><div id={`${id}-media`} className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-950"><motion.div initial={false} animate={{ x: `-${index * 100}%` }} transition={{ duration: reduce ? 0 : 0.45, ease: "easeOut" }} className="flex h-full w-full">{gallery.map((item, position) => <div key={item.id} role="group" aria-roledescription="slide" aria-label={`${position + 1} of ${gallery.length}: ${item.title}`} aria-hidden={position !== index} inert={position !== index} className="relative flex h-full w-full shrink-0 items-center justify-center">{(item.format !== "video" || position === index) && <PreviewMedia item={item} />}</div>)}</motion.div>{!gallery.length && <p className="absolute inset-0 flex items-center justify-center p-6 text-center text-sm text-slate-600 dark:text-slate-300">Cleared career photos will appear here.</p>}</div>
            <button type="button" onClick={() => change(-1)} disabled={gallery.length < 2} aria-label="Previous career photo" aria-controls={`${id}-media`} className="absolute left-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-white"><ChevronLeft aria-hidden="true" className="size-5" /></button><button type="button" onClick={() => change(1)} disabled={gallery.length < 2} aria-label="Next career photo" aria-controls={`${id}-media`} className="absolute right-2 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-950 shadow-sm hover:bg-slate-100 disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-white"><ChevronRight aria-hidden="true" className="size-5" /></button>
          </div>
          <AutoplayProgress step={index} running={autoplay && inView && !hovered && !focused && !video} onAdvance={advance} />
          <p className="sr-only" aria-live={autoplay ? "off" : "polite"}>{gallery[index]?.caption}</p>
          <div aria-label="Choose a career photo" className="mt-4 flex flex-wrap justify-center gap-2">{gallery.map((item, position) => <button key={item.id} type="button" aria-label={`Show career photo ${position + 1}: ${item.title}`} aria-pressed={index === position} onClick={() => select(position)} className={`relative h-12 w-14 overflow-hidden rounded-lg border-2 transition-opacity motion-reduce:transition-none ${position === index ? "border-emerald-600 opacity-100 dark:border-emerald-300" : "border-transparent opacity-55 hover:opacity-100"}`}>{item.format === "video" ? <Play aria-hidden="true" className="mx-auto size-5" /> : <Image src={item.src} alt="" fill sizes="56px" unoptimized={item.format === "gif"} className="object-cover" />}</button>)}</div>
        </section>
      </div>
      <ol aria-label="Career experience, newest to oldest" className="space-y-3">{entries.map(({ id: entryId, date, title, organization, details, icon: Icon }) => <li key={entryId}><article className="grid grid-cols-[4.5rem_minmax(0,1fr)] gap-3 rounded-2xl border border-slate-200/70 bg-white px-4 py-4 shadow-sm dark:border-slate-700 dark:bg-slate-900/70"><div className="flex flex-col items-center gap-2"><span className="flex size-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950"><Icon aria-hidden="true" className="size-5 text-emerald-800 dark:text-emerald-200" /></span><span className="text-center text-[10px] font-bold leading-4 text-slate-950 dark:text-slate-50">{date}</span></div><div className="min-w-0"><h3 className="text-sm font-bold leading-5 text-slate-950 dark:text-white">{title}</h3><p className="mt-1 text-xs font-medium leading-5 text-slate-600 dark:text-slate-300">{organization}</p><ul className="mt-3 space-y-2 list-disc pl-4 text-xs leading-5 text-slate-700 marker:text-emerald-600 dark:text-slate-200">{details.map((detail) => <li key={detail}>{detail}</li>)}</ul></div></article></li>)}</ol>
    </div>
  </section>;
}
