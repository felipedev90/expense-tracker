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
    const user = userEvent.setup();

    render(<ExpenseItem expense={mockExpense} onDelete={mockOnDelete} />);

    // Encontra o botão (use getByRole ou GetByText)
    const deleteButton = screen.getByRole("button", { name: /deletar/i });

    // Simula o clique no botão
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith("123");
  });
});
