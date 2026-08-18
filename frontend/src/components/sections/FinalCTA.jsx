import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const { t } = useLang();
  const c = t.finalCta;
  return (
    <section data-testid="final-cta-section" className="relative overflow-hidden bg-rutuja-ink py-28 text-white md:py-36">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-rutuja-pink/60 to-transparent" aria-hidden="true" />
      <div className="container-edge">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl lg:text-[3.5rem]">
              {c.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{c.sub}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link to="/request-workshop" data-testid="final-workshop-btn" className="btn-primary w-full justify-center rounded-sm sm:w-auto">
                {c.primary} <ArrowUpRight size={18} />
              </Link>
              <Link to="/donate" data-testid="final-donate-btn" className="btn-secondary w-full justify-center rounded-sm sm:w-auto">
                {c.secondary}
              </Link>
              <Link to="/partner" data-testid="final-partner-btn" className="inline-flex w-full items-center justify-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-rutuja-ink sm:w-auto">
                {c.tertiary}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
