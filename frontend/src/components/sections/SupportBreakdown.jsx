import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";

export default function SupportBreakdown() {
  const { t } = useLang();
  const s = t.supportBreakdown;
  return (
    <section data-testid="support-breakdown-section" className="overflow-x-hidden bg-rutuja-soft py-16 md:py-24">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow-pink">{s.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-4xl">{s.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base font-medium leading-relaxed text-rutuja-ink md:text-lg">{s.statement}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {s.categories.map((c, i) => (
            <Reveal key={i} delay={0.05 + i * 0.04}>
              <div className="group h-full animate-glow-pulse-sm border border-rutuja-line bg-white p-6 transition-[background-color,box-shadow] duration-300 hover:bg-rutuja-pink hover:shadow-[0_20px_50px_-20px_rgba(200,43,98,0.55)]"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <h3 className="font-sans text-base font-semibold text-rutuja-ink transition-colors duration-300 group-hover:text-white">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-rutuja-slate transition-colors duration-300 group-hover:text-white/85">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
