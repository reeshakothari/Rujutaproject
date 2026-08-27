import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import ImpactMap from "@/components/sections/ImpactMap";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import ImpactMeasurement from "@/components/sections/ImpactMeasurement";
import Ambassadors from "@/components/sections/Ambassadors";
import TheoryOfChange from "@/components/sections/TheoryOfChange";
import ImplementationPartners from "@/components/sections/ImplementationPartners";
import MediaCoverage from "@/components/sections/MediaCoverage";
import GlobalCTABand from "@/components/sections/GlobalCTABand";
import { useLang } from "@/context/LanguageContext";

export default function Impact() {
  const { t } = useLang();
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    document.title = `${t.impactMap.title} | Rutuja Dignity Doll`;
  }, [t]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          if (lenis) lenis.scrollTo(el, { offset: -72 });
          else el.scrollIntoView({ behavior: "smooth" });
        }
      };
      const timer = setTimeout(scroll, 350);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location, lenis]);

  return (
    <main data-testid="impact-page" className="relative overflow-hidden pt-[72px]">
      <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 animate-float rounded-full bg-rutuja-blue/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-64 h-80 w-80 animate-float-slow rounded-full bg-rutuja-pink/10 blur-3xl" aria-hidden="true" />
      <ImpactMetrics />
      <ImpactMeasurement />
      <ImpactMap />
      <Ambassadors />
      <TheoryOfChange />
      <ImplementationPartners />
      <MediaCoverage />
      <GlobalCTABand />
    </main>
  );
}
