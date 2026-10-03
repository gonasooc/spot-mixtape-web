/**
 * Waveform bars drawn the way the app's WaveformDisplay draws them: 40 bars,
 * 3px wide with 2px corners, spread edge to edge, played bars in acid and the
 * rest in the app's `dim` grey. Heights are a fixed sequence so server and
 * client render identically; the range mirrors the app's 8–52px bars inside
 * a 60px strip.
 */
const HEIGHTS = [
  22, 46, 74, 34, 86, 54, 28, 66, 80, 42, 72, 31, 58, 84, 38, 68, 26, 52, 79,
  44, 62, 30, 87, 48, 36, 70, 24, 60, 82, 40, 56, 76, 33, 64, 20, 50, 78, 45,
  29, 58,
];

interface WaveformProps {
  /** How many bars to draw, counted from the start of the sequence. */
  bars?: number;
  /** Fraction of bars rendered in the accent colour, as if already played. */
  progress?: number;
  className?: string;
  animated?: boolean;
}

export function Waveform({
  bars = HEIGHTS.length,
  progress = 1,
  className = "h-15",
  animated = false,
}: WaveformProps) {
  const visible = HEIGHTS.slice(0, bars);
  const playedCount = Math.round(visible.length * progress);

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-between ${className}`}
    >
      {visible.map((height, index) => (
        <span
          key={index}
          className={[
            "w-0.75 shrink-0 rounded-xs",
            index < playedCount ? "bg-acid" : "bg-dim",
            animated ? "bar-pulse" : "",
          ].join(" ")}
          style={{
            height: `${height}%`,
            animationDelay: animated ? `${(index % 8) * 110}ms` : undefined,
          }}
        />
      ))}
    </div>
  );
}
