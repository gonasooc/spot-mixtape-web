import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui";

export interface PolicySectionMeta {
  id: string;
  title: string;
}

interface PolicyLayoutProps {
  eyebrow: string;
  title: ReactNode;
  lede: ReactNode;
  /** Short summary chips rendered under the lede. */
  facts?: string[];
  sections: PolicySectionMeta[];
  children: ReactNode;
}

export function PolicyLayout({
  eyebrow,
  title,
  lede,
  facts,
  sections,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="bg-paper text-ink">
      <header className="border-b border-ink/15 px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-6xl rise">
          <Eyebrow className="text-[#536800]">{eyebrow}</Eyebrow>
          <h1 className="max-w-[16ch] text-4xl sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-ink/70 sm:text-lg">
            {lede}
          </p>

          {facts && facts.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {facts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-ink/20 px-3 py-2 font-mono text-[0.65rem] font-bold tracking-wide"
                >
                  {fact}
                </li>
              ))}
            </ul>
          )}
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-5 py-12 sm:px-8 lg:flex-row lg:gap-16 lg:py-20">
        <nav
          aria-label="이 문서의 목차"
          className="border-t-2 border-ink pt-4 lg:sticky lg:top-24 lg:h-fit lg:w-64 lg:shrink-0 no-print"
        >
          <p className="eyebrow mb-2">목차</p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1">
            {sections.map((section, index) => (
              <li key={section.id} className="border-t border-ink/15">
                <a
                  href={`#${section.id}`}
                  className="flex min-h-11 items-center gap-2 py-2 text-sm text-ink/60 no-underline transition-[padding,color] hover:pl-1.5 hover:text-ink"
                >
                  <span className="font-mono text-[0.65rem] text-[#667a17]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <article className="min-w-0 max-w-3xl flex-1">{children}</article>
      </div>
    </div>
  );
}

export function PolicySection({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-t border-ink/15 py-10 first:border-t-2 first:border-t-ink sm:py-14"
    >
      <span className="mb-4 block font-mono text-xs font-bold text-[#667a17]">
        {String(index).padStart(2, "0")}
      </span>
      <h2 className="mb-6 max-w-[18ch] text-2xl sm:text-4xl">{title}</h2>
      <div className="flex flex-col gap-4 text-[0.95rem] text-ink/75 sm:text-base [&_a]:font-bold [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}

export function PolicyList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="my-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="relative border-t border-ink/15 py-3 pl-6 last:border-b last:border-ink/15"
        >
          <span
            aria-hidden="true"
            className="absolute top-[1.4rem] left-1 size-1.5 rounded-full bg-[#708d00]"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function PolicyNote({
  heading,
  accent = false,
  children,
}: {
  heading: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <aside
      className={[
        "my-2 border-l-4 px-5 py-4",
        accent
          ? "border-l-[#6e8700] bg-[#e7f5af]"
          : "border-l-ink bg-paper-deep",
      ].join(" ")}
    >
      <strong className="mb-1.5 block text-ink">{heading}</strong>
      <div className="text-ink/75">{children}</div>
    </aside>
  );
}

/** Horizontally scrollable wrapper so wide tables never break the page. */
export function PolicyTable({
  caption,
  head,
  rows,
}: {
  caption: string;
  head: string[];
  rows: ReactNode[][];
}) {
  return (
    <div
      role="region"
      aria-label={caption}
      tabIndex={0}
      className="my-4 max-w-full overflow-x-auto border border-ink/15"
    >
      <table className="w-full min-w-[38rem] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="border-r border-b border-ink/15 bg-ink p-4 text-left font-mono text-[0.65rem] tracking-wide text-acid uppercase last:border-r-0"
              >
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border-r border-b border-ink/15 p-4 align-top text-ink/75 first:font-bold first:text-ink last:border-r-0"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ContactList({
  entries,
}: {
  entries: { term: string; detail: ReactNode }[];
}) {
  return (
    <dl className="mt-4 border-t border-ink/15">
      {entries.map((entry) => (
        <div
          key={entry.term}
          className="grid gap-1 border-b border-ink/15 py-3 sm:grid-cols-[10rem_1fr] sm:gap-4"
        >
          <dt className="font-mono text-xs font-bold tracking-wide uppercase">
            {entry.term}
          </dt>
          <dd className="m-0 text-ink/75">{entry.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
