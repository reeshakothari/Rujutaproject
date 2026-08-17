import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { ChevronLeft } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

export default function PageHeader({ eyebrow, title, sub }) {
  const { t } = useLang();
  return (
    <header className="border-b border-rutuja-line bg-rutuja-soft pt-[72px]">
      <div className="container-edge py-16 md:py-24">
        <Reveal>
          <Link to="/" className="inline-flex items-center gap-1 text-sm font-medium text-rutuja-slate transition-colors hover:text-rutuja-blue">
            <ChevronLeft size={16} /> {t.forms.backHome}
          </Link>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="eyebrow mt-8">{eyebrow}</p>
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
