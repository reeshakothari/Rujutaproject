import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion, animate } from "framer-motion";

// Counts up to a numeric value when scrolled into view. Preserves prefix/suffix (e.g. "20+").
export default function CountUp({ value, className }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const match = String(value).match(/^(\D*)(\d[\d,]*)(.*)$/);

  const [display, setDisplay] = useState(() => {
    if (!match || reduce) return value;
    return `${match[1] || ""}0${match[3] || ""}`;
  });

  useEffect(() => {
    if (!match || reduce || !inView) return;
    const target = parseInt(match[2].replace(/,/g, ""), 10);
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(`${match[1] || ""}${Math.round(v).toLocaleString()}${match[3] || ""}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
