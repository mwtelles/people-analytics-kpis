import { screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Select from "../";
import { renderWithTheme } from "../../../utils/renderWithTheme";

const options = [
  { label: "Opção A", value: "a" },
  { label: "Opção B", value: "b" },
];

describe("Select component", () => {
  it("mostra placeholder quando nenhum valor está selecionado", () => {
    renderWithTheme(
      <Select value="" onChange={() => {}} options={options} placeholder="Escolha..." />
    );
    expect(screen.getByRole("button")).toHaveTextContent("Escolha...");
  });

  it("mostra label correta quando valor é selecionado", () => {
    renderWithTheme(<Select value="a" onChange={() => {}} options={options} />);
    expect(screen.getByRole("button")).toHaveTextContent("Opção A");
  });

  it("abre e fecha dropdown ao clicar no trigger", async () => {
    renderWithTheme(<Select value="" onChange={() => {}} options={options} />);
    const trigger = screen.getByRole("button");

    fireEvent.click(trigger);
    expect(screen.getByText("Opção A")).toBeInTheDocument();

    fireEvent.click(trigger);
    await waitFor(() => {
      expect(screen.queryByText("Opção A")).not.toBeInTheDocument();
    });
  });

  it("chama onChange e fecha ao selecionar opção", async () => {
    const onChange = vi.fn();
    renderWithTheme(<Select value="" onChange={onChange} options={options} />);

    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByText("Opção B"));

    expect(onChange).toHaveBeenCalledWith("b");

    await waitFor(() => {
      expect(screen.queryByText("Opção A")).not.toBeInTheDocument();
    });
  });
});
