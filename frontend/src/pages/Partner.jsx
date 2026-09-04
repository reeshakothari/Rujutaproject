import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { useLang } from "@/context/LanguageContext";
import { useSimpleForm, Field, TextAreaField, SelectField, SubmitButton, SuccessState } from "@/components/forms/FormKit";
import { Reveal } from "@/components/site/Reveal";
import GlobalCTABand from "@/components/sections/GlobalCTABand";

const FIELDS = [
  { name: "organization", required: true },
  { name: "name", required: true },
  { name: "role", required: true },
  { name: "geography", required: true },
  { name: "partnerType", required: true },
  { name: "scale", required: false },
  { name: "phone", type: "tel", required: false },
  { name: "contactDetails", type: "email", required: true },
  { name: "message", required: false },
];

export default function Partner() {
  const { t } = useLang();
  const p = t.pages.partner;
  const fm = t.forms;
  const form = useSimpleForm(FIELDS, "partner");

  useEffect(() => {
    document.title = "Partner With Rutuja | Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const shared = { values: form.values, errors: form.errors, setField: form.setField };

  return (
    <main data-testid="partner-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-white py-12 md:py-20">
        <div className="container-edge max-w-3xl">
          {form.status === "success" ? (
            <SuccessState onReset={form.reset} testid="partner-success" />
          ) : (
            <Reveal>
              <form onSubmit={form.submit} noValidate data-testid="partner-form" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label={fm.f.organization} name="organization" required testid="field-organization" {...shared} />
                <Field label={fm.f.name} name="name" required testid="field-name" {...shared} />
                <Field label={fm.f.role} name="role" required testid="field-role" {...shared} />
                <Field label={fm.f.geography} name="geography" required testid="field-geography" {...shared} />
                <SelectField label={fm.f.partnerType} name="partnerType" required options={fm.partnerTypes} testid="field-partnerType" {...shared} />
                <Field label={fm.f.scale} name="scale" testid="field-scale" {...shared} />
                <Field label={fm.f.phone} name="phone" type="tel" testid="field-phone" {...shared} />
                <div className="md:col-span-2">
                  <Field label={fm.f.contactDetails} name="contactDetails" type="email" required testid="field-contactDetails" {...shared} />
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
      <GlobalCTABand />
    </main>
  );
}
