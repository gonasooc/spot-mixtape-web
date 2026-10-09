/**
 * The share image (public/og-image.png, 1200×630): the app's Play Store
 * feature graphic, set in Korean. Same arrangement — record mark on the left,
 * then tagline, wordmark, headline and waveform — scaled from 1024×500 and
 * centred. The headline is the landing's, bold with an acid second line,
 * because share previews shrink the image to about a quarter and grey body
 * text stops being legible there.
 *
 * Colours and faces come from the site's tokens (src/styles.css). Inline
 * styles are fine here: this page only ever runs under the dev server, and
 * keeping utility classes out of it keeps the production CSS unchanged.
 */
import { createRoot } from "react-dom/client";

import { WAVEFORM_HEIGHTS } from "@/components/Waveform";
import "@/styles.css";

const W = 1200;
const H = 630;
const MARK = 280;

/**
 * The record at the app icon's measured proportions (assets/images/icon.png):
 * label 0.205 of the disc radius, groove at 0.636, rims about 1–2% thick —
 * so the rims stay visible at this size, unlike the site mark's 1px lines.
 */
function Record() {
  const r = MARK / 2;
  return (
    <svg width={MARK} height={MARK} viewBox={`0 0 ${MARK} ${MARK}`} aria-hidden="true">
      <circle cx={r} cy={r} r={r - 1.35} fill="var(--color-canvas-raised)" stroke="var(--color-line-strong)" strokeWidth={2.7} />
      <circle cx={r} cy={r} r={r * 0.636} fill="none" stroke="var(--color-line)" strokeWidth={1.9} />
      <circle cx={r} cy={r} r={r * 0.205} fill="var(--color-acid)" />
    </svg>
  );
}

function Bars() {
  const played = Math.round(WAVEFORM_HEIGHTS.length * 0.45);
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
      {WAVEFORM_HEIGHTS.map((h, i) => (
        <span
          key={i}
          style={{
            width: 7,
            height: `${h}%`,
            borderRadius: 999,
            background: i < played ? "var(--color-acid)" : "var(--color-dim)",
          }}
        />
      ))}
    </div>
  );
}

function OgImage() {
  return (
    <div
      style={{
        width: W,
        height: H,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        gap: 75,
        padding: "0 90px 0 110px",
        background:
          "linear-gradient(180deg, var(--color-canvas-raised) 0%, var(--color-canvas) 60%, var(--color-canvas-deep) 100%)",
        wordBreak: "keep-all",
      }}
    >
      <Record />
      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: 20, lineHeight: 1.2, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-muted)" }}>
          Sound Archive for Places
        </p>
        <p style={{ margin: "22px 0 0", fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 84, lineHeight: 1, color: "var(--color-ink)" }}>
          spotMixtape
        </p>
        <p style={{ margin: "26px 0 0", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 44, lineHeight: 1.25, letterSpacing: "-0.02em", color: "var(--color-ink)" }}>
          그때 그곳의 소리를
          <br />
          <span style={{ color: "var(--color-acid)" }}>다시 꺼내 듣습니다.</span>
        </p>
        <div style={{ marginTop: 34 }}>
          <Bars />
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("og")!).render(<OgImage />);
