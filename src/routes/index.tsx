import { createFileRoute } from "@tanstack/react-router";
import HeroCarousel from "@/components/HeroCarousel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hero Carousel" },
      {
        name: "description",
        content:
          "A responsive hero carousel inspired by , with tilted side-peek slides and smooth transitions.",
      },
      { property: "og:title", content: "Hero Carousel" },
      {
        property: "og:description",
        content:
          "A responsive hero carousel inspired by, with tilted side-peek slides and smooth transitions.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-[#fff8fa]">
      <h1 className="sr-only">Featured promotions carousel</h1>
      <HeroCarousel />
    </main>
  );
}
