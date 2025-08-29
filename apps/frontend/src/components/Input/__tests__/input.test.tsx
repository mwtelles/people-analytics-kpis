import { fireEvent, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { EmailInput } from "../";
import { renderWithTheme } from "../../../utils/renderWithTheme";

describe("EmailInput", () => {
  it("renderiza com label e placeholder", () => {
    renderWithTheme(<EmailInput value="" onChange={() => {}} label="E-mail" placeholder="digite aqui" />);
    expect(screen.getByLabelText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("digite aqui")).toBeInTheDocument();
  });

  it("chama onChange ao digitar", () => {
    const onChange = vi.fn();
    renderWithTheme(<EmailInput value="" onChange={onChange} />);
    const input = screen.getByPlaceholderText("seu.email@empresa.com");

    fireEvent.change(input, { target: { value: "test@acme.com" } });
    expect(onChange).toHaveBeenCalledWith("test@acme.com");
  });

  it("mostra erro quando obrigatório e vazio após submit", () => {
    renderWithTheme(<EmailInput value="" onChange={() => {}} required submitted />);
    expect(screen.getByText("Campo obrigatório")).toBeInTheDocument();
  });

  it("mostra erro para formato inválido", () => {
    renderWithTheme(<EmailInput value="invalido" onChange={() => {}} required submitted />);
    expect(screen.getByText("Formato de e-mail inválido")).toBeInTheDocument();
  });

  it("mostra erro se domínio não está na whitelist", () => {
    renderWithTheme(
      <EmailInput
        value="user@gmail.com"
        onChange={() => {}}
        domainWhitelist={["empresa.com"]}
        submitted
      />,
    );
    expect(screen.getByText(/Use um e-mail corporativo válido/)).toBeInTheDocument();
  });

  it("define aria-invalid e aria-describedby quando há erro", () => {
    renderWithTheme(<EmailInput value="" onChange={() => {}} required submitted />);
    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", "email-error");
  });
});
