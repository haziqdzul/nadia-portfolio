"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ProjectSandbox } from "./project-sandbox";

const accentStyles = {
  violet:
    "from-violet-100 via-white to-fuchsia-50 " +
    "dark:from-violet-950/50 dark:via-slate-900 dark:to-fuchsia-950/30",
  cyan:
    "from-cyan-100 via-white to-sky-50 " +
    "dark:from-cyan-950/50 dark:via-slate-900 dark:to-sky-950/30",
  rose:
    "from-rose-100 via-white to-orange-50 " +
    "dark:from-rose-950/50 dark:via-slate-900 dark:to-orange-950/30",
} as const;

export type Project = Readonly<{
  id: string;
  title: string;
  category: string;
  description: string;
  tags: readonly string[];
  accent: keyof typeof accentStyles;
  wide?: boolean;
  href?: string;
  preview?: "pipeline";
}>;

type ProjectGridProps = Readonly<{
  projects: readonly Project[];
}>;

export function ProjectGrid({ projects }: ProjectGridProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="mx-auto max-w-6xl px-6 py-20 sm:py-28"
    >
      <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
            Selected work
          </p>
          <h2
            id="portfolio-heading"
            className="text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Projects, filterable like a report
          </h2>
        </div>

        <p className="max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
          A selection of product concepts, interfaces, and engineering
          explorations.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {projects.map((project, index) => (
          <li
            key={project.id}
            className={project.wide ? "md:col-span-2" : ""}
          >
            <motion.article
              whileHover={reduceMotion || project.preview ? undefined : { y: -5 }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 26,
              }}
              className={`group relative flex h-full min-h-80 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br p-7 shadow-sm transition-shadow hover:shadow-lg focus-within:ring-2 focus-within:ring-violet-500 sm:p-8 dark:border-slate-800 ${accentStyles[project.accent]}`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full border-[24px] border-white/50 dark:border-white/5"
              />

              <div className="relative mb-12 flex items-center justify-between gap-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-400">
                  {project.category}
                </p>
                <span
                  aria-hidden="true"
                  className="font-mono text-sm text-slate-500 dark:text-slate-400"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="relative text-2xl font-bold tracking-tight sm:text-3xl">
                {project.title}
              </h3>

              <p className="relative mt-3 max-w-xl leading-7 text-slate-600 dark:text-slate-300">
                {project.description}
              </p>

              <ul
                aria-label={`${project.title} technologies`}
                className="relative mt-6 flex flex-wrap gap-2"
              >
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-300"
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {project.preview === "pipeline" && (
                <ProjectSandbox title={`${project.title} · pipeline`} className="relative mt-6" />
              )}

              {project.href && (
                <div className="relative mt-auto pt-8">
                  <Link
                    href={project.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-violet-800 underline-offset-4 hover:underline dark:text-violet-300"
                  >
                    Explore project
                    <span className="sr-only">: {project.title}</span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4"
                    />
                  </Link>
                </div>
              )}
            </motion.article>
          </li>
        ))}
      </ul>
    </section>
  );
}
