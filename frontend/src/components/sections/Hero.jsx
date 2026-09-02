import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const reduce = useReducedMotion();

  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden bg-rutuja-soft pt-[72px]"
    >
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 animate-float rounded-full bg-rutuja-blue/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 bottom-0 h-96 w-96 animate-float-slow rounded-full bg-rutuja-pink/15 blur-3xl" aria-hidden="true" />

      <div className="container-edge grid min-h-0 grid-cols-1 items-center gap-10 py-10 lg:min-h-[calc(88vh-72px)] lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="eyebrow"
          >
            {h.eyebrow}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
            className="mt-6 font-serif text-4xl font-medium leading-[1.06] tracking-tight text-rutuja-ink sm:text-6xl lg:text-[4.25rem]"
          >
            {h.lines.map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.16, ease: "easeOut" }}
            className="mt-7 max-w-xl text-base leading-relaxed text-rutuja-slate md:text-lg"
          >
            {h.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.24, ease: "easeOut" }}
            className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link to="/request-workshop" data-testid="hero-workshop-btn" className="btn-primary w-full justify-center rounded-sm sm:w-auto">
              {h.primary} <ArrowUpRight size={18} />
            </Link>
            <Link to="/get-involved" data-testid="hero-getinvolved-btn" className="btn-secondary w-full justify-center rounded-sm sm:w-auto">
              {h.secondary}
            </Link>
            <a href="#how-it-works" data-testid="hero-learn-btn" className="group inline-flex min-h-11 items-center justify-center gap-2 px-2 py-3.5 text-sm font-semibold text-rutuja-ink sm:justify-start">
              {h.tertiary}
              <ArrowDown size={16} className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-6 xl:col-span-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: 0.1, ease: "easeOut" }}
            className="relative mx-auto max-w-md lg:ml-auto lg:mr-0"
          >
            <div className="absolute -inset-3 -z-10 border border-rutuja-pink/25" aria-hidden="true" />
            <div className="relative aspect-[726/1040] overflow-hidden shadow-[0_30px_80px_-30px_rgba(41,94,170,0.35),0_0_60px_-18px_rgba(200,43,98,0.4)] transition-shadow duration-500 hover:shadow-[0_30px_90px_-24px_rgba(41,94,170,0.4),0_0_80px_-16px_rgba(200,43,98,0.55)]">
              <video
                src="/media/hero-doll.mp4"
                aria-label={h.imageAlt}
                className="h-full w-full object-cover object-center"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              />
            </div>
            <div className="absolute -bottom-4 left-4 bg-rutuja-pink px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              {h.caption}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
