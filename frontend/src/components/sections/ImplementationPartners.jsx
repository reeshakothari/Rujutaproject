import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { Building2, ArrowUpRight } from "lucide-react";

export default function ImplementationPartners({ linkToImpact = false }) {
  const { t } = useLang();
  const p = t.implementationPartners;
  const slots = Array.from({ length: p.count });

  return (
    <section data-testid="implementation-partners-section" className="overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{p.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{p.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-rutuja-slate md:text-lg">{p.intro}</p>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {slots.map((_, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div
                style={{ animationDelay: `${i * 0.3}s` }}
                className="hover-glow-blue flex aspect-square animate-glow-pulse-sm flex-col items-center justify-center gap-2 border border-dashed border-rutuja-line bg-white p-4 text-center"
              >
                <Building2 size={22} style={{ animationDelay: `${i * 0.3}s` }} className="animate-icon-glow-blue text-rutuja-muted" aria-hidden="true" />
                <span className="text-[11px] font-medium leading-tight text-rutuja-muted">{p.placeholderLabel}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-6">
          {p.note.startsWith("🟨") ? (
            <div className="rounded border border-amber-300 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">{p.note}</div>
          ) : (
            <p className="text-sm leading-relaxed text-rutuja-muted">{p.note}</p>
          )}
        </Reveal>

        {linkToImpact && (
          <Reveal delay={0.25} className="mt-8">
            <Link to="/impact#theory-of-change" data-testid="implementation-partners-cta" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-rutuja-blue">
              {p.cta} <ArrowUpRight size={16} />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}
