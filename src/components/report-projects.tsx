"use client";



import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { categories, reportProjects, type Category } from "@/lib/projects";
import { projectSummaries } from "@/lib/project-summaries";
import { ProjectPreviewCarousel } from "@/components/project-preview-carousel";

export { reportProjects, type ReportProject } from "@/lib/projects";


export function ReportProjects() {
  const id = useId();
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<Category>("All");
  const visible = reportProjects.filter((project) => (category === "All" || project.categories.includes(category)));


  function resetFilters() { setCategory("All"); }


  return <>
    <section id="portfolio" aria-labelledby={`${id}-heading`} className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <p className="eyebrow">01 / Selected projects</p>
      <h2 id={`${id}-heading`} className="section-heading mt-4">From questions to outcomes.</h2>
      <fieldset className="mt-8"><legend className="mb-3 text-sm font-medium text-slate-600 dark:text-slate-300">Browse by type of work</legend><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls={`${id}-results`} onClick={() => { setCategory(item); }} className={`filter-button ${category === item ? "filter-active" : "filter-idle"}`}>{item === "All" ? `All projects (${reportProjects.length})` : item === "Requirements" ? "Business requirements" : item === "Data engineering" ? "Data preparation" : item === "Training & UAT" ? "Training & testing" : item}</button>)}</div></fieldset>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p role="status" className="project-count text-sm font-medium text-slate-600 dark:text-slate-300">{visible.length} {visible.length === 1 ? "project" : "projects"}</p>
        {(category !== "All") && <button type="button" onClick={resetFilters} className="min-h-11 text-xs underline underline-offset-4">Show all projects</button>}
      </div>

      <div id={`${id}-results`} className="mt-6">
        <ul className="grid gap-5">
          <AnimatePresence initial={false}>
            {visible.map((project) => {
              const summary = projectSummaries[project.id];
              const featured = project.id === "statsdw";
              return <motion.li key={project.id} layout={reduce ? false : "position"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} >
                <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40">
                  <div className="grid lg:grid-cols-[1.15fr_1fr]">
                    <div className="project-copy flex flex-col p-6 sm:p-8"><p className="eyebrow mb-4 flex min-h-11 items-center">Project</p>
                      <p className="text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">{featured && <span className="mr-2 font-semibold text-emerald-800 dark:text-emerald-300">Featured project /</span>}{project.client}</p>
                      <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">{summary.title}</h3>
                      <div className="mt-4 border-l border-emerald-200 pl-3 dark:border-emerald-800"><p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-800 dark:text-emerald-300">The brief</p><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{summary.purpose}</p></div>
                      <ul aria-label="My contribution" className="mt-4 space-y-2">{summary.bullets.map((bullet) => <li key={bullet} className="flex gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300"><Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" /><span>{bullet}</span></li>)}</ul>
                      <p className="mt-4 text-xs font-medium text-emerald-800 dark:text-emerald-300">{summary.proof} · {summary.proofLabel}</p>
                      <ul aria-label="Tools and skills" className="mt-auto flex flex-wrap gap-3 pt-8">{project.skills.map((tool) => <li key={tool} className="rounded-md bg-slate-100 px-3 py-1.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tool}</li>)}</ul>
                    </div>
                    <ProjectPreviewCarousel project={project} />
                  </div>
                </article>
              </motion.li>;
            })}
          </AnimatePresence>
        </ul>
        {visible.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700"><h3 className="text-xl font-semibold">No projects match this filter.</h3><button type="button" onClick={resetFilters} className="action-button mt-5">Show all projects</button></div>}
      </div>
    </section>

  </>;
}


