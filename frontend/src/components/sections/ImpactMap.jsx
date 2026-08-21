import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { INDIA_MAP, AMBASSADORS } from "@/data/impactMap";

const EASE = [0.22, 1, 0.36, 1];

export default function ImpactMap() {
  const { t } = useLang();
  const im = t.impactMap;
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  const people = im.ambassadors || [];
  const activePerson = people[active] || {};
  const activePin = AMBASSADORS[active];
  const labelCity = (activePerson.loc || "").split(",")[0];

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
          {/* Map */}
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
                aria-label="Map of India and Nepal showing the 12 Dignity Dialogue 2026 ambassadors"
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

                {/* Ambassador pins */}
                {AMBASSADORS.map((p, i) => {
                  const isActive = active === i;
                  const dropDelay = 0.6 + i * 0.1;
                  return (
                    <g key={p.id} transform={`translate(${p.x} ${p.y})`}>
                      {!reduce && (
                        <motion.circle
                          r={14}
                          fill="#C82B62"
                          style={{ transformBox: "fill-box", transformOrigin: "center" }}
                          initial={{ opacity: 0 }}
                          animate={{ scale: [0.7, 1.9], opacity: [0.32, 0] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: 0.6 + i * 0.22 }}
                        />
                      )}
                      <motion.g
                        style={{ transformBox: "fill-box", transformOrigin: "center", cursor: "pointer" }}
                        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={vp}
                        transition={{ duration: 0.55, ease: EASE, delay: dropDelay }}
                        animate={isActive && !reduce ? { scale: 1.2 } : undefined}
                        whileHover={{ scale: 1.2 }}
                        onHoverStart={() => setActive(i)}
                        onTap={() => setActive(i)}
                        data-testid={`map-pin-${p.id}`}
                        aria-label={`${p.n}. ${people[i]?.name || ""}`}
                      >
                        <circle r={13.5} fill={isActive ? "#A3234F" : "#C82B62"} stroke="#ffffff" strokeWidth={1.6} />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={15}
                          fontWeight={700}
                          fontFamily='"Manrope", system-ui, sans-serif'
                          fill="#ffffff"
                          style={{ pointerEvents: "none" }}
                        >
                          {p.n}
                        </text>
                      </motion.g>
                    </g>
                  );
                })}

                {/* Active location label */}
                {activePin && labelCity && (
                  <motion.text
                    key={`lbl-${active}`}
                    x={activePin.x}
                    y={activePin.y - 24}
                    textAnchor="middle"
                    fontSize={24}
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
                    {labelCity}
                  </motion.text>
                )}
              </svg>
            </div>
          </div>

          {/* Selector + detail */}
          <div className="order-1 lg:order-none lg:col-span-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-rutuja-muted">
              {im.tapHint}
            </p>
            <div
              data-testid="impact-region-selector-list"
              className="no-scrollbar flex gap-2 overflow-x-auto pb-1 lg:max-h-[420px] lg:flex-col lg:gap-0.5 lg:overflow-y-auto lg:pb-0"
            >
              {people.map((person, i) => {
                const p = AMBASSADORS[i];
                const isActive = active === i;
                return (
                  <button
                    key={p.id}
                    type="button"
                    data-testid={`impact-region-btn-${p.id}`}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    aria-label={`${person.name}, ${person.loc}`}
                    className={`flex shrink-0 items-center gap-3 whitespace-nowrap rounded-full border px-3 py-2 text-left text-sm transition-all duration-200 lg:w-full lg:whitespace-normal lg:rounded-none lg:border-0 lg:border-l-2 lg:px-3 lg:py-2 ${
                      isActive
                        ? "border-rutuja-pink bg-rutuja-soft"
                        : "border-rutuja-line hover:border-rutuja-pink/50 lg:border-transparent lg:hover:bg-rutuja-soft/60"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white ${
                        isActive ? "bg-rutuja-pinkdark" : "bg-rutuja-pink"
                      }`}
                    >
                      {p.n}
                    </span>
                    <span className="min-w-0">
                      <span className={`block font-medium ${isActive ? "text-rutuja-pinkdark" : "text-rutuja-ink"}`}>
                        {person.name}
                      </span>
                      <span className="hidden truncate text-xs text-rutuja-muted lg:block">{person.loc}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Ambassador detail card */}
            <motion.article
              key={active}
              data-testid="editorial-story-card"
              className="mt-6 rounded-md border border-rutuja-line bg-white p-5 shadow-[0_12px_36px_-16px_rgba(163,35,79,0.18)]"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-rutuja-pink text-sm font-bold text-white">
                  {activePin?.n}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-rutuja-muted">
                    {im.roleLabel}
                  </p>
                  <h3
                    data-testid="editorial-story-title"
                    className="mt-1 font-serif text-xl font-medium tracking-tight text-rutuja-pinkdark sm:text-2xl"
                  >
                    {activePerson.name}
                  </h3>
                </div>
              </div>
              <p
                data-testid="editorial-story-context"
                className="mt-4 border-t border-rutuja-line pt-4 text-sm leading-relaxed text-rutuja-slate"
              >
                {activePerson.loc}
              </p>
            </motion.article>
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
