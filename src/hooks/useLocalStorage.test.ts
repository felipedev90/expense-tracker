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

  it("deve carregar valor existente do localStorage", () => {
    // Arrange
    const valorSalvo = ["despesa1", "despesa2"];
    localStorage.setItem("test-key", JSON.stringify(valorSalvo));

    // Act
    const { result } = renderHook(
      () => useLocalStorage<string[]>("test-key", []), // valor inicial vazio
    );

    // Assert
    const [value] = result.current;
    expect(value).toEqual(valorSalvo);
  });

  it("deve atualizar o valor quando setValue é chamado", () => {
    // Renderiza o Hook com valor inicial "antigo"
    const { result } = renderHook(() =>
      useLocalStorage<string>("test-key", "antigo"),
    );
    // Pega o setValue (segunda posição da tupla retornada pelo hook )
    const [, setValue] = result.current;

    // Atualiza o valor usando Act para simular a atualização do estado
    act(() => {
      setValue("novo");
    });

    // Verifica se o valor foi atualizado corretamente
    const [novoValor] = result.current;
    expect(novoValor).toBe("novo");
  });

  it("deve salvar no localStorage quando o valor é atualizado", () => {
    // Renderiza o Hook com valor inicial "inicial"
    const { result } = renderHook(() =>
      useLocalStorage<string>("test-key", "inicial"),
    );

    // Pega o setValue (segunda posição da tupla retornada pelo hook )
    const [, setValue] = result.current;
    act(() => {
      setValue("atualizado");
    });

    // Verifica se o valor foi salvo no localStorage
    const valorNoStorage = localStorage.getItem("test-key");
    const valorParsed = JSON.parse(valorNoStorage!);
    expect(valorParsed).toBe("atualizado");
  });
});
