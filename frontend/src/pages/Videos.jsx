import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { Reveal, FlyIn } from "@/components/site/Reveal";
import Marquee from "@/components/site/Marquee";
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
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} accent="pink" />
      <section className="bg-rutuja-ink py-24 text-white md:py-32">
        <div className="my-14">
          <Marquee items={["Watch", "Listen", "Witness", "Reflect", "Real Moments"]} />
        </div>
        <div className="container-edge space-y-20 md:space-y-28">
          {VIDEOS.map((v, i) => {
            const meta = p.items[i] || {};
            const index = String(i + 1).padStart(2, "0");
            const layout = i % 2 === 0 ? "left" : "right";
            return (
              <VideoRow key={v.id} testId={i} video={v} meta={meta} index={index} layout={layout} />
            );
          })}
        </div>
      </section>
    </main>
  );
}

function VideoRow({ testId, video, meta, index, layout }) {
  const videoFirst = layout === "left";
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-6 ${videoFirst ? "" : "lg:order-2"}`}>
        <FlyIn direction={videoFirst ? "left" : "right"} distance={160}>
          <div className="group mx-auto w-fit overflow-hidden border border-rutuja-pink/25 shadow-[0_30px_80px_-45px_rgba(200,43,98,0.45)] transition-shadow duration-700 hover:shadow-[0_30px_90px_-30px_rgba(200,43,98,0.65)]">
            <video
              data-testid={`video-player-${testId}`}
              controls
              playsInline
              preload="metadata"
              poster={video.poster}
              className="mx-auto block max-h-[70vh] w-auto max-w-full"
            >
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </FlyIn>
      </div>
      <div className={`lg:col-span-6 ${videoFirst ? "" : "lg:order-1"}`}>
        <Reveal delay={0.1}>
          <figcaption data-testid={`video-item-${testId}`}>
            <span className="font-serif text-5xl text-rutuja-pink/30 drop-shadow-[0_0_18px_rgba(200,43,98,0.35)]">{index}</span>
            <h2 className="mt-4 font-serif text-2xl leading-snug text-white md:text-3xl">{meta.title}</h2>
            {meta.description && (
              <p className="mt-6 max-w-md whitespace-pre-line text-sm leading-relaxed text-white/70">{meta.description}</p>
            )}
          </figcaption>
        </Reveal>
      </div>
    </div>
  );
}
