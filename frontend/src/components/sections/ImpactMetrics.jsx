import { Reveal } from "@/components/site/Reveal";
import CountUp from "@/components/site/CountUp";
import { useLang } from "@/context/LanguageContext";

export default function ImpactMetrics() {
  const { t } = useLang();
  const p = t.impactMap.pilot;
  return (
    <section id="impact" data-testid="impact-section" className="scroll-mt-20 overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow-pink">{p.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {p.title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-rutuja-muted lg:text-right">{p.note}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-rutuja-line pt-10 md:grid-cols-5 md:divide-x md:divide-rutuja-line">
          {p.metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="group transition-transform duration-300 hover:-translate-y-1.5 md:px-6 md:first:pl-0">
                <p
                  data-testid={`pilot-stat-value-${i}`}
                  style={{ animationDelay: `${i * 0.15}s` }}
                  className={`animate-text-glow-blue font-serif font-medium leading-none text-rutuja-blue transition-[color,text-shadow] duration-300 group-hover:text-rutuja-pinkdark group-hover:[text-shadow:0_0_24px_rgba(200,43,98,0.5)] ${
                    m.isText ? "text-lg md:text-xl" : "text-4xl md:text-5xl"
                  }`}
                >
                  {m.isText ? m.value : <CountUp value={m.value} />}
                </p>
                <p className="mt-3 text-xs font-medium uppercase tracking-wide text-rutuja-slate">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
