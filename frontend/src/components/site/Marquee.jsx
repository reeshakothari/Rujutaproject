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
            <span className="font-serif text-2xl italic text-rutuja-ink/30 transition-colors duration-500 hover:text-rutuja-pink md:text-4xl">{it}</span>
            <span className={`h-1.5 w-1.5 rounded-full bg-rutuja-pink/60 shadow-[0_0_10px_2px_rgba(200,43,98,0.55)] ${reduce ? "" : "animate-glow-pulse-sm"}`} />
          </span>
        ))}
      </div>
    </div>
  );
}
