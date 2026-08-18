import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const { t } = useLang();
  const h = t.how;
  return (
    <section id="how-it-works" data-testid="how-section" className="scroll-mt-20 bg-rutuja-soft py-24 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow"><span className="mr-3 font-serif text-base">04</span>{h.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
              {h.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-rutuja-slate md:text-lg">{h.sub}</p>
          </Reveal>
        </div>

        {/* Steps — editorial timeline */}
        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {h.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <div className="group relative border border-rutuja-line bg-white p-6 transition-colors duration-300 hover:bg-rutuja-pink">
                <span className="font-serif text-4xl text-rutuja-blue/30 transition-colors duration-300 group-hover:text-white/60">{s.n}</span>
                <h3 className="mt-3 font-sans text-lg font-semibold text-rutuja-ink transition-colors duration-300 group-hover:text-white">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-rutuja-slate transition-colors duration-300 group-hover:text-white/85">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Transformation flow */}
        <div className="mt-20 border border-rutuja-line bg-white p-8 md:p-12">
          <Reveal>
            <p className="eyebrow-pink">{h.flowTitle}</p>
          </Reveal>
          <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-4">
            {h.flow.map((step, i) => (
              <Reveal key={i} delay={i * 0.05} className="flex items-center gap-3">
                <span className={`font-serif text-xl md:text-2xl ${i === h.flow.length - 1 ? "text-rutuja-pink" : "text-rutuja-ink"}`}>
                  {step}
                </span>
                {i < h.flow.length - 1 && <ArrowRight size={18} className="text-rutuja-blue/50" aria-hidden="true" />}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
