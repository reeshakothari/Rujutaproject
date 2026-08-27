import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";

export default function ConversionStrip() {
  const { t } = useLang();
  const c = t.conversionStrip;
  const g = t.globalCta;
  return (
    <section data-testid="conversion-strip-section" className="overflow-x-hidden bg-rutuja-ink py-16 text-white md:py-20">
      <div className="container-edge text-center">
        <Reveal>
          <p className="mx-auto max-w-2xl font-serif text-2xl leading-snug md:text-3xl">{c.title}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base">{c.body}</p>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/request-workshop" data-testid="conversion-strip-workshop" className="btn-primary w-full justify-center rounded-sm sm:w-auto">
              {g.workshop}
            </Link>
            <Link to="/donate" data-testid="conversion-strip-donate" className="btn-secondary w-full justify-center rounded-sm sm:w-auto">
              {g.donate}
            </Link>
            <Link
              to="/contact"
              data-testid="conversion-strip-inquiry"
              className="inline-flex min-h-11 w-full items-center justify-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-rutuja-ink sm:w-auto"
            >
              {g.inquiry}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
