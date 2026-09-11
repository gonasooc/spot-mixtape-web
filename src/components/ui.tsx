import type { HTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

/**
 * Actions are solid surfaces without underlines; only links inside running
 * prose are underlined. One radius, one type size, one weight — the tone only
 * decides which surface the action sits on.
 */
type ActionTone = "primary" | "secondary";

const TONE_CLASSES: Record<ActionTone, string> = {
  primary: "bg-acid text-canvas hover:bg-acid-bright",
  secondary: "bg-chip text-ink hover:bg-chip-hover",
};

const SIZE_CLASSES = {
  md: "min-h-13 px-5.5",
  sm: "min-h-11 px-4",
} as const;

const ACTION_BASE =
  "inline-flex items-center justify-center gap-2 rounded-action py-3 text-center text-control font-medium no-underline transition-colors duration-150 active:translate-y-px";

interface ActionProps {
  tone?: ActionTone;
  size?: keyof typeof SIZE_CLASSES;
  className?: string;
  children: ReactNode;
}

function actionClasses({
  tone = "primary",
  size = "md",
  className = "",
}: ActionProps) {
  return `${ACTION_BASE} ${SIZE_CLASSES[size]} ${TONE_CLASSES[tone]} ${className}`;
}

/** Internal navigation styled as an action. */
export function ButtonLink({ to, ...props }: ActionProps & { to: string }) {
  return (
    <Link to={to} className={actionClasses(props)}>
      {props.children}
    </Link>
  );
}

/** External or mailto destination styled as an action. */
export function ButtonAnchor({ href, ...props }: ActionProps & { href: string }) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={actionClasses(props)}
    >
      {props.children}
    </a>
  );
}

/**
 * Small label above a heading.
 *
 * Sans, not mono: the `eyebrow` utility letterspaces and uppercases, which
 * only reads as typography in Latin. Korean set that way falls back to a
 * different face at mono metrics and looks stretched rather than deliberate.
 */
export function SectionLabel({
  children,
  className = "text-faint",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`m-0 text-meta font-medium ${className}`}>{children}</p>;
}

/**
 * Page gutter and vertical rhythm. Sections are separated by this space and
 * by the surface they sit on — never by a rule.
 */
export function Section({
  children,
  className = "",
  innerClassName = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  innerClassName?: string;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section className={`px-5 py-22 sm:px-6 sm:py-36 ${className}`} {...rest}>
      <div className={`mx-auto max-w-content ${innerClassName}`}>{children}</div>
    </section>
  );
}
