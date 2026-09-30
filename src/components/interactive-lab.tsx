"use client";

import { useId } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PolicySimulator } from "./policy-simulator";


const labTitles = ["Fuel Subsidy Optimization Matrix", "Demographic Allocation Logic"] as const;

export type InteractiveLabProps = Readonly<{
  index: number;
  onSelect: (index: number) => void;
}>;

export function InteractiveLab({ index, onSelect }: InteractiveLabProps) {
  const id = useId();

  function select(next: number) {
    if (next < 0 || next >= labTitles.length) return;
    onSelect(next);
  }

  return <section aria-label="Interactive labs" aria-roledescription="carousel" className="min-w-0 self-start">
    <header className="mb-3 flex items-center justify-between gap-3">
      <p role="status" aria-atomic="true" className="eyebrow">
        Lab {index + 1} of {labTitles.length}
        <span className="sr-only">: {labTitles[index]}</span>
      </p>
      <div role="group" aria-label="Choose interactive lab" className="flex gap-2">
        <button type="button" aria-label="Previous lab" aria-disabled={index === 0} aria-controls={`${id}-panels`} onClick={() => select(index - 1)} className="filter-button filter-idle px-3 aria-disabled:cursor-default aria-disabled:opacity-35"><ChevronLeft aria-hidden="true" className="size-4" /></button>
        <button type="button" aria-label="Next lab" aria-disabled={index === labTitles.length - 1} aria-controls={`${id}-panels`} onClick={() => select(index + 1)} className="filter-button filter-idle px-3 aria-disabled:cursor-default aria-disabled:opacity-35"><ChevronRight aria-hidden="true" className="size-4" /></button>
      </div>
    </header>
    <div id={`${id}-panels`} className="grid min-w-0">
      {/* Stack both panels in one grid cell to reserve their full height without internal scrolling. */}
      <div className="col-start-1 row-start-1 min-w-0" inert={index !== 0} aria-hidden={index !== 0 || undefined} style={{ visibility: index === 0 ? "visible" : "hidden" }}>
        <PolicySimulator kind="fuel" />
      </div>
      <div inert={index !== 1} aria-hidden={index !== 1 || undefined} className="col-start-1 row-start-1 min-w-0" style={{ visibility: index === 1 ? "visible" : "hidden" }}>
        <PolicySimulator kind="capacity" />
      </div>
    </div>
  </section>;
}


