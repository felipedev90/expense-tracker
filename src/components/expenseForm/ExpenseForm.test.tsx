import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ExpenseForm from "./ExpenseForm";

describe("ExpenseForm", () => {
  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

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

  it("deve chamar addExpense com os dados corretos ao enviar o formulário", async () => {
    const user = userEvent.setup();

    render(<ExpenseForm addExpense={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/descrição/i), "Pizza");
    await user.type(screen.getByLabelText(/valor/i), "45.50");

    await user.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith({
      description: "Pizza",
      amount: 45.5,
      date: expect.any(String),
      category: "Outros",
    });
  });

  it("não deve chamar addExpense quando campos estão vazios", async () => {
    const user = userEvent.setup();

    // Mock do window.alert
    // vi.spyOn = "observa" a função window.alert
    // .mockImplementation(() => {}) = quando chamar alert, não faz nada (sem popup)
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<ExpenseForm addExpense={mockOnSubmit} />);

    // Limpa o campo de data (vem preenchido)
    await user.clear(screen.getByLabelText(/data/i));

    // Tenta enviar o formulário sem preencher os campos
    await user.click(screen.getByRole("button", { name: /adicionar/i }));

    // Verifica que o alert foi chamado
    expect(alertSpy).toHaveBeenCalledWith(
      "Por favor, preencha todos os campos.",
    );

    // Verifica que addExpense não foi chamado
    expect(mockOnSubmit).not.toHaveBeenCalled();

    // Restaura o mock do alert
    alertSpy.mockRestore();
  });

  it("não deve chamad addExpense quando valor é zero ou negativo", async () => {
    const user = userEvent.setup();
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<ExpenseForm addExpense={mockOnSubmit} />);

    await user.type(screen.getByLabelText(/descrição/i), "Teste");
    await user.type(screen.getByLabelText(/valor/i), "0");

    await user.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(alertSpy).toHaveBeenCalledWith(
      "O valor da despesa deve ser maior que zero.",
    );
    expect(mockOnSubmit).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });
});
