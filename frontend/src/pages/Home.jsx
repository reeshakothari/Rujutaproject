import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LanguageContext";
import { Reveal } from "@/components/site/Reveal";
import Hero from "@/components/sections/Hero";
import ProofStrip from "@/components/sections/ProofStrip";
import WhyThisMatters from "@/components/sections/WhyThisMatters";
import DignityDollIntro from "@/components/sections/DignityDollIntro";
import ProgrammeTimeline from "@/components/sections/ProgrammeTimeline";
import HowItWorks from "@/components/sections/HowItWorks";
import WhatYouReceive from "@/components/sections/WhatYouReceive";
import PlayLearn from "@/components/sections/PlayLearn";
import ExperienceVideo from "@/components/sections/ExperienceVideo";
import FieldStories from "@/components/sections/FieldStories";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import ImpactMap from "@/components/sections/ImpactMap";
import AudienceSection from "@/components/sections/AudienceSection";
import WorkshopExperience from "@/components/sections/WorkshopExperience";
import SupportSection from "@/components/sections/SupportSection";
import SupportBreakdown from "@/components/sections/SupportBreakdown";
import TrustSection from "@/components/sections/TrustSection";
import QualityAssurance from "@/components/sections/QualityAssurance";
import ExternalValidation from "@/components/sections/ExternalValidation";
import ImplementationPartners from "@/components/sections/ImplementationPartners";
import WhatsComingUp from "@/components/sections/WhatsComingUp";
import MediaCoverage from "@/components/sections/MediaCoverage";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  const { t } = useLang();
  const location = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    document.title = "Rutuja Dignity Doll | Menstrual Dignity & Meaningful Conversation";
  }, []);

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
    <main data-testid="home-page">
      <Hero />
      <ProofStrip />
      <WhyThisMatters />
      <DignityDollIntro />
      <ProgrammeTimeline />
      <HowItWorks />
      <WhatYouReceive />
      <PlayLearn />
      <ExperienceVideo />
      <FieldStories />
      <ImpactMetrics />
      <ImpactMap />
      <section className="overflow-x-hidden bg-rutuja-soft py-12 text-center">
        <Reveal>
          <Link to="/impact#impact-measurement" data-testid="home-impact-measures-cta" className="btn-outline mx-auto rounded-sm">
            {t.impactMeasurement.cta} <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </section>
      <AudienceSection />
      <WorkshopExperience />
      <SupportSection />
      <SupportBreakdown />
      <TrustSection />
      <QualityAssurance />
      <ExternalValidation />
      <ImplementationPartners linkToImpact />
      <WhatsComingUp />
      <MediaCoverage />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
