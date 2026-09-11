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

/**
 * Legal documents are documents, not marketing: one column on paper, no hero,
 * no reveal animation, nothing between the title and the text but a table of
 * contents. Sections are separated by space rather than by rules.
 */
export function PolicyLayout({ title, sections, children }: PolicyLayoutProps) {
  return (
    <div className="bg-paper text-paper-body">
      <div className="mx-auto max-w-prose px-5 py-14 sm:px-6 sm:py-20">
        <header>
          <h1 className="text-section text-paper-ink sm:text-section-lg">
            {title}
          </h1>
          <p className="mt-3 mb-0 text-meta text-paper-muted">
            시행일 <span className="font-mono">{site.effectiveDate}</span>
          </p>
        </header>

        <nav aria-label="이 문서의 목차" className="no-print mt-9">
          <ol className="m-0 -mx-3 grid list-none grid-cols-1 gap-x-4 p-0 sm:grid-cols-2">
            {sections.map((section, index) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="flex min-h-10 items-center gap-2.5 rounded-control px-3 text-control text-paper-muted no-underline transition-colors hover:bg-paper-raised hover:text-paper-ink"
                >
                  <span className="font-mono text-caption text-paper-accent">
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
    <section id={id} className="scroll-mt-20 pt-12 sm:pt-14">
      <h2 className="flex items-baseline gap-2.5 text-subtitle text-paper-ink sm:text-title">
        <span className="font-mono text-caption text-paper-accent">
          {String(index).padStart(2, "0")}
        </span>
        {title}
      </h2>
      <div className="mt-4 flex flex-col gap-5 text-control sm:text-body [&_a]:text-paper-ink [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </section>
  );
}

export function PolicyList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="my-0 list-disc space-y-3 pl-5 marker:text-paper-accent">
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
    <aside className="my-1 rounded-card bg-paper-raised px-5 py-4">
      <strong className="mb-2 block text-paper-ink">{heading}</strong>
      {children}
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
      className="my-1 max-w-full overflow-x-auto rounded-card border border-paper-line"
    >
      <table className="w-full min-w-[38rem] border-collapse text-label">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr>
            {head.map((cell) => (
              <th
                key={cell}
                scope="col"
                className="border-b border-paper-line bg-paper-raised px-4 py-3 text-left text-caption text-paper-ink"
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
                  className="border-b border-paper-line px-4 py-3 align-top first:text-paper-ink [tr:last-child_&]:border-b-0"
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
    <dl className="m-0 grid gap-3">
      {entries.map((entry) => (
        <div
          key={entry.term}
          className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:items-baseline sm:gap-4"
        >
          <dt className="text-caption text-paper-muted">
            {entry.term}
          </dt>
          <dd className="m-0 text-paper-ink">{entry.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
