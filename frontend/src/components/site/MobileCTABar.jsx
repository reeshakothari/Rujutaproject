import { Link } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

export default function MobileCTABar() {
  const { t } = useLang();
  return (
    <div
      data-testid="mobile-cta-bar"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-rutuja-line bg-white/95 px-4 pb-[calc(0.6rem+env(safe-area-inset-bottom))] pt-2.5 backdrop-blur-md lg:hidden"
    >
      <Link to="/donate" data-testid="cta-bar-donate" className="btn-outline rounded-sm py-3 text-sm">
        {t.nav.donate}
      </Link>
      <Link to="/request-workshop" data-testid="cta-bar-workshop" className="btn-primary rounded-sm py-3 text-sm">
        {t.nav.requestWorkshop}
      </Link>
    </div>
  );
}
