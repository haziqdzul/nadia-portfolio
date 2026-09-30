import { notFound } from "next/navigation";
import { ProjectMemoryGallery } from "@/components/project-memory-gallery";
import { pendingProjectMedia, projectMedia } from "@/lib/project-media";

// Development-only fixture; existing public portrait tests the image states.
export default function MediaPreview() {
  if (process.env.NODE_ENV !== "development") notFound();
  const portrait = { ...projectMedia[0], src: "/images/profile.jpg" as const, alt: "Nadia Irdina", isAvailable: true, isClearedForPublic: true, caption: "Existing public portrait used only to test the image viewer. This is not an achievement photo." };
  return <main id="main-content" className="mx-auto w-full max-w-6xl px-6 pb-16"><ProjectMemoryGallery title="Media layout preview" description="Development-only fixture: two portrait test images, stock photos, and pending project placements." items={[{ ...portrait, id: "portrait-test", title: "Portrait viewer test" }, { ...portrait, id: "portrait-test-2", title: "Second viewer test" }, ...projectMedia, ...pendingProjectMedia]} /></main>;
}
