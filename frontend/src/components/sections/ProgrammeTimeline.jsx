import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";

const EASE = "easeOut";

export default function ProgrammeTimeline() {
  const { t } = useLang();
  const p = t.programme;
  const reduce = useReducedMotion();
  const vp = { once: true, margin: "-10% 0px" };

  return (
    <section data-testid="programme-section" className="overflow-x-hidden bg-white py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow">{p.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{p.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-rutuja-slate md:text-xl">{p.bridge}</p>
          </Reveal>
          {p.placeholder && (
            <div className="mt-6 rounded border border-amber-300 bg-amber-50 px-5 py-4 text-sm leading-relaxed text-amber-900">
              {p.placeholder}
            </div>
          )}
        </div>

        {/* Desktop: horizontal, line drawn once as the row enters view */}
        <div className="relative mt-16 hidden md:block" data-testid="programme-timeline-desktop">
          <motion.div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 h-px origin-left bg-rutuja-line"
            initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={vp}
            transition={{ duration: 0.7, ease: EASE }}
          />
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute top-6 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rutuja-pink shadow-[0_0_20px_6px_rgba(200,43,98,0.85)]"
              initial={{ left: "0%", opacity: 0 }}
              whileInView={{ left: "100%", opacity: [0, 1, 1, 0] }}
              viewport={vp}
              transition={{ duration: 2.8, delay: 0.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
            />
          )}
          <div className="relative grid grid-cols-5 gap-6">
            {p.stages.map((s, i) => (
              <motion.div
                key={s.n}
                data-testid={`programme-stage-${i}`}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.12, ease: EASE }}
              >
                <span
                  style={{ animationDelay: `${i * 0.2}s` }}
                  className="relative z-10 grid h-12 w-12 animate-glow-pulse-sm place-items-center rounded-full border-2 border-rutuja-pink bg-white font-serif text-lg text-rutuja-pinkdark"
                >
                  {s.n}
                </span>
                <h3 className="mt-4 font-sans text-base font-semibold text-rutuja-ink">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-rutuja-slate">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical, connecting line down the left edge */}
        <div className="relative mt-12 md:hidden" data-testid="programme-timeline-mobile">
          <motion.div
            aria-hidden="true"
            className="absolute bottom-0 left-6 top-0 w-px origin-top bg-rutuja-line"
            initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={vp}
            transition={{ duration: 0.7, ease: EASE }}
          />
          {!reduce && (
            <motion.span
              aria-hidden="true"
              className="absolute left-6 z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rutuja-pink shadow-[0_0_20px_6px_rgba(200,43,98,0.85)]"
              initial={{ top: "0%", opacity: 0 }}
              whileInView={{ top: "100%", opacity: [0, 1, 1, 0] }}
              viewport={vp}
              transition={{ duration: 2.8, delay: 0.9, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4 }}
            />
          )}
          <div className="space-y-8">
            {p.stages.map((s, i) => (
              <motion.div
                key={s.n}
                data-testid={`programme-stage-mobile-${i}`}
                className="relative flex gap-5"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.12, ease: EASE }}
              >
                <span
                  style={{ animationDelay: `${i * 0.2}s` }}
                  className="relative z-10 grid h-12 w-12 shrink-0 animate-glow-pulse-sm place-items-center rounded-full border-2 border-rutuja-pink bg-white font-serif text-lg text-rutuja-pinkdark"
                >
                  {s.n}
                </span>
                <div className="pt-2">
                  <h3 className="font-sans text-base font-semibold text-rutuja-ink">{s.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-rutuja-slate">{s.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
