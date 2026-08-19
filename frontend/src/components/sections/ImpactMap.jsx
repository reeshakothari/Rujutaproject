import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import CountUp from "@/components/site/CountUp";
import { useLang } from "@/context/LanguageContext";
import { INDIA_MAP, MAP_PINS, HQ_ID } from "@/data/impactMap";

const DROP_BASE = 0.8; // map settles first, then pins fall
const STAGGER = 0.15;

export default function ImpactMap({ showStats = false, showCta = true }) {
  const { t } = useLang();
  const im = t.impactMap;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(null);

  const hub = MAP_PINS.find((p) => p.id === HQ_ID);
  const spokes = MAP_PINS.filter((p) => p.id !== HQ_ID);
  const activePin = MAP_PINS.find((p) => p.id === active);
  const place = (id) => im.places[id] || {};

  return (
    <section id="impact-map" data-testid="impact-map-section" className="scroll-mt-20 bg-white py-16 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow-pink">{im.eyebrow}</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {im.title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-rutuja-slate lg:text-right">{im.sub}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* City selector + detail */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rutuja-muted">{im.tapHint}</p>
            <ul className="mt-5 space-y-1.5" data-testid="impact-map-city-list">
              {MAP_PINS.map((p) => {
                const isActive = active === p.id;
                const info = place(p.id);
                return (
                  <li key={p.id}>
                    <button
                      type="button"
                      data-testid={`impact-city-btn-${p.id}`}
                      onMouseEnter={() => setActive(p.id)}
                      onFocus={() => setActive(p.id)}
                      onClick={() => setActive(p.id)}
                      className={`group flex w-full items-center justify-between gap-3 border-b px-1 py-3 text-left transition-colors duration-300 ${
                        isActive ? "border-rutuja-pink" : "border-rutuja-line hover:border-rutuja-pink/60"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <MapPin
                          size={16}
                          className={`shrink-0 transition-colors duration-300 ${isActive ? "text-rutuja-pink" : "text-rutuja-muted group-hover:text-rutuja-pink"}`}
                        />
                        <span className={`font-serif text-lg transition-colors duration-300 ${isActive ? "text-rutuja-pink" : "text-rutuja-ink"}`}>
                          {info.city}
                        </span>
                      </span>
                      <span className="text-xs font-medium uppercase tracking-wide text-rutuja-muted">{info.state}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 min-h-[112px] rounded-sm bg-rutuja-soft p-5" data-testid="impact-map-detail">
              {activePin ? (
                <motion.div
                  key={activePin.id}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="flex items-center gap-2">
                    <p className="font-serif text-xl text-rutuja-pinkdark">{place(activePin.id).city}</p>
                    <span className="text-xs font-medium uppercase tracking-wide text-rutuja-muted">· {place(activePin.id).state}</span>
                    {activePin.hq && (
                      <span className="ml-auto rounded-full bg-rutuja-pink px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                        {im.hqBadge}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-rutuja-slate">{place(activePin.id).context}</p>
                </motion.div>
              ) : (
                <p className="text-sm leading-relaxed text-rutuja-muted">{im.note}</p>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-8">
            <div className="relative mx-auto max-w-[560px]">
              <svg
                viewBox={INDIA_MAP.viewBox}
                className="h-auto w-full"
                role="img"
                aria-label="Map of India showing documented Dignity Doll locations"
                data-testid="india-map-svg"
              >
                <motion.path
                  d={INDIA_MAP.path}
                  fill="#F0DEE6"
                  stroke="#D9B9C8"
                  strokeWidth={1.4}
                  strokeLinejoin="round"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Connector lines radiating from the hub */}
                {!reduce &&
                  spokes.map((p, i) => (
                    <motion.line
                      key={`line-${p.id}`}
                      x1={hub.x}
                      y1={hub.y}
                      x2={p.x}
                      y2={p.y}
                      stroke="#C82B62"
                      strokeWidth={1.2}
                      strokeDasharray="5 6"
                      strokeLinecap="round"
                      opacity={0.4}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.4 }}
                      viewport={{ once: true, margin: "-15% 0px" }}
                      transition={{ duration: 1, ease: "easeOut", delay: DROP_BASE + 0.2 + i * STAGGER }}
                    />
                  ))}

                {/* Pins */}
                {MAP_PINS.map((p, i) => {
                  const info = place(p.id);
                  const isActive = active === p.id;
                  return (
                    <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
                      {/* pulsing beacon */}
                      {!reduce && (
                        <motion.circle
                          cx={0}
                          cy={0}
                          r={7}
                          fill={p.hq ? "#A3234F" : "#C82B62"}
                          style={{ transformBox: "fill-box", transformOrigin: "center" }}
                          initial={{ opacity: 0 }}
                          animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: DROP_BASE + i * 0.33 }}
                        />
                      )}
                      {/* marker (drop-in + hover) */}
                      <motion.g
                        style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0, y: -10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true, margin: "-15% 0px" }}
                        transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: DROP_BASE + i * STAGGER }}
                        whileHover={{ scale: 1.25 }}
                        animate={isActive ? { scale: 1.25 } : undefined}
                        onHoverStart={() => setActive(p.id)}
                        onHoverEnd={() => setActive(null)}
                        onTap={() => setActive(p.id)}
                        data-testid={`map-pin-${p.id}`}
                        aria-label={`${info.city}, ${info.state}`}
                      >
                        <circle cx={0} cy={0} r={9.5} fill="#ffffff" opacity={0.95} />
                        <circle cx={0} cy={0} r={6.5} fill={p.hq ? "#A3234F" : "#C82B62"} />
                        <circle cx={0} cy={0} r={2.4} fill="#ffffff" />
                      </motion.g>
                    </g>
                  );
                })}
              </svg>

              {/* Tooltip overlay */}
              {activePin && (
                <motion.div
                  key={`tip-${activePin.id}`}
                  className="pointer-events-none absolute z-10 hidden -translate-x-1/2 sm:block"
                  style={{
                    left: `${(activePin.x / INDIA_MAP.width) * 100}%`,
                    top: `${(activePin.y / INDIA_MAP.height) * 100}%`,
                  }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="absolute bottom-3 left-1/2 w-max max-w-[220px] -translate-x-1/2 rounded-sm bg-rutuja-ink px-3.5 py-2.5 text-left shadow-xl">
                    <p className="font-serif text-sm text-white">
                      {place(activePin.id).city}
                      <span className="text-white/60"> · {place(activePin.id).state}</span>
                    </p>
                    <span className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-rutuja-ink" aria-hidden="true" />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {showStats && (
          <div className="mt-16 grid grid-cols-1 divide-y divide-rutuja-line border-y border-rutuja-line sm:grid-cols-3 sm:divide-y-0">
            {im.metrics.map((m, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="px-2 py-8 sm:border-r sm:border-rutuja-line sm:px-6 sm:last:border-r-0">
                  <p className="font-serif text-4xl font-medium leading-none text-rutuja-pink md:text-6xl">
                    <CountUp value={m.value} />
                  </p>
                  <p className="mt-4 text-sm font-medium uppercase tracking-wide text-rutuja-slate">{m.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        {showCta && (
          <Reveal delay={0.1}>
            <div className="mt-12 flex justify-center">
              <Link to="/impact" data-testid="impact-map-page-cta" className="btn-secondary rounded-sm">
                {im.pageCta} <ArrowUpRight size={18} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
