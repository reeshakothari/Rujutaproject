import { Reveal, FlyIn } from "@/components/site/Reveal";
import { motion, useReducedMotion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";
import { IMAGES } from "@/data/images";

export default function WhyThisMatters() {
  const { t } = useLang();
  const w = t.why;
  return (
    <section data-testid="why-section" className="relative overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
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
                <span className="block">{w.titleLine1}</span>
                <span className="block">
                  {w.titleLine2}{" "}
                  <span className="italic text-rutuja-pink animate-text-glow">{w.titleWord}</span>.
                </span>
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
            <FlyIn direction="right" delay={0.1}>
              <div className="group relative aspect-[4/5] overflow-hidden shadow-[0_30px_70px_-30px_rgba(200,43,98,0.35)] transition-shadow duration-700 hover:shadow-[0_30px_90px_-24px_rgba(200,43,98,0.55)]">
                <img
                  src={IMAGES.girlPortrait}
                  alt="A girl holding the Dignity Doll after a session"
                  className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
            </FlyIn>
          </div>
        </div>

        <PullSequence text={w.pull} />
      </div>
    </section>
  );
}

// Scroll-triggered, editorial reveal of the "Silence → … → Positive action" line.
// Draws the blue rule first, then reveals each phrase left-to-right (arrows trailing
// their word), with gentle emphasis building toward "Positive action". Settles once,
// never loops. Falls back to the original static markup for reduced-motion users.
function PullSequence({ text }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <p
        data-testid="why-pull"
        className="mt-16 max-w-3xl border-l-2 border-rutuja-blue pl-6 font-serif text-xl leading-relaxed text-rutuja-ink md:text-2xl"
      >
        {text}
      </p>
    );
  }

  const phrases = text.split(/\s*→\s*/).filter(Boolean);
  const ease = "easeOut";
  const lineDur = 0.4;
  const start = lineDur + 0.05; // phrases begin just after the rule finishes drawing
  const stagger = 0.12; // ~120ms between phrases, per the brief's global stagger
  const vp = { once: true, margin: "-15% 0px" };
  // gentle emphasis gradient toward the final phrase
  const restOpacity = (i) => 0.72 + (i / (phrases.length - 1)) * 0.28;

  return (
    <p
      data-testid="why-pull"
      className="relative mt-16 max-w-3xl pl-6 font-serif text-xl leading-relaxed text-rutuja-ink md:text-2xl"
    >
      {/* full sentence for assistive tech (visible tokens are aria-hidden) */}
      <span className="sr-only">{text}</span>

      {/* the blue rule, drawn top → bottom */}
      <motion.span
        aria-hidden="true"
        data-testid="why-pull-line"
        className="absolute inset-y-0 left-0 w-0.5 origin-top bg-rutuja-blue"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={vp}
        transition={{ duration: lineDur, ease }}
      />

      {/* Mobile: vertical stack, one phrase per line. Desktop: horizontal sequence with arrows. */}
      <span aria-hidden="true" className="flex flex-col gap-2 md:block md:gap-0">
        {phrases.map((phrase, i) => {
          const isLast = i === phrases.length - 1;
          const wordDelay = start + i * stagger;

          return (
            <span key={i} className="block md:inline">
              <motion.span
                className={`inline-block ${isLast ? "text-rutuja-pink [text-shadow:0_0_22px_rgba(200,43,98,0.5)]" : ""}`}
                initial={isLast ? { opacity: 0, y: 14, scale: 0.97 } : { opacity: 0, y: 14 }}
                whileInView={isLast ? { opacity: 1, y: 0, scale: 1 } : { opacity: restOpacity(i), y: 0 }}
                viewport={vp}
                transition={{ duration: isLast ? 0.4 : 0.35, ease, delay: wordDelay }}
              >
                {phrase}
              </motion.span>
              {!isLast && <span className="mx-2 hidden text-rutuja-ink/40 md:inline">→</span>}
            </span>
          );
        })}
      </span>
    </p>
  );
}

