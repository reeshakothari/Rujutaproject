import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { CheckCircle2 } from "lucide-react";

export default function ImpactMeasurement() {
  const { t } = useLang();
  const im = t.impactMeasurement;
  return (
    <section id="impact-measurement" data-testid="impact-measurement-section" className="scroll-mt-20 overflow-x-hidden bg-white py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow-pink">{im.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{im.title}</h2>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {im.items.map((label, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="group flex h-full items-start gap-3 border border-rutuja-line bg-rutuja-soft/40 p-5 transition-[background-color,box-shadow] duration-300 hover:bg-rutuja-pink hover:shadow-[0_20px_50px_-20px_rgba(200,43,98,0.55)]">
                <CheckCircle2
                  size={20}
                  style={{ animationDelay: `${i * 0.15}s` }}
                  className="mt-0.5 shrink-0 animate-icon-glow text-rutuja-pink transition-colors duration-300 group-hover:text-white"
                  aria-hidden="true"
                />
                <p className="text-sm font-medium leading-relaxed text-rutuja-ink transition-colors duration-300 group-hover:text-white">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
