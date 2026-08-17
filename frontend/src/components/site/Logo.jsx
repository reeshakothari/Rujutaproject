import { LOGO } from "@/data/images";
import { Link } from "react-router-dom";

export default function Logo({ className = "", onClick, light = false }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label="Rutuja — home"
      data-testid="site-logo"
      className={`inline-flex items-center ${className}`}
    >
      <span className={light ? "inline-flex rounded-sm bg-white p-1.5" : "inline-flex"}>
        <img
          src={LOGO}
          alt="Rutuja"
          className="h-11 w-auto md:h-12"
          width="180"
          height="120"
        />
      </span>
    </Link>
  );
}
