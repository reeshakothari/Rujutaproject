import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { useLang } from "@/context/LanguageContext";
import { useSimpleForm, Field, TextAreaField, SelectField, SubmitButton, SuccessState } from "@/components/forms/FormKit";
import { Reveal } from "@/components/site/Reveal";
import GlobalCTABand from "@/components/sections/GlobalCTABand";

const FIELDS = [
  { name: "name", required: true },
  { name: "organization", required: true },
  { name: "city", required: true },
  { name: "audience", required: true },
  { name: "groupSize", required: false },
  { name: "timing", required: false },
  { name: "phone", type: "tel", required: true },
  { name: "notes", required: false },
];

export default function RequestWorkshop() {
  const { t } = useLang();
  const p = t.pages.workshop;
  const fm = t.forms;
  const form = useSimpleForm(FIELDS, "workshop");

  useEffect(() => {
    document.title = "Request a Workshop | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const shared = { values: form.values, errors: form.errors, setField: form.setField };

  return (
    <main data-testid="workshop-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-white py-12 md:py-20">
        <div className="container-edge max-w-3xl">
          {form.status === "success" ? (
            <SuccessState onReset={form.reset} testid="workshop-success" />
          ) : (
            <Reveal>
              <form onSubmit={form.submit} noValidate data-testid="workshop-form" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label={fm.f.name} name="name" required testid="field-name" {...shared} />
                <Field label={fm.f.organization} name="organization" required testid="field-organization" {...shared} />
                <Field label={fm.f.city} name="city" required testid="field-city" {...shared} />
                <SelectField label={fm.f.audience} name="audience" required options={fm.audiences} testid="field-audience" {...shared} />
                <Field label={fm.f.groupSize} name="groupSize" testid="field-groupSize" {...shared} />
                <Field label={fm.f.timing} name="timing" testid="field-timing" {...shared} />
                <Field label={fm.f.whatsapp} name="phone" type="tel" required testid="field-phone" {...shared} />
                <div className="md:col-span-2">
                  <TextAreaField label={fm.f.notes} name="notes" testid="field-notes" {...shared} />
                </div>
                <div className="md:col-span-2">
                  <SubmitButton status={form.status} testid="workshop-submit" />
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
