import type { ReactNode } from "react";
import { NavLink, Link } from "react-router-dom";

import { BrandMark } from "@/components/BrandMark";
import { site } from "@/config/site";

const NAV_ITEMS = [
  { to: "/", label: "소개" },
  { to: "/privacy", label: "개인정보처리방침" },
  { to: "/terms", label: "이용약관" },
];

function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md no-print">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 sm:py-4">
        <Link
          to="/"
          className="inline-flex w-fit items-center gap-2.5 font-mono text-sm font-bold tracking-tight text-paper no-underline"
        >
          <BrandMark className="size-7 text-acid" />
          <span>spotMixtape</span>
        </Link>

        <nav aria-label="주요 메뉴" className="-mx-5 sm:mx-0">
          <ul className="flex gap-5 overflow-x-auto px-5 pb-0.5 sm:gap-7 sm:overflow-visible sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className="shrink-0">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      "group relative inline-flex min-h-11 items-center whitespace-nowrap font-mono text-xs tracking-wide no-underline transition-colors",
                      isActive
                        ? "text-paper"
                        : "text-muted hover:text-paper",
                    ].join(" ")
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={[
                          "absolute inset-x-0 bottom-1.5 h-0.5 origin-left bg-acid transition-transform duration-200",
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100",
                        ].join(" ")}
                      />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink px-5 py-10 font-mono text-xs leading-[1.95] text-muted sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <span className="font-bold text-paper">{site.appName}</span>
          <span>{site.appIdentifier}</span>
          <a
            href={`mailto:${site.supportEmail}`}
            className="w-fit text-dim underline-offset-4 hover:text-acid"
          >
            {site.supportEmail}
          </a>
        </div>

        <div className="flex flex-col gap-1.5 sm:items-end sm:text-right">
          <span>
            {site.legalEntity} 운영 · 시행일 {site.effectiveDate}
          </span>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {NAV_ITEMS.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-dim underline-offset-4 hover:text-acid"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="fixed top-3 left-3 z-100 -translate-y-[200%] border-2 border-ink bg-acid px-3.5 py-2.5 font-mono text-xs font-bold text-ink no-underline focus:translate-y-0"
      >
        본문으로 건너뛰기
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
