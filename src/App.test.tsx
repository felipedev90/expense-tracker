import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App - Integração", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("deve adicionar e deletar uma despesa (fluxo completo)", async () => {
    // Parte 1 - Setup e adicionar despesa
    const user = userEvent.setup();
    render(<App />);

    // Preencher o form
    await user.type(screen.getByLabelText(/descrição/i), "Café da manhã");
    await user.type(screen.getByLabelText(/valor/i), "25.50");

    // Submeter o form
    await user.click(screen.getByRole("button", { name: /adicionar/i }));

    // Verificar se a despesa foi adicionada na lista
    const expenseList = screen.getByRole("list");
    expect(within(expenseList).getByText(/café da manhã/i)).toBeInTheDocument();
    expect(within(expenseList).getByText(/25,50/i)).toBeInTheDocument();

    // Parte 2 - Deletar a despesa
    // Encontrar o botão de deletar
    const deleteButton = screen.getByRole("button", { name: /deletar.*café/i });

    // Clicar no botão de deletar
    await user.click(deleteButton);

    // Verificar se a despesa foi removida
    expect(screen.queryByText(/café da manhã/i)).not.toBeInTheDocument();

    // Verificar mensagem de 'nehuma despesa'
    expect(screen.getByText(/nenhuma despesa registrada/i)).toBeInTheDocument();
  }, 10000);
});
