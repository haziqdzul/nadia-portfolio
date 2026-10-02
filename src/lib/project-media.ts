export type ProjectMedia = Readonly<{
  id: string;
  projectId: string;
  kind: "achievement" | "memory" | "artifact" | "sample photo";
  title: string;
  src: `/images/${string}`;
  alt: string;
  caption: string;
  width: number;
  height: number;
  isClearedForPublic: boolean;
  isAvailable: boolean;
  format?: "image" | "gif" | "video";
  captionsSrc?: `/images/${string}`;
  dateLabel?: string;
  metric?: Readonly<{ value: string; label: string; context: string }>;
}>;

// These are planned placements, not claims that photos or client artifacts exist.
// Never place restricted originals in public/, even when clearance is false.
export const pendingProjectMedia: readonly ProjectMedia[] = [
  {
    id: "statsdw-achievement", projectId: "statsdw", kind: "achievement",
    title: "Delivery milestone", src: "/images/placeholders/statsdw-achievement.jpg",
    alt: "", caption: "A future cleared delivery photo will be paired with its confirmed date, team context, and my contribution.",
    width: 1600, height: 1000, isClearedForPublic: false, isAvailable: false,
  },
  {
    id: "statsdw-timeline", projectId: "statsdw", kind: "artifact",
    title: "Delivery timeline", src: "/images/placeholders/statsdw-timeline.svg",
    alt: "", caption: "A public-safe roadmap will connect requirements, readiness, acceptance, and delivery milestones.",
    width: 1600, height: 1000, isClearedForPublic: false, isAvailable: false,
  },
  {
    id: "oracle-architecture", projectId: "oracle", kind: "artifact",
    title: "System architecture diagram", src: "/images/placeholders/oracle-timeline.svg",
    alt: "", caption: "A reviewed diagram will show the source-to-target structure and explain the modelling decisions.",
    width: 1600, height: 1000, isClearedForPublic: false, isAvailable: false,
  },
  {
    id: "enforcement-memory", projectId: "enforcement", kind: "memory",
    title: "Behind the requirements", src: "/images/placeholders/enforcement-workshop.jpg",
    alt: "", caption: "A cleared workshop image can connect stakeholder collaboration to the requirements it informed.",
    width: 1600, height: 1000, isClearedForPublic: false, isAvailable: false,
  },
];

// Public stock photos for layout exploration, never represented as client evidence.
// Replace these records with reviewed project media when available.
const samplePhotos = [
  { projectId: "statsdw", file: "workspace", title: "Space to focus", alt: "Open laptop, notebook and coffee on a wooden table." },
  { projectId: "oracle", file: "desk", title: "A structured workspace", alt: "Overhead view of a monitor, keyboard, tablet and notebooks arranged on a desk." },
  { projectId: "enforcement", file: "laptop", title: "From notes to structure", alt: "Laptop beside an open notebook, pen and camera on a wooden desk." },
  { projectId: "cidb", file: "tools", title: "Tools for exploration", alt: "Laptop and phone on a wooden table in a quiet interior." },
  { projectId: "esg", file: "perspective", title: "A fresh perspective", alt: "Glasses resting on a closed laptop beside a wireless mouse." },
] as const;

export const projectMedia: readonly ProjectMedia[] = samplePhotos.map((photo) => ({
  id: `${photo.projectId}-sample`,
  projectId: photo.projectId,
  kind: "sample photo",
  title: photo.title,
  src: `/images/samples/${photo.file}.jpg`,
  alt: photo.alt,
  caption: "Illustrative stock photo for this layout preview. This is not a photograph of the project, its workplace, or its delivery team.",
  width: 1200,
  height: 750,
  isClearedForPublic: true,
  isAvailable: true,
}));

export function canDisplayMedia(item: ProjectMedia): boolean {
  return item.isClearedForPublic && item.isAvailable && item.alt.trim().length > 0;
}
