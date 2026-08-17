import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export default function SupportSection() {
  const { t } = useLang();
  const s = t.support;
  return (
    <section id="support" data-testid="support-section" className="scroll-mt-20 bg-white py-24 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow"><span className="mr-3 font-serif text-base">09</span>{s.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
              {s.title}
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-rutuja-line bg-rutuja-line md:grid-cols-2">
          {s.actions.map((a, i) => (
            <Reveal key={a.key} delay={i * 0.06} className="bg-white">
              <Link
                to={a.to}
                data-testid={`support-${a.key}`}
                className={`group relative flex h-full min-h-[220px] flex-col justify-between p-8 transition-colors md:p-10 ${
                  a.emphasis ? "hover:bg-rutuja-soft" : "hover:bg-rutuja-soft"
                }`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    {a.emphasis && <span className="h-2 w-2 rounded-full bg-rutuja-pink" aria-hidden="true" />}
                    <h3 className={`font-serif text-2xl md:text-3xl ${a.emphasis ? "text-rutuja-ink" : "text-rutuja-ink"}`}>
                      {a.t}
                    </h3>
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-rutuja-slate md:text-base">{a.d}</p>
                </div>
                <span className={`mt-8 inline-flex items-center gap-2 text-sm font-semibold ${a.emphasis ? "text-rutuja-pink" : "text-rutuja-blue"}`}>
                  {a.cta}
                  <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
