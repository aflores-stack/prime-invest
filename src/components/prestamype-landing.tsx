import { useMemo, useRef, useState, useEffect } from "react";
import parse, { domToReact, Element, attributesToProps, type DOMNode } from "html-react-parser";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import originalHtml from "@/lib/prestamype/original.html?raw";
import { minimumInvestment, referenceReturn, type InvestmentCurrency } from "@/lib/prestamype/simulation";

const signup = "https://www.prestamype.com/registro?ref=cotizador_invertir&type_investment=factoring";
const whatsapp = "https://api.whatsapp.com/send?phone=51924605244&text=Hola%2C%20deseo%20mas%20informaci%C3%B3n%20sobre%20Inversiones%20Factoring";

export function PrestamypeLanding() {
  const [panel, setPanel] = useState<"simulation" | "information" | "video" | null>(null);
  const [currency, setCurrency] = useState<InvestmentCurrency>("PEN");
  const [amount, setAmount] = useState("");
  const [months, setMonths] = useState("12");
  const contentRef = useRef<HTMLDivElement>(null);
  const slideRef = useRef(0);
  const min = minimumInvestment(currency);
  const validAmount = Number(amount) >= min;
  const symbol = currency === "PEN" ? "S/" : "$";

  useEffect(() => {
    if (!panel) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => { if (event.key === "Escape") setPanel(null); };
    document.addEventListener("keydown", key);
    return () => { document.body.style.overflow = previous; document.removeEventListener("keydown", key); };
  }, [panel]);

  const content = useMemo(() => parse(originalHtml, {
    replace(node) {
      if (!(node instanceof Element) || node.name !== "button") return;
      const props = attributesToProps(node.attribs);
      return <Button {...props} variant="original" size="original">{domToReact(node.children as DOMNode[])}</Button>;
    },
  }), []);

  function handleClick(event: React.MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof HTMLElement)) return;
    const button = event.target.closest<HTMLElement>("[data-action]");
    const action = button?.dataset.action;
    if (action === "simulate") setPanel("simulation");
    if (action === "video") setPanel("video");
    if (action === "register") window.location.assign(signup);
    if (action === "login") window.location.assign("https://www.prestamype.com/login");
    if (action === "navigation" && button) {
      const menu = button.parentElement?.querySelector<HTMLElement>(".nav-dropdown-menu");
      const open = menu?.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(Boolean(open)));
    }
    if (event.target.closest(".menu-icon")) contentRef.current?.querySelector(".nav-collapse")?.classList.toggle("mobile-open");
    if (action === "testimonial-next" || action === "testimonial-prev") {
      const slider = contentRef.current?.querySelector<HTMLElement>(".img-slider-customer");
      const first = slider?.querySelector<HTMLElement>(".slide");
      if (!slider || !first) return;
      slideRef.current = Math.max(0, Math.min(5, slideRef.current + (action === "testimonial-next" ? 1 : -1)));
      const gap = parseFloat(getComputedStyle(slider).gap) || 24;
      slider.style.transform = `translateX(-${slideRef.current * (first.offsetWidth + gap)}px)`;
      const prev = contentRef.current?.querySelector<HTMLButtonElement>('[data-action="testimonial-prev"]');
      const next = contentRef.current?.querySelector<HTMLButtonElement>('[data-action="testimonial-next"]');
      if (prev) prev.disabled = slideRef.current === 0;
      if (next) next.disabled = slideRef.current === 5;
    }
  }

  return <>
    <div ref={contentRef} className="prestamype-page" onClick={handleClick}>{content}</div>
    {panel && <div className="simulator-backdrop" onClick={() => setPanel(null)}>
      {panel === "video" ? <section className="video-dialog" role="dialog" aria-modal="true" aria-label="¿Qué es invertir en factoring?" onClick={event => event.stopPropagation()}>
        <div className="video-close"><Button variant="ghost" size="icon" aria-label="Cerrar video" onClick={() => setPanel(null)}><X /></Button></div>
        <iframe src="https://www.youtube.com/embed/podcIXHvyHs?autoplay=1" title="¿Qué es invertir en factoring?" allow="autoplay; encrypted-media; fullscreen" allowFullScreen />
      </section> : <section className="simulator-panel" role="dialog" aria-modal="true" aria-labelledby="simulation-title" onClick={event => event.stopPropagation()}>
        <div className="simulator-heading"><h2 id="simulation-title">{panel === "information" ? "Quiero más información" : "Simula tu inversión"}</h2><Button variant="ghost" size="icon" aria-label="Cerrar simulación" onClick={() => setPanel(null)}><X /></Button></div>
        {panel === "information" ? <>
          <p>¿Cómo prefieres recibir la información?</p>
          <div className="simulator-actions"><Button asChild><a href={whatsapp} target="_blank" rel="noreferrer">Contactarme por WhatsApp</a></Button><Button asChild variant="outline"><a href="https://calendly.com/inversionista/agenda-un-espacio-con-un-especialista" target="_blank" rel="noreferrer">Que me contacten luego</a></Button></div>
          <div className="simulator-actions"><Button variant="outline" onClick={() => setPanel("simulation")}>Volver</Button></div>
        </> : <>
          <div className="simulator-fields">
            <div className="simulator-field"><span>Moneda</span><div className="currency-options">{(["PEN", "USD"] as const).map(value => <Button key={value} variant={value === currency ? "default" : "outline"} aria-pressed={value === currency} onClick={() => setCurrency(value)}>{value === "PEN" ? "Soles" : "Dólares"}</Button>)}</div></div>
            <label className="simulator-field">Monto a invertir<input type="number" min={min} step="1" value={amount} onChange={event => setAmount(event.target.value)} placeholder={symbol} /><span className="simulator-minimum">Monto a partir de {symbol}{min}</span></label>
            <label className="simulator-field">Periodo de inversión<select value={months} onChange={event => setMonths(event.target.value)}>{[1,3,9,12].map(value => <option key={value} value={value}>{value} {value === 1 ? "mes" : "meses"}</option>)}</select></label>
          </div>
          {validAmount && <div className="simulator-result">Ganancia antes de comisión e impuestos<strong>{symbol} {referenceReturn(Number(amount), Number(months)).toLocaleString("es-PE", { minimumFractionDigits:2, maximumFractionDigits:2 })}</strong><p>Esta simulación solo es referencial, para acceder al cálculo real de tus ganancias, regístrate y visualiza todas las oportunidades de inversión.</p></div>}
          <div className="simulator-actions"><Button variant="outline" onClick={() => setPanel("information")}>Quiero más información</Button><Button asChild><a href={signup}>Regístrate</a></Button></div>
        </>}
      </section>}
    </div>}
  </>;
}