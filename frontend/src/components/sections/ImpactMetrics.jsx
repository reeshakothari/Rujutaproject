import { Reveal } from "@/components/site/Reveal";
import CountUp from "@/components/site/CountUp";
import { useLang } from "@/context/LanguageContext";

export default function ImpactMetrics() {
  const { t } = useLang();
  const im = t.impact;
  return (
    <section id="impact" data-testid="impact-section" className="scroll-mt-20 bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow"><span className="mr-3 font-serif text-base">06</span>{im.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {im.title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-rutuja-muted lg:text-right">{im.note}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 divide-y divide-rutuja-line border-y border-rutuja-line sm:grid-cols-3 sm:divide-y-0">
          {im.metrics.map((m, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="px-2 py-8 transition-transform duration-300 hover:-translate-y-1.5 sm:px-6 sm:border-r sm:border-rutuja-line sm:last:border-r-0">
                <p className="font-serif text-4xl font-medium leading-none text-rutuja-blue md:text-6xl"><CountUp value={m.value} /></p>
                <p className="mt-4 text-sm font-medium uppercase tracking-wide text-rutuja-slate">{m.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {im.states && (
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-col gap-4 border-t border-rutuja-line pt-8 md:flex-row md:items-center md:justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rutuja-muted">{im.statesLabel}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {im.states.map((s, i) => (
                  <span key={i} className="font-serif text-lg text-rutuja-ink md:text-xl">{s}</span>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
