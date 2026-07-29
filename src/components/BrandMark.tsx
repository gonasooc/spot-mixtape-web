/** The app icon glyph: an acid disc with a single waveform stroke across it. */
export function BrandMark({ className = "size-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle cx="32" cy="32" r="30" fill="currentColor" />
      <path
        d="M19 37c3.5 0 3.5-10 7-10s3.5 15 7 15 3.5-20 7-20 3.5 15 7 15"
        fill="none"
        stroke="#0B0D0A"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
