"use client";

import { useId, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";


const categories = ["All", "Requirements", "Data engineering", "Dashboards", "Training & UAT", "Analysis"] as const;
type Category = (typeof categories)[number];
const skillGroups = [
  { title: "Business analysis", skills: ["Requirements", "SME workshops", "Process mapping", "Thematic analysis"] },
  { title: "Data", skills: ["SQL", "Oracle", "Doris / StarRocks", "Data modelling", "Data cleaning", "Data readiness"] },
  { title: "Visualisation", skills: ["Tableau", "Power BI"] },
  { title: "Delivery", skills: ["UAT", "Training", "Statistics", "ESG analysis"] },
] as const;
type Skill = (typeof skillGroups)[number]["skills"][number];
type Visual = "timeline" | "mapping" | "matrix" | "scatter" | "heat";
export type ReportProject = Readonly<{
  id: string;
  client: string;
  title: string;
  description: string;
  categories: readonly Exclude<Category, "All">[];
  skills: readonly Skill[];
  highlights: readonly string[];
  visual: Visual;
}>;

// Project facts supplied by the linked reference. Visual samples are illustrative.
export const reportProjects: readonly ReportProject[] = [
  {
    id: "statsdw", client: "Department of Statistics Malaysia · STATSDW",
    title: "Rolling out a national statistics data warehouse",
    description: "Supported requirements, data readiness, user training, UAT, and rollout for DOSM, including a two-day expansion workshop and follow-up coaching.",
    categories: ["Requirements", "Training & UAT"],
    skills: ["Requirements", "Data readiness", "SME workshops", "Training", "UAT"],
    highlights: ["Go-live · June 2025", "FAT · July 2025", "Two-day workshop"], visual: "timeline",
  },
  {
    id: "oracle", client: "Public-sector health data programme",
    title: "Migrating a data warehouse schema to Oracle",
    description: "Adapted Doris and StarRocks schemas for vaccine forecasting into Oracle DDL, standardizing type mappings and documenting source inconsistencies for review.",
    categories: ["Data engineering"], skills: ["SQL", "Oracle", "Doris / StarRocks", "Data modelling"],
    highlights: ["Kuala Lumpur", "Labuan", "Putrajaya"], visual: "mapping",
  },
  {
    id: "enforcement", client: "Federal enforcement agency",
    title: "Turning SME knowledge into nine use cases",
    description: "Organized subject-matter expert input into a seven-column thematic framework and mapped nine use cases to make requirements and processes explicit.",
    categories: ["Requirements"], skills: ["SME workshops", "Thematic analysis", "Requirements", "Process mapping"],
    highlights: ["Seven-column framework", "Nine use cases"], visual: "matrix",
  },
  {
    id: "cidb", client: "CIDB Malaysia",
    title: "Profiling consultant performance in construction",
    description: "Prepared consultant records and built Tableau views to support consistent comparisons of consultant performance for the Construction Industry Development Board.",
    categories: ["Data engineering", "Dashboards"], skills: ["Tableau", "Data cleaning", "Statistics"],
    highlights: ["Consultant comparisons", "Performance profiling"], visual: "scatter",
  },
  {
    id: "esg", client: "MCIS Insurance Berhad · Internship",
    title: "ESG and climate risk analysis for an insurer",
    description: "Applied statistical methods to ESG and climate-risk questions during an insurance internship, supporting sustainability analysis.",
    categories: ["Analysis"], skills: ["Statistics", "ESG analysis"],
    highlights: ["ESG analysis", "Climate risk"], visual: "heat",
  },
];

function ProjectVisual({ kind }: Readonly<{ kind: Visual }>) {
  const surface = "rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/60";
  if (kind === "timeline") return (
    <div className={surface}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Delivery · 2025</p>
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[ ["Feb", "Training"], ["Mar", "UAT"], ["Apr", "PAT / TOT / TOK"], ["Jun", "Go-live"], ["Jul", "FAT"] ].map(([month, label]) => (
          <li key={month} className="border-l-2 border-violet-400 pl-3 text-xs leading-5"><span className="block font-bold text-violet-700 dark:text-violet-300">{month}</span>{label}</li>
        ))}
      </ol>
    </div>
  );
  if (kind === "mapping") return (
    <div className={surface}>
      <table className="w-full text-left text-xs leading-6">
        <caption className="mb-3 text-left font-semibold">Schema type mapping</caption>
        <thead><tr><th scope="col">Doris / StarRocks</th><th scope="col">Oracle</th></tr></thead>
        <tbody>{[["datetime", "DATE / TIMESTAMP"], ["double", "NUMBER"], ["Identifiers", "Oracle naming rules"], ["Source issues", "Flagged for review"]].map(([source, target]) => (
          <tr key={source} className="border-t border-slate-200 dark:border-slate-700"><td className="py-1 pr-3">{source}</td><td className="py-1">{target}</td></tr>
        ))}</tbody>
      </table>
    </div>
  );
  if (kind === "matrix") return (
    <div className={surface}>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Structure only · nine use cases × seven columns</p>
      <div role="img" aria-label="Structural illustration: nine rows of use cases and seven framework columns" className="grid grid-cols-7 gap-1.5">
        {Array.from({ length: 63 }, (_, i) => <span key={i} className={`h-3 rounded-sm ${i % 3 === 0 ? "bg-violet-400 dark:bg-violet-500" : "bg-violet-100 dark:bg-violet-900/50"}`} />)}
      </div>
    </div>
  );
  if (kind === "scatter") return (
    <div className={surface}>
      <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">Illustrative profiles · not client data</p>
      <svg role="img" aria-label="Illustrative consultant profiles spread across four quadrants; no actual scores shown" viewBox="0 0 320 120" className="h-32 w-full">
        <path d="M20 60H300M160 8V112" className="stroke-slate-300 dark:stroke-slate-600" strokeDasharray="4 4" />
        {Array.from({ length: 18 }, (_, i) => <circle key={i} cx={30 + (i * 47) % 260} cy={15 + (i * 31) % 90} r="4" className="fill-cyan-600 dark:fill-cyan-400" />)}
      </svg>
    </div>
  );
  return (
    <div className={surface}>
      <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Illustrative climate-risk view · not client data</p>
      <div role="img" aria-label="Illustrative risk heatmap across three time horizons; colors do not represent actual findings" className="grid grid-cols-6 gap-2">
        {Array.from({ length: 18 }, (_, i) => <span key={i} className={`h-7 rounded ${["bg-rose-200 dark:bg-rose-900", "bg-rose-300 dark:bg-rose-700", "bg-rose-400 dark:bg-rose-500"][i % 3]}`} />)}
      </div>
      <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">Near term → medium term → long term</p>
    </div>
  );
}

