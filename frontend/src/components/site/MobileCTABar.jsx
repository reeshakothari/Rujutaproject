import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

export default function MobileCTABar() {
  const { t } = useLang();
  return (
    <motion.div
      data-testid="mobile-cta-bar"
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-rutuja-line bg-white/95 px-4 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 shadow-[0_-10px_30px_-16px_rgba(200,43,98,0.35)] backdrop-blur-md lg:hidden"
    >
      <Link to="/donate" data-testid="cta-bar-donate" className="btn-outline rounded-sm py-3 text-sm">
        {t.nav.donate}
      </Link>
      <Link to="/request-workshop" data-testid="cta-bar-workshop" className="btn-primary rounded-sm py-3 text-sm animate-glow-pulse-sm">
        {t.nav.requestWorkshop}
      </Link>
    </motion.div>
  );
}
