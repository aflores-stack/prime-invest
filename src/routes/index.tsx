import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Inversiones en factoring | Prestamype" },
    { name: "description", content: "Conoce las inversiones en factoring de Prestamype desde S/100 o $25 y sus riesgos." },
    { property: "og:title", content: "Inversiones en factoring | Prestamype" },
    { property: "og:description", content: "Consulta la página de inversión en factoring y sus condiciones." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  beforeLoad: () => { throw redirect({ to: "/invertir-factoring" }); },
});
