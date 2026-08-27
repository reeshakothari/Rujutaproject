import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import VisitorJourneys from "@/components/sections/VisitorJourneys";
import GlobalCTABand from "@/components/sections/GlobalCTABand";
import { useLang } from "@/context/LanguageContext";

export default function GetInvolved() {
  const { t } = useLang();
  const p = t.pages.getInvolved;

  useEffect(() => {
    document.title = "Get Involved | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="get-involved-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <VisitorJourneys />
      <GlobalCTABand />
    </main>
  );
}
