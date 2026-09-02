import LegalPage from "@/components/site/LegalPage";
import { useLang } from "@/context/LanguageContext";

export default function Terms() {
  const { t } = useLang();
  return <LegalPage p={t.pages.terms} testId="terms-page" docTitle="Terms & Conditions" />;
}
