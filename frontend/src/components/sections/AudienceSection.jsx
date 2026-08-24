import { Reveal, FlyIn } from "@/components/site/Reveal";
import { useLang } from "@/context/LanguageContext";
import { IMAGES } from "@/data/images";

export default function AudienceSection() {
  const { t } = useLang();
  const a = t.audience;
  return (
    <section data-testid="audience-section" className="overflow-x-hidden bg-rutuja-soft py-16 md:py-32">
      <div className="container-edge">
        <div className="max-w-4xl">
          <Reveal>
            <p className="eyebrow-pink"><span className="mr-3 font-serif text-base not-italic">07</span>{a.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-serif text-3xl font-medium leading-[1.15] tracking-tight text-rutuja-ink md:text-[2.75rem]">
              {a.title}
            </h2>
          </Reveal>
        </div>

        {/* Asymmetric editorial grid */}
        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden border border-rutuja-line bg-rutuja-line md:grid-cols-6">
          <Cell g={a.groups[0]} className="md:col-span-4" img={IMAGES.sessionKids} />
          <Cell g={a.groups[1]} className="md:col-span-2" />
          <Cell g={a.groups[2]} className="md:col-span-2" />
          <Cell g={a.groups[3]} className="md:col-span-2" />
          <Cell g={a.groups[4]} className="md:col-span-2" img={IMAGES.fieldComics} />
        </div>
      </div>
    </section>
  );
}

function Cell({ g, className = "", img }) {
  return (
    <Reveal className={`group relative bg-white transition-[background-color,box-shadow] duration-300 hover:z-10 hover:bg-rutuja-pink hover:shadow-[0_25px_60px_-20px_rgba(200,43,98,0.6)] ${className}`}>
      <div className="flex h-full min-h-[220px] flex-col justify-between p-7 md:p-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-rutuja-blue transition-colors duration-300 group-hover:text-white">{g.label}</span>
          <h3 className="mt-4 font-serif text-2xl leading-tight text-rutuja-ink transition-colors duration-300 group-hover:text-white md:text-[1.7rem]">{g.t}</h3>
        </div>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-rutuja-slate transition-colors duration-300 group-hover:text-white/90">{g.d}</p>
      </div>
      {img && (
        <FlyIn direction="up" distance={80} className="h-40 overflow-hidden md:h-48">
          <img src={img} alt="" className="h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" loading="lazy" />
        </FlyIn>
      )}
    </Reveal>
  );
}
