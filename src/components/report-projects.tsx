"use client";

import dynamic from "next/dynamic";

import { useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight, X } from "lucide-react";
import { categories, reportProjects, skillGroups, type Category, type Skill } from "@/lib/projects";
import { projectSummaries } from "@/lib/project-summaries";

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
  const [selected, setSelected] = useState<string | null>(null);
  const projectButtons = useRef(new Map<string, HTMLButtonElement>());
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const portfolioHeading = useRef<HTMLHeadingElement>(null);
  const visible = reportProjects.filter((project) => (category === "All" || project.categories.includes(category)) && (skill === null || project.skills.includes(skill)));
  const selectedProject = reportProjects.find((project) => project.id === selected);
  const evidence = reportProjects.filter((project) => project.skills.includes(evidenceSkill));

  function closeCase() {
    const previous = selected;
    setSelected(null);
    if (returnFocus.current?.isConnected) returnFocus.current.focus();
    else if (previous) projectButtons.current.get(previous)?.focus();
  }
  function resetFilters() { setCategory("All"); setSkill(null); setSelected(null); }
  function filterBySkill() {
    setCategory("All"); setSkill(evidenceSkill); setSelected(null);
    portfolioHeading.current?.focus({ preventScroll: true });
    portfolioHeading.current?.scrollIntoView({ behavior: reduce ? "instant" : "smooth", block: "start" });
  }

  return <>
    <section id="portfolio" aria-labelledby={`${id}-heading`} className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <p className="eyebrow">01 / Selected projects</p>
      <h2 ref={portfolioHeading} tabIndex={-1} id={`${id}-heading`} className="section-heading mt-4">The work. The role. The result.</h2>
      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">Five projects connecting business questions to usable data. Start with the overview, then open a case study to see my contribution and supporting evidence.</p>
      <fieldset className="mt-8"><legend className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">Browse by type of work</legend><div className="flex flex-wrap gap-2">{categories.map((item) => <button key={item} type="button" aria-pressed={category === item} aria-controls={`${id}-results`} onClick={() => { setCategory(item); setSelected(null); }} className={`filter-button ${category === item ? "filter-active" : "filter-idle"}`}>{item === "All" ? "All projects" : item === "Requirements" ? "Business requirements" : item === "Data engineering" ? "Data preparation" : item === "Training & UAT" ? "Training & testing" : item}</button>)}</div></fieldset>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <p role="status" className="text-xs text-slate-500 dark:text-slate-400">{visible.length} {visible.length === 1 ? "project" : "projects"}{skill ? ` using ${skill}` : ""}</p>
        {skill && <button type="button" onClick={() => { setSkill(null); setSelected(null); }} className="filter-button filter-idle" aria-label={`Clear ${skill} skill filter`}>{skill}<X className="size-3" aria-hidden="true" /></button>}
        {(skill || category !== "All") && <button type="button" onClick={resetFilters} className="min-h-11 text-xs underline underline-offset-4">Show all projects</button>}
      </div>
      {selectedProject && <div id={`${id}-case`}><ProjectCaseStudy key={selectedProject.id} project={selectedProject} onClose={closeCase} /></div>}
      <div id={`${id}-results`} className="mt-6">
        <ul className="grid gap-6 md:grid-cols-2">
          <AnimatePresence initial={false}>
            {visible.map((project) => {
              const summary = projectSummaries[project.id];
              const featured = project.id === "statsdw";
              return <motion.li key={project.id} layout={reduce ? false : "position"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.2 }} className={featured ? "md:col-span-2" : ""}>
                <article className={`flex h-full flex-col overflow-hidden rounded-2xl border bg-white dark:bg-slate-900/40 ${selected === project.id ? "border-emerald-500" : "border-slate-200 dark:border-slate-800"}`}>
                  <div className={`grid h-full ${featured ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
                    <div className="flex flex-col p-6 sm:p-7">
                      <p className="text-xs font-medium leading-5 text-slate-500 dark:text-slate-400">{featured && <span className="mr-2 font-semibold text-emerald-800 dark:text-emerald-300">Featured project /</span>}{project.client}</p>
                      <h3 className="mt-3 text-2xl font-semibold leading-tight tracking-tight">{summary.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{summary.purpose}</p>
                      <div className="mt-5"><p className="text-xs font-semibold text-slate-900 dark:text-slate-100">My contribution</p><p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{summary.contribution}</p></div>
                      <ul aria-label="Tools and skills" className="mt-5 flex flex-wrap gap-2">{project.skills.slice(0, 3).map((tool) => <li key={tool} className="rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tool}</li>)}</ul>
                      <button ref={(node) => { if (node) projectButtons.current.set(project.id, node); else projectButtons.current.delete(project.id); }} type="button" aria-label={`${selected === project.id ? "Close" : "Read"} case study: ${summary.title}`} aria-expanded={selected === project.id} aria-controls={selected === project.id ? `${id}-case` : undefined} onClick={(event) => { returnFocus.current = event.currentTarget; if (selected === project.id) closeCase(); else setSelected(project.id); }} className="mt-6 flex min-h-11 items-center justify-between gap-3 border-t border-slate-200 pt-4 text-left text-sm font-semibold text-emerald-800 hover:underline dark:border-slate-700 dark:text-emerald-300">{selected === project.id ? "Close case study" : "Read case study"}<ArrowUpRight aria-hidden="true" className="size-4" /></button>
                    </div>
                    <div className={`flex flex-col justify-center border-slate-200 bg-slate-50 p-6 sm:p-7 dark:border-slate-800 dark:bg-slate-950/60 ${featured ? "border-t lg:border-l lg:border-t-0" : "border-t"}`}>
                      <p className="eyebrow">{featured ? "Delivery milestone" : "What the work produced"}</p>
                      <p className="mt-3 text-2xl font-semibold tracking-tight text-emerald-800 dark:text-emerald-300">{summary.proof}</p>
                      <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">{summary.proofLabel}</p>
                      <ol aria-label="Work overview" className="mt-6 space-y-3">{summary.steps.map((step, index) => <li key={step} className="flex items-center gap-3 text-xs"><span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 font-mono text-[10px] text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200">{index + 1}</span><span>{step}</span></li>)}</ol>
                    </div>
                  </div>
                </article>
              </motion.li>;
            })}
          </AnimatePresence>
        </ul>
        {visible.length === 0 && <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700"><h3 className="text-xl font-semibold">No projects match both filters.</h3><button type="button" onClick={resetFilters} className="action-button mt-5">Show all projects</button></div>}
      </div>
    </section>
    <section id="skills" aria-labelledby={`${id}-skills`} className="border-y border-slate-200 bg-slate-100/60 py-20 sm:py-24 dark:border-slate-800 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-6">
        <p className="eyebrow">02 / Capability → evidence</p><h2 id={`${id}-skills`} className="section-heading mt-4">Skills are a starting point.<br />The work is the evidence.</h2>
        <p className="mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-400">Choose a capability to see where I have used it. The connections below come from the projects in this portfolio.</p>
        <div className="mt-9 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid gap-5 sm:grid-cols-2">{skillGroups.map((group, index) => <div key={group.title} className="border-t border-slate-300 pt-5 dark:border-slate-700"><h3 className="mb-3 flex items-center gap-3 text-sm font-semibold"><span className="font-mono text-xs text-emerald-700 dark:text-emerald-300">0{index + 1}</span>{group.title}</h3><ul className="flex flex-wrap gap-2">{group.skills.map((item) => {
            const count = reportProjects.filter((p) => p.skills.includes(item)).length;
            if (count === 0) return null;
            return <li key={item}><button type="button" aria-pressed={evidenceSkill === item} aria-controls={`${id}-evidence`} onClick={() => setEvidenceSkill(item)} className={`filter-button ${evidenceSkill === item ? "filter-active" : "filter-idle"}`}>{item}<span className="font-mono text-xs opacity-75">{count}</span></button></li>;
          })}</ul></div>)}</div>
          <div id={`${id}-evidence`} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-950">
            <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full border border-emerald-700/30 font-mono text-xs text-emerald-800 dark:text-emerald-300">NI</span><span aria-hidden="true" className="h-px flex-1 bg-emerald-700/30" /><span className="text-sm font-semibold">{evidenceSkill}</span></div>
            <p role="status" className="mt-6 text-sm text-slate-600 dark:text-slate-400">{evidence.length ? `${evidence.length} linked ${evidence.length === 1 ? "project" : "projects"}` : "No published project evidence yet"}</p>
            <ul className="mt-3 space-y-3">{evidence.map((p) => <li key={p.id} className="relative border-l-2 border-emerald-600 pl-4"><p className="text-sm font-semibold leading-6">{p.title}</p><p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{p.client}</p></li>)}</ul>
            {evidence.length ? <button type="button" onClick={filterBySkill} className="action-button mt-6">Filter projects by {evidenceSkill}<ArrowDown aria-hidden="true" className="size-4 rotate-180" /></button> : <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">This tool is listed in my toolkit; a case study demonstrating it has not been added.</p>}
          </div>
        </div>
        <p className="mt-6 text-sm text-slate-600 dark:text-slate-400">Additional toolkit: Power BI · a supporting case study has not been published yet.</p>
        {skillsFooter}
      </div>
    </section>
  </>;
}

