import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/** Distance inside the viewport bottom an element must reach to be revealed. */
const TRIGGER_INSET = 48;

/** Cap on the stagger a group may accumulate, so late items never lag. */
const MAX_STAGGER = 160;

/** Per-position delay within one group, capped at MAX_STAGGER. */
export function stagger(index: number): number {
  return Math.min(index * 80, MAX_STAGGER);
}

interface RevealOptions {
  /** Transition delay in ms, for staggering siblings. */
  delay?: number;
  /** Graphics travel further and settle slower than text. */
  art?: boolean;
}

/**
 * Reveals an element once, the first time it scrolls into view.
 *
 * The hidden state is applied from here and nowhere else, which is what keeps
 * the prerendered HTML readable without JavaScript. Elements already on screen
 * at first paint are left alone entirely — hiding them after hydration only to
 * fade them back in would be a flash, not an entrance.
 */
export function useReveal<T extends HTMLElement>({
  delay = 0,
  art = false,
}: RevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (
      element.getBoundingClientRect().top <
      window.innerHeight - TRIGGER_INSET
    ) {
      return;
    }

    element.dataset.reveal = "pending";
    if (art) element.dataset.revealArt = "";
    if (delay) element.style.setProperty("--reveal-delay", `${delay}ms`);

    const show = () => {
      element.dataset.reveal = "shown";
      observer.disconnect();
      element.removeEventListener("focusin", show);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show();
      },
      { rootMargin: `0px 0px -${TRIGGER_INSET}px 0px` },
    );

    observer.observe(element);
    // Tab can reach a still-hidden element before the scroll does.
    element.addEventListener("focusin", show);

    return () => {
      observer.disconnect();
      element.removeEventListener("focusin", show);
      // Never leave a detached-then-reattached element stuck at opacity 0.
      delete element.dataset.reveal;
      delete element.dataset.revealArt;
      element.style.removeProperty("--reveal-delay");
    };
  }, [delay, art]);

  return ref;
}

interface RevealProps extends RevealOptions {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Wrapper form of `useReveal`, for markup that has no element to hang it on. */
export function Reveal({
  as: Tag = "div",
  delay,
  art,
  className,
  style,
  children,
}: RevealProps) {
  const ref = useReveal<HTMLElement>({ delay, art });

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
