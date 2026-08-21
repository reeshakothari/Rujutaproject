import { useEffect } from "react";
import ImpactMap from "@/components/sections/ImpactMap";
import { useLang } from "@/context/LanguageContext";

export default function Impact() {
  const { t } = useLang();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t.impactMap.title} | Rutuja Dignity Doll`;
  }, [t]);

  return (
    <main data-testid="impact-page" className="pt-[72px]">
      <ImpactMap />
    </main>
  );
}
