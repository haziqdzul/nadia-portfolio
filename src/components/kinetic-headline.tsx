"use client";
import { useEffect, useRef } from "react";

type Dot = { x:number; y:number; hx:number; hy:number; vx:number; vy:number };

export function KineticHeadline() {
  const root = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const host = root.current, surface = canvas.current;
    const ctx = surface?.getContext("2d");
    if (!host || !surface || !ctx) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, end = 0, previous = 0, active = false, width = 0, height = 0;
    let dots:Dot[] = [];
    const pointer = { x:0, y:0 };
    const pad = 32;
    const draw = (now:number) => {
      const dt = Math.min((now - previous) / 16.667 || 1, 2); previous = now;
      ctx.clearRect(0,0,width+pad*2,height+pad*2);
      const gradient = ctx.createLinearGradient(pad,0,width+pad,0);
      const dark = document.documentElement.classList.contains("dark");
      gradient.addColorStop(0,dark ? "#70cef0" : "#20799b");
      gradient.addColorStop(.5,dark ? "#c0a1f0" : "#8950b2");
      gradient.addColorStop(1,dark ? "#f5a1c7" : "#b43987");
      ctx.fillStyle = gradient;
      for (const p of dots) {
        const dx = p.hx-pointer.x, dy=p.hy-pointer.y, distance=Math.hypot(dx,dy);
        const force=active ? Math.max(0,1-distance/95) : 0;
        const angle=Math.atan2(dy,dx);
        const tx=p.hx+Math.cos(angle)*force*25, ty=p.hy+Math.sin(angle)*force*25;
        p.vx=(p.vx+(tx-p.x)*.055*dt)*Math.pow(.77,dt);
        p.vy=(p.vy+(ty-p.y)*.055*dt)*Math.pow(.77,dt);
        p.x+=p.vx*dt; p.y+=p.vy*dt;
        ctx.beginPath();ctx.arc(p.x+pad,p.y+pad,1.15,0,Math.PI*2);ctx.fill();
      }
      if(active || now<end) frame=requestAnimationFrame(draw);
      else { host.dataset.scatter="false"; frame=0; }
    };
    const build = () => {
      const text=host.querySelector<HTMLElement>(".kinetic-headline-copy")!;
      const rect=text.getBoundingClientRect(), style=getComputedStyle(text);
      width=rect.width;height=rect.height;
      const dpr=Math.min(devicePixelRatio,2);
      surface.width=Math.ceil((width+pad*2)*dpr);surface.height=Math.ceil((height+pad*2)*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const mask=document.createElement("canvas");mask.width=Math.ceil(width);mask.height=Math.ceil(height);
      const ink=mask.getContext("2d",{willReadFrequently:true});if(!ink)return;
      ink.font=`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      ink.letterSpacing=style.letterSpacing;ink.textBaseline="middle";
      ink.fillText("Insights follow.",0,height/2);
      const pixels=ink.getImageData(0,0,mask.width,mask.height).data;
      dots=[];
      for(let y=0;y<mask.height;y+=3)for(let x=0;x<mask.width;x+=3)if(pixels[(y*mask.width+x)*4+3]>100)dots.push({x,y,hx:x,hy:y,vx:0,vy:0});
    };
    const start = () => {
      if(reduced.matches || host.closest('[data-intro-pending="true"]'))return;
      if(!active)build();active=true;host.dataset.scatter="true";
      if(!frame){previous=performance.now();frame=requestAnimationFrame(draw);}
    };
    const move=(e:PointerEvent)=>{const r=host.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top;start();};
    const leave=()=>{active=false;end=performance.now()+650;};
    const release=(e:PointerEvent)=>{if(e.pointerType!=="mouse")leave();};
    const focus=()=>{pointer.x=host.clientWidth/2;pointer.y=host.clientHeight/2;start();};
    const visibility=()=>{if(document.hidden){cancelAnimationFrame(frame);frame=0;active=false;host.dataset.scatter="false";}};
    host.addEventListener("pointermove",move);host.addEventListener("pointerleave",leave);
    host.addEventListener("pointerdown",move);host.addEventListener("pointerup",release);
    host.addEventListener("focus",focus);host.addEventListener("blur",leave);
    document.addEventListener("visibilitychange",visibility);
    return()=>{cancelAnimationFrame(frame);host.removeEventListener("pointermove",move);host.removeEventListener("pointerleave",leave);host.removeEventListener("pointerdown",move);host.removeEventListener("pointerup",release);host.removeEventListener("focus",focus);host.removeEventListener("blur",leave);document.removeEventListener("visibilitychange",visibility);};
  },[]);
  return <span ref={root} tabIndex={0} role="img" aria-label="Insights follow. Hover, touch, or focus to explore the particles." className="kinetic-headline" onClick={e=>e.stopPropagation()}>
    <span className="kinetic-headline-copy hero-gradient-text whitespace-nowrap"><span className="hero-insights inline-block">Insights</span>{" "}<span className="hero-follows inline-block">follow.</span></span>
    <canvas ref={canvas} aria-hidden="true" />
  </span>;
}
