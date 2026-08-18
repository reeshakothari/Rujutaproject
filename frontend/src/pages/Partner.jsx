import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { useLang } from "@/context/LanguageContext";
import { useSimpleForm, Field, TextAreaField, SelectField, SubmitButton, SuccessState } from "@/components/forms/FormKit";
import { Reveal } from "@/components/site/Reveal";

const FIELDS = [
  { name: "name", required: true },
  { name: "organization", required: true },
  { name: "orgType", required: true },
  { name: "email", type: "email", required: true },
  { name: "phone", type: "tel", required: false },
  { name: "city", required: false },
  { name: "interest", required: true },
  { name: "message", required: false },
];

export default function Partner() {
  const { t } = useLang();
  const p = t.pages.partner;
  const fm = t.forms;
  const form = useSimpleForm(FIELDS);

  useEffect(() => {
    document.title = "Partner With Rutuja | Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const shared = { values: form.values, errors: form.errors, setField: form.setField };

  return (
    <main data-testid="partner-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="bg-white py-12 md:py-20">
        <div className="container-edge max-w-3xl">
          {form.status === "success" ? (
            <SuccessState onReset={form.reset} testid="partner-success" />
          ) : (
            <Reveal>
              <form onSubmit={form.submit} noValidate data-testid="partner-form" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label={fm.f.name} name="name" required testid="field-name" {...shared} />
                <Field label={fm.f.organization} name="organization" required testid="field-organization" {...shared} />
                <SelectField label={fm.f.orgType} name="orgType" required options={fm.orgTypes} testid="field-orgType" {...shared} />
                <Field label={fm.f.email} name="email" type="email" required testid="field-email" {...shared} />
                <Field label={fm.f.phone} name="phone" type="tel" testid="field-phone" {...shared} />
                <Field label={fm.f.city} name="city" testid="field-city" {...shared} />
                <div className="md:col-span-2">
                  <SelectField label={fm.f.interest} name="interest" required options={fm.interests} testid="field-interest" {...shared} />
                </div>
                <div className="md:col-span-2">
                  <TextAreaField label={fm.f.message} name="message" testid="field-message" {...shared} />
                </div>
                <div className="md:col-span-2">
                  <SubmitButton status={form.status} testid="partner-submit" />
                </div>
              </form>
            </Reveal>
          )}
        </div>
      </section>
    </main>
  );
}
