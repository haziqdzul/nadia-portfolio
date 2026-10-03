"use client";
import { useState } from "react";

/** Hover/focus pauses temporarily; click/tap toggles a persistent pause. */
export function useInteractionPause() {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [latched, setLatched] = useState(false);
  return {
    paused: hovered || focused || latched,
    handlers: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      onClick: () => setLatched(value => !value),
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === " " || event.key === "Enter") { event.preventDefault(); setLatched(value => !value); }
      },
    },
  };
}
