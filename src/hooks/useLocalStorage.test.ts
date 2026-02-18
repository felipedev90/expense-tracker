import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, render } from "@testing-library/react";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve retornar o valor incial quando o localStorage está vazio", () => {
    // renderHook retorna um objeto com { result }
    const { result } = renderHook(() =>
      useLocalStorage<string>("test-key", "valor inicial"),
    );

    // result.current é o retorno do hook: [value, setValue]
    const [value] = result.current;

    expect(value).toBe("valor inicial");
  });
});
