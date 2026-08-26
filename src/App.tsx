import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { Landing } from "@/pages/Landing";
import { NotFound } from "@/pages/NotFound";
import { Privacy } from "@/pages/Privacy";
import { Terms } from "@/pages/Terms";
import { useDocumentMeta } from "@/useDocumentMeta";

/** Start each new page at the top; scroll cross-page anchor jumps to target. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // The browser already resolved the fragment for the initial static page;
    // re-scrolling here would fight it. Only client-side navigations need help.
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export function App() {
  useDocumentMeta();

  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
