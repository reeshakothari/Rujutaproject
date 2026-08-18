import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ShieldCheck } from "lucide-react";

export default function TrustSection() {
  const { t } = useLang();
  const tr = t.trust;
  return (
    <section data-testid="trust-section" className="bg-rutuja-soft py-24 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow"><span className="mr-3 font-serif text-base">10</span>{tr.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {tr.title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-rutuja-muted lg:text-right">{tr.note}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tr.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group flex h-full flex-col gap-3 border border-rutuja-line bg-white p-6 transition-colors duration-300 hover:border-rutuja-pink hover:bg-rutuja-pink">
                <ShieldCheck size={22} className="text-rutuja-blue transition-colors duration-300 group-hover:text-white" aria-hidden="true" />
                <h3 className="font-sans text-base font-semibold text-rutuja-ink transition-colors duration-300 group-hover:text-white">{it.t}</h3>
                <p className="text-sm leading-relaxed text-rutuja-muted transition-colors duration-300 group-hover:text-white/85">{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
