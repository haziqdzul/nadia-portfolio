"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, X } from "lucide-react";
import type { ReportProject } from "@/lib/projects";
import { projectStories } from "@/lib/project-stories";
import { ProjectVisual } from "@/components/project-visual";
import { SchemaEvidence } from "./schema-evidence";
import { RequirementsEvidence } from "./requirements-evidence";
import { ProjectMemoryGallery } from "./project-memory-gallery";
import { projectMedia } from "@/lib/project-media";

export function ProjectCaseStudy({ project, onClose }: Readonly<{ project: ReportProject; onClose: () => void }>) {
  const heading = useRef<HTMLHeadingElement>(null);
  const [transformed, setTransformed] = useState(false);
  const [chapter, setChapter] = useState(0);
  const article = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const story = projectStories[project.id];

  useEffect(() => { heading.current?.focus({ preventScroll: true }); heading.current?.scrollIntoView({ block: "start", behavior: "instant" }); }, []);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setChapter(Number((entry.target as HTMLElement).dataset.chapter));
    }, { rootMargin: "-15% 0px -50% 0px" });
    article.current?.querySelectorAll("[data-chapter]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  if (!story) return null;

  return (
    <motion.article ref={article} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: reduce ? 0 : 0.25 }} className="mt-8 overflow-hidden rounded-xl border border-emerald-700/30 bg-white dark:border-emerald-300/25 dark:bg-slate-900" aria-labelledby={`case-${project.id}`}>
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
        <p className="eyebrow">Overview / Investigation / Evidence</p>
        <button type="button" onClick={onClose} className="flex min-h-11 items-center gap-2 px-2 text-sm font-medium"><span className="hidden sm:inline">Back to projects</span><X className="size-5" aria-hidden="true" /><span className="sr-only sm:hidden">Back to projects</span></button>
      </div>
      <div className="p-6 sm:p-10">
        <p className="eyebrow">{project.client}</p>
        <h3 ref={heading} tabIndex={-1} id={`case-${project.id}`} className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
        {project.id === "oracle" && <SchemaEvidence />}
        <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.8fr_1fr]">
          <div className="lg:sticky lg:top-28">
            {project.id === "statsdw" ? <RequirementsEvidence /> : project.id === "oracle" ? (
              <div className="rounded-lg border border-slate-200 p-5 dark:border-slate-700"><p className="eyebrow">Published project scope</p><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Schema adaptation and source-issue documentation across Kuala Lumpur, Labuan, and Putrajaya. The independent lab above demonstrates design reasoning; it does not reproduce these client schemas.</p></div>
            ) : <>
            <p className="eyebrow">Explore the transformation</p>
            <div className="my-4 flex gap-2" aria-label="Transformation view">
              {([false, true] as const).map((value) => <button key={String(value)} type="button" aria-pressed={transformed === value} onClick={() => setTransformed(value)} className={`filter-button ${transformed === value ? "filter-active" : "filter-idle"}`}>{value ? "After · Structured" : "Before · Inputs"}</button>)}
            </div>
            <div className="min-h-64 rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950">
              <p className="mb-4 font-mono text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300">{transformed ? "A usable output" : "Starting material"}</p>
              <ul className="space-y-3" aria-live="polite" aria-atomic="true">{(transformed ? story.after : story.before).map((item, i) => <motion.li key={item} initial={false} animate={{ x: transformed ? 0 : (i % 2) * 8 }} transition={{ duration: reduce ? 0 : 0.3 }} className="flex items-start gap-3 border-l-2 border-emerald-600 bg-white p-3 text-sm dark:bg-slate-900"><span className="font-mono text-xs text-slate-500 dark:text-slate-400">0{i + 1}</span>{item}</motion.li>)}</ul>
            </div>
            <p className="my-4 text-xs leading-5 text-slate-500 dark:text-slate-400">Process reconstruction from the project summary. These are illustrative structures, not original client artifacts.</p>
            <ProjectVisual kind={project.visual} />
            </>}
          </div>
          <div>
            <nav aria-label="Case study chapters" className="mb-6 flex flex-wrap gap-2">
              {["Problem", "Reasoning", "Solution", "Outcome"].map((label, index) => <a key={label} href={`#${project.id}-chapter-${index}`} aria-current={chapter === index ? "location" : undefined} className={`inline-flex min-h-11 items-center border-b-2 px-2 text-xs ${chapter === index ? "border-emerald-600 text-emerald-800 dark:text-emerald-300" : "border-transparent text-slate-500 dark:text-slate-400"}`}>{label}</a>)}
            </nav>
            {([ ["Problem", story.problem], ["Reasoning", story.reasoning], ["Solution", story.solution], ["Outcome", story.outcome] ] as const).map(([label, text], index) => <section key={label} id={`${project.id}-chapter-${index}`} data-chapter={index} className="relative border-t border-slate-200 py-8 dark:border-slate-700">
              <p className="eyebrow flex items-center gap-3"><span className="font-mono text-emerald-700 dark:text-emerald-300">0{index + 1}</span>{label}</p>
              <p className="mt-4 text-lg leading-8 text-slate-700 dark:text-slate-200">{text}</p>
            </section>)}
            <button type="button" onClick={onClose} className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-emerald-800 dark:text-emerald-300">Explore another project <ArrowRight className="size-4" aria-hidden="true" /></button>
          </div>
        </div>
        <ProjectMemoryGallery items={projectMedia.filter((item) => item.projectId === project.id)} />
      </div>
    </motion.article>
  );
}
