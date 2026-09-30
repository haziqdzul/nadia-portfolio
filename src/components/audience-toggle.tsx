"use client";

export type AudienceView = "business" | "technical";

export function AudienceToggle({ value, onChange, controls }: Readonly<{
  value: AudienceView;
  onChange: (view: AudienceView) => void;
  controls: string;
}>) {
  return (
    <div role="group" aria-label="Choose explanation depth" className="flex w-fit max-w-full gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-950">
      {(["business", "technical"] as const).map((view) => (
        <button key={view} type="button" aria-pressed={value === view} aria-controls={controls}
          onClick={() => onChange(view)}
          className={`min-h-11 rounded-md px-3 text-xs font-semibold transition-colors motion-reduce:transition-none ${value === view ? "bg-white text-emerald-800 shadow-sm dark:bg-slate-800 dark:text-emerald-200" : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"}`}>
          {view === "business" ? "Business view" : "Technical view"}
        </button>
      ))}
    </div>
  );
}
