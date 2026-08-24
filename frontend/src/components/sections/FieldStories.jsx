import { Reveal, FlyIn } from "@/components/site/Reveal";
import Marquee from "@/components/site/Marquee";
import { useLang } from "@/context/LanguageContext";
import { IMAGES } from "@/data/images";
import { Quote } from "lucide-react";

export default function FieldStories() {
  const { t } = useLang();
  const s = t.stories;
  const imgs = [IMAGES.villageGroup, IMAGES.fieldNight, IMAGES.classroom];

  return (
    <section id="stories" data-testid="stories-section" className="scroll-mt-20 overflow-x-hidden bg-rutuja-ink py-24 text-white md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-rutuja-pink">
              <span className="mr-3 font-serif text-base not-italic text-white/40">05</span>{s.eyebrow}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight md:text-5xl">{s.title}</h2>
          </Reveal>
        </div>
      </div>

      <div className="my-14">
        <Marquee items={["Silence", "Conversation", "Understanding", "Dignity", "Positive action"]} />
      </div>

      <div className="container-edge space-y-20 md:space-y-28">
        {/* Story 01 — image left / quote right */}
        <Story {...s.items[0]} img={imgs[0]} index="01" layout="left" />
        {/* Story 02 — quote left / image right */}
        <Story {...s.items[1]} img={imgs[1]} index="02" layout="right" />
        {/* Story 03 — full-width image with quote below */}
        <StoryWide {...s.items[2]} img={imgs[2]} index="03" />
      </div>

      <div className="container-edge mt-16">
        <p className="max-w-2xl text-xs leading-relaxed text-white/40">{s.note}</p>
      </div>
    </section>
  );
}

function Meta({ location, audience }) {
  return (
    <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-xs uppercase tracking-[0.18em] text-white/50">
      <span>{location}</span>
      <span>{audience}</span>
    </div>
  );
}

function Story({ quote, context, location, audience, img, index, layout }) {
  const imageFirst = layout === "left";
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div className={`lg:col-span-6 ${imageFirst ? "" : "lg:order-2"}`}>
        <FlyIn direction={imageFirst ? "left" : "right"}>
          <div className="group relative aspect-[5/4] overflow-hidden shadow-[0_25px_60px_-30px_rgba(200,43,98,0.4)] transition-shadow duration-700 hover:shadow-[0_25px_80px_-24px_rgba(200,43,98,0.6)]">
            <img
              src={img}
              alt="A Dignity Doll session in the community"
              className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              loading="lazy"
            />
          </div>
        </FlyIn>
      </div>
      <div className={`lg:col-span-6 ${imageFirst ? "" : "lg:order-1"}`}>
        <Reveal delay={0.1}>
          <span className="font-serif text-5xl text-white/15">{index}</span>
          <Quote className="mt-3 text-rutuja-pink drop-shadow-[0_0_10px_rgba(200,43,98,0.65)]" size={30} aria-hidden="true" />
          <blockquote className="mt-4 font-serif text-2xl leading-snug md:text-3xl">{quote}</blockquote>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-white/70">{context}</p>
          <Meta location={location} audience={audience} />
        </Reveal>
      </div>
    </div>
  );
}

function StoryWide({ quote, context, location, audience, img, index }) {
  return (
    <div>
      <FlyIn direction="up">
        <div className="group relative aspect-[16/9] w-full overflow-hidden shadow-[0_25px_70px_-30px_rgba(200,43,98,0.4)] transition-shadow duration-700 hover:shadow-[0_25px_90px_-24px_rgba(200,43,98,0.6)]">
          <img
            src={img}
            alt="Participants at a Dignity Doll session"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rutuja-ink/70 to-transparent" aria-hidden="true" />
          <span className="absolute left-6 top-6 font-serif text-5xl text-white/40">{index}</span>
        </div>
      </FlyIn>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal delay={0.05}>
            {quote ? (
              <blockquote className="font-serif text-2xl leading-snug md:text-3xl">{quote}</blockquote>
            ) : (
              <p className="font-serif text-2xl leading-snug text-white/90 md:text-3xl">{context}</p>
            )}
          </Reveal>
        </div>
        <div className="lg:col-span-4">
          <Reveal delay={0.1}>
            {quote && <p className="text-sm leading-relaxed text-white/70">{context}</p>}
            <Meta location={location} audience={audience} />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
