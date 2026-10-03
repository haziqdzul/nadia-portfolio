"use client";

import Image from "next/image";
import { useState } from "react";


export function ProfilePortrait() {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const visible = flipped || hovered;
  return (
    <button type="button" className="portrait-flip relative aspect-square w-full rounded-2xl" aria-label={visible ? "Cartoon portrait. Click or tap to toggle portrait" : "Portrait. Hover, click or tap to reveal cartoon"} aria-pressed={visible} onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }} onPointerLeave={() => setHovered(false)} onClick={() => setFlipped(!flipped)}>
      <span className="portrait-flip-inner" data-flipped={visible}>
        <span className="portrait-face" aria-hidden={visible}>
          <Image src="/images/profile.jpg" alt="Nadia Irdina" fill sizes="(min-width: 640px) 144px, 112px" className="object-cover object-top" />
        </span>
        <span className="portrait-face portrait-back" aria-hidden={!visible}>
          <span role="img" aria-label="Illustrated Nadia Irdina waving hello" className="portrait-wave" />
        </span>
      </span>
      <span aria-hidden="true" className="portrait-peel"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"><path d="M3 5h9m-2-2 2 2-2 2M13 11H4m2-2-2 2 2 2" /></svg></span>
    </button>
  );
}
