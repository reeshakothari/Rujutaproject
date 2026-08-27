import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { Sparkles } from "lucide-react";

export default function WhatsComingUp() {
  const { t } = useLang();
  const w = t.whatsComingUp;
  return (
    <section data-testid="whats-coming-up-section" className="overflow-x-hidden bg-white py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow-pink">{w.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{w.title}</h2>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {w.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <div className="group flex h-full items-start gap-4 border border-rutuja-line bg-rutuja-soft/40 p-6 transition-[background-color,box-shadow] duration-300 hover:bg-rutuja-pink hover:shadow-[0_20px_50px_-20px_rgba(200,43,98,0.55)]">
                <Sparkles
                  size={20}
                  style={{ animationDelay: `${i * 0.2}s` }}
                  className="mt-0.5 shrink-0 animate-icon-glow text-rutuja-pink transition-colors duration-300 group-hover:text-white"
                  aria-hidden="true"
                />
                <div>
                  <h3 className="font-sans text-base font-semibold text-rutuja-ink transition-colors duration-300 group-hover:text-white">{item.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-rutuja-slate transition-colors duration-300 group-hover:text-white/85">{item.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
