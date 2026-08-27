import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { useLang } from "@/context/LanguageContext";
import { useSimpleForm, Field, TextAreaField, SubmitButton, SuccessState } from "@/components/forms/FormKit";
import { Reveal } from "@/components/site/Reveal";
import GlobalCTABand from "@/components/sections/GlobalCTABand";

const FIELDS = [
  { name: "name", required: true },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel", required: true },
  { name: "city", required: true },
  { name: "age", required: false },
  { name: "motivation", required: true },
  { name: "availability", required: false },
];

export default function AmbassadorApply() {
  const { t } = useLang();
  const p = t.pages.ambassadorApply;
  const fm = t.forms;
  const form = useSimpleForm(FIELDS, "ambassador_apply");

  useEffect(() => {
    document.title = "Ambassador Application | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const shared = { values: form.values, errors: form.errors, setField: form.setField };

  return (
    <main data-testid="ambassador-apply-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-white py-12 md:py-20">
        <div className="container-edge max-w-3xl">
          {form.status === "success" ? (
            <SuccessState onReset={form.reset} testid="ambassador-apply-success" />
          ) : (
            <Reveal>
              <form onSubmit={form.submit} noValidate data-testid="ambassador-apply-form" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label={fm.f.name} name="name" required testid="field-name" {...shared} />
                <Field label={fm.f.email} name="email" type="email" required testid="field-email" {...shared} />
                <Field label={fm.f.whatsapp} name="phone" type="tel" required testid="field-phone" {...shared} />
                <Field label={fm.f.city} name="city" required testid="field-city" {...shared} />
                <Field label={fm.f.age} name="age" testid="field-age" {...shared} />
                <div className="md:col-span-2">
                  <TextAreaField label={fm.f.motivation} name="motivation" required testid="field-motivation" {...shared} />
                </div>
                <Field label={fm.f.availability} name="availability" testid="field-availability" {...shared} />
                <div className="md:col-span-2">
                  <SubmitButton status={form.status} testid="ambassador-apply-submit" />
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
