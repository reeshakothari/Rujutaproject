import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { VIDEOS } from "@/data/videos";

export default function Videos() {
  const { t } = useLang();
  const p = t.pages.videos;

  useEffect(() => {
    document.title = "Videos | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="videos-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="bg-rutuja-soft py-12 md:py-20">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {VIDEOS.map((v, i) => {
              const meta = p.items[i] || {};
              return (
                <Reveal key={v.id} delay={(i % 2) * 0.08}>
                  <figure data-testid={`video-item-${i}`}>
                    <div className="flex justify-center overflow-hidden border border-rutuja-line bg-rutuja-ink shadow-[0_30px_80px_-45px_rgba(0,0,0,0.55)]">
                      <video
                        data-testid={`video-player-${i}`}
                        controls
                        playsInline
                        preload="metadata"
                        poster={v.poster}
                        className="mx-auto max-h-[78vh] w-auto max-w-full bg-black"
                      >
                        <source src={v.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <figcaption className="mt-5">
                      <h2 className="font-serif text-2xl text-rutuja-ink md:text-3xl">{meta.title}</h2>
                      {meta.description && (
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-rutuja-slate md:text-base">{meta.description}</p>
                      )}
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
