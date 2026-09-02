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
    <section id="faq" data-testid="faq-section" className="scroll-mt-20 overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
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
                      style={{ "--tw-icon-glow-delay": `${i * 0.12}s` }}
                      className="py-6 text-left font-serif text-xl text-rutuja-ink transition-colors duration-300 hover:text-rutuja-pink hover:no-underline md:text-2xl [&>svg]:h-5 [&>svg]:w-5 [&>svg]:animate-icon-glow-blue [&>svg]:text-rutuja-blue [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:[animation-delay:var(--tw-icon-glow-delay)] [&[data-state=open]>svg]:text-rutuja-pink [&[data-state=open]>svg]:drop-shadow-[0_0_8px_rgba(200,43,98,0.6)]"
                    >
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6">
                      {item.a.startsWith("🟨") ? (
                        <div className="rounded border border-amber-300 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">{item.a}</div>
                      ) : (
                        <p className="text-base leading-relaxed text-rutuja-slate">{item.a}</p>
                      )}
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
