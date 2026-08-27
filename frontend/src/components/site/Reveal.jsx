import { motion, useReducedMotion } from "framer-motion";

// Fade-up reveal — soft 16-24px lift, 250-400ms, ease-out. Defaults to triggering on scroll
// into view; pass trigger="mount" for content that must never sit invisible waiting on a
// scroll/intersection event (e.g. the footer, which is often already at/near the fold).
export function Reveal({ children, delay = 0, x = 0, y = 20, className = "", as = "div", trigger = "inView", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const initial = reduce ? { opacity: 0 } : { opacity: 0, x, y };
  const shown = reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 };
  const viewportProps =
    trigger === "mount"
      ? { animate: shown }
      : { whileInView: shown, viewport: { once: true, margin: "-10% 0px -10% 0px" } };
  return (
    <MotionTag
      className={className}
      initial={initial}
      transition={{ duration: 0.35, delay, ease: "easeOut" }}
      {...viewportProps}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// Gentle directional entrance for images/media — a soft 16-24px lift with a touch of scale,
// not a dramatic swoop (kept restrained: no rotation, no large horizontal travel).
const FLY_DIRECTIONS = {
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
};

export function FlyIn({ children, delay = 0, direction = "up", distance = 24, className = "", as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const dir = FLY_DIRECTIONS[direction] || FLY_DIRECTIONS.up;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir.x * distance, y: dir.y * distance, scale: 0.98 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
