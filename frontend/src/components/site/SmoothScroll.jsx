import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <ReactLenis root options={{ duration: 1.1, smoothWheel: true, lerp: 0.09 }}>
      {children}
    </ReactLenis>
  );
}
