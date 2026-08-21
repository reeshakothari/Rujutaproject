import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import CountUp from "@/components/site/CountUp";
import { useLang } from "@/context/LanguageContext";
import { INDIA_MAP, MAP_REGIONS, HQ_ID } from "@/data/impactMap";

const EASE = [0.22, 1, 0.36, 1];
const STAT_IDS = ["females", "sessions", "participants", "window", "length"];

// gentle quadratic curve between the hub and a region
function curvePath(hub, p) {
  const mx = (hub.x + p.x) / 2;
  const my = (hub.y + p.y) / 2;
  const dx = p.x - hub.x;
  const dy = p.y - hub.y;
  const len = Math.hypot(dx, dy) || 1;
  const off = len * 0.14;
  const cx = mx + (-dy / len) * off;
  const cy = my + (dx / len) * off;
  return `M ${hub.x} ${hub.y} Q ${cx} ${cy} ${p.x} ${p.y}`;
}

export default function ImpactMap() {
  const { t } = useLang();
  const im = t.impactMap;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(HQ_ID);

  const hub = MAP_REGIONS.find((r) => r.id === HQ_ID);
  const spokes = MAP_REGIONS.filter((r) => r.id !== HQ_ID);
  const place = (id) => im.places[id] || {};
  const activePlace = place(active);
  const activeRegion = MAP_REGIONS.find((r) => r.id === active);

  const vp = { once: true, margin: "-12% 0px" };

  return (
    <section
      id="impact-map"
      data-testid="our-impact-section"
      className="scroll-mt-20 bg-editorial-cream py-16 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1320px] px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.p
            data-testid="impact-eyebrow"
            className="text-xs font-semibold uppercase tracking-[0.25em] text-editorial-burgundy"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {im.eyebrow}
          </motion.p>
          <motion.h2
            data-testid="impact-headline"
            className="mt-5 font-serif text-3xl font-normal leading-[1.15] tracking-tight text-editorial-ink sm:text-4xl lg:text-5xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          >
            {im.title}
          </motion.h2>
          <motion.p
            data-testid="impact-subtext"
            className="mt-6 max-w-2xl text-base leading-relaxed text-editorial-slate sm:text-lg"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
          >
            {im.sub}
          </motion.p>
        </div>

        {/* Map + editorial rail */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-12 lg:gap-12">
          {/* Region selector */}
          <div className="order-1 lg:order-none lg:col-start-8 lg:col-span-5 lg:row-start-1 xl:col-span-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-editorial-golddark">
              {im.tapHint}
            </p>
            <div
              data-testid="impact-region-selector-list"
              className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0"
            >
              {MAP_REGIONS.map((r) => {
                const info = place(r.id);
                const isActive = active === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    data-testid={`impact-region-btn-${r.id}`}
                    onMouseEnter={() => setActive(r.id)}
                    onFocus={() => setActive(r.id)}
                    onClick={() => setActive(r.id)}
                    aria-pressed={isActive}
                    aria-label={`${info.state}, ${info.city}`}
                    className={`shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-sm transition-all duration-200 lg:w-full lg:rounded-none lg:border-0 lg:border-l-2 lg:px-4 lg:py-2.5 lg:text-left ${
                      isActive
                        ? "border-editorial-burgundy bg-editorial-creamsubtle font-semibold text-editorial-burgundy"
                        : "border-editorial-border text-editorial-slate hover:border-editorial-burgundy/50 hover:text-editorial-burgundy lg:border-transparent lg:hover:bg-editorial-creamlite"
                    }`}
                  >
                    <span className="block font-medium">{info.state}</span>
                    <span className="hidden text-xs text-editorial-stone lg:block">{info.city}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Map */}
          <div
            data-testid="impact-map-container"
            className="order-2 self-start lg:order-none lg:col-start-1 lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:sticky lg:top-24 xl:col-span-8"
          >
            <div className="relative mx-auto max-w-[600px] rounded-md border border-editorial-border bg-editorial-creamlite p-4 sm:p-6">
              <BlockPrintCorner className="absolute right-3 top-3 text-editorial-gold/50" />
              <BlockPrintCorner className="absolute bottom-3 left-3 rotate-180 text-editorial-gold/50" />
              <svg
                viewBox={INDIA_MAP.viewBox}
                preserveAspectRatio="xMidYMid meet"
                className="h-auto w-full"
                role="img"
                aria-label="Interactive map of India showing 6 documented states where the Rutuja Dignity Doll has facilitated menstrual-health dialogues"
                data-testid="india-map-svg"
              >
                <motion.path
                  d={INDIA_MAP.path}
                  fill="#EDE4D8"
                  stroke="#D3C3B0"
                  strokeWidth={1.5}
                  strokeLinejoin="round"
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={vp}
                  transition={{ duration: 0.85, ease: EASE }}
                />

                {/* Journey lines from hub */}
                <g data-testid="map-journey-lines">
                  {!reduce &&
                    spokes.map((p, i) => (
                      <motion.path
                        key={`line-${p.id}`}
                        d={curvePath(hub, p)}
                        fill="none"
                        stroke="#C5A059"
                        strokeWidth={1.5}
                        strokeDasharray="4 6"
                        strokeLinecap="round"
                        opacity={0.6}
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                        viewport={vp}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 + i * 0.12 }}
                      />
                    ))}
                </g>

                {/* Region markers */}
                {MAP_REGIONS.map((r, i) => {
                  const info = place(r.id);
                  const isActive = active === r.id;
                  const core = r.hq ? "#295EAA" : "#6A1B29";
                  const dropDelay = 0.6 + i * 0.14;
                  return (
                    <g key={r.id}>
                      {/* secondary dot (e.g. Balasore within Odisha) */}
                      {r.x2 != null && (
                        <g transform={`translate(${r.x2} ${r.y2})`}>
                          <circle r={6} fill="#ffffff" stroke="#C5A059" strokeWidth={1.2} />
                          <circle r={3.6} fill={core} />
                        </g>
                      )}
                      <g transform={`translate(${r.x} ${r.y})`}>
                        {/* ambient pulse */}
                        {!reduce && (
                          <motion.circle
                            r={16}
                            fill={r.hq ? "#295EAA" : "#6A1B29"}
                            style={{ transformBox: "fill-box", transformOrigin: "center" }}
                            initial={{ opacity: 0 }}
                            animate={{ scale: [0.7, 1.9], opacity: [0.32, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 + i * 0.3 }}
                          />
                        )}
                        {/* marker */}
                        <motion.g
                          style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
                          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={vp}
                          transition={{ duration: 0.6, ease: EASE, delay: dropDelay }}
                          animate={isActive && !reduce ? { scale: 1.18 } : undefined}
                          whileHover={{ scale: 1.18 }}
                          onHoverStart={() => setActive(r.id)}
                          onTap={() => setActive(r.id)}
                          data-testid={`map-pin-${r.id}`}
                          aria-label={`${info.city}, ${info.state}`}
                        >
                          <circle r={10} fill="#ffffff" stroke="#C5A059" strokeWidth={1.5} />
                          <circle r={isActive ? 7.5 : 6.5} fill={core} />
                          <circle r={2.2} fill="#C5A059" />
                        </motion.g>
                      </g>
                    </g>
                  );
                })}

                {/* Active city label (shares map coordinate space) */}
                {activeRegion && (
                  <motion.text
                    key={`lbl-${active}`}
                    x={activeRegion.x}
                    y={activeRegion.y - 22}
                    textAnchor="middle"
                    fontSize={26}
                    fontFamily='"Playfair Display", Georgia, serif'
                    fill="#1E1B18"
                    stroke="#FCF9F5"
                    strokeWidth={5}
                    paintOrder="stroke"
                    strokeLinejoin="round"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    style={{ pointerEvents: "none" }}
                  >
                    {activePlace.city}
                  </motion.text>
                )}
              </svg>
            </div>
          </div>

          {/* Editorial story card */}
          <div className="order-3 lg:order-none lg:col-start-8 lg:col-span-5 lg:row-start-2 xl:col-span-4">
            <motion.article
              key={active}
              data-testid="editorial-story-card"
              className="relative overflow-hidden rounded-md border border-editorial-border bg-white p-6 shadow-[0_12px_36px_-12px_rgba(77,17,29,0.10)] sm:p-8"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <BlockPrintCorner className="absolute right-4 top-4 text-editorial-gold/45" />
              <div className="flex items-start justify-between gap-3 border-b border-editorial-border pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-editorial-golddark">
                    {activePlace.state} · {im.documentedLabel}
                  </p>
                  <h3
                    data-testid="editorial-story-title"
                    className="mt-2 font-serif text-2xl font-medium tracking-tight text-editorial-burgundy sm:text-3xl"
                  >
                    {activePlace.city}
                  </h3>
                </div>
                {activeRegion?.hq && (
                  <span className="mt-1 shrink-0 rounded-full bg-editorial-burgundy px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-editorial-goldlite">
                    {im.hqBadge}
                  </span>
                )}
              </div>

              <p
                data-testid="editorial-story-context"
                className="mt-4 text-sm leading-relaxed text-editorial-slate sm:text-base"
              >
                {activePlace.context}
              </p>

              {activePlace.venues?.length > 0 && (
                <div className="mt-5">
                  <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-editorial-golddark">
                    {im.venuesLabel}
                  </p>
                  <div data-testid="editorial-story-venues" className="flex flex-wrap gap-2">
                    {activePlace.venues.map((v, vi) => (
                      <span
                        key={vi}
                        className="inline-flex items-center rounded-full border border-editorial-border bg-editorial-creamsubtle px-3 py-1 text-xs font-medium text-editorial-burgundy"
                      >
                        {v}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.article>
          </div>
        </div>

        {/* Kalka divider */}
        <div className="mt-14 flex items-center gap-4 sm:mt-20">
          <span className="h-px flex-1 bg-editorial-border" />
          <KalkaDot className="text-editorial-gold" />
          <span className="h-px flex-1 bg-editorial-border" />
        </div>

        {/* National Pilot — By the Numbers */}
        <div
          data-testid="national-pilot-stats-strip"
          className="mt-10 rounded-md border border-editorial-bordergold/70 bg-editorial-creamsubtle p-6 sm:p-10 lg:p-12"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-editorial-golddark">
            {im.pilot.eyebrow}
          </p>
          <h3 className="mt-2 font-serif text-xl font-normal tracking-tight text-editorial-burgundy sm:text-2xl">
            {im.pilot.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-editorial-stone">{im.pilot.note}</p>

          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-editorial-border pt-8 md:grid-cols-5 md:divide-x md:divide-editorial-border">
            {im.pilot.metrics.map((m, i) => (
              <motion.div
                key={STAT_IDS[i]}
                data-testid={`pilot-stat-${STAT_IDS[i]}`}
                className="md:px-5 md:first:pl-0"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
              >
                <p
                  data-testid={`pilot-stat-value-${STAT_IDS[i]}`}
                  className={`font-serif font-medium leading-none tracking-tight text-editorial-burgundy ${
                    m.isText ? "text-lg sm:text-xl" : "text-3xl sm:text-4xl lg:text-5xl"
                  }`}
                >
                  {m.isText ? m.value : <CountUp value={m.value} />}
                </p>
                <p className="mt-2.5 text-xs font-medium uppercase tracking-[0.16em] text-editorial-slate">{m.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          data-testid="impact-closing-statement-card"
          className="relative mt-12 overflow-hidden rounded-md border border-editorial-gold/30 bg-[#2A141A] p-8 sm:mt-16 sm:p-12"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <LotusWatermark className="absolute -left-6 -top-6 text-editorial-gold/10" />
          <LotusWatermark className="absolute -bottom-6 -right-6 rotate-180 text-editorial-gold/10" />
          <blockquote
            data-testid="impact-closing-quote"
            className="relative max-w-3xl font-serif text-xl font-normal italic leading-relaxed text-editorial-cream sm:text-2xl lg:text-3xl"
          >
            {`\u201C${im.closing.quote}\u201D`}
          </blockquote>
          <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-editorial-gold">
            {im.closing.attribution}
          </p>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/request-workshop"
              data-testid="impact-closing-cta-workshop"
              className="inline-flex items-center justify-center gap-2 border border-editorial-gold/40 bg-editorial-burgundy px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-colors duration-300 hover:bg-editorial-burgundydark"
            >
              {im.closing.primaryCta} <ArrowUpRight size={18} />
            </Link>
            <Link
              to="/donate"
              data-testid="impact-closing-cta-donate"
              className="inline-flex items-center justify-center gap-2 border border-editorial-gold/50 px-7 py-3.5 text-sm font-semibold text-editorial-gold transition-colors duration-300 hover:border-editorial-gold hover:text-white"
            >
              {im.closing.secondaryCta} <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Block-print inspired vector ornaments ---
function BlockPrintCorner({ className = "" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M2 2h8a8 8 0 0 1 8 8v8" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="18" cy="18" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function KalkaDot({ className = "" }) {
  return (
    <svg width="34" height="14" viewBox="0 0 34 14" fill="currentColor" className={className} aria-hidden="true">
      <circle cx="17" cy="7" r="3" />
      <circle cx="7" cy="7" r="1.6" opacity="0.6" />
      <circle cx="27" cy="7" r="1.6" opacity="0.6" />
    </svg>
  );
}

function LotusWatermark({ className = "" }) {
  return (
    <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M50 20c6 12 6 24 0 40-6-16-6-28 0-40Z" strokeWidth="1.4" />
      <path d="M50 30c14 6 22 16 26 30-16-4-26-14-26-30Z" strokeWidth="1.4" />
      <path d="M50 30c-14 6-22 16-26 30 16-4 26-14 26-30Z" strokeWidth="1.4" />
    </svg>
  );
}
