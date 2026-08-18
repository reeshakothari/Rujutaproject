import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { IMAGES } from "@/data/images";

export default function DignityDollIntro() {
  const { t } = useLang();
  const d = t.doll;
  return (
    <section id="dignity-doll" data-testid="doll-section" className="scroll-mt-20 bg-rutuja-soft py-24 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-6 lg:order-2">
            <Reveal>
              <div className="relative">
                <div className="absolute -left-4 -top-4 h-24 w-24 border-t-2 border-l-2 border-rutuja-pink" aria-hidden="true" />
                <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
                  <img src={IMAGES.dollCloseup} alt={t.hero.imageAlt} className="h-full w-full object-contain p-6" loading="lazy" />
                </div>
                <div className="absolute -right-4 -bottom-4 h-24 w-24 border-b-2 border-r-2 border-rutuja-blue" aria-hidden="true" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:order-1">
            <Reveal>
              <p className="eyebrow"><span className="mr-3 font-serif text-base">03</span>{d.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {d.title}
              </h2>
            </Reveal>
            <div className="mt-8 space-y-1.5">
              {d.lines.map((line, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <p className={`font-serif text-2xl italic md:text-3xl ${i === 2 ? "text-rutuja-pink" : "text-rutuja-ink/40"}`}>
                    {line}
                  </p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-xl text-base leading-relaxed text-rutuja-slate md:text-lg">{d.desc}</p>
            </Reveal>

            <div className="mt-10 divide-y divide-rutuja-line border-t border-rutuja-line">
              {d.tags.map((tag, i) => (
                <Reveal key={tag.k} delay={0.24 + i * 0.06}>
                  <div className="flex items-start gap-5 py-5">
                    <span className="font-serif text-lg text-rutuja-blue">{tag.k}</span>
                    <div>
                      <h3 className="font-sans text-lg font-semibold text-rutuja-ink">{tag.t}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-rutuja-slate">{tag.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
