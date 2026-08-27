import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

// Shows a single persistent "Request a Workshop" CTA once the user scrolls past the hero's
// own CTA row — stays out of the way while that button is already on screen.
export default function MobileCTABar() {
  const { t } = useLang();
  const location = useLocation();
  const [heroCtaVisible, setHeroCtaVisible] = useState(true);

  useEffect(() => {
    const target = document.querySelector('[data-testid="hero-workshop-btn"]');
    if (!target) {
      setHeroCtaVisible(false);
      return undefined;
    }
    setHeroCtaVisible(true);
    const observer = new IntersectionObserver(([entry]) => setHeroCtaVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <motion.div
      data-testid="mobile-cta-bar"
      initial={false}
      animate={heroCtaVisible ? { y: 80, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      style={{ pointerEvents: heroCtaVisible ? "none" : "auto" }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rutuja-line bg-white/95 px-4 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_30px_-16px_rgba(200,43,98,0.35)] backdrop-blur-md lg:hidden"
    >
      <Link to="/request-workshop" data-testid="cta-bar-workshop" className="btn-primary block w-full rounded-sm py-3 text-center text-sm">
        {t.nav.requestWorkshop}
      </Link>
    </motion.div>
  );
}
