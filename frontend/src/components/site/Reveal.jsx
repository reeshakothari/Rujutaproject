import { motion, useReducedMotion } from "framer-motion";

// Fade-up reveal on scroll into view.
export function Reveal({ children, delay = 0, x = 0, y = 28, className = "", as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// Dramatic "flying in" entrance — used for images/media so they swoop into place
// from off-screen with a bit of rotation and scale, instead of a plain fade-up.
const FLY_DIRECTIONS = {
  left: { x: -1, y: 0, rotate: -6 },
  right: { x: 1, y: 0, rotate: 6 },
  up: { x: 0, y: 1, rotate: -3 },
  down: { x: 0, y: -1, rotate: 3 },
};

export function FlyIn({ children, delay = 0, direction = "up", distance = 140, className = "", as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const dir = FLY_DIRECTIONS[direction] || FLY_DIRECTIONS.up;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir.x * distance, y: dir.y * distance, rotate: dir.rotate, scale: 0.92 }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.95, delay, ease: [0.16, 1, 0.3, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// Masked line-by-line reveal — used for hero + big statements.
export function MaskReveal({ lines, className = "", lineClassName = "", stagger = 0.12, delay = 0.1 }) {
  const reduce = useReducedMotion();
  return (
    <span className={className} aria-label={lines.join(" ")}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line" aria-hidden="true">
          <motion.span
            className={`block ${lineClassName}`}
            initial={reduce ? { opacity: 0 } : { y: "110%" }}
            animate={reduce ? { opacity: 1 } : { y: "0%" }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
