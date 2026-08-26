import type { ReactNode } from "react";

import { site } from "@/config/site";

export interface PolicySectionMeta {
  id: string;
  title: string;
}

interface PolicyLayoutProps {
  title: string;
  sections: PolicySectionMeta[];
  children: ReactNode;
}

/** Plain single-column legal document: title, effective date, TOC, sections. */
export function PolicyLayout({ title, sections, children }: PolicyLayoutProps) {
  return (
    <div className="bg-paper text-ink">
      <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        <header>
          <h1 className="text-3xl sm:text-4xl">{title}</h1>
          <p className="mt-3 mb-0 font-mono text-xs tracking-wide text-ink/55">
            시행일 {site.effectiveDate}
          </p>
        </header>

        <nav
          aria-label="이 문서의 목차"
          className="mt-8 border-y border-ink/15 py-4 no-print"
        >
          <ol className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex min-h-10 items-center gap-2.5 text-sm text-ink/60 no-underline transition-colors hover:text-ink"
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

        <article>{children}</article>
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
    <section id={id} className="scroll-mt-24 border-b border-ink/15 py-8 sm:py-10">
      <h2 className="mb-4 flex items-baseline gap-2.5 text-xl sm:text-2xl">
        <span className="font-mono text-xs font-bold text-[#667a17]">
          {String(index).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="flex flex-col gap-4 text-[0.95rem] text-ink/75 sm:text-base [&_a]:font-bold [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}

export function PolicyList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="my-0 list-disc space-y-2.5 pl-5 marker:text-[#708d00]">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export function PolicyNote({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <aside className="my-1 border border-ink/15 bg-paper-deep px-5 py-4">
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
      className="my-2 max-w-full overflow-x-auto border border-ink/15"
    >
      <table className="w-full min-w-[38rem] border-collapse text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="border-r border-b border-ink/15 bg-paper-deep p-3 text-left font-mono text-[0.65rem] tracking-wide uppercase last:border-r-0"
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
                  className="border-r border-b border-ink/15 p-3 align-top text-ink/75 first:font-bold first:text-ink last:border-r-0 [tr:last-child_&]:border-b-0"
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
    <dl className="mt-2 border-t border-ink/15">
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
