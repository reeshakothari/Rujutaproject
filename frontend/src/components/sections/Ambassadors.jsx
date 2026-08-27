import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useLang } from "@/context/LanguageContext";

const AMBASSADOR_AUTOPLAY_INTERVAL = 3200;

function getInitials(name) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function Ambassadors() {
  const { t } = useLang();
  const a = t.pages.ambassadors;
  const roleLabel = t.impactMap.roleLabel;
  const people = t.impactMap.ambassadors;
  const recruitCta = t.impactMap.recruitCta;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);
  const close = useCallback(() => setActive(null), []);
  const [carouselApi, setCarouselApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const stopAutoplay = useCallback(() => setAutoplay(false), []);
  const isAutoAdvancing = useRef(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // Sync the displayed index once on mount — separate from the stop-on-interaction
  // listener below so this initial read never counts as a "user changed the slide" event.
  useEffect(() => {
    if (!carouselApi) return;
    setCurrent(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  // Stop auto-advancing only when the slide actually changes for a reason other than our
  // own timer — i.e. a real drag-swipe (dot taps and card opens already call stopAutoplay
  // directly). We deliberately do NOT stop on Embla's "pointerDown": that fires the instant
  // a finger touches the carousel, including when someone is simply scrolling the page past
  // it — which made autoplay die before anyone actually swiped it.
  useEffect(() => {
    if (!carouselApi) return undefined;
    const onSelect = () => {
      setCurrent(carouselApi.selectedScrollSnap());
      if (!isAutoAdvancing.current) stopAutoplay();
      isAutoAdvancing.current = false;
    };
    carouselApi.on("select", onSelect);
    return () => carouselApi.off("select", onSelect);
  }, [carouselApi, stopAutoplay]);

  useEffect(() => {
    if (!carouselApi || !autoplay || reduce || active) return undefined;
    const id = setInterval(() => {
      isAutoAdvancing.current = true;
      carouselApi.scrollNext();
    }, AMBASSADOR_AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [carouselApi, autoplay, reduce, active]);

  return (
    <section id="ambassadors" data-testid="ambassadors-section" className="scroll-mt-20 overflow-x-hidden bg-white py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow-pink">{a.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{a.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-rutuja-slate md:text-lg">{a.sub}</p>
          </Reveal>
        </div>

        {/* Mobile: swipeable carousel — one ambassador at a time, with a peek of the next */}
        <Reveal delay={0.15} className="mt-10 sm:hidden">
          <Carousel setApi={setCarouselApi} opts={{ loop: true, align: "center" }} data-testid="ambassadors-carousel">
            <CarouselContent>
              {people.map((person, i) => (
                <CarouselItem key={i} className="basis-[82%]">
                  <AmbassadorCard
                    person={person}
                    roleLabel={roleLabel}
                    readStory={a.readStory}
                    testid={`ambassador-mobile-${i}`}
                    index={i}
                    onOpen={() => {
                      stopAutoplay();
                      setActive(person);
                    }}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="mt-5 flex items-center gap-4">
            <span className="shrink-0 font-serif text-sm text-rutuja-muted" data-testid="ambassadors-counter">
              <span className="text-rutuja-ink">{String(current + 1).padStart(2, "0")}</span> / {String(people.length).padStart(2, "0")}
            </span>
            <div className="no-scrollbar flex min-w-0 items-center gap-1 overflow-x-auto" role="tablist" aria-label="Ambassador slides">
              {people.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={current === i}
                  aria-label={`Go to ambassador ${i + 1}`}
                  onClick={() => {
                    stopAutoplay();
                    carouselApi?.scrollTo(i);
                  }}
                  className="grid h-11 w-11 shrink-0 place-items-center"
                >
                  <span className={`block h-2 rounded-full transition-all duration-300 ${current === i ? "w-6 bg-rutuja-pink" : "w-2 bg-rutuja-line"}`} />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Tablet/desktop: full grid */}
        <div className="mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person, i) => (
            <Reveal key={i} delay={(i % 3) * 0.06}>
              <AmbassadorCard person={person} roleLabel={roleLabel} readStory={a.readStory} testid={`ambassador-${i}`} index={i} onOpen={() => setActive(person)} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <Link to="/apply-ambassador" data-testid="ambassador-recruit-cta" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-rutuja-blue">
            {recruitCta} <ArrowUpRight size={16} className="animate-icon-glow-blue" />
          </Link>
        </Reveal>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="ambassador-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-rutuja-ink/90 p-4 backdrop-blur-sm"
          >
            <button
              data-testid="ambassador-lightbox-close"
              onClick={close}
              aria-label={t.nav.close}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white p-8 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_80px_-10px_rgba(200,43,98,0.5)] md:p-10"
            >
              <div className="mx-auto grid h-28 w-28 animate-glow-pulse place-items-center rounded-full bg-gradient-to-br from-rutuja-blue/15 to-rutuja-pink/15">
                <span className="font-serif text-3xl text-rutuja-ink/50">{getInitials(active.name)}</span>
              </div>
              <h3 data-testid="ambassador-lightbox-name" className="mt-6 font-serif text-2xl text-rutuja-ink">
                {active.name}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rutuja-muted">{active.loc}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-rutuja-blue">{roleLabel}</p>
              <blockquote className="mt-6 font-serif text-lg italic leading-relaxed text-rutuja-ink">
                {active.quote ? `“${active.quote}”` : "[QUOTE PENDING VERIFICATION]"}
              </blockquote>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function AmbassadorCard({ person, roleLabel, readStory, onOpen, testid, index = 0 }) {
  return (
    <button
      data-testid={testid}
      onClick={onOpen}
      aria-label={`${person.name}, ${person.loc}`}
      className="group block w-full overflow-hidden border border-rutuja-line bg-rutuja-soft p-6 text-left shadow-[0_20px_50px_-35px_rgba(0,0,0,0.5)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-rutuja-pink/40 hover:shadow-[0_25px_60px_-25px_rgba(200,43,98,0.55)]"
    >
      <div
        style={{ animationDelay: `${(index % 6) * 0.2}s` }}
        className="mx-auto grid aspect-square w-full max-w-[140px] animate-glow-pulse-sm place-items-center rounded-full bg-gradient-to-br from-rutuja-blue/15 to-rutuja-pink/15 transition-transform duration-[400ms] ease-out group-hover:scale-[1.02]"
      >
        <span className="font-serif text-4xl text-rutuja-ink/50">{getInitials(person.name)}</span>
      </div>
      <h3 className="mt-5 text-center font-serif text-lg text-rutuja-ink">{person.name}</h3>
      <p className="mt-1 text-center text-xs font-semibold uppercase tracking-wide text-rutuja-muted">{person.loc}</p>
      <p className="mt-1 text-center text-[11px] uppercase tracking-wide text-rutuja-blue/70">{roleLabel}</p>
      <p className="mt-3 text-center text-sm italic leading-relaxed text-rutuja-slate transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        {person.quote ? `“${person.quote}”` : "[QUOTE PENDING]"}
      </p>
      <span className="mt-3 flex items-center justify-center gap-1.5 text-xs font-semibold text-rutuja-pink transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        {readStory} <ArrowUpRight size={14} className="animate-icon-glow" />
      </span>
    </button>
  );
}
