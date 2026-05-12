"use client";

import dynamic from "next/dynamic";

const GolfBallBackground = dynamic(
  () => import("@/components/backgrounds/golf-ball-background").then((m) => m.GolfBallBackground),
  { ssr: false }
);

export function GolfBallBackgroundDynamic() {
  return <GolfBallBackground />;
}
