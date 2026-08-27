import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import { Reveal } from "@/components/site/Reveal";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer data-testid="site-footer" className="relative overflow-hidden bg-rutuja-ink text-white">
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 animate-float rounded-full bg-rutuja-pink/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 animate-float-slow rounded-full bg-rutuja-pink/10 blur-3xl" aria-hidden="true" />
      <div className="container-edge relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <Reveal trigger="mount" className="md:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{f.blurb}</p>
            <p className="mt-4 font-serif text-lg italic text-rutuja-pink [text-shadow:0_0_20px_rgba(200,43,98,0.45)]">{f.tagline}</p>
          </Reveal>

          <Reveal trigger="mount" delay={0.06} className="md:col-span-2">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{f.explore}</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/#dignity-doll" data-testid="footer-doll">{t.nav.doll}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/#how-it-works" data-testid="footer-how">{t.nav.how}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/#stories" data-testid="footer-stories">{t.nav.stories}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/impact" data-testid="footer-impact">{t.nav.impact}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/gallery" data-testid="footer-gallery">{t.nav.gallery}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/videos" data-testid="footer-videos">{t.nav.videos}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/activities" data-testid="footer-playLearn">{t.nav.playLearn}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/about" data-testid="footer-about">{t.nav.about}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/impact#theory-of-change" data-testid="footer-theory-of-change">{t.nav.theoryOfChange}</Link></li>
            </ul>
          </Reveal>

          <Reveal trigger="mount" delay={0.1} className="md:col-span-2">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{f.support}</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/get-involved" data-testid="footer-get-involved">{t.nav.involved}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/request-workshop" data-testid="footer-workshop">{t.nav.requestWorkshop}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/donate" data-testid="footer-donate">{t.nav.donate}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/partner" data-testid="footer-partner">{t.nav.partner}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/apply-ambassador" data-testid="footer-ambassador-apply">{t.nav.ambassadorApply}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/volunteer" data-testid="footer-volunteer">{t.nav.volunteer}</Link></li>
              <li><Link className="-mx-1 inline-flex min-h-11 min-w-11 items-center px-1 transition-[color,text-shadow] duration-300 hover:text-white hover:[text-shadow:0_0_12px_rgba(200,43,98,0.7)]" to="/contact" data-testid="footer-contact">{t.nav.contact}</Link></li>
            </ul>
          </Reveal>

          <Reveal trigger="mount" delay={0.14} className="md:col-span-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{f.contactTitle}</h4>
            <p className="mt-5 text-sm leading-relaxed text-white/60">{f.contactPlaceholder}</p>
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} {f.rights}</p>
          <p className="max-w-lg md:text-right">{f.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
