import { LOGO } from "@/data/images";
import { Link } from "react-router-dom";

export default function Logo({ className = "", onClick, light = false }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Rutuja — home"
      data-testid="site-logo"
      className={`group inline-flex shrink-0 items-center transition-transform duration-300 hover:scale-[1.03] ${className}`}
    >
      <span className={`inline-flex shrink-0 transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_rgba(200,43,98,0.55)] ${light ? "rounded-sm bg-white p-1.5" : ""}`}>
        <img
          src={LOGO}
          alt="Rutuja"
          className="h-11 w-auto shrink-0 object-contain md:h-12"
          width="180"
          height="120"
        />
      </span>
    </Link>
  );
}
