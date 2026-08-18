import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const { t } = useLang();
  const f = t.faq;
  return (
    <section id="faq" data-testid="faq-section" className="scroll-mt-20 bg-rutuja-soft py-24 md:py-32">
      <div className="container-edge">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="eyebrow"><span className="mr-3 font-serif text-base">11</span>{f.eyebrow}</p>
              <h2 className="mt-6 font-serif text-4xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">
                {f.title}
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
                {f.items.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-rutuja-line">
                    <AccordionTrigger
                      data-testid={`faq-trigger-${i}`}
                      className="py-6 text-left font-serif text-xl text-rutuja-ink hover:no-underline md:text-2xl [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-rutuja-blue"
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-base leading-relaxed text-rutuja-slate">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
