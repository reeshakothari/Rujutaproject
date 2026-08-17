import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";
import Logo from "./Logo";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;
  const year = new Date().getFullYear();

  return (
    <footer data-testid="site-footer" className="bg-rutuja-ink text-white">
      <div className="container-edge py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/70">{f.blurb}</p>
            <p className="mt-4 font-serif text-lg italic text-rutuja-pink">{f.tagline}</p>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{f.explore}</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li><Link className="hover:text-white" to="/#dignity-doll" data-testid="footer-doll">{t.nav.doll}</Link></li>
              <li><Link className="hover:text-white" to="/#how-it-works" data-testid="footer-how">{t.nav.how}</Link></li>
              <li><Link className="hover:text-white" to="/#stories" data-testid="footer-stories">{t.nav.stories}</Link></li>
              <li><Link className="hover:text-white" to="/#impact" data-testid="footer-impact">{t.nav.impact}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{f.support}</h4>
            <ul className="mt-5 space-y-3 text-sm text-white/80">
              <li><Link className="hover:text-white" to="/request-workshop" data-testid="footer-workshop">{t.nav.requestWorkshop}</Link></li>
              <li><Link className="hover:text-white" to="/donate" data-testid="footer-donate">{t.nav.donate}</Link></li>
              <li><Link className="hover:text-white" to="/partner" data-testid="footer-partner">{t.nav.partner}</Link></li>
              <li><Link className="hover:text-white" to="/contact" data-testid="footer-contact">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{f.contactTitle}</h4>
            <p className="mt-5 text-sm leading-relaxed text-white/60">{f.contactPlaceholder}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© {year} {f.rights}</p>
          <p className="max-w-lg md:text-right">{f.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
