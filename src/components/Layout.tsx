import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

import { withBasePath } from "@/basePath";
import { BrandMark } from "@/components/BrandMark";
import { site } from "@/config/site";

const NAV_ITEMS = [
  { to: "/", label: "소개" },
  { to: "/privacy", label: "개인정보처리방침" },
  { to: "/terms", label: "이용약관" },
];

function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 h-13 w-full bg-canvas/88 backdrop-blur-md sm:h-15">
      <div className="mx-auto flex h-full max-w-content items-center gap-4 px-5 sm:px-6">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2.5 font-display text-lead font-medium tracking-[-0.04em] text-ink no-underline sm:text-subtitle"
        >
          <BrandMark className="size-5 text-acid" />
          spotMixtape
        </Link>

        {/* The Korean labels are wider than a 320px header; let them scroll
            rather than wrap the header to a second row or truncate. */}
        <nav
          aria-label="주요 메뉴"
          className="-mr-5 ml-auto min-w-0 overflow-x-auto sm:-mr-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex items-center gap-1 pr-5 sm:pr-6">
            {NAV_ITEMS.map((item) => (
              <li key={item.to} className="shrink-0">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    [
                      "inline-flex min-h-10 items-center rounded-action px-2.5 py-1.5 text-caption whitespace-nowrap no-underline transition-colors sm:min-h-8",
                      isActive
                        ? "bg-chip text-ink"
                        : "text-muted hover:bg-chip-hover hover:text-ink",
                    ].join(" ")
                  }
                >
                  {item.label}
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
    <footer className="px-5 pt-10 pb-8 text-caption text-faint sm:px-6">
      <div className="mx-auto flex max-w-content flex-wrap items-center gap-x-5 gap-y-3">
        <span className="font-display text-label font-medium text-ink">
          {site.appName}
        </span>

        {NAV_ITEMS.slice(1).map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="text-muted no-underline transition-colors hover:text-ink"
          >
            {item.label}
          </Link>
        ))}

        {/* The site ships three OFL web fonts; the licence has to travel with
            them, and the minifier strips the notice out of the stylesheet. */}
        <a
          href={withBasePath("/licenses/fonts.txt")}
          className="text-muted no-underline transition-colors hover:text-ink"
        >
          글꼴 라이선스
        </a>

        <span className="ml-auto">
          {site.legalEntity} 운영 · 시행일{" "}
          <span className="font-mono">{site.effectiveDate}</span>
        </span>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="fixed top-2 left-5 z-100 -translate-y-[200%] rounded-action bg-acid px-4 py-2.5 text-control font-medium text-canvas no-underline focus:translate-y-0"
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
