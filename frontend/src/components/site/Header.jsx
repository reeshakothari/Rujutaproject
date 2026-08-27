import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import { useLang } from "@/context/LanguageContext";
import { LANGS } from "@/data/content";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

const involvedItemClass = "cursor-pointer font-sans text-sm text-rutuja-ink focus:bg-rutuja-soft focus:text-rutuja-pinkdark";

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
    { id: "impact", label: t.nav.impact, to: "/impact" },
  ];

  const involvedLinks = [
    { to: "/partner", label: t.nav.partner, testid: "nav-involved-partner" },
    { to: "/volunteer", label: t.nav.volunteer, testid: "nav-involved-volunteer" },
    { to: "/apply-ambassador", label: t.nav.ambassadorApply, testid: "nav-involved-ambassador" },
    { to: "/about", label: t.nav.about, testid: "nav-involved-about" },
    { to: "/contact", label: t.nav.contact, testid: "nav-involved-contact" },
  ];

  const overHero = !scrolled && !open;

  return (
    <header
      data-testid="site-header"
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Backdrop layer is isolated from the header itself so its backdrop-filter doesn't
          become the containing block for the fixed mobile-menu panel below (that bug
          collapsed the menu to ~0px tall — the panel's top/bottom offsets were resolving
          against this bar's own height instead of the viewport). */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[72px] transition-[background-color,box-shadow] duration-500 ${
          scrolled || open
            ? "bg-white/90 backdrop-blur-md border-b border-rutuja-line shadow-[0_8px_30px_-18px_rgba(200,43,98,0.35)]"
            : "bg-transparent"
        }`}
      />
      <div className="container-edge relative flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-5 whitespace-nowrap xl:gap-7 lg:flex" aria-label="Primary">
          {links.map((l) =>
            l.to ? (
              <Link
                key={l.id}
                to={l.to}
                data-testid={`nav-${l.id}`}
                className="group relative text-sm font-medium text-rutuja-ink/80 transition-colors hover:text-rutuja-blue"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rutuja-blue transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
              </Link>
            ) : (
              <button
                key={l.id}
                data-testid={`nav-${l.id}`}
                onClick={() => goToSection(l.id)}
                className="group relative text-sm font-medium text-rutuja-ink/80 transition-colors hover:text-rutuja-blue"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rutuja-blue transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
              </button>
            )
          )}
          <div className="group flex items-center gap-0.5">
            <Link
              to="/get-involved"
              data-testid="nav-involved"
              className="relative text-sm font-medium text-rutuja-ink/80 transition-colors hover:text-rutuja-blue"
            >
              {t.nav.involved}
              <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rutuja-blue transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger
                data-testid="nav-involved-toggle"
                aria-label={t.nav.involved}
                className="group/toggle rounded-sm p-1 text-rutuja-ink/60 outline-none transition-colors hover:text-rutuja-blue data-[state=open]:text-rutuja-blue"
              >
                <ChevronDown size={14} className="transition-transform duration-200 group-data-[state=open]/toggle:rotate-180" aria-hidden="true" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[240px] border-rutuja-line">
                {involvedLinks.map((l) => (
                  <DropdownMenuItem key={l.testid} asChild className={involvedItemClass}>
                    <Link to={l.to} data-testid={l.testid}>
                      {l.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Link to="/gallery" data-testid="nav-gallery" className="group relative text-sm font-medium text-rutuja-ink/80 transition-colors hover:text-rutuja-blue">
            {t.nav.gallery}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rutuja-blue transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
          </Link>
          <Link to="/videos" data-testid="nav-videos" className="group relative text-sm font-medium text-rutuja-ink/80 transition-colors hover:text-rutuja-blue">
            {t.nav.videos}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rutuja-blue transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
          </Link>
          <Link to="/activities" data-testid="nav-playLearn" className="group relative text-sm font-medium text-rutuja-ink/80 transition-colors hover:text-rutuja-blue">
            {t.nav.playLearn}
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-rutuja-blue transition-transform duration-300 ease-out group-hover:scale-x-100" aria-hidden="true" />
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LangSwitch lang={lang} setLang={setLang} label={t.nav.langLabel} />
          <span className="h-5 w-px bg-rutuja-line" aria-hidden="true" />
          <Link to="/donate" data-testid="nav-support-cta" className="text-sm font-semibold text-rutuja-pink transition-[color,text-shadow] duration-300 hover:text-rutuja-pinkdark hover:[text-shadow:0_0_16px_rgba(200,43,98,0.6)]">
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
              {links.map((l, i) =>
                l.to ? (
                  <motion.div
                    key={l.id}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={l.to}
                      data-testid={`mobile-nav-${l.id}`}
                      onClick={() => setOpen(false)}
                      className="block border-b border-rutuja-line py-4 text-left font-serif text-2xl text-rutuja-ink transition-colors hover:text-rutuja-pink"
                    >
                      <span className="mr-3 text-xs align-middle text-rutuja-muted">0{i + 1}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={l.id}
                    data-testid={`mobile-nav-${l.id}`}
                    onClick={() => goToSection(l.id)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-rutuja-line py-4 text-left font-serif text-2xl text-rutuja-ink transition-colors hover:text-rutuja-pink"
                  >
                    <span className="mr-3 text-xs align-middle text-rutuja-muted">0{i + 1}</span>
                    {l.label}
                  </motion.button>
                )
              )}
              <MobileLink to="/gallery" label={t.nav.gallery} testid="mobile-nav-gallery" onClick={() => setOpen(false)} delay={links.length * 0.05} />
              <MobileLink to="/videos" label={t.nav.videos} testid="mobile-nav-videos" onClick={() => setOpen(false)} delay={(links.length + 1) * 0.05} />
              <MobileLink to="/activities" label={t.nav.playLearn} testid="mobile-nav-playLearn" onClick={() => setOpen(false)} delay={(links.length + 2) * 0.05} />
              <MobileLink to="/get-involved" label={t.nav.involved} testid="mobile-nav-involved" onClick={() => setOpen(false)} delay={(links.length + 3) * 0.05} />
              <MobileLink to="/partner" label={t.nav.partner} testid="mobile-nav-partner" onClick={() => setOpen(false)} delay={(links.length + 4) * 0.05} />
              <MobileLink to="/volunteer" label={t.nav.volunteer} testid="mobile-nav-volunteer" onClick={() => setOpen(false)} delay={(links.length + 5) * 0.05} />
              <MobileLink to="/apply-ambassador" label={t.nav.ambassadorApply} testid="mobile-nav-ambassador" onClick={() => setOpen(false)} delay={(links.length + 6) * 0.05} />
              <MobileLink to="/about" label={t.nav.about} testid="mobile-nav-about" onClick={() => setOpen(false)} delay={(links.length + 7) * 0.05} />
              <MobileLink to="/contact" label={t.nav.contact} testid="mobile-nav-contact" onClick={() => setOpen(false)} delay={(links.length + 8) * 0.05} />
              <MobileLink to="/donate" label={t.nav.donate} testid="mobile-nav-donate" onClick={() => setOpen(false)} delay={(links.length + 9) * 0.05} />
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (links.length + 10) * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  to="/request-workshop"
                  data-testid="mobile-nav-workshop"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-5 w-full rounded-sm py-4 text-base animate-glow-pulse"
                >
                  {t.nav.requestWorkshop} <ArrowUpRight size={18} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileLink({ to, label, testid, onClick, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={to}
        data-testid={testid}
        onClick={onClick}
        className="block border-b border-rutuja-line py-4 text-left font-serif text-2xl text-rutuja-ink transition-colors hover:text-rutuja-pink"
      >
        {label}
      </Link>
    </motion.div>
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
            className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 text-sm font-semibold transition-colors ${
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
