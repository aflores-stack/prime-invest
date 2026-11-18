import { createFileRoute } from "@tanstack/react-router";
import { PrestamypeLanding } from "@/components/prestamype-landing";

export const Route = createFileRoute("/invertir-factoring")({
  head: () => ({ meta: [
    { title: "Invierte en factoring y rentabiliza tu dinero | Prestamype" },
    { name: "description", content: "Invierte en factoring desde S/100 o $25. Retornos estimados de 6.5% a 20% anual en soles y de 5% a 15% en dólares; no están garantizados y dependen del plazo y el riesgo." },
    { property: "og:title", content: "Invierte en factoring y rentabiliza tu dinero | Prestamype" },
    { property: "og:description", content: "Retornos estimados según moneda, plazo y riesgo. No están garantizados. Invertir implica riesgos, incluida la pérdida parcial o total del capital." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PrestamypeLanding,
});