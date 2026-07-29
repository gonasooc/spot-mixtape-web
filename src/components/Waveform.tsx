/**
 * Candle-style waveform bars, the same visual language the app uses on sound
 * cards. Heights are a fixed sequence so server and client render identically.
 */
const HEIGHTS = [
  22, 46, 74, 34, 88, 54, 28, 66, 94, 42, 72, 31, 58, 84, 38, 68, 26, 52, 79,
  44, 62, 30, 86, 48,
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
  className = "h-28",
  animated = false,
}: WaveformProps) {
  const visible = HEIGHTS.slice(0, bars);
  const playedCount = Math.round(visible.length * progress);

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-between gap-[3px] ${className}`}
    >
      {visible.map((height, index) => (
        <span
          key={index}
          className={[
            "w-full max-w-[10px] flex-1 rounded-full",
            index < playedCount ? "bg-acid" : "bg-line",
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
