import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slide1 from "@/assets/hero-slide-1.jpg";
import slide2 from "@/assets/hero-slide-2.jpg";
import slide3 from "@/assets/hero-slide-3.jpg";

const slides = [
  { src: slide1, alt: "Save in Style — up to 40% off on silver jewellery" },
  { src: slide2, alt: "Rhapsody of Colours — vibrant gemstone pendants" },
  { src: slide3, alt: "Save in Style — up to 50% off on making charges" },
];

const AUTOPLAY_MS = 1000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const pausedRef = useRef(false);

  const go = useCallback(
    (dir: 1 | -1) => setActive((a) => (a + dir + total) % total),
    [total],
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!pausedRef.current) setActive((a) => (a + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [total]);

  // signed offset in range [-floor(n/2), ceil(n/2)-1] so neighbors wrap symmetrically
  const offsetOf = (i: number) => {
    let d = i - active;
    if (d > total / 2) d -= total;
    if (d < -total / 2) d += total;
    return d;
  };

  return (
    <section
      aria-label="Featured promotions"
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#fff5f7] via-[#fde7ee] to-[#fbd6e2] py-6 sm:py-10 lg:py-14"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className="relative mx-auto aspect-[1000/420] w-full max-w-[1200px]">
        {/* Slides */}
        <div className="absolute inset-0">
          {slides.map((s, i) => {
            const off = offsetOf(i);
            const abs = Math.abs(off);
            const isCenter = off === 0;

            // Side cards sit mostly behind the center card with a small peek.
            const translatePct = off * 6;
            const rotate = 0;
            const scale = 1;
            const heightPct = isCenter ? 88 : 78;
            const z = 50 - abs;
            const opacity = abs > 1 ? 0 : 1;

            return (
              <div
                key={i}
                aria-hidden={!isCenter}
                className="absolute left-1/2 top-1/2 w-[82%] sm:w-[84%] md:w-[86%] lg:w-[88%] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"
                style={{
                  height: `${heightPct}%`,
                  transform: `translate(-50%, -50%) translateX(${translatePct}%) rotate(${rotate}deg) scale(${scale})`,
                  zIndex: z,
                  opacity,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-xl shadow-[0_20px_50px_-20px_rgba(190,30,80,0.45)] ring-1 ring-black/5">
                  <img
                    src={s.src}
                    alt={s.alt}
                    width={1200}
                    height={500}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="h-full w-full object-cover select-none"
                  />
                </div>
              </div>
            );
          })}
        </div>


        {/* Arrows */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-2 sm:left-4 lg:left-8 top-1/2 z-[60] -translate-y-1/2 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-white text-rose-700 shadow-lg ring-1 ring-black/5 transition hover:scale-105 hover:bg-rose-50 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-2 sm:right-4 lg:right-8 top-1/2 z-[60] -translate-y-1/2 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full bg-white text-rose-700 shadow-lg ring-1 ring-black/5 transition hover:scale-105 hover:bg-rose-50 active:scale-95"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Diamond indicators */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {slides.map((_, i) => {
          const isActive = i === active;
          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive}
              onClick={() => setActive(i)}
              className="grid place-items-center p-1"
            >
              <span
                className={`block rotate-45 transition-all duration-300 ${
                  isActive
                    ? "h-3 w-3 bg-rose-600 shadow-[0_0_0_3px_rgba(225,29,72,0.18)]"
                    : "h-2.5 w-2.5 bg-transparent ring-1 ring-rose-400"
                }`}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default HeroCarousel;
