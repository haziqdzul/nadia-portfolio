"use client";

import dynamic from "next/dynamic";
import { useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, LayoutGrid, List, X } from "lucide-react";
import { categories, reportProjects, skillGroups, type Category, type Skill } from "@/lib/projects";
import { ProjectVisual } from "@/components/project-visual";

export { reportProjects, type ReportProject } from "@/lib/projects";
const ProjectCaseStudy = dynamic(() => import("@/components/project-case-study").then((module) => module.ProjectCaseStudy), {
  loading: () => <p role="status" className="py-8">Opening project evidence…</p>,
});

export function ReportProjects({ skillsFooter }: Readonly<{ skillsFooter?: ReactNode }>) {
  const id = useId();
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<Category>("All");
  const [skill, setSkill] = useState<Skill | null>(null);
  const [evidenceSkill, setEvidenceSkill] = useState<Skill>("SQL");
  const [view, setView] = useState<"workspace" | "list">("workspace");
  const [selected, setSelected] = useState<string | null>(null);
  const projectButtons = useRef(new Map<string, HTMLButtonElement>());
  const portfolioHeading = useRef<HTMLHeadingElement>(null);
  const visible = reportProjects.filter((project) => (category === "All" || project.categories.includes(category)) && (skill === null || project.skills.includes(skill)));
  const selectedProject = reportProjects.find((project) => project.id === selected);
  const evidence = reportProjects.filter((project) => project.skills.includes(evidenceSkill));

  function closeCase() {
    const previous = selected;
    setSelected(null);
    if (previous) projectButtons.current.get(previous)?.focus();
  }
  function resetFilters() { setCategory("All"); setSkill(null); setSelected(null); }
  function filterBySkill() {
    setCategory("All"); setSkill(evidenceSkill); setSelected(null);
    portfolioHeading.current?.focus({ preventScroll: true });
    portfolioHeading.current?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
  }

  return <>
    <section id="portfolio" aria-labelledby={`${id}-heading`} className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div><p className="eyebrow">01 / Project sandbox</p><h2 ref={portfolioHeading} tabIndex={-1} id={`${id}-heading`} className="section-heading mt-4">Every project.<br />A different way to find clarity.</h2></div>
        <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">Filter like a report. Open a project to follow the thinking, explore its transformation, and examine the evidence.</p>
      </div>
      <div className="mt-10 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 dark:border-slate-800 dark:bg-slate-900/40">
        <fieldset><legend className="eyebrow mb-4">Slice by type of work</legend><div className="flex flex-wrap gap-2">
          {categories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls={`${id}-results`} onClick={() => { setCategory(item); setSelected(null); }} className={`filter-button ${category === item ? "filter-active" : "filter-idle"}`}>{item}<span className="font-mono text-xs opacity-75">{reportProjects.filter((p) => (item === "All" || p.categories.includes(item)) && (!skill || p.skills.includes(skill))).length}</span></button>)}
        </div></fieldset>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-800">
          <p role="status" aria-atomic="true" className="font-mono text-xs text-slate-600 dark:text-slate-400">{String(visible.length).padStart(2, "0")} / 05 projects{skill ? ` · ${skill}` : ""}</p>
          <div className="flex flex-wrap items-center gap-2">
            {skill && <button type="button" onClick={() => { setSkill(null); setSelected(null); }} className="filter-button filter-idle" aria-label={`Clear ${skill} skill filter`}>{skill}<X className="size-3" aria-hidden="true" /></button>}
            {(skill || category !== "All") && <button type="button" onClick={resetFilters} className="min-h-11 px-3 text-xs underline underline-offset-4">Reset filters</button>}
            <div className="flex gap-1" aria-label="Project display">
              <button type="button" aria-pressed={view === "workspace"} onClick={() => setView("workspace")} className={`filter-button ${view === "workspace" ? "filter-active" : "filter-idle"}`}><LayoutGrid aria-hidden="true" className="size-4" /><span className="hidden sm:inline">Workspace</span><span className="sr-only sm:hidden">Workspace</span></button>
              <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")} className={`filter-button ${view === "list" ? "filter-active" : "filter-idle"}`}><List aria-hidden="true" className="size-4" />List</button>
            </div>
          </div>
        </div>
      </div>
      <div id={`${id}-results`} className="mt-5">
        <ul className={`grid gap-4 ${view === "workspace" ? "md:grid-cols-2" : "grid-cols-1"}`}>
          <AnimatePresence initial={false}>
            {visible.map((project, index) => <motion.li key={project.id} layout={reduce ? false : "position"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} className={view === "workspace" && project.id === "statsdw" ? "md:col-span-2" : ""}>
              <button ref={(node) => { if (node) projectButtons.current.set(project.id, node); else projectButtons.current.delete(project.id); }} type="button" aria-expanded={selected === project.id} aria-controls={selected === project.id ? `${id}-case` : undefined} onClick={() => selected === project.id ? closeCase() : setSelected(project.id)} className={`group h-full w-full rounded-xl border p-6 text-left transition-[border-color,box-shadow] duration-200 hover:border-emerald-600 hover:shadow-lg hover:shadow-emerald-950/5 dark:hover:border-emerald-400 ${selected === project.id ? "border-emerald-600 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/30" : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40"}`}>
                <div className={`grid items-center gap-6 ${view === "workspace" && project.id === "statsdw" ? "lg:grid-cols-2" : ""}`}>
                  <div><div className="flex items-start justify-between gap-3"><p className="eyebrow leading-5">{project.client}</p><span className="font-mono text-xs text-slate-500 dark:text-slate-400">0{index + 1}</span></div>
                  <h3 className={`mt-4 font-semibold leading-snug tracking-tight ${view === "workspace" ? "text-2xl" : "text-xl"}`}>{project.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{project.description}</p>
                  <p className="mt-4 text-xs font-medium text-emerald-800 dark:text-emerald-300">{project.highlights.join(" / ")}</p>
                  <span className="mt-6 flex items-center justify-between gap-3 border-t border-slate-200 pt-4 dark:border-slate-700"><span className="text-xs text-slate-600 dark:text-slate-400">{project.skills.slice(0, 3).join(" · ")}</span><span className="flex shrink-0 items-center gap-1 text-xs font-semibold">{selected === project.id ? "Close" : "Explore"}<ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none" /></span></span></div>
                  {view === "workspace" && <div aria-hidden="true" className="pointer-events-none"><ProjectVisual kind={project.visual} /></div>}
                </div>
              </button>
            </motion.li>)}
          </AnimatePresence>
        </ul>
        {visible.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700"><h3 className="text-xl font-semibold">No projects match both filters.</h3><button type="button" onClick={resetFilters} className="action-button mt-5">Show all projects</button></div>}
      </div>
      {selectedProject && <div id={`${id}-case`}><ProjectCaseStudy key={selectedProject.id} project={selectedProject} onClose={closeCase} /></div>}
    </section>

    <section id="skills" aria-labelledby={`${id}-skills`} className="border-y border-slate-200 bg-slate-100/60 py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">02 / Capability → evidence</p><h2 id={`${id}-skills`} className="section-heading mt-4">Skills are a starting point.<br />The work is the evidence.</h2>
        <p className="mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">Choose a capability to see where I have used it. The connections below come from the projects in this portfolio.</p>
        <div className="mt-9 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2">{skillGroups.map((group, index) => <div key={group.title} className="border-t border-slate-300 pt-5 dark:border-slate-700"><h3 className="mb-3 flex items-center gap-3 text-sm font-semibold"><span className="font-mono text-xs text-emerald-700 dark:text-emerald-300">0{index + 1}</span>{group.title}</h3><ul className="flex flex-wrap gap-2">{group.skills.map((item) => {
            const count = reportProjects.filter((p) => p.skills.includes(item)).length;
            return <li key={item}><button type="button" aria-pressed={evidenceSkill === item} aria-controls={`${id}-evidence`} onClick={() => setEvidenceSkill(item)} className={`filter-button ${evidenceSkill === item ? "filter-active" : "filter-idle"}`}>{item}<span className="font-mono text-xs opacity-75">{count}</span></button></li>;
          })}</ul></div>)}</div>
          <div id={`${id}-evidence`} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-emerald-700/30 font-mono text-xs text-emerald-800 dark:text-emerald-300">NI</span><span aria-hidden="true" className="h-px flex-1 bg-emerald-700/30" /><span className="text-sm font-semibold">{evidenceSkill}</span></div>
            <p role="status" className="mt-6 text-sm text-slate-600 dark:text-slate-400">{evidence.length ? `${evidence.length} linked ${evidence.length === 1 ? "project" : "projects"}` : "No published project evidence yet"}</p>
            <ul className="mt-3 space-y-3">{evidence.map((p) => <li key={p.id} className="relative border-l-2 border-emerald-600 pl-4"><p className="text-sm font-semibold leading-6">{p.title}</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{p.client}</p></li>)}</ul>
            {evidence.length ? <button type="button" onClick={filterBySkill} className="action-button mt-6">Filter projects by {evidenceSkill}<ArrowDown aria-hidden="true" className="size-4 rotate-180" /></button> : <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">This tool is listed in my toolkit; a case study demonstrating it has not been added.</p>}
          </div>
        </div>
        {skillsFooter}
      </div>
    </section>
  </>;
}
