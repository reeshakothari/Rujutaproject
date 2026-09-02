import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { Reveal, FlyIn } from "@/components/site/Reveal";
import GlobalCTABand from "@/components/sections/GlobalCTABand";
import SnakesAndLadders from "@/components/games/SnakesAndLadders";
import { IMAGES } from "@/data/images";
import {
  ChevronLeft,
  Play,
  Check,
  X,
  ArrowUpRight,
  RotateCcw,
  Download,
  Quote,
  Smile,
  Backpack,
  Handshake,
  Volleyball,
  Users,
  Heart,
  Crown,
  Feather,
  Mic,
  Sun,
  WavesLadder,
} from "lucide-react";

const BADGE_ICONS = {
  dignity: [Smile, Backpack, Handshake, Volleyball, Users, Heart, Crown, Feather, Mic, Sun],
  snakes: [WavesLadder, WavesLadder, WavesLadder, WavesLadder, WavesLadder, WavesLadder, WavesLadder, WavesLadder, WavesLadder, WavesLadder],
};

export default function Activities() {
  const { t } = useLang();
  const a = t.pages.activities;
  const ad = a.aboutDoll;

  const [pickerOpen, setPickerOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [earned, setEarned] = useState([]);
  const [complete, setComplete] = useState(false);

  const pickerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    document.title = "Play & Learn | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const openPicker = useCallback(() => {
    setPickerOpen(true);
    requestAnimationFrame(() => pickerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, []);

  const startGame = useCallback((key) => {
    setActiveGame(key);
    setQIndex(0);
    setSelected(null);
    setEarned([]);
    setComplete(false);
    requestAnimationFrame(() => stageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, []);

  const exitGame = useCallback(() => {
    setActiveGame(null);
    setComplete(false);
    requestAnimationFrame(() => pickerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }, []);

  const game = activeGame ? a.games[activeGame] : null;
  const question = game ? game.questions[qIndex] : null;
  const total = game ? game.questions.length : 0;
  const isLast = qIndex === total - 1;

  const selectOption = (i) => {
    if (selected !== null) return;
    setSelected(i);
    if (i === question.correct) setEarned((e) => [...e, qIndex]);
  };

  const goNext = () => {
    if (isLast) {
      setComplete(true);
      return;
    }
    setQIndex((q) => q + 1);
    setSelected(null);
  };

  const counter = a.questionCounter.replace("{n}", qIndex + 1).replace("{total}", total);
  const progressPct = complete ? 100 : (qIndex / Math.max(total, 1)) * 100;

  return (
    <main data-testid="activities-page">
      <header className="relative overflow-hidden border-b border-rutuja-line bg-rutuja-soft pt-[72px]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float rounded-full bg-rutuja-pink/10 blur-3xl" aria-hidden="true" />
        <div className="container-edge relative py-16 md:py-24">
          <Reveal>
            <Link to="/" className="group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-rutuja-slate transition-colors hover:text-rutuja-pink">
              <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> {t.forms.backHome}
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="eyebrow-pink mt-8">{a.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl lg:text-6xl">
              {a.title}
              <em className="font-serif italic text-rutuja-pink">{a.titleEm}</em>
              {a.titleEnd}
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-rutuja-slate md:text-lg">{a.intro}</p>
          </Reveal>
        </div>
      </header>

      <section id="about" className="scroll-mt-20 overflow-x-hidden bg-white py-16 md:py-24">
        <div className="container-edge">
          <Reveal>
            <h2 className="font-serif text-2xl font-medium text-rutuja-ink md:text-3xl">{a.aboutTitle}</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            {a.about.map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full border border-rutuja-line bg-rutuja-soft/40 p-6 md:p-8">
                  <h3 className="font-serif text-xl text-rutuja-ink">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-rutuja-slate">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-testid="about-doll-section" className="overflow-x-hidden bg-rutuja-soft py-16 md:py-24">
        <div className="container-edge">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 className="font-serif text-2xl font-medium text-rutuja-ink md:text-3xl">{ad.whatIsTitle}</h2>
              </Reveal>
              <Reveal delay={0.05}>
                <p className="mt-4 text-sm leading-relaxed text-rutuja-slate md:text-base">{ad.whatIsBody}</p>
              </Reveal>
              <ul className="mt-5 space-y-2.5">
                {ad.roles.map((role, i) => (
                  <Reveal key={i} delay={0.08 + i * 0.04} as="li" className="flex items-start gap-2.5 text-sm leading-relaxed text-rutuja-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rutuja-pink" aria-hidden="true" />
                    {role}
                  </Reveal>
                ))}
              </ul>
              <Reveal delay={0.24}>
                <p className="mt-5 text-sm leading-relaxed text-rutuja-slate md:text-base">{ad.scarfNote}</p>
              </Reveal>
            </div>
            <div className="lg:col-span-5">
              <FlyIn direction="right">
                <div className="relative mx-auto max-w-[260px]">
                  <div className="absolute -left-3 -top-3 h-16 w-16 border-l-2 border-t-2 border-rutuja-pink" aria-hidden="true" />
                  <div className="relative aspect-[4/5] overflow-hidden bg-white shadow-[0_25px_60px_-28px_rgba(200,43,98,0.4)]">
                    <img src={IMAGES.dollCloseup} alt={ad.whatIsTitle} className="h-full w-full object-cover" loading="lazy" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-rutuja-blue" aria-hidden="true" />
                </div>
              </FlyIn>
            </div>
          </div>

          <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl border-l-2 border-rutuja-pink bg-white p-7 md:p-9">
            <Quote size={24} className="animate-icon-glow text-rutuja-pink" aria-hidden="true" />
            <blockquote className="mt-3 font-serif text-lg italic leading-snug text-rutuja-ink md:text-xl">{ad.whyQuote}</blockquote>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {ad.pillars.map((pillar, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full border border-rutuja-line bg-white p-6 text-center">
                  <h3 className="font-serif text-lg text-rutuja-pinkdark">{pillar.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-rutuja-slate">{pillar.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.16}>
            <p className="mx-auto mt-8 max-w-2xl text-center font-serif text-base italic leading-relaxed text-rutuja-ink md:text-lg">{ad.goldenRule}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h3 className="mt-16 text-center font-serif text-xl font-medium text-rutuja-ink md:text-2xl">{ad.howUsedTitle}</h3>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {ad.howUsed.map((row, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="h-full border border-rutuja-line bg-white p-6">
                  <h4 className="font-sans text-sm font-semibold uppercase tracking-wide text-rutuja-blue">{row.setting}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-rutuja-slate">{row.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.08} className="mx-auto mt-14 max-w-3xl text-center">
            <h3 className="font-serif text-xl font-medium text-rutuja-ink md:text-2xl">{ad.pilotTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-rutuja-slate md:text-base">{ad.pilotBody}</p>
          </Reveal>

          <div className="mx-auto mt-14 max-w-4xl">
            <Reveal>
              <h3 className="text-center font-serif text-xl font-medium text-rutuja-ink md:text-2xl">{ad.surveyTitle}</h3>
              <p className="mt-2 text-center text-xs uppercase tracking-wide text-rutuja-muted">{ad.surveyNote}</p>
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
              {ad.surveyStats.map((s, i) => (
                <Reveal key={i} delay={i * 0.06} className="text-center">
                  <p style={{ animationDelay: `${i * 0.2}s` }} className="animate-text-glow-blue font-serif text-3xl font-medium text-rutuja-blue md:text-4xl">
                    {s.stat}
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-rutuja-slate">{s.label}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.05} className="mx-auto mt-14 max-w-3xl border-t border-rutuja-line pt-10 text-center">
            <h3 className="font-serif text-xl font-medium text-rutuja-ink md:text-2xl">{ad.orgTitle}</h3>
            <p className="mt-4 text-sm leading-relaxed text-rutuja-slate md:text-base">{ad.orgBody}</p>
            <p className="mt-6 font-serif text-lg italic text-rutuja-pink">{ad.tagline}</p>
          </Reveal>

          <div className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-4">
            {a.downloads.map((d, i) => (
              <a
                key={i}
                href={d.href}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`activities-download-${i}`}
                className="inline-flex min-h-11 items-center gap-2 border border-rutuja-line bg-white px-4 py-2.5 text-sm font-semibold text-rutuja-blue transition-colors duration-300 hover:border-rutuja-blue"
              >
                <Download size={16} aria-hidden="true" /> {d.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {!activeGame && (
        <section className="relative overflow-x-hidden bg-rutuja-soft py-16 text-center md:py-20">
          <Reveal>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-rutuja-ink md:text-lg">{a.playIntro}</p>
          </Reveal>
          <Reveal delay={0.04}>
            <button
              type="button"
              data-testid="activities-play-now"
              onClick={openPicker}
              className="btn-secondary animate-glow-pulse mx-auto rounded-full px-10 py-5 text-lg"
            >
              <Play size={20} className="fill-current" /> {a.playNow}
            </button>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-4 text-sm text-rutuja-muted">{a.playNowSub}</p>
          </Reveal>
        </section>
      )}

      {pickerOpen && !activeGame && (
        <section ref={pickerRef} data-testid="game-picker" className="scroll-mt-20 overflow-x-hidden bg-white py-16 md:py-24">
          <div className="container-edge">
            <Reveal>
              <h2 className="text-center font-serif text-2xl font-medium text-rutuja-ink md:text-3xl">{a.chooseGameTitle}</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
              {a.picker.map((g, i) => (
                <Reveal key={g.key} delay={i * 0.08}>
                  <button
                    type="button"
                    data-testid={`game-card-${g.key}`}
                    onClick={() => startGame(g.key)}
                    className="hover-glow-pink group block h-full w-full rounded-2xl border-2 border-dashed border-rutuja-pink/40 bg-rutuja-soft p-7 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-1 md:p-8"
                  >
                    <span className="inline-block bg-rutuja-pinkdark px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">{g.tag}</span>
                    <h3 className="mt-4 font-serif text-2xl text-rutuja-ink">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-rutuja-slate">{g.desc}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-rutuja-pink">
                      {g.cta} <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeGame && (
        <section ref={stageRef} data-testid="game-stage" className="scroll-mt-20 overflow-x-hidden bg-white py-16 md:py-24">
          <div className="container-edge">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="font-serif text-2xl text-rutuja-ink md:text-3xl">{game.title}</h2>
              <button type="button" data-testid="exit-game" onClick={exitGame} className="btn-outline rounded-full px-5 py-2 text-sm">
                {a.exitGame}
              </button>
            </div>

            {activeGame === "snakes" ? (
              <div className="mt-8">
                <SnakesAndLadders questions={game.questions} text={a.snakesGame} why={a.why} badgeIcons={BADGE_ICONS.snakes} />
              </div>
            ) : (
              <>
                <div className="h-2 overflow-hidden rounded-full bg-rutuja-soft" role="progressbar" aria-valuenow={Math.round(progressPct)} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full rounded-full bg-rutuja-pink transition-[width] duration-500 ease-out" style={{ width: `${progressPct}%` }} />
                </div>

                <div className="mt-5 flex flex-wrap gap-2" data-testid="badge-tracker">
                  {BADGE_ICONS[activeGame].map((Icon, i) => {
                    const isEarned = earned.includes(i);
                    return (
                      <span
                        key={i}
                        className={`grid h-9 w-9 place-items-center rounded-full border transition-[background-color,border-color,color,box-shadow] duration-300 ${
                          isEarned ? "animate-glow-pulse-sm border-rutuja-pink bg-rutuja-pink text-white" : "border-dashed border-rutuja-line bg-rutuja-soft/60 text-rutuja-muted"
                        }`}
                      >
                        <Icon size={16} className={isEarned ? "animate-icon-glow" : ""} aria-hidden="true" />
                      </span>
                    );
                  })}
                </div>

                {!complete ? (
                  <div className="mx-auto mt-10 max-w-xl border border-rutuja-line bg-rutuja-soft/40 p-7 md:p-10" data-testid="question-card">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rutuja-pink">{counter}</p>
                    <h3 className="mt-3 font-serif text-xl leading-snug text-rutuja-ink md:text-2xl">{question.q}</h3>

                    <div className="mt-6 grid gap-3">
                      {question.options.map((opt, i) => {
                        const isChosen = selected === i;
                        const isCorrectOpt = i === question.correct;
                        let stateClass = "border-rutuja-line bg-white hover:border-rutuja-blue";
                        if (selected !== null) {
                          if (isCorrectOpt) stateClass = "border-green-600 bg-green-50";
                          else if (isChosen) stateClass = "border-rutuja-pink bg-rutuja-soft";
                        }
                        return (
                          <button
                            key={i}
                            type="button"
                            data-testid={`option-${i}`}
                            onClick={() => selectOption(i)}
                            disabled={selected !== null}
                            className={`flex items-center justify-between gap-3 rounded-lg border-2 px-5 py-3.5 text-left text-sm font-medium text-rutuja-ink transition-colors duration-200 disabled:cursor-default ${stateClass}`}
                          >
                            {opt}
                            {selected !== null && isCorrectOpt && <Check size={18} className="shrink-0 text-green-600" aria-hidden="true" />}
                            {selected !== null && isChosen && !isCorrectOpt && <X size={18} className="shrink-0 text-rutuja-pink" aria-hidden="true" />}
                          </button>
                        );
                      })}
                    </div>

                    {selected !== null && (
                      <div data-testid="answer-panel" className="mt-5 border-l-2 border-rutuja-pink bg-white p-4 text-sm leading-relaxed text-rutuja-slate">
                        <span className="font-semibold text-rutuja-pinkdark">{a.why}</span> {question.explanation}
                      </div>
                    )}

                    <div className="mt-7 flex justify-end">
                      <button
                        type="button"
                        data-testid="next-question"
                        onClick={goNext}
                        disabled={selected === null}
                        className="btn-primary rounded-sm disabled:pointer-events-none disabled:opacity-40"
                      >
                        {isLast ? a.finish : a.next} <ArrowUpRight size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div data-testid="completion-screen" className="mx-auto mt-10 max-w-xl border border-rutuja-line bg-rutuja-soft/40 p-10 text-center">
                    <p className="text-5xl" aria-hidden="true">
                      {a.completion.emoji}
                    </p>
                    <h3 className="mt-4 font-serif text-2xl text-rutuja-ink md:text-3xl">{a.completion.title}</h3>
                    <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-rutuja-slate">{a.completion.body}</p>
                    <button type="button" onClick={exitGame} className="btn-secondary mx-auto mt-7 rounded-full px-7 py-3.5 text-sm">
                      <RotateCcw size={16} /> {a.completion.cta}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      <GlobalCTABand />
    </main>
  );
}
