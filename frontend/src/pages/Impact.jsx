import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/site/PageHeader";
import ImpactMap from "@/components/sections/ImpactMap";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";

export default function Impact() {
  const { t } = useLang();
  const im = t.impact;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Impact | Rutuja Dignity Doll";
  }, []);

  return (
    <main data-testid="impact-page">
      <PageHeader eyebrow={im.eyebrow} title={im.title} sub={im.note} />

      <ImpactMap showStats={true} showCta={false} />

      <section className="bg-rutuja-soft py-16 md:py-24">
        <div className="container-edge">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rutuja-muted">{im.statesLabel}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {im.states.map((s, i) => (
                <span key={i} className="font-serif text-2xl text-rutuja-ink md:text-3xl">{s}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link to="/request-workshop" data-testid="impact-cta-workshop" className="btn-primary rounded-sm">
                {t.support.actions[0].cta} <ArrowUpRight size={18} />
              </Link>
              <Link to="/donate" data-testid="impact-cta-donate" className="btn-secondary rounded-sm">
                {t.support.actions[1].cta} <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
