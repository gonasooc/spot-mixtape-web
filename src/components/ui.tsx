import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type ButtonTone = "primary" | "quiet" | "dark" | "inverse";

const TONE_CLASSES: Record<ButtonTone, string> = {
  primary: "bg-acid text-ink hover:bg-acid-strong",
  quiet: "border border-line text-paper hover:border-paper",
  dark: "bg-ink text-acid hover:bg-ink-raised",
  inverse: "border border-ink text-ink hover:bg-ink hover:text-acid",
};

const BUTTON_BASE =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-center font-mono text-xs font-bold tracking-wide no-underline transition-[background-color,color,border-color,transform] duration-150 hover:-translate-y-0.5";

interface ActionProps {
  tone?: ButtonTone;
  className?: string;
  children: ReactNode;
}

/** Internal navigation styled as a button. */
export function ButtonLink({
  to,
  tone = "primary",
  className = "",
  children,
}: ActionProps & { to: string }) {
  return (
    <Link to={to} className={`${BUTTON_BASE} ${TONE_CLASSES[tone]} ${className}`}>
      {children}
    </Link>
  );
}

/** External or mailto destination styled as a button. */
export function ButtonAnchor({
  href,
  tone = "primary",
  className = "",
  children,
}: ActionProps & { href: string }) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`${BUTTON_BASE} ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </a>
  );
}

export function Eyebrow({
  children,
  className = "text-acid",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow mb-4 ${className}`}>{children}</p>;
}

/** Standard page gutter and vertical rhythm, tuned mobile-first. */
export function Section({
  children,
  className = "",
  ...rest
}: {
  children: ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`px-5 py-16 sm:px-8 sm:py-24 ${className}`} {...rest}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}
