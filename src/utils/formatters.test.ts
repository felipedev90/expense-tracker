import { describe, it, expect } from "vitest";
import { formatCurrency, formatDate } from "./formatters";

describe("formatCurrency", () => {
  it("deve formatar 100 como R$ 100,00", () => {
    const resultado = formatCurrency(100);

    expect(resultado).toMatch(/R\$\s100,00/);
  });

  it("deve formatar 1234.56 com ponto separando os milhares", () => {
    const resultado = formatCurrency(1234.56);

    expect(resultado).toMatch(/R\$\s1\.234,56/);
  });

  it("deve formatar corretamente os valores em centavos", () => {
    const resultado = formatCurrency(0.5);

    expect(resultado).toMatch(/R\$\s0,50/);
  });

  it("deve formatar corretamente quando o valor for 0", () => {
    const resultado = formatCurrency(0);

    expect(resultado).toMatch(/R\$\s0,00/);
  });

  it("deve formatar valores altos com múltiplos pontos de milhar", () => {
    const resultado = formatCurrency(123456.78);

    expect(resultado).toMatch(/R\$\s123\.456,78/);
  });
});

describe("formatDate", () => {
  it("deve formatar data ISO em pt-BR", () => {
    const result = formatDate("2026-02-20");
    expect(result).toBe("20/02/2026");
  });

  it("deve ignorar timezone e manter a data correta", () => {
    const result = formatDate("2026-12-31");
    expect(result).toBe("31/12/2026");
  });
});
