"use client";

import { useInteractionPause } from "./use-interaction-pause";


const topics = [
  "Python & APIs",
  "Cloud data tooling",
  "AI data governance",
] as const;

type CurrentlyBuildingProps = Readonly<{
  className?: string;
}>;

export function CurrentlyBuilding({ className = "" }: CurrentlyBuildingProps) {
  const { paused, handlers } = useInteractionPause();
  return (
    <aside {...handlers} tabIndex={0}
      aria-label="Currently building"
      className={`flex flex-col gap-4 rounded-xl border border-emerald-200/70 bg-white/75 px-5 py-5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 dark:border-slate-700 dark:bg-slate-950/60 ${className}`}
    >
      <p className="shrink-0 font-mono text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
        Currently building
      </p>
      <ul className="flex min-w-0 flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-x-6">
        {topics.map((topic, topicIndex) => (
          <li
            key={topic}
            className="flex min-w-0 items-center gap-3 text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            <span aria-hidden="true" className="flex shrink-0 gap-0.5">
              {Array.from({ length: 7 }, (_, index) => (
                <span
                  key={index}
                  className="building-progress-segment h-1.5 w-1 rounded-[1px] bg-emerald-500 dark:bg-emerald-300"
                  style={{
                    animationDelay: `${index * 0.14 - topicIndex * 0.35 - 1.8}s`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              ))}
            </span>
            <span className="min-w-0 break-words">{topic}</span>
          </li>
        ))}
      </ul>

    </aside>
  );
}

