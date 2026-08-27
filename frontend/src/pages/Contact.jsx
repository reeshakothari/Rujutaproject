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
  { name: "enquiryType", required: true },
  { name: "message", required: true },
];

export default function Contact() {
  const { t } = useLang();
  const p = t.pages.contact;
  const fm = t.forms;
  const form = useSimpleForm(FIELDS, "contact");

  useEffect(() => {
    document.title = "Contact | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const shared = { values: form.values, errors: form.errors, setField: form.setField };

  return (
    <main data-testid="contact-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-white py-12 md:py-20">
        <div className="container-edge grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7 lg:order-2">
            {form.status === "success" ? (
              <SuccessState onReset={form.reset} testid="contact-success" />
            ) : (
              <Reveal>
                <form onSubmit={form.submit} noValidate data-testid="contact-form" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field label={fm.f.name} name="name" required testid="field-name" {...shared} />
                  <Field label={fm.f.email} name="email" type="email" required testid="field-email" {...shared} />
                  <Field label={fm.f.phone} name="phone" type="tel" testid="field-phone" {...shared} />
                  <SelectField label={fm.f.enquiryType} name="enquiryType" required options={fm.enquiryTypes} testid="field-enquiryType" {...shared} />
                  <div className="md:col-span-2">
                    <TextAreaField label={fm.f.message} name="message" required testid="field-message" {...shared} />
                  </div>
                  <div className="md:col-span-2">
                    <SubmitButton status={form.status} testid="contact-submit" />
                  </div>
                </form>
              </Reveal>
            )}
          </div>
          <div className="lg:col-span-5 lg:order-1">
            <Reveal delay={0.05}>
              <h2 className="font-serif text-2xl text-rutuja-ink md:text-3xl">{p.detailsTitle}</h2>
              <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-rutuja-muted">{p.details}</p>
            </Reveal>
          </div>
        </div>
      </section>
      <GlobalCTABand />
    </main>
  );
}
