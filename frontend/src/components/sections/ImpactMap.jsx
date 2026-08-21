import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { INDIA_MAP, MAP_REGIONS, HQ_ID } from "@/data/impactMap";

const EASE = [0.22, 1, 0.36, 1];

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
      className="scroll-mt-20 bg-white py-16 md:py-28"
    >
      <div className="container-edge">
        {/* Header */}
        <div className="max-w-3xl">
          <motion.p
            data-testid="impact-eyebrow"
            className="eyebrow-pink"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {im.eyebrow}
          </motion.p>
          <motion.h2
            data-testid="impact-headline"
            className="mt-5 font-serif text-3xl font-medium leading-[1.12] tracking-tight text-rutuja-ink sm:text-4xl lg:text-5xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
          >
            {im.title}
          </motion.h2>
          <motion.p
            data-testid="impact-subtext"
            className="mt-6 max-w-2xl text-base leading-relaxed text-rutuja-slate sm:text-lg"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease: EASE, delay: 0.16 }}
          >
            {im.sub}
          </motion.p>
        </div>

        {/* Map + selector */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-12">
          {/* Map (main) with the story card overlaid bottom-right */}
          <div className="order-2 lg:order-none lg:col-span-8">
            <div
              data-testid="impact-map-container"
              className="relative mx-auto max-w-[640px] rounded-md border border-rutuja-line bg-white p-4 sm:p-5"
            >
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
                  fill="#F0DEE6"
                  stroke="#D9B9C8"
                  strokeWidth={1.4}
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
                        stroke="#C82B62"
                        strokeWidth={1.3}
                        strokeDasharray="4 6"
                        strokeLinecap="round"
                        opacity={0.4}
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.4 }}
                        viewport={vp}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.35 + i * 0.12 }}
                      />
                    ))}
                </g>

                {/* Region markers */}
                {MAP_REGIONS.map((r, i) => {
                  const info = place(r.id);
                  const isActive = active === r.id;
                  const core = r.hq ? "#A3234F" : "#C82B62";
                  const dropDelay = 0.6 + i * 0.14;
                  return (
                    <g key={r.id}>
                      {r.x2 != null && (
                        <g transform={`translate(${r.x2} ${r.y2})`}>
                          <circle r={6} fill="#ffffff" stroke="#C82B62" strokeWidth={1} />
                          <circle r={3.4} fill={core} />
                        </g>
                      )}
                      <g transform={`translate(${r.x} ${r.y})`}>
                        {!reduce && (
                          <motion.circle
                            r={16}
                            fill="#C82B62"
                            style={{ transformBox: "fill-box", transformOrigin: "center" }}
                            initial={{ opacity: 0 }}
                            animate={{ scale: [0.7, 1.9], opacity: [0.35, 0] }}
                            transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 + i * 0.3 }}
                          />
                        )}
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
                          <circle r={10} fill="#ffffff" stroke="#C82B62" strokeWidth={1} />
                          <circle r={isActive ? 7.5 : 6.5} fill={core} />
                          <circle r={2.3} fill="#ffffff" />
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
                    fill="#1A1A1A"
                    stroke="#ffffff"
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

              {/* Documented-activity story card — bottom-right overlay on desktop, stacked on mobile */}
              <motion.article
                key={active}
                data-testid="editorial-story-card"
                className="mt-4 rounded-md border border-rutuja-line bg-white p-5 shadow-[0_12px_36px_-14px_rgba(163,35,79,0.22)] lg:absolute lg:bottom-5 lg:right-5 lg:z-10 lg:mt-0 lg:w-[300px] lg:max-w-[48%] lg:p-5 lg:backdrop-blur-none"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="flex items-start justify-between gap-3 border-b border-rutuja-line pb-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rutuja-muted">
                      {activePlace.state} · {im.documentedLabel}
                    </p>
                    <h3
                      data-testid="editorial-story-title"
                      className="mt-1.5 font-serif text-xl font-medium tracking-tight text-rutuja-pinkdark sm:text-2xl"
                    >
                      {activePlace.city}
                    </h3>
                  </div>
                  {activeRegion?.hq && (
                    <span className="mt-1 shrink-0 rounded-full bg-rutuja-pink px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                      {im.hqBadge}
                    </span>
                  )}
                </div>

                <p
                  data-testid="editorial-story-context"
                  className="mt-3 text-[13px] leading-relaxed text-rutuja-slate"
                >
                  {activePlace.context}
                </p>

                {activePlace.venues?.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-rutuja-muted">
                      {im.venuesLabel}
                    </p>
                    <div data-testid="editorial-story-venues" className="flex flex-wrap gap-1.5">
                      {activePlace.venues.map((v, vi) => (
                        <span
                          key={vi}
                          className="inline-flex items-center rounded-full border border-rutuja-pink/30 bg-rutuja-soft px-2.5 py-0.5 text-[11px] font-medium text-rutuja-pinkdark"
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

          {/* Region selector */}
          <div className="order-1 lg:order-none lg:col-span-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-rutuja-muted">
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
                        ? "border-rutuja-pink bg-rutuja-soft font-semibold text-rutuja-pinkdark"
                        : "border-rutuja-line text-rutuja-slate hover:border-rutuja-pink/50 hover:text-rutuja-pink lg:border-transparent lg:hover:bg-rutuja-soft/60"
                    }`}
                  >
                    <span className="block font-medium">{info.state}</span>
                    <span className="hidden text-xs text-rutuja-muted lg:block">{info.city}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Closing statement */}
        <motion.div
          data-testid="impact-closing-statement-card"
          className="relative mt-14 overflow-hidden rounded-md bg-rutuja-ink p-8 sm:mt-20 sm:p-12"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <blockquote
            data-testid="impact-closing-quote"
            className="relative max-w-3xl font-serif text-xl font-normal italic leading-relaxed text-white sm:text-2xl lg:text-3xl"
          >
            {`\u201C${im.closing.quote}\u201D`}
          </blockquote>
          <p className="relative mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-rutuja-pink">
            {im.closing.attribution}
          </p>
          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/request-workshop"
              data-testid="impact-closing-cta-workshop"
              className="inline-flex items-center justify-center gap-2 bg-rutuja-pink px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-rutuja-pinkdark"
            >
              {im.closing.primaryCta} <ArrowUpRight size={18} />
            </Link>
            <Link
              to="/donate"
              data-testid="impact-closing-cta-donate"
              className="inline-flex items-center justify-center gap-2 border border-rutuja-pink/60 px-7 py-3.5 text-sm font-semibold text-rutuja-pink transition-colors duration-300 hover:border-rutuja-pink hover:text-white"
            >
              {im.closing.secondaryCta} <ArrowUpRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
