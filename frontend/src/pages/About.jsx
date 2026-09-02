import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { Reveal, FlyIn } from "@/components/site/Reveal";
import TrustSection from "@/components/sections/TrustSection";
import GlobalCTABand from "@/components/sections/GlobalCTABand";
import { useLang } from "@/context/LanguageContext";
import { Quote, Droplet, Users, GraduationCap, Heart, Palette, Camera } from "lucide-react";

const MODULE_ICONS = [Users, GraduationCap, Heart];

export default function About() {
  const { t } = useLang();
  const p = t.pages.about;
  const f = p.founder;
  const s = p.story;
  const m = p.madeBy;

  useEffect(() => {
    document.title = "About Rutuja | Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  return (
    <main data-testid="about-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />

      {/* ---------- Founder ---------- */}
      <section data-testid="founder-section" className="relative overflow-x-hidden bg-white py-16 md:py-28">
        <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 animate-float rounded-full bg-rutuja-blue/10 blur-3xl" aria-hidden="true" />
        <div className="container-edge relative">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <FlyIn direction="left">
                <div tabIndex={0} className="group relative mx-auto max-w-xs lg:max-w-none">
                  <div className="absolute -left-4 -top-4 h-24 w-24 border-l-2 border-t-2 border-rutuja-pink shadow-[-6px_-6px_24px_-10px_rgba(200,43,98,0.6)] transition-shadow duration-500 group-hover:shadow-[-6px_-6px_32px_-6px_rgba(200,43,98,0.85)]" aria-hidden="true" />
                  <div className="relative aspect-[4/5] animate-glow-pulse overflow-hidden bg-gradient-to-br from-rutuja-blue/15 to-rutuja-pink/15 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
                    <div className="grid h-full w-full place-items-center">
                      <span className="font-serif text-6xl text-rutuja-ink/25 md:text-7xl">NS</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-rutuja-ink/80 py-3 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
                      <Camera size={14} aria-hidden="true" /> {f.photoPending}
                    </div>
                  </div>
                  <div className="absolute -right-4 -bottom-4 h-24 w-24 border-b-2 border-r-2 border-rutuja-blue" aria-hidden="true" />
                </div>
              </FlyIn>
            </div>

            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow-pink">{f.eyebrow}</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-4xl">{f.name}</h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-rutuja-blue">{f.role}</p>
              </Reveal>
              <div className="mt-6 space-y-4">
                {f.paragraphs.map((para, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.05}>
                    <p className="text-sm leading-relaxed text-rutuja-slate md:text-base">{para}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.3} className="mt-7 border-l-2 border-rutuja-pink bg-rutuja-soft/60 p-5">
                <Quote size={20} className="animate-icon-glow text-rutuja-pink" aria-hidden="true" />
                <p className="mt-2 font-serif text-base italic leading-relaxed text-rutuja-ink md:text-lg">{f.quotePending}</p>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="mt-4 text-xs italic text-rutuja-muted">{f.notePending}</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Story intro ---------- */}
      <section className="relative overflow-x-hidden bg-rutuja-soft py-16 md:py-24">
        <div className="pointer-events-none absolute -right-24 -top-10 h-80 w-80 animate-float-slow rounded-full bg-rutuja-pink/10 blur-3xl" aria-hidden="true" />
        <div className="container-edge relative mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow-pink">{s.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{s.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-3 font-serif text-lg italic text-rutuja-pink md:text-xl">{s.kicker}</p>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 text-base leading-relaxed text-rutuja-slate md:text-lg">{s.intro}</p>
          </Reveal>
          <Reveal delay={0.22}>
            <p className="mt-6 animate-text-glow font-serif text-xl italic leading-snug text-rutuja-ink md:text-2xl">{s.introQuestion}</p>
          </Reveal>
          <Reveal delay={0.28}>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-rutuja-blue">{s.introAnswer}</p>
          </Reveal>
        </div>

        {/* ---------- Timeline ---------- */}
        <div className="container-edge relative mt-16 max-w-3xl md:mt-20">
          <div className="space-y-14 md:space-y-16">
            {s.sections.map((sec, i) => {
              const isRed = sec.n === "06";
              return (
                <Reveal key={sec.n} delay={Math.min(i * 0.02, 0.2)} className="relative md:pl-14">
                  <span className="mb-4 inline-grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-rutuja-pink bg-white font-serif text-sm italic text-rutuja-pink md:absolute md:left-0 md:top-0 md:mb-0">
                    {sec.n}
                  </span>

                  {isRed ? (
                    <div className="rounded-2xl border border-rutuja-pink/25 bg-gradient-to-br from-rutuja-soft to-white p-6 shadow-[0_20px_50px_-30px_rgba(200,43,98,0.5)] md:p-8">
                      <div className="flex items-center gap-2.5">
                        <Droplet size={20} className="animate-icon-glow text-rutuja-pink" aria-hidden="true" />
                        <h3 className="font-serif text-xl font-medium text-rutuja-ink md:text-2xl">{sec.t}</h3>
                      </div>
                      <div className="mt-4 space-y-3">
                        {sec.body.map((para, j) => (
                          <p key={j} className="text-sm leading-relaxed text-rutuja-slate md:text-base">
                            {para}
                          </p>
                        ))}
                      </div>
                      {sec.pull && (
                        <p className="mt-5 animate-text-glow font-serif text-lg italic leading-snug text-rutuja-pinkdark md:text-xl">
                          &ldquo;{sec.pull}&rdquo;
                        </p>
                      )}
                    </div>
                  ) : (
                    <>
                      <h3 className="font-serif text-xl font-medium text-rutuja-ink md:text-2xl">{sec.t}</h3>
                      <div className="mt-3 space-y-3">
                        {sec.body.map((para, j) => (
                          <p key={j} className="text-sm leading-relaxed text-rutuja-slate md:text-base">
                            {para}
                          </p>
                        ))}
                      </div>

                      {sec.stats && (
                        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-rutuja-line pt-6">
                          {sec.stats.map((st, k) => (
                            <div key={k} className="text-center">
                              <p style={{ animationDelay: `${k * 0.2}s` }} className="animate-text-glow-blue font-serif text-2xl font-medium text-rutuja-blue md:text-3xl">
                                {st.value}
                              </p>
                              <p className="mt-1 text-[11px] leading-snug text-rutuja-muted md:text-xs">{st.label}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {sec.modules && (
                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                          {sec.modules.map((mod, k) => {
                            const Icon = MODULE_ICONS[k % MODULE_ICONS.length];
                            return (
                              <div
                                key={mod.t}
                                className="hover-glow-pink h-full rounded-xl border border-rutuja-line bg-white p-5 transition-transform duration-300 hover:-translate-y-1"
                              >
                                <Icon size={20} className="text-rutuja-pink" aria-hidden="true" />
                                <h4 className="mt-3 text-sm font-semibold text-rutuja-ink">{mod.t}</h4>
                                <p className="mt-1.5 text-xs leading-relaxed text-rutuja-slate">{mod.d}</p>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ---------- Today + tagline ---------- */}
        <div className="container-edge relative mt-16 max-w-3xl md:mt-20">
          <Reveal className="mx-auto border border-rutuja-line bg-white p-7 text-center shadow-[0_25px_60px_-35px_rgba(0,0,0,0.35)] md:p-10">
            <h3 className="font-serif text-2xl font-medium text-rutuja-ink md:text-3xl">{s.today.t}</h3>
            <div className="mx-auto mt-4 max-w-xl space-y-3">
              {s.today.body.map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-rutuja-slate md:text-base">
                  {para}
                </p>
              ))}
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-rutuja-blue">{s.today.closingLine}</p>
            <p className="mx-auto mt-8 max-w-xl animate-text-glow font-serif text-xl italic leading-snug text-rutuja-pink md:text-2xl">{s.tagline}</p>
          </Reveal>
        </div>
      </section>

      {/* ---------- Made By ---------- */}
      <section className="overflow-x-hidden bg-white py-16 md:py-20">
        <div className="container-edge">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 border border-dashed border-rutuja-pink/40 bg-rutuja-soft/50 p-7 text-center md:flex-row md:items-start md:gap-6 md:p-9 md:text-left">
            <span className="grid h-14 w-14 shrink-0 animate-glow-pulse-sm place-items-center rounded-full bg-rutuja-pink text-white">
              <Palette size={22} aria-hidden="true" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rutuja-pink">{m.eyebrow}</p>
              <h3 className="mt-1.5 font-serif text-xl font-medium text-rutuja-ink md:text-2xl">{m.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-rutuja-slate md:text-base">{m.body}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <TrustSection />
      <GlobalCTABand />
    </main>
  );
}
