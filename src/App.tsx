import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { Layout } from "@/components/Layout";
import { AccountDeletion } from "@/pages/AccountDeletion";
import { Landing } from "@/pages/Landing";
import { NotFound } from "@/pages/NotFound";
import { Privacy } from "@/pages/Privacy";
import { Terms } from "@/pages/Terms";
import { useDocumentMeta } from "@/useDocumentMeta";

/** Start each new page at the top, but leave in-page anchor jumps alone. */
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
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
        <Route path="/account-deletion" element={<AccountDeletion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
