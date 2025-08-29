import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Logo from "../";
import { renderWithTheme } from "../../../utils/renderWithTheme";

describe("Logo", () => {
  it("renderiza o SVG com paths internos e externos", () => {
    renderWithTheme(<Logo />);

    const svg = screen.getByRole("img", { hidden: true }) || document.querySelector("svg");
    expect(svg).toBeInTheDocument();

    const paths = svg?.querySelectorAll("path");
    expect(paths?.length).toBeGreaterThanOrEqual(2);

    const internPath = paths?.[0];
    expect(internPath).toHaveAttribute("stroke-width", "0.5");
    expect(internPath).toHaveAttribute("fill", "transparent");

    const externPath = paths?.[1];
    expect(externPath).toHaveAttribute("fill-rule", "evenodd");
    expect(externPath).toHaveAttribute("clip-rule", "evenodd");
  });
});
