import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ArrowUpRight } from "lucide-react";

export default function FinalCTA() {
  const { t } = useLang();
  const c = t.finalCta;
  const g = t.globalCta;
  const reduce = useReducedMotion();

  return (
    <section id="final-cta" data-testid="final-cta-section" className="relative overflow-hidden bg-rutuja-ink pb-24 pt-32 text-white md:pb-36 md:pt-52">
      {/* Large organic oval transition — the light content curves down and the dark footer rises from underneath */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 w-full"
        initial={reduce ? { opacity: 1 } : { y: -24, scaleY: 0.9, opacity: 0 }}
        whileInView={{ y: 0, scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "top" }}
      >
        <svg
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          className="block h-[90px] w-full md:h-[170px]"
        >
          <path d="M0,0 H1440 V96 Q720,-96 0,96 Z" fill="#FBECF2" />
        </svg>
      </motion.div>

      {/* glow inside the dome */}
      <div className="pointer-events-none absolute left-1/2 top-24 h-40 w-[80%] -translate-x-1/2 animate-glow-pulse rounded-[100%] bg-rutuja-pink/20 blur-3xl md:top-40" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-10 bottom-10 h-64 w-64 animate-float rounded-full bg-rutuja-pink/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 bottom-24 h-72 w-72 animate-float-slow rounded-full bg-rutuja-blue/10 blur-3xl" aria-hidden="true" />

      <div className="container-edge relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <h2 className="font-serif text-3xl font-medium leading-[1.15] tracking-tight md:text-5xl lg:text-[3.5rem]">
              {c.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">{c.sub}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link to="/request-workshop" data-testid="final-workshop-btn" className="btn-primary w-full justify-center rounded-sm sm:w-auto">
                {g.workshop} <ArrowUpRight size={18} />
              </Link>
              <Link to="/donate" data-testid="final-donate-btn" className="btn-secondary w-full justify-center rounded-sm sm:w-auto">
                {g.donate}
              </Link>
              <Link to="/contact" data-testid="final-inquiry-btn" className="inline-flex w-full items-center justify-center gap-2 border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-[background-color,color,box-shadow] duration-300 hover:bg-white hover:text-rutuja-ink hover:shadow-[0_0_30px_-4px_rgba(255,255,255,0.5)] sm:w-auto">
                {g.inquiry}
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
