import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { Quote } from "lucide-react";

const isPlaceholder = (s) => typeof s === "string" && s.startsWith("🟨");

export default function ExternalValidation() {
  const { t } = useLang();
  const e = t.externalValidation;
  return (
    <section data-testid="external-validation-section" className="overflow-x-hidden bg-white py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow-pink">{e.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{e.title}</h2>
          </Reveal>
        </div>

        {isPlaceholder(e.featured.quote) ? (
          <Reveal delay={0.1}>
            <div className="mt-12 rounded border border-amber-300 bg-amber-50 px-6 py-5 text-sm leading-relaxed text-amber-900">
              {e.featured.quote}
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.1} className="group mt-12 border-l-2 border-rutuja-pink bg-rutuja-soft/50 p-8 transition-[background-color,box-shadow] duration-300 hover:bg-rutuja-pink hover:shadow-[0_25px_60px_-24px_rgba(200,43,98,0.55)] md:p-12">
            <Quote className="animate-icon-glow text-rutuja-pink transition-colors duration-300 group-hover:text-white" size={30} aria-hidden="true" />
            <blockquote data-testid="external-validation-featured-quote" className="mt-4 font-serif text-xl leading-snug text-rutuja-ink transition-colors duration-300 group-hover:text-white md:text-2xl">
              {e.featured.quote}
            </blockquote>
            {e.featured.attribution && (
              <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-rutuja-muted transition-colors duration-300 group-hover:text-white/80">{e.featured.attribution}</p>
            )}
          </Reveal>
        )}

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {e.supporting.map((s, i) => (
            <Reveal key={i} delay={0.06 + i * 0.05}>
              {isPlaceholder(s.quote) ? (
                <div className="h-full rounded border border-amber-300 bg-amber-50 p-5 text-xs leading-relaxed text-amber-900">
                  {s.quote}
                </div>
              ) : (
                <div className="group h-full border border-rutuja-line p-6 transition-[background-color,box-shadow] duration-300 hover:bg-rutuja-pink hover:shadow-[0_20px_50px_-20px_rgba(200,43,98,0.55)]">
                  <p className="text-sm leading-relaxed text-rutuja-slate transition-colors duration-300 group-hover:text-white/90">{s.quote}</p>
                  {s.attribution && <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-rutuja-muted transition-colors duration-300 group-hover:text-white/80">{s.attribution}</p>}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
