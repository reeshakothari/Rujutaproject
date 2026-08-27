import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";

// The three standardized calls to action, placed at the bottom of key pages:
// Donate (pledge form) · Request a Workshop (paid) · Submit an Inquiry (contact).
export default function GlobalCTABand() {
  const { t } = useLang();
  const g = t.globalCta;
  return (
    <section data-testid="global-cta-band" className="overflow-x-hidden border-t border-rutuja-line bg-rutuja-soft py-12 md:py-16">
      <div className="container-edge text-center">
        <Reveal>
          <div className="flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/donate" data-testid="global-cta-donate" className="btn-secondary w-full justify-center rounded-sm sm:w-auto">
              {g.donate}
            </Link>
            <Link to="/request-workshop" data-testid="global-cta-workshop" className="btn-primary w-full justify-center rounded-sm sm:w-auto">
              {g.workshop}
            </Link>
            <Link to="/contact" data-testid="global-cta-inquiry" className="btn-outline w-full justify-center rounded-sm sm:w-auto">
              {g.inquiry}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
