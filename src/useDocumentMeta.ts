import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { site } from "@/config/site";
import { findRouteMeta } from "@/routes";

function setMetaTag(
  attribute: "name" | "property",
  key: string,
  content: string,
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

/**
 * Keeps the document head in sync during client-side navigation. The initial
 * head is already correct because every route is prerendered to static HTML.
 */
export function useDocumentMeta() {
  const { pathname } = useLocation();
  const meta = findRouteMeta(pathname);

  useEffect(() => {
    document.title = meta.title;
    setMetaTag("name", "description", meta.description);
    setMetaTag("name", "theme-color", meta.themeColor);
    setMetaTag(
      "name",
      "robots",
      meta.indexable ? "index,follow" : "noindex,follow",
    );
    setMetaTag("property", "og:title", meta.title);
    setMetaTag("property", "og:description", meta.description);
    setMetaTag("property", "og:url", `${site.publicOrigin}${meta.path}`);

    let canonical = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );

    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }

    canonical.href = `${site.publicOrigin}${meta.path}`;
  }, [meta]);
}
