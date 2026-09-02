import { useEffect } from "react";
import PageHeader from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import GlobalCTABand from "@/components/sections/GlobalCTABand";

export default function LegalPage({ p, testId, docTitle }) {
  useEffect(() => {
    document.title = `${docTitle} | Rutuja Dignity Doll`;
    window.scrollTo(0, 0);
  }, [docTitle]);

  return (
    <main data-testid={testId}>
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-white py-12 md:py-20">
        <div className="container-edge max-w-3xl">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-wide text-rutuja-muted">{p.updated}</p>
          </Reveal>
          <div className="mt-10 space-y-10">
            {p.sections.map((s, i) => (
              <Reveal key={i} delay={Math.min(i * 0.03, 0.3)}>
                <h2 className="font-serif text-xl font-medium text-rutuja-ink md:text-2xl">{s.h}</h2>
                {s.body?.map((para, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-rutuja-slate md:text-base">
                    {para}
                  </p>
                ))}
                {s.list && (
                  <ul className="mt-3 space-y-2">
                    {s.list.map((item, k) => (
                      <li key={k} className="flex items-start gap-2.5 text-sm leading-relaxed text-rutuja-slate md:text-base">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rutuja-pink" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {s.after?.map((para, j) => (
                  <p key={j} className="mt-3 text-sm leading-relaxed text-rutuja-slate md:text-base">
                    {para}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <GlobalCTABand />
    </main>
  );
}
