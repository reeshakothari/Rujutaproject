import { Reveal } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ShieldCheck, FileText, Download } from "lucide-react";

export default function TheoryOfChange() {
  const { t } = useLang();
  const toc = t.theoryOfChange;
  return (
    <section id="theory-of-change" data-testid="theory-of-change-section" className="scroll-mt-20 overflow-x-hidden bg-white py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow-pink">{toc.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-tight tracking-tight text-rutuja-ink md:text-5xl">{toc.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-base leading-relaxed text-rutuja-slate md:text-lg">{toc.intro}</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="mt-12">
          <Tabs defaultValue="framework" data-testid="theory-of-change-tabs">
            <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b border-rutuja-line bg-transparent p-0">
              <TabsTrigger
                value="framework"
                data-testid="toc-tab-framework"
                className="min-h-11 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 text-sm font-semibold text-rutuja-muted shadow-none data-[state=active]:border-rutuja-pink data-[state=active]:bg-transparent data-[state=active]:text-rutuja-pinkdark data-[state=active]:shadow-none"
              >
                {toc.tabs.framework}
              </TabsTrigger>
              <TabsTrigger
                value="patent"
                data-testid="toc-tab-patent"
                className="min-h-11 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 text-sm font-semibold text-rutuja-muted shadow-none data-[state=active]:border-rutuja-pink data-[state=active]:bg-transparent data-[state=active]:text-rutuja-pinkdark data-[state=active]:shadow-none"
              >
                {toc.tabs.patent}
              </TabsTrigger>
              <TabsTrigger
                value="resources"
                data-testid="toc-tab-resources"
                className="min-h-11 rounded-none border-b-2 border-transparent bg-transparent px-1 pb-3 text-sm font-semibold text-rutuja-muted shadow-none data-[state=active]:border-rutuja-pink data-[state=active]:bg-transparent data-[state=active]:text-rutuja-pinkdark data-[state=active]:shadow-none"
              >
                {toc.tabs.resources}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="framework" className="mt-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {toc.framework.map((stage, i) => (
                  <div key={i} className="hover-glow-pink border border-rutuja-line bg-rutuja-soft/40 p-5 transition-shadow duration-300">
                    <span className="animate-text-glow-blue font-serif text-xs font-semibold uppercase tracking-wide text-rutuja-blue">0{i + 1}</span>
                    <h3 className="mt-2 font-sans text-base font-semibold text-rutuja-ink">{stage.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-rutuja-slate">{stage.d}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="patent" className="mt-8">
              <div className="flex items-start gap-4 border border-rutuja-line bg-rutuja-soft/40 p-6 md:p-8">
                <ShieldCheck size={28} className="mt-1 shrink-0 animate-icon-glow text-rutuja-pink" aria-hidden="true" />
                <div>
                  <h3 className="font-serif text-xl text-rutuja-ink">{toc.patent.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-rutuja-slate">{toc.patent.body}</p>
                  <p className="mt-3 text-xs text-rutuja-muted">{toc.patent.note}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resources" className="mt-8">
              <p className="max-w-2xl text-sm leading-relaxed text-rutuja-slate">{toc.resources.intro}</p>
              <div className="mt-6 divide-y divide-rutuja-line border-t border-rutuja-line">
                {toc.resources.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-4 py-5">
                    <div className="flex items-start gap-3">
                      <FileText size={20} className="mt-0.5 shrink-0 text-rutuja-blue" aria-hidden="true" />
                      <div>
                        <h4 className="font-sans text-sm font-semibold text-rutuja-ink">{item.t}</h4>
                        <p className="mt-1 text-sm leading-relaxed text-rutuja-muted">{item.d}</p>
                      </div>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wide text-rutuja-muted">
                      <Download size={14} aria-hidden="true" /> {toc.resources.pendingLabel}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-rutuja-muted">{toc.resources.pendingNote}</p>
            </TabsContent>
          </Tabs>
        </Reveal>
      </div>
    </section>
  );
}
