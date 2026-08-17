// Decorative curved spider-web lattice rendered in the four viewport corners.
// Pure static SVG (no interactivity) so it is free to render and disperses gently behind content.

import type { SVGProps } from "react";

const SPOKE_ANGLES = [0, 15, 30, 45, 60, 75, 90];
const NET_RADII = [250, 205, 160, 118, 78];
const OUTER_RADIUS = 320;

function polar(angleDeg: number, radius: number): { x: number; y: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

function cornerWebPath(): { spokes: string; nets: string[] } {
  // Spokes radiate from the corner origin along the 0-90deg quadrant.
  const spokes = SPOKE_ANGLES.map((angle) => {
    const r = OUTER_RADIUS * (0.62 + 0.38 * ((angle * 7) % 5) / 5);
    const p = polar(angle, r);
    return `M0 0 L${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ");

  // Concave (inward-bowing) web net arcs between each adjacent pair of spokes.
  const nets = NET_RADII.map((radius) => {
    let d = "";
    for (let i = 0; i < SPOKE_ANGLES.length; i++) {
      const a0 = SPOKE_ANGLES[i];
      const a1 = SPOKE_ANGLES[i + 1];
      if (typeof a1 === "undefined") continue;
      const mid = (a0 + a1) / 2;
      const p0 = polar(a0, radius);
      const p1 = polar(a1, radius);
      const ctrl = polar(mid, radius * 0.82);
      d += `M${p0.x.toFixed(1)} ${p0.y.toFixed(1)} Q${ctrl.x.toFixed(1)} ${ctrl.y.toFixed(1)} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
    }
    return d;
  });

  return { spokes, nets };
}

function CornerWeb() {
  const { spokes, nets } = cornerWebPath();
  const common: SVGProps<SVGPathElement> = {
    stroke: "var(--suit-web)",
    strokeWidth: 1,
    fill: "none",
    strokeLinecap: "round"
  };

  return (
    <svg width="320" height="320" viewBox="0 0 320 320" className="block">
      <path d={spokes} {...common} strokeOpacity="0.22" />
      {nets.map((d, i) => (
        <path key={i} d={d} {...common} strokeOpacity={0.28 - i * 0.035} />
      ))}
    </svg>
  );
}

type Orientation = "tl" | "tr" | "bl" | "br";

const transformByOrientation: Record<Orientation, string> = {
  tl: "",
  tr: "-scale-x-100",
  bl: "-scale-y-100",
  br: "-scale-x-100 -scale-y-100"
};

const placementByOrientation: Record<Orientation, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0",
  bl: "bottom-0 left-0",
  br: "bottom-0 right-0"
};

export function WebCorners() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[1] overflow-hidden select-none">
      {(["tl", "tr", "bl", "br"] as Orientation[]).map((orientation) => (
        <div
          key={orientation}
          className={`absolute ${placementByOrientation[orientation]} h-[320px] w-[320px] opacity-55 ${
            transformByOrientation[orientation]
          } transition-opacity duration-700`}
        >
          <CornerWeb />
        </div>
      ))}
    </div>
  );
}