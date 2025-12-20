import React, { useEffect, useMemo, useRef, useState } from "react";

type CompletionPieProps = {
  completed: number;
  total: number;
  size?: number; // px
  completedColor?: string;
  remainingColor?: string;
  className?: string;
  durationMs?: number; // animation duration
};

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describePieSlice(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

// nice smooth easing
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function CompletionPie({
  completed,
  total,
  size = 88,
  completedColor = "#FFFFFF",
  remainingColor = "rgba(255,255,255,0.35)",
  className,
  durationMs = 450,
}: CompletionPieProps) {
  const safeTotal = Math.max(total, 0);
  const safeCompleted = Math.min(Math.max(completed, 0), safeTotal);

  const targetAngle = useMemo(() => {
    if (safeTotal === 0) return 0;
    return (safeCompleted / safeTotal) * 360;
  }, [safeCompleted, safeTotal]);

  const [angle, setAngle] = useState(targetAngle);
  const rafRef = useRef<number | null>(null);
  const fromRef = useRef(angle);
  const startRef = useRef<number>(0);

  useEffect(() => {
    // if no animation needed or first render, sync quickly
    if (durationMs <= 0) {
      setAngle(targetAngle);
      return;
    }

    // cancel previous animation
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    fromRef.current = angle;
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeInOutCubic(t);

      const next = fromRef.current + (targetAngle - fromRef.current) * eased;
      setAngle(next);

      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // intentionally include `angle` so new targets animate from current visual angle
  }, [targetAngle, durationMs]); // eslint-disable-line react-hooks/exhaustive-deps

  if (safeTotal === 0) return null;

  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;

  const completedAngle = angle;

  // Handle 0%/100% edge cases during animation too
  const isZero = completedAngle <= 0.001;
  const isFull = completedAngle >= 359.999;

  const completedPath =
    !isZero && !isFull ? describePieSlice(cx, cy, r, 0, completedAngle) : "";

  return (
    <div className={className} style={{ width: size, height: size }} role="img">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Remaining is always a full circle background */}
        <circle cx={cx} cy={cy} r={r} fill={remainingColor} />

        {/* Completed overlay */}
        {isFull ? (
          <circle cx={cx} cy={cy} r={r} fill={completedColor} />
        ) : isZero ? null : (
          <path d={completedPath} fill={completedColor} />
        )}
      </svg>
    </div>
  );
}
