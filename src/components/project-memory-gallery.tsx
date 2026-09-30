"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Expand, ImageIcon, Network, X } from "lucide-react";
import { canDisplayMedia, type ProjectMedia } from "@/lib/project-media";

function MediaCanvas({ item, enlarged = false }: { item: ProjectMedia; enlarged?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (!canDisplayMedia(item) || failed) return (
    <div className="relative flex h-full min-h-56 flex-col justify-between overflow-hidden bg-slate-100 p-6 dark:bg-slate-950 sm:p-8">
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:32px_32px] text-slate-900/[0.04] dark:text-white/[0.04]" />
      <div aria-hidden="true" className="relative flex items-center gap-3 text-emerald-700 dark:text-emerald-300">
        {item.kind === "artifact" ? <Network className="size-6" /> : <ImageIcon className="size-6" />}
        <span className="h-px flex-1 bg-emerald-700/20 dark:bg-emerald-300/20" />
        <span className="size-3 rounded-full border border-current" />
      </div>
      <div aria-hidden="true" className="relative my-6 grid grid-cols-3 items-center gap-3">
        {[0, 1, 2].map((i) => <div key={i} className={`rounded-lg border border-slate-300 bg-white/80 p-3 dark:border-slate-700 dark:bg-slate-900/80 ${i === 1 ? "translate-y-3" : ""}`}><div className="mb-3 h-1 w-5 rounded bg-emerald-600/40" /><div className="h-1 w-full rounded bg-slate-300 dark:bg-slate-700" /><div className="mt-2 h-1 w-2/3 rounded bg-slate-200 dark:bg-slate-800" /></div>)}
      </div>
      <div className="relative"><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{item.title}</p><p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{failed ? "Image unavailable" : !item.isClearedForPublic ? "NDA review pending" : "Asset preparation pending"} · Layout preview</p></div>
    </div>
  );
  return <Image src={item.src} alt={item.alt} fill sizes={enlarged ? "95vw" : "(min-width: 1024px) 520px, (min-width: 640px) 45vw, 90vw"} onError={() => setFailed(true)} className={item.kind === "artifact" || enlarged ? "object-contain p-3" : "object-cover saturate-[0.85] transition duration-300 group-hover:saturate-100 group-focus-visible:saturate-100 motion-reduce:transition-none"} />;
}

function MediaLightbox({ items, initialId, onClose }: { items: readonly ProjectMedia[]; initialId: string; onClose: () => void }) {
  const [index, setIndex] = useState(() => Math.max(0, items.findIndex((item) => item.id === initialId)));
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const id = useId();
  const item = items[index];
  useEffect(() => {
    const element = dialog.current;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    return () => { element?.close(); document.body.style.overflow = previousOverflow; if (trigger?.isConnected) trigger.focus({ preventScroll: true }); };
  }, []);
  if (!item) return null;
  function move(delta: number) { setIndex((current) => (current + delta + items.length) % items.length); }
  return (
    <dialog ref={dialog} aria-labelledby={`${id}-title`} aria-describedby={`${id}-caption`} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={(event) => { if (event.key === "Tab") { const controls = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")); const first = controls[0]; const last = controls[controls.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); } } if (event.key === "ArrowRight") { event.preventDefault(); move(1); } if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); } }} className="fixed inset-0 m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-6xl overflow-y-auto rounded-2xl border border-slate-300 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/85 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
      <div className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4"><h2 id={`${id}-title`} className="font-semibold">{item.title}</h2><button ref={closeButton} type="button" onClick={onClose} aria-label="Close image viewer" className="flex size-11 shrink-0 items-center justify-center rounded-full border border-slate-300 dark:border-slate-600"><X aria-hidden="true" className="size-5" /></button></div>
        <div className="relative mt-4 h-[55dvh] min-h-48 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-950"><MediaCanvas key={item.id} item={item} enlarged /></div>
        <p id={`${id}-caption`} className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.caption}</p>
        <div className="mt-4 flex items-center justify-between gap-2"><button type="button" disabled={items.length < 2} onClick={() => move(-1)} className="filter-button filter-idle disabled:opacity-40" aria-label="Previous image"><ArrowLeft className="size-4" aria-hidden="true" />Previous</button><p role="status" className="text-xs">{index + 1} / {items.length}</p><button type="button" disabled={items.length < 2} onClick={() => move(1)} className="filter-button filter-idle disabled:opacity-40" aria-label="Next image">Next<ArrowRight className="size-4" aria-hidden="true" /></button></div>
      </div>
    </dialog>
  );
}

export function ProjectMemoryGallery({ items, title = "The work, in context", description = "People, decisions, and delivery artifacts behind the project." }: Readonly<{ items: readonly ProjectMedia[]; title?: string; description?: string }>) {
  const id = useId();
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<string | null>(null);
  const available = items.filter(canDisplayMedia);
  if (!items.length) return null;
  return (
    <section aria-labelledby={`${id}-heading`} className="mt-12 border-t border-slate-200 pt-10 dark:border-slate-700">
      <p className="eyebrow">Project memory & evidence</p><h3 id={`${id}-heading`} className="mt-3 text-2xl font-semibold tracking-tight">{title}</h3><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {items.map((item, index) => <motion.figure key={item.id} initial={false} whileInView={{ opacity: [0.85, 1], y: reduce ? 0 : [12, 0] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : Math.min(index, 3) * 0.07 }} className="min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
          {canDisplayMedia(item) ? <button type="button" onClick={() => setSelected(item.id)} aria-label={`Enlarge ${item.title}`} aria-haspopup="dialog" className="group relative block aspect-[8/5] w-full overflow-hidden bg-slate-100 focus-visible:outline-offset-[-4px] dark:bg-slate-950"><MediaCanvas item={item} /><span className="absolute bottom-3 right-3 flex size-11 items-center justify-center rounded-full bg-slate-950/80 text-white"><Expand className="size-4" aria-hidden="true" /></span></button> : <div className="relative aspect-[8/5]"><MediaCanvas item={item} /></div>}
          <figcaption className="p-5"><p className="eyebrow">{item.kind}{item.dateLabel ? ` · ${item.dateLabel}` : ""}</p><p className="mt-2 font-semibold">{item.title}</p><p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.caption}</p>{item.metric && <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700"><p className="text-xl font-semibold text-emerald-800 dark:text-emerald-300">{item.metric.value} <span className="text-sm font-normal">{item.metric.label}</span></p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{item.metric.context}</p></div>}</figcaption>
        </motion.figure>)}
      </div>
      {selected && available.some((item) => item.id === selected) && <MediaLightbox items={available} initialId={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

