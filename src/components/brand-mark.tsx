/** NI: the detached right pillar doubles as an intelligence/data node. */
export function BrandMark({ className = "" }: { className?: string }) {
  return <svg aria-hidden="true" viewBox="0 0 40 40" fill="none" className={`brand-mark ${className}`}>
    <path d="M7 33V10L25 33" stroke="currentColor" strokeWidth="4" strokeLinejoin="miter" />
    <path d="M32 15V33" stroke="currentColor" strokeWidth="4" />
    <circle className="brand-node-halo" cx="32" cy="7" r="6" fill="currentColor" opacity=".15" />
    <circle className="brand-node" cx="32" cy="7" r="2.8" fill="currentColor" />
  </svg>;
}
