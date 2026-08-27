import { Link } from "react-router-dom";
import { Reveal, FlyIn } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function PlayLearn() {
  const { t } = useLang();
  const p = t.playLearn;

  return (
    <section data-testid="play-learn-section" className="overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow-pink inline-flex items-center gap-2">
                <Sparkles size={14} className="animate-icon-glow" aria-hidden="true" /> {p.eyebrow}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-xl font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {p.title}
                <em className="font-serif italic text-rutuja-pink">{p.titleEm}</em>
                {p.titleEnd}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-rutuja-slate md:text-lg">{p.intro}</p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Link to="/activities" data-testid="play-learn-cta" className="btn-primary w-full justify-center rounded-sm sm:w-auto">
                  {p.cta} <ArrowUpRight size={18} />
                </Link>
                <Link to="/activities#about" data-testid="play-learn-cta-secondary" className="inline-flex min-h-11 items-center justify-center px-2 py-3.5 text-sm font-semibold text-rutuja-blue">
                  {p.ctaSecondary}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-rutuja-muted">
                {p.meta.map((m, i) => (
                  <span key={i} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-rutuja-pink" aria-hidden="true" />
                    {m}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <FlyIn direction="right" delay={0.1}>
              <div className="relative mx-auto h-[300px] max-w-sm" aria-hidden="true">
                {p.teaserCards.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      top: `${i * 55}px`,
                      left: `${(i % 2) * 90}px`,
                      transform: `rotate(${i === 0 ? -6 : i === 1 ? 4 : -2}deg)`,
                      zIndex: i === 2 ? 3 : i,
                      animationDelay: `${i * 0.25}s`,
                    }}
                    className={`hover-glow-pink absolute w-[220px] animate-glow-pulse-sm rounded-2xl border-2 border-dashed p-5 shadow-[0_18px_40px_-16px_rgba(43,32,25,0.25)] transition-shadow duration-300 ${
                      i === 2 ? "border-rutuja-blue/50 bg-rutuja-blue text-white" : i === 1 ? "border-rutuja-pink/40 bg-white" : "border-rutuja-pink/40 bg-rutuja-soft"
                    }`}
                  >
                    <span
                      className={`mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full font-sans text-sm font-bold ${
                        i === 2 ? "bg-white text-rutuja-blue" : "bg-rutuja-pink text-white"
                      }`}
                    >
                      {c.n}
                    </span>
                    <p className={`font-serif text-base leading-snug ${i === 2 ? "text-white" : "text-rutuja-ink"}`}>{c.q}</p>
                  </div>
                ))}
              </div>
            </FlyIn>
          </div>
        </div>
      </div>
    </section>
  );
}
