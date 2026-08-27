import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ArrowUpRight, Plus } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export default function WhatYouReceive() {
  const { t } = useLang();
  const w = t.whatYouReceive;
  return (
    <section data-testid="what-you-receive-section" className="overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow-pink">{w.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{w.title}</h2>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-12">
          <Accordion type="single" collapsible className="grid grid-cols-1 gap-x-10 border-t border-rutuja-line md:grid-cols-2" data-testid="what-you-receive-list">
            {w.items.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-rutuja-line py-1 md:odd:border-r-0 md:odd:pr-5 md:even:pl-5">
                <AccordionTrigger
                  data-testid={`receive-trigger-${i}`}
                  className="min-h-11 py-3 text-left text-sm font-semibold text-rutuja-ink hover:no-underline [&>svg]:hidden"
                >
                  <span className="flex items-center gap-3">
                    <Plus size={14} className="shrink-0 text-rutuja-pink transition-transform duration-300 [[data-state=open]_&]:rotate-45" aria-hidden="true" />
                    {item.t}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pl-[26px] text-sm leading-relaxed text-rutuja-slate">
                  {item.d}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>

        <Reveal delay={0.15} className="mt-10">
          <Link to="/request-workshop" data-testid="what-you-receive-cta" className="btn-primary rounded-sm">
            {w.cta} <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
