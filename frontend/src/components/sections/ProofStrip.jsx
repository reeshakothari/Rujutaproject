import { Reveal } from "@/components/site/Reveal";
import CountUp from "@/components/site/CountUp";
import { useLang } from "@/context/LanguageContext";

export default function ProofStrip() {
  const { t } = useLang();
  const items = t.proofStrip.items;
  return (
    <section data-testid="proof-strip-section" className="overflow-x-hidden border-y border-rutuja-line bg-white py-8 md:py-10">
      <div className="container-edge">
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:divide-x md:divide-rutuja-line">
          {items.map((m, i) => (
            <Reveal key={i} delay={i * 0.06} className="text-center md:px-6 md:text-left md:first:pl-0">
              <p
                data-testid={`proof-strip-value-${i}`}
                className="animate-text-glow-blue font-serif text-3xl font-medium leading-none text-rutuja-blue md:text-4xl"
              >
                {m.isText ? m.value : <CountUp value={m.value} />}
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-rutuja-slate">{m.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
