import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { useLang } from "@/context/LanguageContext";
import { useSimpleForm, Field, TextAreaField, SelectField, SubmitButton, SuccessState } from "@/components/forms/FormKit";
import { Reveal } from "@/components/site/Reveal";
import GlobalCTABand from "@/components/sections/GlobalCTABand";

const FIELDS = [
  { name: "name", required: true },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel", required: false },
  { name: "interestType", required: true },
  { name: "areaOfInterest", required: true },
  { name: "availability", required: false },
  { name: "message", required: false },
];

export default function Volunteer() {
  const { t } = useLang();
  const p = t.pages.volunteer;
  const fm = t.forms;
  const form = useSimpleForm(FIELDS, "volunteer");

  useEffect(() => {
    document.title = "Volunteer & Internships | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const shared = { values: form.values, errors: form.errors, setField: form.setField };

  return (
    <main data-testid="volunteer-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-white py-12 md:py-20">
        <div className="container-edge max-w-3xl">
          {form.status === "success" ? (
            <SuccessState onReset={form.reset} testid="volunteer-success" />
          ) : (
            <Reveal>
              <form onSubmit={form.submit} noValidate data-testid="volunteer-form" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label={fm.f.name} name="name" required testid="field-name" {...shared} />
                <Field label={fm.f.email} name="email" type="email" required testid="field-email" {...shared} />
                <Field label={fm.f.whatsapp} name="phone" type="tel" testid="field-phone" {...shared} />
                <SelectField label={fm.f.interestType} name="interestType" required options={fm.interestTypes} testid="field-interestType" {...shared} />
                <SelectField label={fm.f.areaOfInterest} name="areaOfInterest" required options={fm.volunteerAreas} testid="field-areaOfInterest" {...shared} />
                <Field label={fm.f.availability} name="availability" testid="field-availability" {...shared} />
                <div className="md:col-span-2">
                  <TextAreaField label={fm.f.message} name="message" testid="field-message" {...shared} />
                </div>
                <div className="md:col-span-2">
                  <SubmitButton status={form.status} testid="volunteer-submit" />
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>
      <GlobalCTABand />
    </main>
  );
}
