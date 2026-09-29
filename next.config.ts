import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

export default function nextConfig(phase: string): NextConfig {
  return {
    // The local preview uses this loopback hostname as well as localhost.
    allowedDevOrigins: ["127.0.0.1"],
    // Avoid Windows file locks between the dev server and production builds.
    distDir: phase === PHASE_DEVELOPMENT_SERVER ? ".next" : ".next-production",
  };
}
