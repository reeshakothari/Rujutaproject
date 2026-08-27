import { Link } from "react-router-dom";
import { Reveal, FlyIn } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { IMAGES } from "@/data/images";
import { ShieldCheck } from "lucide-react";

export default function DignityDollIntro() {
  const { t } = useLang();
  const d = t.doll;
  const hi = d.hoverIntro;
  return (
    <section id="dignity-doll" data-testid="doll-section" className="scroll-mt-20 overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6 lg:order-2">
            <FlyIn direction="right">
              <div tabIndex={0} className="group relative">
                <div className="absolute -left-4 -top-4 h-24 w-24 border-t-2 border-l-2 border-rutuja-pink shadow-[-6px_-6px_24px_-10px_rgba(200,43,98,0.6)] transition-shadow duration-500 group-hover:shadow-[-6px_-6px_32px_-6px_rgba(200,43,98,0.85)]" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4),0_0_50px_-16px_rgba(200,43,98,0.35)] transition-shadow duration-500 group-hover:shadow-[0_30px_90px_-30px_rgba(0,0,0,0.45),0_0_65px_-12px_rgba(200,43,98,0.55)]">
                  <img
                    src={IMAGES.dollCloseup}
                    alt={t.hero.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                  <div
                    data-testid="doll-hover-intro"
                    className="absolute inset-0 hidden flex-col justify-center gap-3 overflow-y-auto bg-rutuja-ink p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100 md:flex"
                  >
                    <p className="font-serif text-lg italic text-rutuja-pink md:text-xl">{hi.eyebrow}</p>
                    {hi.paragraphs.map((para, i) => (
                      <p key={i} className="text-xs leading-relaxed text-white/85 md:text-[13px]">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="absolute -right-4 -bottom-4 h-24 w-24 border-b-2 border-r-2 border-rutuja-blue" aria-hidden="true" />
                <Link
                  to="/impact#theory-of-change"
                  data-testid="doll-patent-badge"
                  className="absolute -bottom-4 left-4 inline-flex min-h-11 animate-glow-pulse-sm items-center gap-1.5 bg-rutuja-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-rutuja-pinkdark"
                >
                  <ShieldCheck size={14} className="animate-icon-glow" aria-hidden="true" /> {d.patentBadge}
                </Link>
              </div>
            </FlyIn>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <Reveal>
              <p className="eyebrow"><span className="mr-3 font-serif text-base">03</span>{d.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {d.title}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-1.5">
              {d.lines.map((line, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className={`font-serif text-2xl italic md:text-3xl ${i === 2 ? "text-rutuja-pink animate-text-glow" : "text-rutuja-ink/40"}`}>
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-rutuja-slate md:text-lg">{d.desc}</p>
            </Reveal>

            <div className="mt-10 divide-y divide-rutuja-line border-t border-rutuja-line">
              {d.tags.map((tag, i) => (
                <Reveal key={tag.k} delay={0.24 + i * 0.06}>
                  <div className="flex items-start gap-5 py-5">
                    <span className="animate-text-glow-blue font-serif text-lg text-rutuja-blue">{tag.k}</span>
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-rutuja-ink">{tag.t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-rutuja-slate">{tag.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4} className="mt-10 border-t border-rutuja-line pt-8">
              <p className="font-serif text-lg italic text-rutuja-ink" data-testid="doll-provenance-title">
                {d.provenanceTitle}
              </p>
              <ul className="mt-5 space-y-2.5" data-testid="doll-provenance-list">
                {d.provenance.map((line, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-rutuja-slate">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-rutuja-pink" aria-hidden="true" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
