import { useEffect, useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PageHeader from "@/components/site/PageHeader";
import { FlyIn } from "@/components/site/Reveal";
import ConversionStrip from "@/components/sections/ConversionStrip";
import { useLang } from "@/context/LanguageContext";
import { GALLERY } from "@/data/images";

export default function Gallery() {
  const { t } = useLang();
  const p = t.pages.gallery;
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    document.title = "Gallery | Rutuja Dignity Doll";
    window.scrollTo(0, 0);
  }, []);

  const close = useCallback(() => setActiveIndex(null), []);
  const showNext = useCallback(() => setActiveIndex((i) => (i === null ? null : (i + 1) % GALLERY.length)), []);
  const showPrev = useCallback(() => setActiveIndex((i) => (i === null ? null : (i - 1 + GALLERY.length) % GALLERY.length)), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") showNext();
      else if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, showNext, showPrev]);

  const active = activeIndex !== null ? GALLERY[activeIndex] : null;
  const activeMeta = activeIndex !== null ? p.items?.[activeIndex] : null;

  return (
    <main data-testid="gallery-page">
      <PageHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} />
      <section className="overflow-x-hidden bg-rutuja-soft py-12 md:py-20">
        <div className="container-edge">
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {GALLERY.map((img, i) => {
              const meta = p.items?.[i];
              return (
                <FlyIn key={i} direction={i % 3 === 0 ? "left" : i % 3 === 2 ? "right" : "up"} delay={(i % 3) * 0.08}>
                  <button
                    data-testid={`gallery-item-${i}`}
                    onClick={() => setActiveIndex(i)}
                    className="group relative block w-full overflow-hidden border border-rutuja-line bg-white transition-[box-shadow,border-color] duration-500 hover:border-rutuja-pink/40 hover:shadow-[0_25px_60px_-24px_rgba(200,43,98,0.55)]"
                    aria-label={img.alt}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
                    />
                    {meta && (
                      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-rutuja-ink/85 via-rutuja-ink/10 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-xs font-semibold uppercase tracking-wide text-rutuja-pink">
                          {meta.city}
                          {meta.state ? ` · ${meta.state}` : ""}
                        </p>
                        <p className="mt-1 text-sm font-medium text-white">{meta.activity}</p>
                        <p className="mt-0.5 text-xs text-white/70">
                          {meta.audience}
                          {meta.language ? ` · ${meta.language}` : ""}
                        </p>
                      </div>
                    )}
                  </button>
                </FlyIn>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            data-testid="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-rutuja-ink/90 p-4 backdrop-blur-sm"
          >
            <button
              data-testid="gallery-lightbox-close"
              onClick={close}
              aria-label={t.nav.close}
              className="absolute right-5 top-5 grid h-11 w-11 place-items-center bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X size={22} />
            </button>
            <button
              data-testid="gallery-lightbox-prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-5"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              data-testid="gallery-lightbox-next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-5"
            >
              <ChevronRight size={24} />
            </button>
            <div className="flex max-h-[90vh] max-w-[92vw] flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={active.src}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={active.src}
                alt={active.alt}
                className="max-h-[70vh] max-w-full object-contain shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_80px_-10px_rgba(200,43,98,0.5)]"
              />
              {activeMeta && (
                <div data-testid="gallery-lightbox-meta" className="mt-4 max-w-md text-center text-white">
                  <p className="text-xs font-semibold uppercase tracking-wide text-rutuja-pink">
                    {activeMeta.city}
                    {activeMeta.state ? ` · ${activeMeta.state}` : ""}
                  </p>
                  <p className="mt-1 text-sm font-medium">
                    {activeMeta.activity} — {activeMeta.audience}
                    {activeMeta.language ? ` · ${activeMeta.language}` : ""}
                  </p>
                  {activeMeta.description && <p className="mt-1 text-xs text-white/70">{activeMeta.description}</p>}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConversionStrip />
    </main>
  );
}
