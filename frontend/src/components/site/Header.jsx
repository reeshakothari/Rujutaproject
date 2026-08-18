import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useLang } from "@/context/LanguageContext";
import { LANGS } from "@/data/content";

export default function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [open]);

  const goToSection = useCallback(
    (id) => {
      setOpen(false);
      if (location.pathname !== "/") {
        navigate("/#" + id);
        return;
      }
      const doScroll = () => {
        const el = document.getElementById(id);
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: -72 });
        else el.scrollIntoView({ behavior: "smooth" });
      };
      doScroll();
    },
    [lenis, location.pathname, navigate]
  );

  const links = [
    { id: "dignity-doll", label: t.nav.doll },
    { id: "how-it-works", label: t.nav.how },
    { id: "stories", label: t.nav.stories },
    { id: "impact", label: t.nav.impact },
    { id: "support", label: t.nav.involved },
  ];

  const overHero = !scrolled && !open;

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "bg-white/90 backdrop-blur-md border-b border-rutuja-line"
          : "bg-transparent"
      }`}
    >
      <div className="container-edge flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-${l.id}`}
              onClick={() => goToSection(l.id)}
              className="text-sm font-medium text-rutuja-ink/80 transition-colors hover:text-rutuja-blue"
            >
              {l.label}
            </button>
          ))}
          <Link to="/gallery" data-testid="nav-gallery" className="text-sm font-medium text-rutuja-ink/80 transition-colors hover:text-rutuja-blue">
            {t.nav.gallery}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch lang={lang} setLang={setLang} label={t.nav.langLabel} />
          <span className="h-5 w-px bg-rutuja-line" aria-hidden="true" />
          <Link to="/donate" data-testid="nav-donate-cta" className="text-sm font-semibold text-rutuja-pink transition-colors hover:text-rutuja-pinkdark">
            {t.nav.donate}
          </Link>
          <Link to="/request-workshop" data-testid="nav-workshop-cta" className="btn-primary rounded-sm px-5 py-2.5 text-sm">
            {t.nav.requestWorkshop}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitch lang={lang} setLang={setLang} label={t.nav.langLabel} compact />
          <button
            data-testid="mobile-menu-toggle"
            aria-label={open ? t.nav.close : t.nav.menu}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center text-rutuja-ink"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-x-0 top-[72px] bottom-0 overflow-y-auto bg-white"
          >
            <div className="container-edge flex flex-col gap-1 py-6">
              {links.map((l, i) => (
                <button
                  key={l.id}
                  data-testid={`mobile-nav-${l.id}`}
                  onClick={() => goToSection(l.id)}
                  className="border-b border-rutuja-line py-4 text-left font-serif text-2xl text-rutuja-ink"
                >
                  <span className="mr-3 text-xs align-middle text-rutuja-muted">0{i + 1}</span>
                  {l.label}
                </button>
              ))}
              <MobileLink to="/gallery" label={t.nav.gallery} testid="mobile-nav-gallery" onClick={() => setOpen(false)} />
              <MobileLink to="/donate" label={t.nav.donate} testid="mobile-nav-donate" onClick={() => setOpen(false)} />
              <MobileLink to="/partner" label={t.nav.partner} testid="mobile-nav-partner" onClick={() => setOpen(false)} />
              <MobileLink to="/contact" label={t.nav.contact} testid="mobile-nav-contact" onClick={() => setOpen(false)} />
              <Link
                to="/request-workshop"
                data-testid="mobile-nav-workshop"
                onClick={() => setOpen(false)}
                className="btn-primary mt-5 w-full rounded-sm py-4 text-base"
              >
                {t.nav.requestWorkshop} <ArrowUpRight size={18} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileLink({ to, label, testid, onClick }) {
  return (
    <Link
      to={to}
      data-testid={testid}
      onClick={onClick}
      className="border-b border-rutuja-line py-4 text-left font-serif text-2xl text-rutuja-ink"
    >
      {label}
    </Link>
  );
}

function LangSwitch({ lang, setLang, label, compact }) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={label} data-testid="lang-switch">
      {LANGS.map((l, i) => (
        <span key={l.code} className="flex items-center">
          {i > 0 && <span className="px-1 text-rutuja-muted" aria-hidden="true">|</span>}
          <button
            data-testid={`lang-${l.code}`}
            aria-pressed={lang === l.code}
            onClick={() => setLang(l.code)}
            className={`text-sm font-semibold transition-colors ${
              lang === l.code ? "text-rutuja-blue" : "text-rutuja-muted hover:text-rutuja-ink"
            } ${compact ? "" : ""}`}
          >
            {l.label}
          </button>
        </span>
      ))}
    </div>
  );
}
