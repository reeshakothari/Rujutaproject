import { useReducedMotion } from "framer-motion";

// Simple, elegant CSS marquee (duplicated track for seamless loop).
export default function Marquee({ items, className = "" }) {
  const reduce = useReducedMotion();
  const track = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={`flex w-max items-center gap-16 ${reduce ? "" : "animate-marquee"}`}
        style={reduce ? {} : { willChange: "transform" }}
      >
        {track.map((it, i) => (
          <span key={i} className="flex items-center gap-16">
            <span className="font-serif text-2xl italic text-rutuja-ink/30 md:text-4xl">{it}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-rutuja-pink/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
