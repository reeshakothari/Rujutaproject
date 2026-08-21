import { Reveal, FlyIn } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { MEDIA } from "@/data/images";
import { ExternalLink } from "lucide-react";

export default function MediaCoverage() {
  const { t } = useLang();
  const m = t.media;
  return (
    <section id="media" data-testid="media-section" className="scroll-mt-20 bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow-pink">{m.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {m.title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-sm leading-relaxed text-rutuja-muted lg:text-right">{m.note}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          {m.items.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <a
                href={MEDIA[i]}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`media-clipping-${i}`}
                className="group flex h-full flex-col"
              >
                <FlyIn direction={i % 2 === 0 ? "left" : "right"} distance={90} className="relative overflow-hidden border border-rutuja-line bg-white shadow-[0_20px_50px_-30px_rgba(0,0,0,0.5)] transition-[transform,box-shadow,border-color] duration-500 group-hover:-translate-y-1.5 group-hover:border-rutuja-pink/40 group-hover:shadow-[0_25px_60px_-24px_rgba(200,43,98,0.55)]">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={MEDIA[i]}
                      alt={`${item.publication} — ${item.headline}`}
                      className="h-full w-full object-cover object-top transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-white/90 text-rutuja-blue opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                    <ExternalLink size={16} />
                  </span>
                </FlyIn>
                <div className="mt-5 flex items-baseline justify-between gap-3 border-t border-rutuja-line pt-4">
                  <span className="text-sm font-semibold text-rutuja-blue">{item.publication}</span>
                  <span className="shrink-0 text-xs uppercase tracking-[0.15em] text-rutuja-muted">{item.date}</span>
                </div>
                <p className="mt-3 font-serif text-lg leading-snug text-rutuja-ink md:text-xl">{item.headline}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-rutuja-pink">
                  {m.cta} <ExternalLink size={13} />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
