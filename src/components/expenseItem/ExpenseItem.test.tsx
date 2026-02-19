import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ExpenseItem from "./ExpenseItem";
import userEvent from "@testing-library/user-event";
import type { Expense } from "../../types/expense";

describe("ExpenseItem", () => {
  // Dados de teste (mock)
  const mockExpense: Expense = {
    id: "123",
    description: "Almoço",
    amount: 50.0,
    date: "2026-02-19",
    category: "Alimentação",
  };

  // Mock da função de exclusão
  const mockOnDelete = vi.fn();

  it("deve renderizar as informações da despesa corretamente", () => {
    render(<ExpenseItem expense={mockExpense} onDelete={mockOnDelete} />);

    // Verificar se a descrição, valor e data estão sendo exibidos corretamente
    expect(screen.getByText("Almoço")).toBeInTheDocument();
    expect(screen.getByText(/R\$\s50,00/)).toBeInTheDocument();
    expect(screen.getByText(/1[89]\/02\/2026/)).toBeInTheDocument();
  });

  it("deve chamar onDelete quando o botão deletar é clicado", async () => {
    // Configura o userEvent para simular interações do usuário
    const user = userEvent.setup();

    // Renderiza o componente com os dados de teste e a função mockada
    render(<ExpenseItem expense={mockExpense} onDelete={mockOnDelete} />);

    // Encontra o botão (use getByRole ou GetByText)
    const deleteButton = screen.getByRole("button", { name: /deletar/i });

    // Simula o clique no botão
    await user.click(deleteButton);

    // Verifica se a função mockada foi chamada exatamente uma vez
    // Verifica se a função mockada foi chamada com o ID correto
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("123");
  });
});
