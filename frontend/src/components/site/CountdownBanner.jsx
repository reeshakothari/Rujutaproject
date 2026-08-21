import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

// Local midnight on the target date.
const TARGET_DATE = new Date("2026-08-25T00:00:00");

function getTimeLeft() {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownBanner() {
  const { t } = useLang();
  const c = t.countdown;
  const reduce = useReducedMotion();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    if (!timeLeft) return;
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, [timeLeft]);

  const units = useMemo(
    () =>
      timeLeft
        ? [
            { key: "days", value: timeLeft.days, label: c.days },
            { key: "hours", value: timeLeft.hours, label: c.hours },
            { key: "minutes", value: timeLeft.minutes, label: c.minutes },
            { key: "seconds", value: timeLeft.seconds, label: c.seconds },
          ]
        : [],
    [timeLeft, c]
  );

  return (
    <section
      data-testid="countdown-banner"
      aria-live="polite"
      className={`relative mt-[72px] transition-colors duration-500 ${
        timeLeft ? "bg-rutuja-blue" : "bg-rutuja-pink"
      }`}
    >
      <div className="container-edge flex flex-col items-center justify-center gap-3 py-4 text-center sm:flex-row sm:gap-8 sm:py-5 sm:text-left">
        <AnimatePresence mode="wait">
          {timeLeft ? (
            <motion.div
              key="counting"
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: 6 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                  {c.eyebrow}
                </p>
                <p className="mt-0.5 font-serif text-lg font-medium text-white sm:text-xl">
                  {c.title}
                </p>
              </div>
              <div className="flex items-stretch gap-4 sm:gap-6" data-testid="countdown-units">
                {units.map((u, i) => (
                  <div
                    key={u.key}
                    className={`flex flex-col items-center px-1 ${
                      i > 0 ? "border-l border-white/20 pl-4 sm:pl-6" : ""
                    }`}
                  >
                    <span
                      data-testid={`countdown-${u.key}`}
                      className="relative inline-block h-[1.2em] w-[1.5em] overflow-hidden text-center text-2xl sm:text-3xl"
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                          key={u.value}
                          initial={reduce ? false : { y: "-100%", opacity: 0 }}
                          animate={{ y: "0%", opacity: 1 }}
                          exit={reduce ? undefined : { y: "100%", opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 block font-serif font-semibold tabular-nums text-white"
                        >
                          {String(u.value).padStart(2, "0")}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                    <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                      {u.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="live"
              data-testid="countdown-live"
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
                )}
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <div>
                <p className="font-serif text-lg font-medium text-white sm:text-xl">{c.liveTitle}</p>
                <p className="text-sm text-white/80">{c.liveSub}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
