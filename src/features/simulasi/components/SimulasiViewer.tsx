"use client";

import dynamic from "next/dynamic";

const RaceSim     = dynamic(() => import("../sims/RaceSim"),     { ssr: false });
const FallSim     = dynamic(() => import("../sims/FallSim"),     { ssr: false });
const VerticalSim = dynamic(() => import("../sims/VerticalSim"), { ssr: false });
const LiftSim     = dynamic(() => import("../sims/LiftSim"),     { ssr: false });
const PlanetSim   = dynamic(() => import("../sims/PlanetSim"),   { ssr: false });
const PlaneSim    = dynamic(() => import("../sims/PlaneSim"),    { ssr: false });

export default function SimulasiViewer({ id }: { id: string }) {
  if (id === "race")      return <RaceSim />;
  if (id === "fall")      return <FallSim />;
  if (id === "vertikal")  return <VerticalSim />;
  if (id === "elevator")  return <LiftSim />;
  if (id === "multiball") return <PlanetSim />;
  if (id === "landing")   return <PlaneSim />;
  return null;
}
