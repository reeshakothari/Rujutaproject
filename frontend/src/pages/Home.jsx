import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import Hero from "@/components/sections/Hero";
import WhyThisMatters from "@/components/sections/WhyThisMatters";
import DignityDollIntro from "@/components/sections/DignityDollIntro";
import HowItWorks from "@/components/sections/HowItWorks";
import ExperienceVideo from "@/components/sections/ExperienceVideo";
import FieldStories from "@/components/sections/FieldStories";
import ImpactMetrics from "@/components/sections/ImpactMetrics";
import ImpactMap from "@/components/sections/ImpactMap";
import Ambassadors from "@/components/sections/Ambassadors";
import AudienceSection from "@/components/sections/AudienceSection";
import WorkshopExperience from "@/components/sections/WorkshopExperience";
import SupportSection from "@/components/sections/SupportSection";
import TrustSection from "@/components/sections/TrustSection";
import MediaCoverage from "@/components/sections/MediaCoverage";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
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
      <WhyThisMatters />
      <DignityDollIntro />
      <HowItWorks />
      <ExperienceVideo />
      <FieldStories />
      <ImpactMetrics />
      <ImpactMap />
      <Ambassadors />
      <AudienceSection />
      <WorkshopExperience />
      <SupportSection />
      <TrustSection />
      <MediaCoverage />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
