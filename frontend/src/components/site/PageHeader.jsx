import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { ChevronLeft } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function PageHeader({ eyebrow, title, sub, accent = "blue" }) {
  const { t } = useLang();
  return (
    <header className="relative overflow-hidden border-b border-rutuja-line bg-rutuja-soft pt-[72px]">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-float rounded-full bg-rutuja-pink/10 blur-3xl" aria-hidden="true" />
      <div className="container-edge relative py-16 md:py-24">
        <Reveal>
          <Link to="/" className="group inline-flex min-h-11 items-center gap-1 text-sm font-medium text-rutuja-slate transition-colors hover:text-rutuja-pink">
            <ChevronLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" /> {t.forms.backHome}
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <p className={`${accent === "pink" ? "eyebrow-pink [text-shadow:0_0_16px_rgba(200,43,98,0.35)]" : "eyebrow"} mt-8`}>{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 max-w-3xl font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl lg:text-6xl">
            {title}
          </h1>
        </Reveal>
        {sub && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-rutuja-slate md:text-lg">{sub}</p>
          </Reveal>
        )}
      </div>
    </header>
  );
}
