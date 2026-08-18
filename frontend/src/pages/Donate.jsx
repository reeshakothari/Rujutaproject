import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useLang } from "@/context/LanguageContext";
import { Reveal } from "@/components/site/Reveal";
import { IMAGES } from "@/data/images";
import { Heart, ArrowUpRight } from "lucide-react";

export default function Donate() {
  const { t } = useLang();
  const p = t.pages.donate;

  useEffect(() => {
    document.title = "Donate | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="donate-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="bg-white py-16 md:py-24">
        <div className="container-edge grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="border border-dashed border-rutuja-blue/40 bg-rutuja-soft p-8 md:p-12" data-testid="donate-mechanism">
                <Heart className="text-rutuja-pink" size={32} aria-hidden="true" />
                <h2 className="mt-5 font-serif text-2xl text-rutuja-ink md:text-3xl">{p.mechTitle}</h2>
                <p className="mt-4 max-w-lg text-base leading-relaxed text-rutuja-slate">{p.mechBody}</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-8 text-base leading-relaxed text-rutuja-slate">{p.notice}</p>
              <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/contact" data-testid="donate-contact-cta" className="btn-secondary w-full justify-center rounded-sm sm:w-auto">
                  {p.cta} <ArrowUpRight size={18} />
                </Link>
                <Link to="/request-workshop" data-testid="donate-workshop-cta" className="btn-outline w-full justify-center rounded-sm sm:w-auto">
                  {p.alt}
                </Link>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={IMAGES.missionEvent} alt={t.workshop.imageAlt} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </main>
  );
}
