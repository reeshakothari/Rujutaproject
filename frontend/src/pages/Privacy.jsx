import LegalPage from "@/components/site/LegalPage";
import { useLang } from "@/context/LanguageContext";

export default function Privacy() {
  const { t } = useLang();
  return <LegalPage p={t.pages.privacy} testId="privacy-page" docTitle="Privacy Policy" />;
}