export function ReportProjects({ skillsFooter }: Readonly<{ skillsFooter?: ReactNode }>) {
  const id = useId();
  const [category, setCategory] = useState<Category>("All");
  const [skill, setSkill] = useState<Skill | null>(null);
  const portfolioRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const visible = reportProjects.filter((project) =>
    (category === "All" || project.categories.includes(category)) &&
    (skill === null || project.skills.includes(skill)),
  );
  const countSkill = (value: Skill) => reportProjects.filter((project) => project.skills.includes(value)).length;
  const chip = "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors";
  const active = "border-violet-700 bg-violet-700 text-white dark:border-violet-300 dark:bg-violet-300 dark:text-slate-950";
  const inactive = "border-slate-200 bg-white/70 text-slate-700 hover:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200";

  function selectSkill(value: Skill) {
    setCategory("All");
    setSkill((current) => current === value ? null : value);
    portfolioRef.current?.scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth", block: "start" });
  }

  return (
    <>
      <section ref={portfolioRef} id="portfolio" aria-labelledby={`${id}-portfolio-heading`} className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">Selected work</p>
        <h2 id={`${id}-portfolio-heading`} className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Projects, filterable like a report</h2>
        <p className="mt-5 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">Use the slicer to filter by type of work, or pick a skill further down to cross-filter these cards.</p>

        <fieldset className="mt-8">
          <legend className="mb-3 text-sm font-semibold">Filter by type of work</legend>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => {
              const count = reportProjects.filter((project) => item === "All" || project.categories.includes(item)).length;
              return <button key={item} type="button" aria-pressed={category === item} aria-controls={`${id}-results`} onClick={() => setCategory(item)} className={`${chip} ${category === item ? active : inactive}`}>{item}<span className="font-mono text-xs">{count}</span></button>;
            })}
          </div>
        </fieldset>

        <div className="my-5 flex min-h-11 flex-wrap items-center justify-between gap-3">
          <p role="status" aria-live="polite" aria-atomic="true" className="text-sm text-slate-600 dark:text-slate-400">Showing {visible.length} of {reportProjects.length} projects{category !== "All" ? ` · ${category}` : ""}{skill ? ` · skill: ${skill}` : ""}</p>
          <div className="flex flex-wrap gap-2">
            {skill && <button type="button" onClick={() => setSkill(null)} className={`${chip} ${inactive}`} aria-label={`Clear skill filter: ${skill}`}>Skill: {skill} <span aria-hidden="true">×</span></button>}
            {(skill || category !== "All") && <button type="button" onClick={() => { setCategory("All"); setSkill(null); }} className="min-h-11 rounded-lg px-3 text-sm font-semibold text-violet-700 underline underline-offset-4 dark:text-violet-300">Reset filters</button>}
          </div>
        </div>

        <div id={`${id}-results`}>
          {visible.length ? (
            <ul className="grid items-start gap-5 md:grid-cols-2">
              {visible.map((project) => (
                <motion.li key={project.id} layout={reducedMotion ? false : "position"} initial={false} animate={{ opacity: 1 }} transition={{ duration: reducedMotion ? 0 : 0.25 }} className={project.id === "statsdw" ? "md:col-span-2" : ""}>
                  <article className="overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 via-white to-cyan-50 p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:from-violet-950/30 dark:via-slate-900 dark:to-cyan-950/20">
                    <ProjectVisual kind={project.visual} />
                    <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-violet-700 dark:text-violet-300">{project.client}</p>
                    <h3 className="mt-3 text-2xl font-bold tracking-tight">{project.title}</h3>
                    <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
                    <ul aria-label="Project highlights" className="mt-5 flex flex-wrap gap-2">{project.highlights.map((highlight) => <li key={highlight} className="rounded-lg bg-violet-100/70 px-3 py-2 text-xs font-medium dark:bg-violet-400/10">{highlight}</li>)}</ul>
                    <ul aria-label="Related skills" className="mt-4 flex flex-wrap gap-2">{project.skills.map((tag) => <li key={tag}><button type="button" aria-pressed={skill === tag} aria-controls={`${id}-results`} onClick={() => selectSkill(tag)} className={`${chip} ${skill === tag ? active : inactive}`}>{tag}</button></li>)}</ul>
                  </article>
                </motion.li>
              ))}
            </ul>
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-slate-700">
              <h3 className="text-lg font-semibold">No projects match both filters.</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Clear the skill filter or reset all filters to see more work.</p>
              <button type="button" onClick={() => { setCategory("All"); setSkill(null); }} className={`${chip} ${active} mt-5`}>Show all projects</button>
            </div>
          )}
        </div>
      </section>

      <section id="skills" aria-labelledby={`${id}-skills-heading`} className="border-y border-violet-100 bg-violet-50/70 py-16 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">Skills</p>
          <h2 id={`${id}-skills-heading`} className="text-3xl font-bold tracking-tight sm:text-4xl">Tools and methods, linked to real projects</h2>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">Each number counts all projects using that skill. Choose a skill to show its projects; choosing it again clears the selection.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => <div key={group.title} className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-950"><h3 className="mb-4 font-bold">{group.title}</h3><ul className="flex flex-wrap gap-2">{group.skills.map((item) => {
              const count = countSkill(item);
              return <li key={item}>{count ? <button type="button" aria-label={`Filter by ${item}: ${count} projects`} aria-pressed={skill === item} aria-controls={`${id}-results`} onClick={() => selectSkill(item)} className={`${chip} ${skill === item ? active : inactive}`}>{item}<span className="font-mono text-xs">{count}</span></button> : <span className="inline-flex min-h-11 items-center px-3 text-sm text-slate-500 dark:text-slate-400">{item}<span className="sr-only">: no linked projects</span></span>}</li>;
            })}</ul></div>)}
          </div>
          {skillsFooter}
        </div>
      </section>
    </>
  );
}
