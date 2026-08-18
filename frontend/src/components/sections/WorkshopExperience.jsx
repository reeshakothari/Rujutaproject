import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { IMAGES } from "@/data/images";
import { ArrowUpRight, Check } from "lucide-react";

export default function WorkshopExperience() {
  const { t } = useLang();
  const w = t.workshop;
  return (
    <section data-testid="workshop-section" className="relative overflow-hidden bg-rutuja-blue py-24 text-white md:py-32">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/5" aria-hidden="true" />
      <div className="container-edge">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
                <span className="mr-3 font-serif text-base not-italic text-white/40">08</span>{w.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight md:text-5xl">{w.title}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">{w.body}</p>
            </Reveal>

            <ul className="mt-8 space-y-3">
              {w.points.map((p, i) => (
                <Reveal as="li" key={i} delay={0.14 + i * 0.05} className="flex items-start gap-3">
                  <Check size={18} className="mt-1 shrink-0 text-rutuja-pink" aria-hidden="true" />
                  <span className="text-sm leading-relaxed text-white/90 md:text-base">{p}</span>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
                <Link to="/request-workshop" data-testid="workshop-section-cta" className="btn-secondary w-full justify-center rounded-sm sm:w-auto">
                  {w.primary} <ArrowUpRight size={18} />
                </Link>
                <a href="#how-it-works" className="inline-flex w-full items-center justify-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-rutuja-blue sm:w-auto">
                  {w.secondary}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
                <img src={IMAGES.workshopField} alt={w.imageAlt} className="h-full w-full object-cover" loading="lazy" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
