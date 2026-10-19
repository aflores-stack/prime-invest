import { createFileRoute } from "@tanstack/react-router";
import { PrestamypeLanding } from "@/components/prestamype-landing";

export const Route = createFileRoute("/invertir-factoring")({
  head: () => ({ meta: [
    { title: "Invierte en factoring desde S/100 o $25 | Prestamype" },
    { name: "description", content: "Invierte en factoring desde S/100 o $25. Retorno estimado de hasta 20% anual, no garantizado. Conoce las operaciones y los riesgos de inversión." },
    { property: "og:title", content: "Invierte en factoring desde S/100 o $25 | Prestamype" },
    { property: "og:description", content: "Retorno estimado, no garantizado. Invertir implica riesgos, incluida la pérdida parcial o total del capital." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: PrestamypeLanding,
});