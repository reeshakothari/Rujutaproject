import { motion, useReducedMotion } from "framer-motion";

// Fade-up reveal on scroll into view.
export function Reveal({ children, delay = 0, y = 28, className = "", as = "div", ...rest }) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
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
