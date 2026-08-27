import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export default function VisitorJourneys() {
  const { t } = useLang();
  const v = t.visitorJourneys;
  return (
    <section id="visitor-journeys" data-testid="visitor-journeys-section" className="scroll-mt-20 overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{v.title}</h2>
          </Reveal>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-rutuja-line bg-rutuja-line sm:grid-cols-2">
          {v.cards.map((c, i) => (
            <Reveal key={i} delay={i * 0.06} className="bg-white">
              <Link
                to={c.to}
                data-testid={`visitor-journey-${i}`}
                className="group relative flex h-full min-h-[200px] flex-col justify-between p-7 transition-[background-color,box-shadow] duration-300 hover:z-10 hover:bg-rutuja-pink hover:shadow-[0_25px_60px_-20px_rgba(200,43,98,0.6)] active:bg-rutuja-pink md:p-9"
              >
                <div>
                  <h3 className="font-serif text-xl text-rutuja-ink transition-colors duration-300 group-hover:text-white group-active:text-white md:text-2xl">{c.audience}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-rutuja-slate transition-colors duration-300 group-hover:text-white/90 group-active:text-white/90">{c.desc}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-rutuja-blue transition-colors duration-300 group-hover:text-white group-active:text-white">
                  {c.cta}
                  <ArrowUpRight size={16} className="animate-icon-glow transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
