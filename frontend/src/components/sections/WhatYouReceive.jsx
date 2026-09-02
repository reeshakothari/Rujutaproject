import { Link } from "react-router-dom";
import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { ArrowUpRight, Plus } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const PHASE_COLOURS = {
  Before: "bg-rutuja-blue/10 text-rutuja-blue",
  During: "bg-rutuja-pink/10 text-rutuja-pinkdark",
  After: "bg-rutuja-ink/8 text-rutuja-ink",
};

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

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3" data-testid="what-you-receive-groups">
          {w.groups.map((group, gi) => (
            <Reveal key={group.phase} delay={gi * 0.08}>
              <div className="flex h-full flex-col border border-rutuja-line bg-white">
                <div className={`px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] ${PHASE_COLOURS[group.phase] ?? "bg-rutuja-soft text-rutuja-ink"}`}>
                  {group.phase}
                </div>
                <Accordion type="single" collapsible className="flex-1 divide-y divide-rutuja-line border-t border-rutuja-line px-2">
                  {group.items.map((item, i) => (
                    <AccordionItem key={i} value={`${group.phase}-${i}`} className="py-1">
                      <AccordionTrigger
                        data-testid={`receive-trigger-${gi}-${i}`}
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
                {group.placeholder && (
                  <div className="m-3 rounded border border-amber-300 bg-amber-50 px-4 py-3 text-xs leading-relaxed text-amber-900">
                    {group.placeholder}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10">
          <Link to="/request-workshop" data-testid="what-you-receive-cta" className="btn-primary rounded-sm">
            {w.cta} <ArrowUpRight size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
