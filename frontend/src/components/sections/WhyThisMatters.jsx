import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { IMAGES } from "@/data/images";

export default function WhyThisMatters() {
  const { t } = useLang();
  const w = t.why;
  return (
    <section data-testid="why-section" className="relative bg-white py-24 md:py-32">
      <div className="container-edge">
        <Reveal>
          <p className="eyebrow-pink">
            <span className="mr-3 font-serif text-base not-italic">02</span>{w.eyebrow}
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-serif text-4xl font-medium leading-[1.08] tracking-tight text-rutuja-ink md:text-5xl lg:text-[3.4rem]">
                The problem is not menstruation. The problem is{" "}
                <span className="italic text-rutuja-pink">{silence(w.title)}</span>.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-rutuja-ink md:text-xl">
                {w.lead}
              </p>
            </Reveal>
            <div className="mt-6 max-w-2xl space-y-5">
              {w.body.map((p, i) => (
                <Reveal key={i} delay={0.15 + i * 0.08}>
                  <p className="text-base leading-relaxed text-rutuja-slate md:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={IMAGES.schoolGirls}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-105"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.15}>
          <p className="mt-16 max-w-3xl border-l-2 border-rutuja-blue pl-6 font-serif text-xl leading-relaxed text-rutuja-ink md:text-2xl">
            {w.pull}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// The title string already contains the translated sentence; for HI we render title directly.
function silence(title) {
  // For EN we highlight the word "silence"; for HI show the whole translated title's key word.
  return title.includes("silence") ? "silence" : "";
}
