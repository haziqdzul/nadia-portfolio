"use client";

import Image from "next/image";
import { useState } from "react";
import { RotateCw } from "lucide-react";

export function ProfilePortrait() {
  const [flipped, setFlipped] = useState(false);
  return (
    <button type="button" className="portrait-flip relative aspect-square w-full rounded-2xl" aria-label="Show cartoon portrait" aria-pressed={flipped} onClick={() => setFlipped(!flipped)}>
      <span className="portrait-flip-inner" data-flipped={flipped}>
        <span className="portrait-face" aria-hidden={flipped}>
          <Image src="/images/profile.jpg" alt="Nadia Irdina" fill sizes="(min-width: 640px) 144px, 112px" className="object-cover object-top" />
        </span>
        <span className="portrait-face portrait-back" aria-hidden={!flipped}>
          <Image src="/images/profile-cartoon.png" alt="Illustrated portrait of Nadia Irdina" fill sizes="(min-width: 640px) 144px, 112px" className="object-cover" />
        </span>
      </span>
      <span aria-hidden="true" className="absolute bottom-2 right-2 rounded-full bg-slate-950/75 p-1.5 text-white"><RotateCw className="size-3.5" /></span>
    </button>
  );
}
