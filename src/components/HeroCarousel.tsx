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

const AUTOPLAY_MS = 2000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);

  const total = slides.length;
  const pausedRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    timerRef.current = window.setInterval(() => {
      if (!pausedRef.current) {
        setActive((prev) => (prev + 1) % total);
      }
    }, AUTOPLAY_MS);
  }, [total]);

  useEffect(() => {
    startAutoplay();

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [startAutoplay]);

  const go = useCallback(
    (dir: 1 | -1) => {
      setActive((prev) => (prev + dir + total) % total);
      startAutoplay(); // reset timer after manual navigation
    },
    [total, startAutoplay]
  );

  const goToSlide = useCallback(
    (index: number) => {
      setActive(index);
      startAutoplay(); // reset timer after manual navigation
    },
    [startAutoplay]
  );

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
    >
      <div className="relative mx-auto aspect-[1000/420] w-full max-w-[1200px]">
        {/* Slides */}
        <div
          className="absolute inset-0"
          onMouseEnter={() => {
            pausedRef.current = true;
          }}
          onMouseLeave={() => {
            pausedRef.current = false;
          }}
        >
          {slides.map((s, i) => {
            const off = offsetOf(i);
            const abs = Math.abs(off);
            const isCenter = off === 0;

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
                    className="h-full w-full select-none object-cover"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Previous */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => go(-1)}
          className="absolute left-2 top-1/2 z-[60] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-rose-700 shadow-lg ring-1 ring-black/5 transition hover:scale-105 hover:bg-rose-50 active:scale-95 sm:left-4 sm:h-12 sm:w-12 lg:left-8"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Next */}
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => go(1)}
          className="absolute right-2 top-1/2 z-[60] grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white text-rose-700 shadow-lg ring-1 ring-black/5 transition hover:scale-105 hover:bg-rose-50 active:scale-95 sm:right-4 sm:h-12 sm:w-12 lg:right-8"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="mt-5 flex items-center justify-center gap-3">
        {slides.map((_, i) => {
          const isActive = i === active;

          return (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={isActive}
              onClick={() => goToSlide(i)}
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