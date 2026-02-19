import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
import ExpenseForm from "./ExpenseForm";

describe("ExpenseForm", () => {
  // Mock da função de envio
  const mockOnSubmit = vi.fn();

  it("deve renderizar o formulário corretamente", () => {
    render(<ExpenseForm addExpense={mockOnSubmit} />);

    // Verificar se os campos de descrição, valor, data e categoria estão presentes
    expect(screen.getByLabelText(/descrição/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/valor/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/data/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/categoria/i)).toBeInTheDocument();
  });
});
