import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { INDIA_MAP, MAP_REGIONS, AMBASSADORS, HQ_ID } from "@/data/impactMap";

const EASE = [0.22, 1, 0.36, 1];

function curvePath(hub, p) {
  const mx = (hub.x + p.x) / 2;
  const my = (hub.y + p.y) / 2;
  const dx = p.x - hub.x;
  const dy = p.y - hub.y;
  const len = Math.hypot(dx, dy) || 1;
  const off = len * 0.14;
  return `M ${hub.x} ${hub.y} Q ${mx + (-dy / len) * off} ${my + (dx / len) * off} ${p.x} ${p.y}`;
}

// A region has both a documented story and an ambassador when a marker of each sits at (near) the same spot.
const hasAmbassadorHere = (region) =>
  AMBASSADORS.some((a) => Math.hypot(a.x - region.x, a.y - region.y) < 5);

const PINK_GLOW = { filter: "drop-shadow(0 0 5px rgba(200,43,98,0.65))" };
const BLUE_GLOW = { filter: "drop-shadow(0 0 5px rgba(41,94,170,0.65))" };
const AUTOPLAY_INTERVAL = 2800;

export default function ImpactMap() {
  const { t } = useLang();
  const im = t.impactMap;
  const reduce = useReducedMotion();

  const hubIdx = MAP_REGIONS.findIndex((r) => r.id === HQ_ID);
  const [tab, setTab] = useState("regions");
  const [regionIdx, setRegionIdx] = useState(hubIdx < 0 ? 0 : hubIdx);
  const [ambIdx, setAmbIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Auto-tour: reveal each pin on the active tab one by one, until the user hovers/taps one.
  useEffect(() => {
    if (!autoplay || reduce) return undefined;
    const id = setInterval(() => {
      if (tab === "regions") {
        setRegionIdx((prev) => (prev + 1) % MAP_REGIONS.length);
      } else {
        setAmbIdx((prev) => (prev + 1) % AMBASSADORS.length);
      }
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(id);
  }, [autoplay, reduce, tab]);

  const people = im.ambassadors || [];
  const place = (id) => im.places[id] || {};
  const hub = MAP_REGIONS[hubIdx];
  const spokes = MAP_REGIONS.filter((r) => r.id !== HQ_ID);

  const activeRegion = MAP_REGIONS[regionIdx];
  const activeRegionInfo = place(activeRegion?.id);
  const activeAmbPin = AMBASSADORS[ambIdx];
  const activeAmb = people[ambIdx] || {};

  const label =
    tab === "regions"
      ? { x: activeRegion?.x, y: activeRegion?.y, text: activeRegionInfo.city }
      : { x: activeAmbPin?.x, y: activeAmbPin?.y, text: (activeAmb.loc || "").split(",")[0] };

  const vp = { once: true, margin: "-12% 0px" };
  const selectRegion = (i) => { setAutoplay(false); setTab("regions"); setRegionIdx(i); };
  const selectAmb = (i) => { setAutoplay(false); setTab("amb"); setAmbIdx(i); };

  return (
    <section id="impact-map" data-testid="our-impact-section" className="scroll-mt-20 overflow-x-hidden bg-white py-16 md:py-28">
      <div className="container-edge">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.p data-testid="impact-eyebrow" className="eyebrow-pink"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            {im.eyebrow}
          </motion.p>
          <motion.h2 data-testid="impact-headline" className="mt-5 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-rutuja-ink sm:text-4xl lg:text-5xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}>
            {im.title}
          </motion.h2>
          <motion.p data-testid="impact-subtext" className="mt-6 max-w-2xl text-base leading-relaxed text-rutuja-slate sm:text-lg"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}>
            {im.sub}
          </motion.p>
          {/* Legend */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-rutuja-slate">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-3 w-3 animate-glow-pulse-sm rounded-full border-2 border-rutuja-pink bg-white" />
              {im.legendReach}
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-3 w-3 rounded-full bg-rutuja-blue" />
              {im.legendAmbassadors}
            </span>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-12">
          {/* Map */}
          <div className="order-2 lg:order-none lg:col-span-8">
            <div data-testid="impact-map-container" className="relative mx-auto max-w-[640px] rounded-md border border-rutuja-line bg-white p-4 sm:p-5">
              <svg viewBox={INDIA_MAP.viewBox} preserveAspectRatio="xMidYMid meet" className="h-auto w-full" role="img"
                aria-label="Map of India and Nepal showing documented Dignity Doll reach and the 12 ambassadors" data-testid="india-map-svg">
                <motion.path d={INDIA_MAP.path} fill="#F0DEE6" stroke="#D9B9C8" strokeWidth={1.4} strokeLinejoin="round"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.85, ease: EASE }} />

                {/* Animated pink connector lines (regions only) */}
                <g data-testid="map-journey-lines">
                  {!reduce && hub && spokes.map((p, i) => (
                    <motion.path key={`line-${p.id}`} d={curvePath(hub, p)} fill="none" stroke="#C82B62" strokeWidth={1.3}
                      strokeDasharray="4 6" strokeLinecap="round" opacity={0.4}
                      initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.4 }}
                      transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 + i * 0.12 }} />
                  ))}
                </g>

                {/* Travelling markers flowing along the documented-reach lines (from hub) */}
                {!reduce && hub && spokes.map((p, i) => (
                  <motion.g key={`travel-${p.id}`} style={{ pointerEvents: "none" }}
                    initial={{ x: hub.x, y: hub.y, opacity: 0 }}
                    animate={{ x: [hub.x, p.x], y: [hub.y, p.y], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 1.4, delay: 0.9 + i * 0.5 }}
                    data-testid={`map-travel-${p.id}`}>
                    <circle r={9} fill="#C82B62" opacity={0.16} />
                    <circle r={3.6} fill="#C82B62" stroke="#ffffff" strokeWidth={0.8} />
                  </motion.g>
                ))}

                {/* Ambassador markers (blue dots) — rendered first so pink region dots stay on top & hoverable */}
                {AMBASSADORS.map((p, i) => {
                  const isActive = tab === "amb" && ambIdx === i;
                  return (
                    <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
                      {isActive && !reduce && (
                        <motion.circle r={10} fill="#295EAA" style={{ transformBox: "fill-box", transformOrigin: "center" }}
                          initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.9, opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeOut" }} />
                      )}
                      <motion.g style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer", ...BLUE_GLOW }}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.9 + i * 0.07 }}
                        animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: isActive ? 1.25 : 1 }} whileHover={{ scale: 1.25 }}
                        onHoverStart={() => selectAmb(i)} onTap={() => selectAmb(i)}
                        data-testid={`map-pin-${p.id}`} aria-label={people[i]?.name || ""}>
                        <circle r={7} fill={isActive ? "#204985" : "#295EAA"} stroke="#ffffff" strokeWidth={1.4} />
                      </motion.g>
                    </g>
                  );
                })}

                {/* Region markers (solid pink dots, glowing) — on top */}
                {MAP_REGIONS.map((r, i) => {
                  const isActive = tab === "regions" && regionIdx === i;
                  const shared = hasAmbassadorHere(r);
                  return (
                    <g key={r.id}>
                      {r.x2 != null && (
                        <g transform={`translate(${r.x2} ${r.y2})`} style={PINK_GLOW}>
                          <circle r={7} fill="#C82B62" stroke="#ffffff" strokeWidth={1.4} />
                        </g>
                      )}
                      <g transform={`translate(${r.x} ${r.y})`}>
                        {isActive && !reduce && (
                          <motion.circle r={10} fill="#C82B62"
                            style={{ transformBox: "fill-box", transformOrigin: "center" }}
                            initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.9, opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }} />
                        )}
                        <motion.g style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer", ...PINK_GLOW }}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                          transition={{ duration: 0.55, ease: EASE, delay: 0.6 + i * 0.09 }}
                          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: isActive ? 1.2 : 1 }} whileHover={{ scale: 1.2 }}
                          onHoverStart={() => selectRegion(i)} onTap={() => selectRegion(i)}
                          data-testid={`map-pin-${r.id}`} aria-label={`${place(r.id).city}, ${place(r.id).state}`}>
                          {shared && (
                            <circle
                              r={15}
                              fill="none"
                              stroke="#295EAA"
                              strokeWidth={1.6}
                              style={{ pointerEvents: "none" }}
                              data-testid={`map-shared-ring-${r.id}`}
                              aria-hidden="true"
                            />
                          )}
                          <circle r={11} fill={isActive ? "#A3234F" : "#C82B62"} stroke="#ffffff" strokeWidth={1.4} />
                        </motion.g>
                      </g>
                    </g>
                  );
                })}

              </svg>

              {/* Touch-friendly hit-areas — the SVG dots stay small for the design, but every pin
                  gets a real ≥44x44 tappable/focusable button layered on top at the same position. */}
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                {AMBASSADORS.map((p, i) => (
                  <button
                    key={`hit-${p.id}`}
                    type="button"
                    tabIndex={-1}
                    onClick={() => selectAmb(i)}
                    onMouseEnter={() => selectAmb(i)}
                    style={{
                      left: `${(p.x / INDIA_MAP.width) * 100}%`,
                      top: `${(p.y / INDIA_MAP.height) * 100}%`,
                    }}
                    className="pointer-events-auto absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                  />
                ))}
                {MAP_REGIONS.map((r, i) => (
                  <button
                    key={`hit-${r.id}`}
                    type="button"
                    tabIndex={-1}
                    onClick={() => selectRegion(i)}
                    onMouseEnter={() => selectRegion(i)}
                    style={{
                      left: `${(r.x / INDIA_MAP.width) * 100}%`,
                      top: `${(r.y / INDIA_MAP.height) * 100}%`,
                    }}
                    className="pointer-events-auto absolute grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                  />
                ))}
              </div>

              {/* Tooltip overlay — centered directly on the active pin */}
              {label.text && label.x != null && (
                <motion.div
                  key={`tip-${tab}-${label.text}`}
                  className="pointer-events-none absolute z-10 w-max max-w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-sm bg-rutuja-ink px-3 py-2 text-left shadow-xl sm:max-w-[220px] sm:px-3.5 sm:py-2.5"
                  style={{
                    left: `${(label.x / INDIA_MAP.width) * 100}%`,
                    top: `${(label.y / INDIA_MAP.height) * 100}%`,
                  }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <p className="font-serif text-sm text-white">
                    {tab === "regions" ? (
                      <>
                        {activeRegionInfo.city}
                        <span className="text-white/60"> · {activeRegionInfo.state}</span>
                      </>
                    ) : (
                      <>
                        {activeAmb.name}
                        <span className="text-white/60"> · {(activeAmb.loc || "").split(",")[0]}</span>
                      </>
                    )}
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right rail: tabs + list + detail */}
          <div className="order-1 lg:order-none lg:col-span-4">
            {/* Tabs */}
            <div className="flex gap-2 border-b border-rutuja-line" data-testid="impact-tabs">
              <button type="button" data-testid="impact-tab-regions" onClick={() => setTab("regions")}
                className={`-mb-px flex min-h-11 items-center border-b-2 px-1 py-3 text-sm font-semibold transition-colors ${tab === "regions" ? "border-rutuja-pink text-rutuja-pinkdark" : "border-transparent text-rutuja-muted hover:text-rutuja-ink"}`}>
                {im.regionsTitle}
              </button>
              <button type="button" data-testid="impact-tab-amb" onClick={() => setTab("amb")}
                className={`-mb-px ml-4 flex min-h-11 items-center border-b-2 px-1 py-3 text-sm font-semibold transition-colors ${tab === "amb" ? "border-rutuja-blue text-rutuja-blue" : "border-transparent text-rutuja-muted hover:text-rutuja-ink"}`}>
                {im.ambassadorsTitle}
              </button>
            </div>

            {/* Lists */}
            {tab === "regions" ? (
              <div data-testid="impact-region-selector-list" className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0">
                {MAP_REGIONS.map((r, i) => {
                  const info = place(r.id);
                  const isActive = regionIdx === i;
                  return (
                    <button key={r.id} type="button" data-testid={`impact-region-btn-${r.id}`}
                      onMouseEnter={() => selectRegion(i)} onFocus={() => selectRegion(i)} onClick={() => selectRegion(i)}
                      aria-pressed={isActive} aria-label={`${info.state}, ${info.city}`}
                      className={`flex min-h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-3 py-3 text-left text-sm transition-all duration-200 lg:w-full lg:min-h-0 lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l-2 lg:px-3 lg:py-2 ${isActive ? "border-rutuja-pink bg-rutuja-soft" : "border-rutuja-line hover:border-rutuja-pink/50 lg:border-transparent lg:hover:bg-rutuja-soft/60"}`}>
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full border-2 ${isActive ? "border-rutuja-pinkdark bg-rutuja-soft" : "border-rutuja-pink bg-white"}`} />
                      <span className="min-w-0">
                        <span className={`block font-medium ${isActive ? "text-rutuja-pinkdark" : "text-rutuja-ink"}`}>{info.state}</span>
                        {info.city !== info.state && (
                          <span className="hidden truncate text-xs text-rutuja-muted lg:block">{info.city}</span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div data-testid="impact-amb-selector-list" className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1 lg:max-h-[360px] lg:flex-col lg:gap-0.5 lg:overflow-y-auto lg:pb-0">
                {people.map((person, i) => {
                  const p = AMBASSADORS[i];
                  const isActive = ambIdx === i;
                  return (
                    <button key={p.id} type="button" data-testid={`impact-amb-btn-${p.id}`}
                      onMouseEnter={() => selectAmb(i)} onFocus={() => selectAmb(i)} onClick={() => selectAmb(i)}
                      aria-pressed={isActive} aria-label={`${person.name}, ${person.loc}`}
                      className={`flex min-h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-3 py-3 text-left text-sm transition-all duration-200 lg:w-full lg:min-h-0 lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l-2 lg:px-3 lg:py-2 ${isActive ? "border-rutuja-blue bg-rutuja-blue/5" : "border-rutuja-line hover:border-rutuja-blue/50 lg:border-transparent lg:hover:bg-rutuja-blue/5"}`}>
                      <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${isActive ? "bg-rutuja-blue" : "bg-rutuja-line"}`} />
                      <span className="min-w-0">
                        <span className={`block font-medium ${isActive ? "text-rutuja-blue" : "text-rutuja-ink"}`}>{person.name}</span>
                        <span className="hidden truncate text-xs text-rutuja-muted lg:block">{person.loc}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Detail card */}
            {tab === "regions" ? (
              <motion.article key={`r-${regionIdx}`} data-testid="editorial-story-card"
                className="mt-6 rounded-md border border-rutuja-pink/20 bg-white p-5 shadow-[0_12px_40px_-14px_rgba(200,43,98,0.35)]"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <div className="flex items-start justify-between gap-3 border-b border-rutuja-line pb-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rutuja-muted">{activeRegionInfo.state} · {im.documentedLabel}</p>
                    <h3 data-testid="editorial-story-title" className="mt-1.5 font-serif text-xl font-medium tracking-tight text-rutuja-pinkdark sm:text-2xl">{activeRegionInfo.city}</h3>
                  </div>
                  {activeRegion?.hq && (
                    <span className="mt-1 shrink-0 rounded-full bg-rutuja-pink px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">{im.hqBadge}</span>
                  )}
                </div>
                <p data-testid="editorial-story-context" className="mt-3 text-[13px] leading-relaxed text-rutuja-slate">{activeRegionInfo.context}</p>
                {activeRegionInfo.venues?.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-rutuja-muted">{im.venuesLabel}</p>
                    <div data-testid="editorial-story-venues" className="flex flex-wrap gap-1.5">
                      {activeRegionInfo.venues.map((v, vi) => (
                        <span key={vi} className="inline-flex items-center rounded-full border border-rutuja-pink/30 bg-rutuja-soft px-2.5 py-0.5 text-[11px] font-medium text-rutuja-pinkdark">{v}</span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.article>
            ) : (
              <motion.article key={`a-${ambIdx}`} data-testid="editorial-story-card"
                className="mt-6 rounded-md border border-rutuja-line bg-white p-5 shadow-[0_12px_36px_-16px_rgba(41,94,170,0.16)]"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }}>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-rutuja-blue" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rutuja-muted">{im.roleLabel}</p>
                    <h3 data-testid="editorial-story-title" className="mt-1 font-serif text-xl font-medium tracking-tight text-rutuja-blue sm:text-2xl">{activeAmb.name}</h3>
                  </div>
                </div>
                <p data-testid="editorial-story-context" className="mt-4 border-t border-rutuja-line pt-4 text-sm leading-relaxed text-rutuja-slate">{activeAmb.loc}</p>
              </motion.article>
            )}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div data-testid="impact-closing-statement-card" className="relative mt-14 overflow-hidden rounded-md bg-rutuja-ink p-8 shadow-[0_30px_80px_-30px_rgba(200,43,98,0.4)] sm:mt-20 sm:p-12"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <blockquote data-testid="impact-closing-quote" className="relative max-w-3xl font-serif text-xl font-normal italic leading-relaxed text-white sm:text-2xl lg:text-3xl">
            {`\u201C${im.closing.quote}\u201D`}
          </blockquote>
          <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-rutuja-pink [text-shadow:0_0_16px_rgba(200,43,98,0.55)]">{im.closing.attribution}</p>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/request-workshop" data-testid="impact-closing-cta-workshop"
              className="inline-flex items-center justify-center gap-2 bg-rutuja-pink px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-rutuja-pinkdark">
              {im.closing.primaryCta} <ArrowUpRight size={18} />
            </Link>
            <Link to="/donate" data-testid="impact-closing-cta-donate"
              className="inline-flex items-center justify-center gap-2 border border-rutuja-pink/60 px-7 py-3.5 text-sm font-semibold text-rutuja-pink transition-colors duration-300 hover:border-rutuja-pink hover:text-white">
              {im.closing.secondaryCta} <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
