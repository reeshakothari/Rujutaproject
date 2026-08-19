import { Link } from "react-router-dom";
import { Play, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { VIDEOS } from "@/data/videos";

export default function ExperienceVideo() {
  const { t } = useLang();
  const e = t.pages.experience;
  const poster = VIDEOS[0]?.posterWide;

  return (
    <section id="experience" data-testid="experience-section" className="scroll-mt-20 bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow-pink">{e.eyebrow}</p>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {e.title}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-rutuja-slate md:text-lg">{e.sub}</p>
              <Link to="/videos" data-testid="experience-more" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rutuja-blue">
                {e.more} <ArrowUpRight size={18} />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <Link
                to="/videos"
                data-testid="experience-video-link"
                aria-label={e.cta}
                className="group relative block aspect-video w-full overflow-hidden bg-rutuja-ink shadow-[0_30px_80px_-40px_rgba(0,0,0,0.5)]"
              >
                {poster && (
                  <img
                    src={poster}
                    alt=""
                    className="h-full w-full object-cover opacity-90 transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <span className="absolute inset-0 bg-rutuja-ink/25 transition-colors duration-300 group-hover:bg-rutuja-ink/10" aria-hidden="true" />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-white/95 text-rutuja-pink shadow-xl transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                    <Play size={30} className="ml-1 fill-rutuja-pink" />
                  </span>
                </span>
                <span className="absolute bottom-5 left-5 bg-rutuja-pink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                  {e.cta}
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
