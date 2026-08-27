import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import TrustSection from "@/components/sections/TrustSection";
import GlobalCTABand from "@/components/sections/GlobalCTABand";
import { useLang } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLang();
  const p = t.pages.about;

  useEffect(() => {
    document.title = "About Rutuja | Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="about-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-white py-12 md:py-20">
        <div className="container-edge max-w-3xl">
          <Reveal>
            <p className="text-base leading-relaxed text-rutuja-slate md:text-lg">{t.footer.blurb}</p>
          </Reveal>
        </div>
      </section>
      <TrustSection />
      <GlobalCTABand />
    </main>
  );
}
