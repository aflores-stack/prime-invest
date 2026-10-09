import { describe, expect, it } from "vitest";
import { minimumInvestment } from "./simulation";

describe("Factoring investment minimums", () => {
  it("starts at S/100", () => expect(minimumInvestment("PEN")).toBe(100));
  it("starts at $25", () => expect(minimumInvestment("USD")).toBe(25));
});