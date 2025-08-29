import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../../utils/renderWithTheme";
import Spinner from "../";

describe("Spinner component", () => {
  it("renderiza com aria-label padrão", () => {
    renderWithTheme(<Spinner />);
    const svg = screen.getByLabelText("Carregando...");
    expect(svg).toBeInTheDocument();
  });

  it("aceita ariaLabel customizado", () => {
    renderWithTheme(<Spinner ariaLabel="Loading data" />);
    expect(screen.getByLabelText("Loading data")).toBeInTheDocument();
  });

  it("aplica tamanho customizado", () => {
    renderWithTheme(<Spinner size={50} />);
    const svg = screen.getByLabelText("Carregando...");
    expect(svg).toHaveAttribute("width", "50px");
    expect(svg).toHaveAttribute("height", "50px");
  });

  it("aplica espessura customizada", () => {
    renderWithTheme(<Spinner thickness={8} />);
    const circle = screen.getByLabelText("Carregando...").querySelector("circle");
    expect(circle).toHaveAttribute("stroke-width", "8");
  });

  it("usa strokeLinecap customizado", () => {
    renderWithTheme(<Spinner strokeLinecap="square" />);
    const circle = screen.getByLabelText("Carregando...").querySelector("circle");
    expect(circle).toHaveAttribute("stroke-linecap", "square");
  });

  it("renderiza gradiente de cores", () => {
    renderWithTheme(<Spinner />);
    const stops = screen.getByLabelText("Carregando...").querySelectorAll("stop");
    expect(stops.length).toBe(3);
    expect(stops[0]).toHaveAttribute("offset", "0%");
    expect(stops[1]).toHaveAttribute("offset", "60%");
    expect(stops[2]).toHaveAttribute("offset", "100%");
  });
});
