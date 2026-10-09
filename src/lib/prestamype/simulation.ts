export type InvestmentCurrency = "PEN" | "USD";

export function minimumInvestment(currency: InvestmentCurrency) {
  return currency === "PEN" ? 100 : 25;
}

// Preserve the reference site's existing calculator; do not treat the result as a guaranteed return.
export function referenceReturn(amount: number, months: number) {
  return amount * Math.pow(1 + 0.0167, months) - amount;
}