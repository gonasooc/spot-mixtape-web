/**
 * The app's mark: a vinyl record. A raised disc with a thin outer edge, one
 * groove ring and an acid label at the centre.
 *
 * Geometry is the app's own sign-in screen mark (app/(auth)/login.tsx) at its
 * 88px size — disc 88, ring 58, core 18, 1px borders — so the two render the
 * same at the same size. Strokes do not scale: the app draws them as 1px
 * borders at every size, and a hairline that shrank with the mark would vanish
 * in the 24px header.
 */
export function BrandMark({ className = "size-22" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 88 88"
      role="img"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <circle
        cx="44"
        cy="44"
        r="43.5"
        fill="var(--color-chip)"
        stroke="var(--color-line-strong)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx="44"
        cy="44"
        r="29"
        fill="none"
        stroke="var(--color-line-strong)"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx="44" cy="44" r="9" fill="var(--color-acid)" />
    </svg>
  );
}
