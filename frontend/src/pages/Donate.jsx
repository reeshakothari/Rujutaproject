import { useEffect } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/site/PageHeader";
import { useLang } from "@/context/LanguageContext";
import { useSimpleForm, Field, TextAreaField, SelectField, SubmitButton, SuccessState } from "@/components/forms/FormKit";
import { Reveal, FlyIn } from "@/components/site/Reveal";
import { IMAGES } from "@/data/images";
import SupportBreakdown from "@/components/sections/SupportBreakdown";
import GlobalCTABand from "@/components/sections/GlobalCTABand";
import { Heart } from "lucide-react";

const FIELDS = [
  { name: "name", required: true },
  { name: "contactDetails", type: "email", required: true },
  { name: "phone", type: "tel", required: false },
  { name: "pledgeType", required: true },
  { name: "amount", required: false },
  { name: "message", required: false },
];

export default function Donate() {
  const { t } = useLang();
  const p = t.pages.donate;
  const fm = t.forms;
  const form = useSimpleForm(FIELDS, "donate");
  const tierOptions = p.tiers.map((tier) => tier.t);

  useEffect(() => {
    document.title = "Donate | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const shared = { values: form.values, errors: form.errors, setField: form.setField };

  return (
    <main data-testid="donate-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-white py-16 md:py-24">
        <div className="container-edge grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <div className="flex items-start gap-3 border border-dashed border-rutuja-pink/40 bg-rutuja-soft p-6 shadow-[0_20px_50px_-28px_rgba(200,43,98,0.4)]" data-testid="donate-mechanism">
                <Heart className="mt-0.5 shrink-0 text-rutuja-pink drop-shadow-[0_0_10px_rgba(200,43,98,0.6)]" size={26} aria-hidden="true" />
                <div>
                  <h2 className="font-serif text-xl text-rutuja-ink md:text-2xl">{p.mechTitle}</h2>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-rutuja-slate">{p.mechBody}</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-8">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {p.tiers.map((tier) => (
                  <div key={tier.key} className="border border-rutuja-line bg-white p-4">
                    <h3 className="text-sm font-semibold text-rutuja-ink">{tier.t}</h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-rutuja-slate">{tier.d}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            {form.status === "success" ? (
              <div className="mt-8">
                <SuccessState onReset={form.reset} testid="donate-success" />
              </div>
            ) : (
              <Reveal delay={0.12} className="mt-8">
                <form onSubmit={form.submit} noValidate data-testid="donate-form" className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Field label={fm.f.name} name="name" required testid="field-name" {...shared} />
                  <Field label={fm.f.contactDetails} name="contactDetails" type="email" required testid="field-contactDetails" {...shared} />
                  <Field label={fm.f.whatsapp} name="phone" type="tel" testid="field-phone" {...shared} />
                  <SelectField label={fm.f.pledgeType} name="pledgeType" required options={tierOptions} testid="field-pledgeType" {...shared} />
                  <div className="md:col-span-2">
                    <Field label={fm.f.amount} name="amount" testid="field-amount" {...shared} />
                  </div>
                  <div className="md:col-span-2">
                    <TextAreaField label={fm.f.message} name="message" testid="field-message" {...shared} />
                  </div>
                  <div className="md:col-span-2">
                    <SubmitButton status={form.status} testid="donate-submit" />
                  </div>
                </form>
              </Reveal>
            )}

            <Reveal delay={0.16} className="mt-8">
              <p className="text-sm leading-relaxed text-rutuja-slate">
                {p.notice}{" "}
                <Link to="/contact" data-testid="donate-contact-cta" className="font-semibold text-rutuja-pink hover:text-rutuja-pinkdark">
                  {p.cta}
                </Link>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <FlyIn direction="right" delay={0.1}>
              <div className="group relative aspect-[4/5] overflow-hidden shadow-[0_25px_65px_-28px_rgba(200,43,98,0.4)] transition-shadow duration-700 hover:shadow-[0_25px_80px_-22px_rgba(200,43,98,0.6)]">
                <img src={IMAGES.missionEvent} alt={t.workshop.imageAlt} className="h-full w-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.04]" loading="lazy" />
              </div>
            </FlyIn>
          </div>
        </div>
      </section>
      <SupportBreakdown />
      <GlobalCTABand />
    </main>
  );
}
