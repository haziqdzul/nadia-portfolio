import type { Visual } from "@/lib/projects";
export function ProjectVisual({ kind }: Readonly<{ kind: Visual }>) {
  const surface = "rounded-lg border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/60";
  if (kind === "timeline") return (
    <div className={surface}>
      <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Delivery · 2025</p>
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {[ ["Feb", "Training"], ["Mar", "UAT"], ["Apr", "PAT / TOT / TOK"], ["Jun", "Go-live"], ["Jul", "FAT"] ].map(([month, label]) => (
          <li key={month} className="border-l-2 border-emerald-400 pl-3 text-xs leading-5"><span className="block font-bold text-emerald-700 dark:text-emerald-300">{month}</span>{label}</li>
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
        {Array.from({ length: 63 }, (_, i) => <span key={i} className={`h-3 rounded-sm ${i % 3 === 0 ? "bg-emerald-400 dark:bg-emerald-500" : "bg-emerald-100 dark:bg-emerald-900/50"}`} />)}
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


